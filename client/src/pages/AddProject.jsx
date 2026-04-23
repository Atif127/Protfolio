import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api.js';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { FiSave, FiX, FiTag } from 'react-icons/fi';

const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    liveLink: '',
    githubLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };
      await api.post('/projects', payload);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-input border border-input rounded-xl text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all text-sm';

  return (
    <div className="min-h-screen bg-theme-gradient flex">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h1 className="text-3xl font-black text-theme-primary mb-1">
                Add Project
              </h1>
              <p className="text-theme-secondary">
                Create a new portfolio project
              </p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-theme-muted hover:text-theme-primary bg-input hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-all text-sm"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-theme-secondary font-semibold mb-2 text-sm">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="E-commerce Platform"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-2 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your project..."
                className={inputClass + ' resize-y'}
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-2 text-sm flex items-center gap-2">
                <FiTag className="w-4 h-4" />
                Technologies{' '}
                <span className="text-theme-muted font-normal">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                placeholder="React, Node.js, MongoDB"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-secondary font-semibold mb-2 text-sm">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-theme-secondary font-semibold mb-2 text-sm">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-2 text-sm">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://image-url.com/image.jpg"
                className={inputClass}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProject;
