import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

const BlogCard = ({ post, index }) => {
  const animationClass = index % 3 === 0 ? 'fadeInLeft' : 
                        index % 3 === 1 ? 'fadeInUp' : 'fadeInRight';

  const handleReadMore = () => {
    if (post.articleUrl) {
      window.open(post.articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-xs-12">
      <div 
        className={`single_blog wow ${animationClass}`}
        data-aos="fade-up"
        data-aos-delay={index * 200}
      >
        <div className="blog-thumb">
          <div className="blog-image">
            <a href={post.articleUrl} target="_blank" rel="noopener noreferrer">
              <img src={post.image} className="img-responsive" alt={post.title} />
              {post.featured && (
                <div className="blog-featured-badge">
                  <i className="fa fa-star"></i>
                  Featured
                </div>
              )}
            </a>
          </div>
          <div className="blog-info">
            <div className="blog-meta">
              <span className="blog-category">{post.category}</span>
              <span className="blog-read-time">
                <i className="fa fa-clock-o"></i> {post.readTime}
              </span>
            </div>
            
            <a href={post.articleUrl} target="_blank" rel="noopener noreferrer">
              <h4 className="blog-title">{post.title}</h4>
            </a>
            
            <div className="blog-date">
              <i className="fa fa-calendar"></i>
              <span>{post.date}</span>
              <span className="blog-author">by {post.author}</span>
            </div>
            
            <p className="blog-excerpt">{post.excerpt}</p>
            
            {post.tags && (
              <div className="blog-tags">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="blog-tag">#{tag}</span>
                ))}
              </div>
            )}
            
            <div className="blog-actions">
              <button 
                onClick={handleReadMore}
                className="btn blog_btn btn-primary"
                disabled={!post.articleUrl}
              >
                <i className="fa fa-external-link"></i>
                Read Full Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  // Show featured posts first, then others
  const sortedPosts = [...blogData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date); // Sort by date if same featured status
  });

  return (
    <div id="blog" className="dark_bg blog-area section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
            My <span>Blog</span>
          </h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="section-subtitle">
            Sharing knowledge and insights about web development, programming, and technology
          </p>
        </div>
        
        <div className="row">
          {sortedPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {sortedPosts.length > 3 && (
          <div className="row">
            {sortedPosts.slice(3, 6).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index + 3} />
            ))}
          </div>
        )}
        
        {/* View All Blog Posts Button */}
        <div className="blog-view-all text-center">
          <Link 
            to="/all-blogs"
            className="btn btn-view-all-blog"
          >
            <i className="fa fa-newspaper-o"></i>
            <span>View All Blog Posts</span>
            <small>({blogData.length} total articles)</small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
