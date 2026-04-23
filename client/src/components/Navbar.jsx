import { Link } from 'react-router-dom';
import {
  FiHome,
  FiBriefcase,
  FiMail,
  FiLock,
  FiUser,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const navLinks = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/projects', label: 'Projects', icon: FiBriefcase },
    { to: '/contact', label: 'Contact', icon: FiMail },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-nav backdrop-blur-xl border-b border-theme sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight"
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary px-2 sm:px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-xl text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isDark ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-1 sm:gap-2 ml-2 pl-2 sm:ml-3 sm:pl-3 border-l border-theme">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 px-2 sm:px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-blue-500/10"
                >
                  <FiUser className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 px-2 sm:px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-500/10"
                >
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl ml-1"
              >
                <FiLock className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
