require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_API_URL = process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions';

/**
 * Fetch articles from the API
 */
async function fetchArticles() {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles?type=original`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching articles:', error.message);
        throw error;
    }
}

/**
 * Search Google for article title
 */
async function searchGoogle(title) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Search Google
        const searchQuery = encodeURIComponent(title);
        await page.goto(`https://www.google.com/search?q=${searchQuery}`, {
            waitUntil: 'networkidle2'
        });

        // Extract search result links
        const links = await page.evaluate(() => {
            const results = [];
            const searchResults = document.querySelectorAll('div.g a');
            
            searchResults.forEach((link, index) => {
                if (index < 10) { // Get first 10 results
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('http') && !href.includes('google.com')) {
                        results.push(href);
                    }
                }
            });
            
            return results;
        });

        await browser.close();

        // Filter for blog/article URLs (not social media, video sites, etc.)
        const blogPatterns = [
            /blog/i,
            /article/i,
            /post/i,
            /medium\.com/i,
            /dev\.to/i,
            /wordpress\.com/i,
            /blogger\.com/i,
            /wixsite\.com/i,
        ];

        const excludePatterns = [
            /youtube\.com/i,
            /facebook\.com/i,
            /twitter\.com/i,
            /linkedin\.com/i,
            /instagram\.com/i,
            /pinterest\.com/i,
        ];

        const blogLinks = links.filter(url => {
            const isExcluded = excludePatterns.some(pattern => pattern.test(url));
            if (isExcluded) return false;
            
            return blogPatterns.some(pattern => pattern.test(url)) || 
                   (!url.includes('google.com') && !url.includes('bing.com'));
        });

        return blogLinks.slice(0, 2); // Return first 2 blog/article links
    } catch (error) {
        console.error('Error searching Google:', error.message);
        // Fallback: return empty array
        return [];
    }
}

/**
 * Scrape content from a URL
 */
async function scrapeArticleContent(url) {
    try {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        
        // Try multiple selectors to extract main content
        const contentSelectors = [
            'article',
            '.entry-content',
            '.post-content',
            '.article-content',
            '.content',
            'main',
            '[role="main"]',
        ];

        let content = '';
        for (const selector of contentSelectors) {
            const element = $(selector).first();
            if (element.length > 0) {
                content = element.text().trim();
                if (content.length > 200) { // Good enough content
                    break;
                }
            }
        }

        // Fallback: get all paragraphs
        if (!content || content.length < 200) {
            const paragraphs = [];
            $('p').each((i, elem) => {
                const text = $(elem).text().trim();
                if (text.length > 50) {
                    paragraphs.push(text);
                }
            });
            content = paragraphs.join('\n\n');
        }

        return content || 'Content could not be scraped';
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return 'Content could not be scraped';
    }
}

/**
 * Call LLM API to enhance article
 */
async function enhanceArticleWithLLM(originalArticle, referenceArticles) {
    try {
        const referenceContents = referenceArticles.map(ref => ref.content).join('\n\n---\n\n');
        const referenceUrls = referenceArticles.map(ref => ref.url);

        const prompt = `You are a professional content writer. I need you to update and enhance an article to match the style, formatting, and quality of reference articles.

Original Article:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

Reference Articles (use these as style and format guides):
${referenceContents}

Please rewrite the original article with the following requirements:
1. Maintain the core message and key points of the original article
2. Match the writing style, tone, and formatting of the reference articles
3. Improve clarity, structure, and readability
4. Make it similar in quality to the reference articles
5. Keep it engaging and well-formatted

Return only the enhanced article content, without any additional commentary or explanations.`;

        const response = await axios.post(
            LLM_API_URL,
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional content writer who enhances articles while maintaining their core message.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000,
            },
            {
                headers: {
                    'Authorization': `Bearer ${LLM_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const enhancedContent = response.data.choices[0].message.content;
        
        // Add citations at the bottom
        const citations = '\n\n---\n\n**References:**\n' + 
                         referenceUrls.map(url => `- ${url}`).join('\n');
        
        return enhancedContent + citations;
    } catch (error) {
        console.error('Error calling LLM API:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
        throw error;
    }
}

/**
 * Publish enhanced article via API
 */
async function publishEnhancedArticle(originalArticleId, enhancedContent, referenceUrls) {
    try {
        // Get original article to keep the title
        const originalResponse = await axios.get(`${API_BASE_URL}/articles/${originalArticleId}`);
        const originalArticle = originalResponse.data;

        const response = await axios.post(
            `${API_BASE_URL}/articles`,
            {
                title: originalArticle.title + ' (Enhanced)',
                content: enhancedContent,
                parent_article_id: originalArticleId,
                reference_urls: referenceUrls,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error publishing enhanced article:', error.message);
        throw error;
    }
}

/**
 * Main function to process articles
 */
async function main() {
    console.log('Starting article enhancement process...\n');

    try {
        // Fetch articles from API
        console.log('Fetching articles from API...');
        const articles = await fetchArticles();
        console.log(`Found ${articles.length} articles\n`);

        if (articles.length === 0) {
            console.log('No articles to process.');
            return;
        }

        // Process each article
        for (const article of articles) {
            console.log(`\nProcessing: ${article.title}`);
            console.log(`Article ID: ${article.id}`);

            try {
                // Step 1: Search Google for similar articles
                console.log('Searching Google...');
                const searchLinks = await searchGoogle(article.title);
                
                if (searchLinks.length === 0) {
                    console.log('No relevant blog links found. Skipping...');
                    continue;
                }

                console.log(`Found ${searchLinks.length} relevant links:`, searchLinks);

                // Step 2: Scrape content from top 2 links
                console.log('Scraping reference articles...');
                const referenceArticles = [];
                for (const link of searchLinks.slice(0, 2)) {
                    console.log(`Scraping: ${link}`);
                    const content = await scrapeArticleContent(link);
                    referenceArticles.push({ url: link, content });
                    // Small delay between requests
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                if (referenceArticles.length === 0 || 
                    referenceArticles.every(ref => ref.content === 'Content could not be scraped')) {
                    console.log('Could not scrape reference articles. Skipping...');
                    continue;
                }

                // Step 3: Enhance article using LLM
                console.log('Enhancing article with LLM...');
                const enhancedContent = await enhanceArticleWithLLM(article, referenceArticles);
                console.log('Article enhanced successfully!');

                // Step 4: Publish enhanced article
                console.log('Publishing enhanced article...');
                const referenceUrls = referenceArticles.map(ref => ref.url);
                const publishedArticle = await publishEnhancedArticle(
                    article.id,
                    enhancedContent,
                    referenceUrls
                );
                console.log(`Published enhanced article with ID: ${publishedArticle.id}`);

                // Delay between articles to be respectful
                console.log('Waiting 5 seconds before next article...');
                await new Promise(resolve => setTimeout(resolve, 5000));

            } catch (error) {
                console.error(`Error processing article ${article.id}:`, error.message);
                continue; // Continue with next article
            }
        }

        console.log('\nArticle enhancement process completed!');
    } catch (error) {
        console.error('Fatal error:', error.message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}

module.exports = {
    fetchArticles,
    searchGoogle,
    scrapeArticleContent,
    enhanceArticleWithLLM,
    publishEnhancedArticle,
};




