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
    
    // Create WhatsApp message
    const { name, email, subject, message } = formData;
    const whatsappMessage = `Hello Imam! 👋

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}

---
Sent from your portfolio website`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp URL with your number
    const whatsappUrl = `https://wa.me/6285788322061?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleQuickMessage = (messageType) => {
    let quickMessage = '';
    
    switch(messageType) {
      case 'project':
        quickMessage = "Hi Imam! I'm interested in discussing a project with you. Can we talk about the details?";
        break;
      case 'collaboration':
        quickMessage = "Hello! I'd like to explore collaboration opportunities. Let's connect!";
        break;
      case 'consultation':
        quickMessage = "Hi! I need some technical consultation. Are you available for a discussion?";
        break;
      default:
        quickMessage = "Hello Imam! I'd like to get in touch with you.";
    }
    
    const encodedMessage = encodeURIComponent(quickMessage);
    const whatsappUrl = `https://wa.me/6285788322061?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="dark_bg contact-area section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
            Get In <span>Touch</span>
          </h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="section-subtitle">
            Ready to start your project? Let's discuss your ideas and bring them to life!
          </p>
        </div>
        
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 col-md-8 col-xs-12">
            <div className="contact-form-wrapper" data-aos="fade-right">
              <div className="contact-form-header">
                <h3><i className="fa fa-whatsapp"></i> Send via WhatsApp</h3>
                <p>Fill the form below and it will redirect to WhatsApp for instant communication</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <label>Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-whatsapp">
                    <i className="fa fa-whatsapp"></i>
                    Send to WhatsApp
                  </button>
                </div>
              </form>
              
              {/* Quick Message Buttons */}
              <div className="quick-messages">
                <h4>Or send a quick message:</h4>
                <div className="quick-btn-group">
                  <button 
                    className="btn btn-quick"
                    onClick={() => handleQuickMessage('project')}
                  >
                    <i className="fa fa-code"></i>
                    Project Discussion
                  </button>
                  <button 
                    className="btn btn-quick"
                    onClick={() => handleQuickMessage('collaboration')}
                  >
                    <i className="fa fa-handshake-o"></i>
                    Collaboration
                  </button>
                  <button 
                    className="btn btn-quick"
                    onClick={() => handleQuickMessage('consultation')}
                  >
                    <i className="fa fa-comments"></i>
                    Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="col-lg-4 col-md-4 col-xs-12">
            <div className="contact-info" data-aos="fade-left">
              <div className="contact-info-header">
                <h3>Let's Connect</h3>
                <p>Choose your preferred way to reach out</p>
              </div>
              
              <div className="contact-item whatsapp-primary">
                <div className="icon">
                  <i className="fa fa-whatsapp"></i>
                </div>
                <div className="content">
                  <h4>WhatsApp</h4>
                  <p>+62 857-8832-2061</p>
                  <a 
                    href="https://wa.me/6285788322061" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-whatsapp-direct"
                  >
                    <i className="fa fa-whatsapp"></i> Chat Now
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="content">
                  <h4>Email</h4>
                  <p>imam.ariadi@gmail.com</p>
                  <small>For formal inquiries</small>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="content">
                  <h4>Location</h4>
                  <p>Indonesia</p>
                  <small>Available for remote work</small>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">
                  <i className="fa fa-clock-o"></i>
                </div>
                <div className="content">
                  <h4>Response Time</h4>
                  <p>Usually within 2-4 hours</p>
                  <small>Monday - Saturday</small>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-buttons">
                  <a href="#" className="social-btn github">
                    <i className="fa fa-github"></i>
                  </a>
                  <a href="#" className="social-btn linkedin">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#" className="social-btn instagram">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#" className="social-btn twitter">
                    <i className="fa fa-twitter"></i>
                  </a>
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
