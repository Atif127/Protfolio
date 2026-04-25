import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard.jsx';
import ContactForm from '../components/ContactForm.jsx';
import SEO from '../components/SEO.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import Loader from '../components/Loader.jsx';
import PortfolioProfile from '../assets/protfolioProfile.jpeg';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowDown,
  FiCode,
} from 'react-icons/fi';
import api from '../services/api.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/projects?limit=6');
      const projectsData = data?.data || data || [];
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <SEO
        title="Home"
        description="Full Stack Developer specializing in MERN stack. Building scalable web applications with modern technologies."
        keywords="MERN Stack, React, Node.js, MongoDB, Full Stack Developer, Web Development"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-blue-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <img
                src={PortfolioProfile}
                alt="Atif Ali"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500 shadow-xl mx-auto md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72  "
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full px-4 py-2 text-sm font-medium mb-8"
            >
              <FiCode className="w-4 h-4" />
              Available for Full Stack work
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-theme-primary leading-tight mb-6">
              Developing{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                End-to-End MERN Applications
              </span>{' '}
              With Precision
            </h1>

            <p className="text-lg sm:text-xl text-theme-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Full Stack Developer crafting scalable, performant web
              applications with modern technologies and exceptional user
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                View My Work
                <FiArrowDown className="w-5 h-5" />
              </motion.a>

              <div className="flex items-center gap-4">
                {[
                  { href: 'https://github.com/Atif127', icon: FiGithub },
                  {
                    href: 'https://www.linkedin.com/in/atif-ali-691481137?utm_source=share_via&utm_content=profile&utm_medium=member_android',
                    icon: FiLinkedin,
                  },
                  { href: 'https://twitter.com', icon: FiTwitter },
                ].map(({ href, icon: Icon }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-input hover:bg-blue-500/10 border border-input rounded-xl flex items-center justify-center text-theme-secondary hover:text-blue-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
              A selection of my recent work that showcases modern development
              practices
            </p>
          </AnimatedSection>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-28 border-t border-theme">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-primary mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it and discuss how
              we can collaborate.
            </p>
          </AnimatedSection>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Home;
