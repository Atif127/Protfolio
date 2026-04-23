import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api.js';
import AdminSidebar from '../components/AdminSidebar.jsx';
import Loader from '../components/Loader.jsx';
import {
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiFolder,
  FiPlus,
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data || data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?'))
      return;
    setDeleteLoading(id);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert('Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gradient flex">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h1 className="text-3xl font-black text-theme-primary mb-1">
                Dashboard
              </h1>
              <p className="text-theme-secondary">
                Manage your portfolio projects
              </p>
            </div>
            <Link
              to="/admin/projects/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              <FiPlus />
              New Project
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-card backdrop-blur-sm border border-card rounded-2xl p-6 shadow-theme">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <FiFolder className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-theme-muted text-xs uppercase tracking-wider">
                    Total Projects
                  </p>
                  <p className="text-2xl font-black text-theme-primary">
                    {projects.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card backdrop-blur-sm border border-card rounded-2xl p-6 shadow-theme">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                  <FiCalendar className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-theme-muted text-xs uppercase tracking-wider">
                    Last Updated
                  </p>
                  <p className="text-lg font-bold text-theme-primary">
                    {projects[0]
                      ? new Date(projects[0].updatedAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          {loading ? (
            <Loader />
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-card shadow-theme">
              <FiFolder className="w-12 h-12 text-theme-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-theme-primary mb-2">
                No projects yet
              </h3>
              <p className="text-theme-secondary mb-6">
                Start by adding your first project
              </p>
              <Link
                to="/admin/projects/new"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                Add Project
              </Link>
            </div>
          ) : (
            <div className="bg-card backdrop-blur-sm border border-card rounded-2xl shadow-theme overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-theme">
                      <th className="text-left text-theme-muted font-semibold text-xs uppercase tracking-wider px-5 py-4">
                        Project
                      </th>
                      <th className="text-left text-theme-muted font-semibold text-xs uppercase tracking-wider px-5 py-4">
                        Technologies
                      </th>
                      <th className="text-left text-theme-muted font-semibold text-xs uppercase tracking-wider px-5 py-4">
                        Links
                      </th>
                      <th className="text-right text-theme-muted font-semibold text-xs uppercase tracking-wider px-5 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme">
                    {projects.map((project) => (
                      <tr
                        key={project._id}
                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold text-theme-primary">
                            {project.title}
                          </p>
                          <p className="text-theme-muted text-xs line-clamp-1 mt-0.5">
                            {project.description}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies
                              ?.slice(0, 3)
                              .map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-medium border border-blue-500/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies?.length > 3 && (
                              <span className="px-2 py-0.5 bg-input text-theme-muted rounded-lg text-xs font-medium">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-3">
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-theme-muted hover:text-blue-500 transition-colors"
                              >
                                <FiExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-theme-muted hover:text-theme-primary transition-colors"
                              >
                                <FiGithub className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleDelete(project._id)}
                            disabled={deleteLoading === project._id}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2.5 rounded-lg transition-all disabled:opacity-50"
                          >
                            {deleteLoading === project._id ? (
                              <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              <FiTrash2 className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
