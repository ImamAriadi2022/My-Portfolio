import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="dark_bg contact-area section-padding">
      <div className="container">
        <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
          Get In <span>Touch</span>
        </h2>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-xs-12">
            <div className="contact-form" data-aos="fade-right">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="6"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-secondary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-xs-12">
            <div className="contact-info" data-aos="fade-left">
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="content">
                  <h4>Address</h4>
                  <p>Indonesia</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="content">
                  <h4>Phone</h4>
                  <p>+62 xxx xxxx xxxx</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="content">
                  <h4>Email</h4>
                  <p>imam.ariadi@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
