import { useCallback, useEffect, useState } from 'react';
import { clientTestimonials, generateSynchronizedProjectData } from '../data/projectData';

const StatisticsSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [statsData, setStatsData] = useState(() => generateSynchronizedProjectData(new Date()));
  const [animatedStats, setAnimatedStats] = useState({});
  const [chartKey] = useState(1);

  // Fungsi animasi angka naik (Counter Animation) dengan kurva halus
  const animateCounters = useCallback((targetStats) => {
    const duration = 1400; // 1.4 detik
    const steps = 45;
    const stepDuration = duration / steps;

    const counters = {
      projects: targetStats.projects.completed,
      clients: targetStats.clients.total,
      happyClients: targetStats.clients.happy,
      successRate: targetStats.metrics.successRate
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing out cubic: akselerasi halus lalu melambat natural
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        projects: Math.round(counters.projects * easeProgress),
        clients: Math.round(counters.clients * easeProgress),
        happyClients: Math.round(counters.happyClients * easeProgress),
        successRate: Math.round(counters.successRate * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(counters);
      }
    }, stepDuration);
  }, []);

  // Animasi counter saat pertama kali dimuat
  useEffect(() => {
    animateCounters(statsData.projectStats);
  }, [animateCounters, statsData.projectStats]);

  const renderChart = (data, type) => {
    if (type === 'bar') {
      const maxValue = Math.max(...data.map(item => item.projects), 1);
      return (
        <div className="chart-container bar-chart" key={`bar-chart-${chartKey}`}>
          <div className="chart-bars">
            {data.map((item, index) => {
              const isPeak = item.projects === maxValue;
              return (
                <div 
                  key={index} 
                  className={`bar-item ${item.isCurrentMonth ? 'current-month' : ''} ${isPeak ? 'peak-month' : ''}`}
                  title={`${item.fullMonth} ${item.year}: ${item.projects} proyek selesai, ${item.clients} klien`}
                >
                  <div className="bar-track">
                    {isPeak && (
                      <span className="bar-peak-badge" title="Performa Puncak">
                        <i className="fa fa-star"></i> Puncak
                      </span>
                    )}
                    {item.isCurrentMonth && !isPeak && (
                      <span className="bar-current-badge" title="Bulan Berjalan">
                        Bulan Ini
                      </span>
                    )}
                    <div 
                      className="bar"
                      style={{ 
                        height: `${Math.max(18, (item.projects / maxValue) * 100)}%`,
                        animationDelay: `${index * 0.08}s`
                      }}
                    >
                      <span className="bar-value">{item.projects}</span>
                    </div>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (type === 'tech') {
      return (
        <div className="tech-chart" key={`tech-chart-${chartKey}`}>
          {data.map((tech, index) => (
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
              <small className="tech-projects">{tech.projects} proyek terselesaikan</small>
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
            Statistik <span>Proyek</span>
          </h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="section-subtitle">
            Wawasan berbasis data mengenai perjalanan profesional dan pencapaian proyek saya
          </p>

          {/* Bar Sinkronisasi Waktu Nyata */}
          <div className="stats-sync-bar">
            <span className="sync-badge">
              <span className="sync-pulse-dot"></span>
              Sinkronisasi Real-Time: <strong>{statsData.lastUpdated.monthName} {statsData.lastUpdated.year}</strong> (Pukul {statsData.lastUpdated.time} WIB)
            </span>
          </div>
        </div>

        {/* Statistics Overview Cards (Tersinkronisasi 100% dengan Data Bulanan) */}
        <div className="stats-overview">
          <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-icon">
              <i className="fa fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {animatedStats.projects ?? statsData.projectStats.projects.completed}
              </h3>
              <p className="stat-label">Proyek Selesai</p>
              <small className="stat-detail">+{statsData.projectStats.projects.ongoing} sedang dikerjakan</small>
            </div>
          </div>
          
          <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {animatedStats.clients ?? statsData.projectStats.clients.total}
              </h3>
              <p className="stat-label">Total Klien</p>
              <small className="stat-detail">{statsData.projectStats.clients.returning} klien setia / repeat order</small>
            </div>
          </div>
          
          <div className="stat-card" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-icon">
              <i className="fa fa-trophy"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {animatedStats.successRate ?? statsData.projectStats.metrics.successRate}%
              </h3>
              <p className="stat-label">Tingkat Keberhasilan</p>
              <small className="stat-detail">{statsData.projectStats.metrics.onTimeDelivery}% selesai tepat waktu</small>
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
              <span>Ringkasan Bulanan</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'technologies' ? 'active' : ''}`}
              onClick={() => setActiveTab('technologies')}
            >
              <i className="fa fa-code"></i>
              <span>Teknologi</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <i className="fa fa-pie-chart"></i>
              <span>Kategori Proyek</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <i className="fa fa-comments"></i>
              <span>Ulasan Klien</span>
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="tab-panel overview-panel">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="chart-wrapper">
                      <h4>Penyelesaian Proyek Bulanan</h4>
                      {renderChart(statsData.monthlyData, 'bar')}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="insights-box">
                      <h5>Wawasan Utama</h5>
                      <div className="insight-item">
                        <i className="fa fa-line-chart"></i>
                        <div>
                          <strong>Performa Puncak</strong>
                          <p>{statsData.insights.peakMonth.text}</p>
                        </div>
                      </div>
                      <div className="insight-item">
                        <i className="fa fa-calendar-check-o"></i>
                        <div>
                          <strong>Konsistensi</strong>
                          <p>{statsData.insights.consistency.text}</p>
                        </div>
                      </div>
                      <div className="insight-item">
                        <i className="fa fa-arrow-circle-up"></i>
                        <div>
                          <strong>Pertumbuhan</strong>
                          <p>{statsData.insights.growth.text}</p>
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
                      <h4>Statistik Penggunaan Teknologi</h4>
                      {renderChart(statsData.techStats, 'tech')}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="tech-summary">
                      <h5>Ringkasan Stack Teknologi</h5>
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
                          <span>PHP / Laravel</span>
                          <span>Python</span>
                        </div>
                      </div>
                      <div className="tech-category">
                        <h6>Basis Data</h6>
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
                      <h4>Distribusi Kategori Proyek</h4>
                      <div className="category-items">
                        {statsData.projectCategories.map((category, index) => (
                          <div key={index} className="category-item">
                            <div className="category-info">
                              <span className="category-name">{category.name}</span>
                              <span className="category-count">{category.count} proyek</span>
                            </div>
                            <div className="category-bar">
                              <div 
                                className="category-progress"
                                style={{ 
                                  width: `${category.percentage}%`,
                                  animationDelay: `${index * 0.15}s`
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
                      <h5>Sorotan Kategori</h5>
                      {statsData.projectCategories.map((cat, idx) => (
                        <div key={idx} className="highlight-item">
                          <i className={
                            idx === 0 ? "fa fa-globe" :
                            idx === 1 ? "fa fa-mobile" :
                            idx === 2 ? "fa fa-shopping-cart" : "fa fa-server"
                          }></i>
                          <div>
                            <strong>{cat.name}</strong>
                            <p>{cat.highlight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="tab-panel testimonials-panel">
                <h4>Testimoni & Ulasan Klien</h4>
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
                      <small className="project-name">Proyek: {testimonial.project}</small>
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
