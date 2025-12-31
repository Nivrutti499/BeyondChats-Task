import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, original, updated
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? `${API_BASE_URL}/articles`
        : `${API_BASE_URL}/articles?type=${filter}`;
      
      const response = await axios.get(url);
      setArticles(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      alert('Error loading articles. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleDetails = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
      setSelectedArticle(response.data);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>BeyondChats Articles</h1>
          <p>Manage and view articles</p>
        </div>
      </header>

      <div className="container">
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Articles
          </button>
          <button
            className={filter === 'original' ? 'active' : ''}
            onClick={() => setFilter('original')}
          >
            Original Articles
          </button>
          <button
            className={filter === 'updated' ? 'active' : ''}
            onClick={() => setFilter('updated')}
          >
            Updated Articles
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="no-articles">No articles found.</div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div
                key={article.id}
                className="article-card"
                onClick={() => fetchArticleDetails(article.id)}
              >
                <div className="article-badge">
                  {article.parent_article_id ? 'Updated' : 'Original'}
                </div>
                <h2 className="article-title">{article.title}</h2>
                <p className="article-content">
                  {truncateContent(article.content)}
                </p>
                <div className="article-meta">
                  <span className="article-date">
                    {formatDate(article.created_at)}
                  </span>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Original
                    </a>
                  )}
                </div>
                {article.reference_urls && article.reference_urls.length > 0 && (
                  <div className="article-references">
                    <strong>References:</strong>
                    <ul>
                      {article.reference_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedArticle(null)}
              >
                ×
              </button>
              <h1>{selectedArticle.title}</h1>
              <div className="modal-meta">
                <span>Created: {formatDate(selectedArticle.created_at)}</span>
                {selectedArticle.updated_at && (
                  <span>Updated: {formatDate(selectedArticle.updated_at)}</span>
                )}
              </div>
              <div className="modal-body">
                <div className="article-full-content">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {selectedArticle.reference_urls && selectedArticle.reference_urls.length > 0 && (
                  <div className="article-references-full">
                    <h3>References</h3>
                    <ul>
                      {selectedArticle.reference_urls.map((url, index) => (
                        <li key={index}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedArticle.url && (
                  <div className="article-original-link">
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Original Article
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 BeyondChats Article Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default App;




