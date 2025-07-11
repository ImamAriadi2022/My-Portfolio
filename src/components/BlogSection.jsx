import { blogPosts } from '../data/portfolioData';

const BlogCard = ({ post, index }) => {
  const animationClass = index % 3 === 0 ? 'fadeInLeft' : 
                        index % 3 === 1 ? 'fadeInUp' : 'fadeInRight';

  return (
    <div className="col-lg-4 col-md-4 col-xs-12">
      <div 
        className={`single_blog wow ${animationClass}`}
        data-aos="fade-up"
        data-aos-delay={index * 200}
      >
        <div className="blog-thumb">
          <div className="blog-image">
            <a href="#">
              <img src={post.image} className="img-responsive" alt={post.title} />
            </a>
          </div>
          <div className="blog-info">
            <a href="#">
              <h4>{post.title}</h4>
            </a>
            <small>
              <i className="fa fa-clock-o"></i>
              {post.date}
            </small>
            <span>| {post.category}</span>
            <p>{post.excerpt}</p>
            <a href="#" className="btn blog_btn btn-secondary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <div id="blog" className="dark_bg blog-area section-padding">
      <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
        My <span>Blog</span>
      </h2>
      <div className="container">
        <div className="row">
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>

      {blogPosts.length > 3 && (
        <div className="container">
          <div className="row">
            {blogPosts.slice(3, 6).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index + 3} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
