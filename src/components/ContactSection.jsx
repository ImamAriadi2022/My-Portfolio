import { useEffect, useState } from 'react';
import { clientTestimonials, monthlyData, projectCategories, projectStats, techStats } from '../data/projectData';

const StatisticsSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    // Animate counters when component mounts
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const counters = {
        projects: projectStats.projects.completed,
        clients: projectStats.clients.total,
        happyClients: projectStats.clients.happy,
        successRate: projectStats.metrics.successRate
      };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          projects: Math.floor(counters.projects * progress),
          clients: Math.floor(counters.clients * progress),
          happyClients: Math.floor(counters.happyClients * progress),
          successRate: Math.floor(counters.successRate * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(counters);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderChart = (data, type) => {
    if (type === 'bar') {
      const maxValue = Math.max(...data.map(item => item.projects));
      return (
        <div className="chart-container bar-chart">
          <div className="chart-bars">
            {data.slice(0, 6).map((item, index) => (
              <div key={index} className="bar-item">
                <div 
                  className="bar"
                  style={{ 
                    height: `${(item.projects / maxValue) * 100}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="bar-value">{item.projects}</span>
                </div>
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === 'tech') {
      return (
        <div className="tech-chart">
          {techStats.slice(0, 6).map((tech, index) => (
            <div key={index} className="tech-item">
              <div className="tech-info">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-percentage">{tech.percentage}%</span>
              </div>
              <div className="tech-bar">
                <div 
                  className="tech-progress"
                  style={{ 
                    width: `${tech.percentage}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>
              <small className="tech-projects">{tech.projects} projects</small>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section id="statistics" className="dark_bg statistics-area section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
            Project <span>Statistics</span>
          </h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="section-subtitle">
            Data-driven insights into my professional journey and achievements
          </p>
        </div>

        {/* Statistics Overview Cards */}
        <div className="stats-overview">
          <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-icon">
              <i className="fa fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{animatedStats.projects || 0}</h3>
              <p className="stat-label">Projects Completed</p>
              <small className="stat-detail">+{projectStats.projects.ongoing} ongoing</small>
            </div>
          </div>
          
          <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{animatedStats.clients || 0}</h3>
              <p className="stat-label">Total Clients</p>
              <small className="stat-detail">{projectStats.clients.returning} returning clients</small>
            </div>
          </div>
          
          
          <div className="stat-card" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-icon">
              <i className="fa fa-trophy"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{animatedStats.successRate || 0}%</h3>
              <p className="stat-label">Success Rate</p>
              <small className="stat-detail">{projectStats.metrics.onTimeDelivery}% on-time delivery</small>
            </div>
          </div>
        </div>

        {/* Statistics Tabs */}
        <div className="stats-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fa fa-bar-chart"></i>
              <span>Monthly Overview</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'technologies' ? 'active' : ''}`}
              onClick={() => setActiveTab('technologies')}
            >
              <i className="fa fa-code"></i>
              <span>Technologies</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <i className="fa fa-pie-chart"></i>
              <span>Project Types</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <i className="fa fa-comments"></i>
              <span>Client Reviews</span>
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="tab-panel overview-panel">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="chart-wrapper">
                      <h4>Monthly Project Completion</h4>
                      {renderChart(monthlyData, 'bar')}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="insights-box">
                      <h5>Key Insights</h5>
                      <div className="insight-item">
                        <i className="fa fa-trending-up"></i>
                        <div>
                          <strong>Peak Performance</strong>
                          <p>August was the most productive month</p>
                        </div>
                      </div>
                      <div className="insight-item">
                        <i className="fa fa-calendar"></i>
                        <div>
                          <strong>Consistency</strong>
                          <p>Average 6 projects per month</p>
                        </div>
                      </div>
                      <div className="insight-item">
                        <i className="fa fa-growth"></i>
                        <div>
                          <strong>Growth</strong>
                          <p>40% increase from last year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technologies' && (
              <div className="tab-panel tech-panel">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="chart-wrapper">
                      <h4>Technology Usage Statistics</h4>
                      {renderChart(techStats, 'tech')}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="tech-summary">
                      <h5>Tech Stack Summary</h5>
                      <div className="tech-category">
                        <h6>Frontend</h6>
                        <div className="tech-tags">
                          <span>React</span>
                          <span>JavaScript</span>
                          <span>CSS3</span>
                        </div>
                      </div>
                      <div className="tech-category">
                        <h6>Backend</h6>
                        <div className="tech-tags">
                          <span>Node.js</span>
                          <span>PHP</span>
                          <span>Python</span>
                        </div>
                      </div>
                      <div className="tech-category">
                        <h6>Database</h6>
                        <div className="tech-tags">
                          <span>MySQL</span>
                          <span>MongoDB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="tab-panel categories-panel">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="categories-chart">
                      <h4>Project Categories</h4>
                      <div className="category-items">
                        {projectCategories.map((category, index) => (
                          <div key={index} className="category-item">
                            <div className="category-info">
                              <span className="category-name">{category.name}</span>
                              <span className="category-count">{category.count} projects</span>
                            </div>
                            <div className="category-bar">
                              <div 
                                className="category-progress"
                                style={{ 
                                  width: `${category.percentage}%`,
                                  animationDelay: `${index * 0.2}s`
                                }}
                              ></div>
                            </div>
                            <span className="category-percentage">{category.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="category-highlights">
                      <h5>Category Highlights</h5>
                      <div className="highlight-item">
                        <i className="fa fa-globe"></i>
                        <div>
                          <strong>Web Applications</strong>
                          <p>Most popular service with 37% of projects</p>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <i className="fa fa-mobile"></i>
                        <div>
                          <strong>Mobile Development</strong>
                          <p>Growing demand with 28% share</p>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <i className="fa fa-shopping-cart"></i>
                        <div>
                          <strong>E-commerce</strong>
                          <p>Specialized solutions for online businesses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="tab-panel testimonials-panel">
                <h4>Client Testimonials</h4>
                <div className="testimonials-grid">
                  {clientTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                      <div className="testimonial-header">
                        <div className="client-info">
                          <h6>{testimonial.name}</h6>
                          <p>{testimonial.company}</p>
                        </div>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`fa fa-star ${i < testimonial.rating ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <p className="testimonial-text">"{testimonial.comment}"</p>
                      <small className="project-name">Project: {testimonial.project}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
