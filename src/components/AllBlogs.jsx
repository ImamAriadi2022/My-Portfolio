import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import './AllBlogs.css';

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
    <div className="blog-modal-overlay-unique" onClick={onClose}>
      <div className="blog-modal-unique" onClick={(e) => e.stopPropagation()}>
        <button className="blog-modal-close-unique" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="blog-modal-content-unique">
          <div className="blog-modal-image-unique">
            <img src={blog.coverImage || blog.image} alt={blog.title} />
          </div>
          
          <div className="blog-modal-info-unique">
            <div className="blog-meta-unique">
              <span className="blog-category-unique">{blog.category}</span>
              <span className="blog-date-unique">{blog.date}</span>
              <span className="blog-read-time-unique">{blog.readTime}</span>
            </div>
            
            <h3>{blog.title}</h3>
            <p className="blog-description-unique">{blog.description}</p>
            
            <div className="blog-tags-unique">
              <h4>Tags</h4>
              <div className="tag-list-unique">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="blog-tag-unique">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="blog-actions-unique">
              <a 
                href={blog.articleUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-blog-primary-unique"
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
    <div className="all-blogs-card-unique" onClick={() => onClick(blog)}>
      <div className="all-blogs-card-image-unique">
        <img src={blog.image} alt={blog.title} />
        {blog.featured && (
          <div className="blog-featured-badge-unique">
            <i className="fa fa-star"></i> Featured
          </div>
        )}
        <div className="all-blogs-card-overlay-unique">
          <div className="all-blogs-card-actions-unique">
            <div className="blog-category-badge-unique">
              <span>{blog.category}</span>
            </div>
            <button className="btn-blog-view-unique">
              <i className="fa fa-eye"></i> Read More
            </button>
          </div>
        </div>
      </div>
      
      <div className="all-blogs-card-content-unique">
        <div className="all-blogs-meta-unique">
          <span className="all-blogs-date-unique">
            <i className="fa fa-calendar"></i> {blog.date}
          </span>
          <span className="all-blogs-read-time-unique">
            <i className="fa fa-clock-o"></i> {blog.readTime}
          </span>
        </div>
        <h3 className="all-blogs-title-text-unique">{blog.title}</h3>
        <p className="all-blogs-excerpt-unique">{blog.excerpt}</p>
        
        <div className="all-blogs-tags-unique">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="all-blogs-tag-unique">{tag}</span>
          ))}
          {blog.tags.length > 3 && (
            <span className="tag-more-unique">+{blog.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter buttons komponen
const BlogFilter = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="all-blogs-filter-unique">
      {blogCategories.map((category) => (
        <button
          key={category.id}
          className={`all-blogs-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
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
    <div className="all-blogs-page-unique">
      {/* Header */}
      <section className="all-blogs-header-unique">
        <div className="container">
          <Link to="/" className="back-btn-blogs-unique">
            <i className="fa fa-arrow-left"></i> Back to Home
          </Link>
          <div className="all-blogs-title-unique">
            <h1>All Blog Articles</h1>
            <p>Explore my complete collection of web development tutorials, guides, and insights</p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="all-blogs-content-unique">
        <div className="container">
          <BlogFilter 
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
          
          {/* Stats */}
          <div className="blog-stats-unique">
            <div className="blog-stat-item-unique">
              <span className="blog-stat-number-unique">{filteredBlogs.length}</span>
              <span className="blog-stat-label-unique">
                {activeCategory === 'all' ? 'Total Articles' : 'Articles in Category'}
              </span>
            </div>
            <div className="blog-stat-item-unique">
              <span className="blog-stat-number-unique">
                {filteredBlogs.filter(b => b.featured).length}
              </span>
              <span className="blog-stat-label-unique">Featured Articles</span>
            </div>
            <div className="blog-stat-item-unique">
              <span className="blog-stat-number-unique">
                {Math.round(filteredBlogs.reduce((sum, b) => sum + parseInt(b.readTime), 0) / filteredBlogs.length) || 0}
              </span>
              <span className="blog-stat-label-unique">Avg Read Time (min)</span>
            </div>
          </div>
          
          <div className="all-blogs-grid-unique">
            {filteredBlogs.map((blog) => (
              <BlogCard 
                key={blog.id}
                blog={blog}
                onClick={handleBlogClick}
              />
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <div className="all-blogs-empty-unique">
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
