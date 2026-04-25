import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiSearch, FiFolder } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard.jsx';
import SEO from '../components/SEO.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import Loader from '../components/Loader.jsx';
import api from '../services/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTech, setFilterTech] = useState('all');

  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/projects');
      console.log('API RESPONSE:', res.data);
      const projectsData = res.data?.data || res.data || [];
      setProjects(projectsData);

      console.log('PROJECTS DATA:', projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allTech = useMemo(() => {
    const techs = new Set(['all']);
    projects.forEach((p) => p.technologies?.forEach((t) => techs.add(t)));
    return Array.from(techs);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech =
        filterTech === 'all' || project.technologies?.includes(filterTech);
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, filterTech]);

  return (
    <>
      <SEO
        title="Projects"
        description="Explore my portfolio of modern web applications built with React, Node.js, MongoDB, and cutting-edge technologies."
        keywords="Portfolio Projects, React, Node.js, MongoDB, Web Applications, Full Stack"
      />

      <div className="pt-8 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
              <FiBriefcase className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-theme-primary mb-4">
              Projects
            </h1>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
              A curated collection of web applications built with modern
              technologies
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-card backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-card shadow-theme">
              <div className="relative w-full lg:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input border border-input rounded-xl text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {allTech.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilterTech(tech)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterTech === tech
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-input text-theme-secondary border border-input hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-primary'
                    }`}
                  >
                    {tech === 'all' ? 'All' : tech}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center mt-4 text-theme-muted text-sm">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </AnimatedSection>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Loader />
          ) : filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <FiFolder className="w-16 h-16 text-theme-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-theme-primary mb-2">
                No projects found
              </h3>
              <p className="text-theme-secondary">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
