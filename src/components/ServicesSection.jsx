import { services } from '../data/portfolioData';

const ServicesSection = () => {
  return (
    <section id="services" className="dark_bg services section-padding">
      <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
        My <span>Services</span>
      </h2>
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6 col-xs-12">
              <div 
                className="services-item wow fadeInDown" 
                data-wow-delay={`${0.3 + (index * 0.3)}s`}
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
      </div>
    </section>
  );
};

export default ServicesSection;
