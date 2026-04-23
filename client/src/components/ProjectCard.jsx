import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-card backdrop-blur-xl rounded-3xl border border-card hover:border-blue-500/30 transition-all duration-500 shadow-theme hover:shadow-2xl overflow-hidden"
    >
      {/* Image */}
      <div className="h-56 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-t-3xl flex items-center justify-center overflow-hidden border-b border-theme">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-theme-muted">
              Project Preview
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-theme-primary mb-2 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>

        <p className="text-theme-secondary text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies?.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2.5 py-1 bg-theme-primary text-theme-muted border border-theme rounded-lg text-xs font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg"
            >
              <FiExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-input hover:bg-black/10 dark:hover:bg-white/10 text-theme-primary border border-input py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <FiGithub className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
