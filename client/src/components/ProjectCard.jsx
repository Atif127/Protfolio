import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import TaskifyPro from '../assets/TaskifyPro.jpg';
import popshopzone from '../assets/popshopzone.jpg';
import trendccart from '../assets/trentcart.jpg';
import netflixClone from '../assets/netflixClone.jpg';

const usedFallbacks = new Set();

const BASE_URL = 'http://localhost:5000';

const getUniqueRandomFallback = (images) => {
  if (usedFallbacks.size === images.length) {
    usedFallbacks.clear();
  }

  const available = images.filter((img) => !usedFallbacks.has(img));

  const random = available[Math.floor(Math.random() * available.length)];

  usedFallbacks.add(random);

  return random;
};

const ProjectImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  const imageUrl = src?.startsWith('http') ? src : `${BASE_URL}/${src}`;

  const fallbackImages = [TaskifyPro, trendccart, netflixClone, popshopzone];

  const randomFallback = getUniqueRandomFallback(fallbackImages);

  if (!src || error) {
    return (
      <img
        src={randomFallback}
        alt="fallback"
        className="w-full h-full object-cover"
      />
    );
    // return (
    //   <div className="text-center p-8">
    //     <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
    //       <svg
    //         className="w-8 h-8 text-blue-400"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={1.5}
    //           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    //         />
    //       </svg>
    //     </div>
    //     <p className="text-sm font-medium text-theme-muted">Project Preview</p>
    //   </div>
    // );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      onError={(e) => {
        e.target.src = randomFallback; // ✅ fallback
        setError(true);
      }}
      loading="lazy"
    />
  );
};

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
        <ProjectImage src={project.image} alt={project.title} />
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
