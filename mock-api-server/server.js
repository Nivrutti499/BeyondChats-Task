const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Enable CORS for React frontend
app.use(cors());
app.use(express.json());

// Mock articles database
let articles = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    content: "Web development is an exciting field that combines creativity with technical skills. In this article, we'll explore the fundamentals of web development, including HTML, CSS, and JavaScript. Whether you're a beginner or looking to refresh your skills, this guide will help you understand the core concepts.\n\nHTML (HyperText Markup Language) is the foundation of every web page. It structures the content and defines the layout. CSS (Cascading Style Sheets) is used to style and design the webpage, making it visually appealing. JavaScript adds interactivity and dynamic behavior to websites.\n\nModern web development also involves frameworks and libraries like React, Vue, or Angular for building complex user interfaces. Backend technologies like Node.js, Python, or PHP handle server-side logic and database interactions.\n\nAs you progress in web development, you'll learn about responsive design, accessibility, performance optimization, and security best practices. The field is constantly evolving, so continuous learning is essential.",
    url: "https://beyondchats.com/blogs/getting-started-web-dev",
    parent_article_id: null,
    reference_urls: null,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    scraped_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Understanding API Design Best Practices",
    content: "APIs (Application Programming Interfaces) are the backbone of modern software development. They enable different applications to communicate and share data seamlessly. In this comprehensive guide, we'll explore best practices for designing robust, scalable, and developer-friendly APIs.\n\nREST (Representational State Transfer) is the most common architectural style for web APIs. RESTful APIs use standard HTTP methods like GET, POST, PUT, and DELETE to perform operations on resources. They are stateless, meaning each request contains all the information needed to process it.\n\nKey principles of good API design include:\n- Using clear and consistent naming conventions\n- Providing comprehensive documentation\n- Implementing proper error handling\n- Ensuring versioning strategies\n- Following security best practices\n- Optimizing for performance\n\nAPI authentication is crucial for security. Common methods include API keys, OAuth 2.0, and JWT (JSON Web Tokens). Rate limiting prevents abuse and ensures fair usage.\n\nDocumentation is equally important. Tools like Swagger or OpenAPI help create interactive API documentation that makes it easy for developers to understand and use your API.",
    url: "https://beyondchats.com/blogs/api-design-practices",
    parent_article_id: null,
    reference_urls: null,
    created_at: "2024-01-20T14:30:00Z",
    updated_at: "2024-01-20T14:30:00Z",
    scraped_at: "2024-01-20T14:30:00Z"
  },
  {
    id: 3,
    title: "Introduction to Machine Learning Concepts",
    content: "Machine Learning (ML) is revolutionizing industries across the globe. From recommendation systems to autonomous vehicles, ML algorithms are driving innovation. This article introduces the core concepts and provides a foundation for understanding this powerful technology.\n\nMachine Learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. Instead of following predefined rules, ML models identify patterns and make predictions based on historical data.\n\nThere are three main types of machine learning:\n1. Supervised Learning: Models learn from labeled training data\n2. Unsupervised Learning: Models find patterns in unlabeled data\n3. Reinforcement Learning: Models learn through trial and error with rewards\n\nPopular ML algorithms include linear regression, decision trees, neural networks, and support vector machines. Each has its strengths and is suited for different types of problems.\n\nThe ML workflow typically involves data collection, data preprocessing, feature engineering, model training, evaluation, and deployment. Tools like Python with libraries such as scikit-learn, TensorFlow, and PyTorch make ML accessible to developers.",
    url: "https://beyondchats.com/blogs/ml-introduction",
    parent_article_id: null,
    reference_urls: null,
    created_at: "2024-02-01T09:15:00Z",
    updated_at: "2024-02-01T09:15:00Z",
    scraped_at: "2024-02-01T09:15:00Z"
  },
  {
    id: 4,
    title: "Getting Started with Web Development (Enhanced)",
    content: "Web development stands as one of the most dynamic and rewarding fields in technology today. This comprehensive guide will take you through everything you need to know to embark on your journey as a web developer.\n\n## The Foundation: HTML, CSS, and JavaScript\n\n**HTML (HyperText Markup Language)** serves as the structural foundation of every web page. It defines the content hierarchy and semantic meaning, ensuring that information is properly organized and accessible.\n\n**CSS (Cascading Style Sheets)** transforms the structural foundation into visually appealing designs. Modern CSS features like Flexbox and Grid enable developers to create responsive layouts that adapt seamlessly across devices.\n\n**JavaScript** brings websites to life by adding interactivity and dynamic behavior. From simple form validation to complex single-page applications, JavaScript powers the modern web experience.\n\n## Modern Development Ecosystem\n\nToday's web development landscape includes powerful frameworks and libraries:\n- **React**: Component-based UI library for building interactive interfaces\n- **Vue.js**: Progressive framework for building user interfaces\n- **Angular**: Full-featured framework for enterprise applications\n\nBackend technologies handle server-side operations:\n- **Node.js**: JavaScript runtime for server-side development\n- **Python**: Versatile language with frameworks like Django and Flask\n- **PHP**: Server-side scripting language powering many websites\n\n## Best Practices and Future Trends\n\nAs you advance, focus on:\n- Responsive design principles\n- Accessibility standards (WCAG)\n- Performance optimization\n- Security best practices\n- Progressive Web Apps (PWAs)\n\nThe field continues to evolve rapidly, with new tools and techniques emerging regularly. Continuous learning and adaptation are key to success in web development.",
    url: "https://beyondchats.com/blogs/getting-started-web-dev",
    parent_article_id: 1,
    reference_urls: [
      "https://developer.mozilla.org/en-US/docs/Web/HTML",
      "https://www.w3schools.com/css/"
    ],
    created_at: "2024-01-25T11:00:00Z",
    updated_at: "2024-01-25T11:00:00Z",
    scraped_at: null
  },
  {
    id: 5,
    title: "Understanding API Design Best Practices (Enhanced)",
    content: "APIs represent the critical communication layer between different software systems in our interconnected digital world. This in-depth exploration covers everything you need to know about creating exceptional APIs that developers love to use.\n\n## Understanding REST Architecture\n\n**REST (Representational State Transfer)** has become the de facto standard for web API design. RESTful APIs leverage HTTP methods in a semantic way:\n- **GET**: Retrieve resources\n- **POST**: Create new resources\n- **PUT**: Update existing resources\n- **DELETE**: Remove resources\n\nThe stateless nature of REST ensures scalability and reliability, as each request is independent and self-contained.\n\n## Core Design Principles\n\n### 1. Clarity and Consistency\nUse intuitive, predictable naming conventions. Follow RESTful resource naming patterns that clearly indicate the resource hierarchy and relationships.\n\n### 2. Comprehensive Documentation\nGreat APIs are self-documenting. Provide clear examples, use OpenAPI/Swagger specifications, and include code samples in multiple languages.\n\n### 3. Robust Error Handling\nImplement consistent error response formats with appropriate HTTP status codes. Provide meaningful error messages that help developers diagnose issues quickly.\n\n### 4. Versioning Strategy\nPlan for evolution from day one. Use URL versioning (e.g., /api/v1/) or header-based versioning to maintain backward compatibility.\n\n### 5. Security First\nImplement authentication (API keys, OAuth 2.0, JWT) and authorization. Use HTTPS, implement rate limiting, and validate all inputs to prevent security vulnerabilities.\n\n### 6. Performance Optimization\nDesign for efficiency with proper caching strategies, pagination for large datasets, and field selection to minimize payload sizes.\n\n## Authentication and Security\n\nModern APIs employ various authentication mechanisms:\n- **API Keys**: Simple but effective for service-to-service communication\n- **OAuth 2.0**: Industry standard for user authorization\n- **JWT (JSON Web Tokens)**: Stateless authentication tokens\n\nRate limiting protects your API from abuse and ensures fair resource distribution among users.\n\n## Documentation Tools\n\nTools like **Swagger/OpenAPI** enable interactive API documentation that developers can test directly in their browsers. Good documentation reduces integration time and support requests.",
    url: "https://beyondchats.com/blogs/api-design-practices",
    parent_article_id: 2,
    reference_urls: [
      "https://restfulapi.net/",
      "https://swagger.io/specification/"
    ],
    created_at: "2024-02-05T16:45:00Z",
    updated_at: "2024-02-05T16:45:00Z",
    scraped_at: null
  }
];

let nextId = 6;

// GET /api/articles - List all articles
app.get('/api/articles', (req, res) => {
  const type = req.query.type;
  let filteredArticles = [...articles];

  if (type === 'original') {
    filteredArticles = articles.filter(a => a.parent_article_id === null);
  } else if (type === 'updated') {
    filteredArticles = articles.filter(a => a.parent_article_id !== null);
  }

  // Pagination simulation
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedArticles = filteredArticles.slice(start, end);

  res.json({
    data: paginatedArticles,
    current_page: page,
    per_page: perPage,
    total: filteredArticles.length,
    last_page: Math.ceil(filteredArticles.length / perPage)
  });
});

// GET /api/articles/:id - Get specific article
app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }

  res.json(article);
});

// POST /api/articles - Create new article
app.post('/api/articles', (req, res) => {
  const { title, content, url, parent_article_id, reference_urls } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newArticle = {
    id: nextId++,
    title,
    content,
    url: url || null,
    parent_article_id: parent_article_id || null,
    reference_urls: reference_urls || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    scraped_at: null
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// PUT /api/articles/:id - Update article
app.put('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }

  const { title, content, url, reference_urls } = req.body;
  articles[articleIndex] = {
    ...articles[articleIndex],
    ...(title && { title }),
    ...(content && { content }),
    ...(url !== undefined && { url }),
    ...(reference_urls !== undefined && { reference_urls }),
    updated_at: new Date().toISOString()
  };

  res.json(articles[articleIndex]);
});

// DELETE /api/articles/:id - Delete article
app.delete('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }

  articles.splice(articleIndex, 1);
  res.json({ message: 'Article deleted successfully' });
});

// GET /api/articles/:id/updated-versions - Get updated versions
app.get('/api/articles/:id/updated-versions', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedVersions = articles.filter(a => a.parent_article_id === id);
  res.json(updatedVersions);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BeyondChats Article Management API',
    endpoints: {
      articles: '/api/articles',
      articleById: '/api/articles/:id',
      updatedVersions: '/api/articles/:id/updated-versions'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api/articles`);
  console.log(`\n✅ Ready to serve the React frontend!`);
});




