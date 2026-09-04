import { Link } from 'react-router-dom';
import { services } from '../data/portfolioData';

const ServicesSection = () => {
  return (
    <section id="services" className="dark_bg services section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header text-center">
              <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
                Layanan <span>Saya</span>
              </h2>
              <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="row services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6 col-xs-12">
              <div 
                className="services-item wow fadeInUp" 
                data-wow-delay={`${0.8 + (index * 0.2)}s`}
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="icon">
                  <img src={service.icon} alt={service.title} />
                </div>
                <div className="services-content">
                  <h3>
                    <a href="#">{service.title}</a>
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Price List CTA */}
        <div className="row mt-4">
          <div className="col-12 text-center" data-aos="fade-up" data-aos-delay="300">
            <Link to="/price-list" className="btn-view-price-list-unique">
              <i className="fa fa-tags"></i>
              <span>Lihat Daftar Harga &amp; Paket Layanan</span>
              <i className="fa fa-arrow-right view-all-arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
