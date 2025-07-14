import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

// Blog categories for filtering
const blogCategories = [
  { id: 'all', name: 'All Articles', icon: 'fa-th-large' },
  { id: 'React', name: 'React', icon: 'fa-atom' },
  { id: 'Backend', name: 'Backend', icon: 'fa-server' },
  { id: 'CSS', name: 'CSS', icon: 'fa-paint-brush' },
  { id: 'JavaScript', name: 'JavaScript', icon: 'fa-code' },
  { id: 'Tutorial', name: 'Tutorials', icon: 'fa-graduation-cap' }
];

// Modal untuk detail blog
const BlogModal = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="blog-modal-content">
          <div className="blog-modal-image">
            <img src={blog.coverImage || blog.image} alt={blog.title} />
          </div>
          
          <div className="blog-modal-info">
            <div className="blog-meta">
              <span className="blog-category">{blog.category}</span>
              <span className="blog-date">{blog.date}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            
            <h3>{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
            
            <div className="blog-tags">
              <h4>Tags</h4>
              <div className="tag-list">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="blog-actions">
              <a 
                href={blog.articleUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="fa fa-external-link"></i> Read Full Article
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card komponen untuk setiap blog item
const BlogCard = ({ blog, onClick }) => {
  return (
    <div className="blog-card dark-theme" onClick={() => onClick(blog)}>
      <div className="blog-card-image">
        <img src={blog.image} alt={blog.title} />
        <div className="blog-card-overlay">
          <div className="blog-card-actions">
            <div className="blog-category-badge">
              <span>{blog.category}</span>
            </div>
            <button className="btn btn-view">
              <i className="fa fa-eye"></i> Read More
            </button>
          </div>
        </div>
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-date">{blog.date}</span>
          <span className="blog-read-time">{blog.readTime}</span>
        </div>
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        
        <div className="blog-card-tags">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag-small">{tag}</span>
          ))}
          {blog.tags.length > 3 && (
            <span className="tag-more">+{blog.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter buttons komponen
const BlogFilter = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="blog-filter">
      {blogCategories.map((category) => (
        <button
          key={category.id}
          className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onFilterChange(category.id)}
        >
          <i className={`fa ${category.icon}`}></i>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Main All Blogs component
const AllBlogs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter blogs based on category
  const filteredBlogs = activeCategory === 'all' 
    ? blogData 
    : blogData.filter(blog => blog.category === activeCategory);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="all-blogs-page blog-dark">
      {/* Header */}
      <section className="all-blogs-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fa fa-arrow-left"></i> Back to Home
          </Link>
          <div className="all-blogs-title">
            <h1>All Blog Articles</h1>
            <p>Explore my complete collection of web development tutorials, guides, and insights</p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="all-blogs-content">
        <div className="container">
          <BlogFilter 
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
          
          {/* Stats */}
          <div className="blog-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredBlogs.length}</span>
              <span className="stat-label">
                {activeCategory === 'all' ? 'Total Articles' : 'Articles in Category'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredBlogs.filter(b => b.featured).length}
              </span>
              <span className="stat-label">Featured Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {Math.round(filteredBlogs.reduce((sum, b) => sum + parseInt(b.readTime), 0) / filteredBlogs.length) || 0}
              </span>
              <span className="stat-label">Avg Read Time (min)</span>
            </div>
          </div>
          
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard 
                key={blog.id}
                blog={blog}
                onClick={handleBlogClick}
              />
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <div className="blog-empty">
              <i className="fa fa-file-text-o"></i>
              <p>No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      <BlogModal 
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AllBlogs;
