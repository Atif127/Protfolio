import SEO from '../components/SEO.jsx';
import ContactForm from '../components/ContactForm.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import { FiMail, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'hello@portfolio.com' },
    { icon: FiMapPin, label: 'Location', value: 'Remote / Worldwide' },
    { icon: FiClock, label: 'Response Time', value: 'Within 24 hours' },
  ];

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch for collaborations, freelance projects, or just to say hello."
        keywords="Contact, Hire Developer, Freelance, Web Development"
      />

      <div className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center py-16 sm:py-24">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-theme-primary mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? Let's discuss your
              next project.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <AnimatedSection key={label} delay={0.1}>
                <div className="bg-card backdrop-blur-sm border border-card rounded-2xl p-6 text-center shadow-theme hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-theme-muted text-sm mb-1">{label}</p>
                  <p className="text-theme-primary font-semibold">{value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
