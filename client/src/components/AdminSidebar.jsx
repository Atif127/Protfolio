import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiPlus, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: FiGrid },
    { path: '/admin/projects/new', label: 'Add Project', icon: FiPlus },
  ];

  return (
    <aside className="w-72 bg-card/80 backdrop-blur-xl border-r border-card min-h-screen flex flex-col sticky top-0 hidden lg:flex">
      <div className="p-6 border-b border-theme">
        <Link
          to="/"
          className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors text-sm font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-theme">
        <div className="mb-3 px-4 py-2.5 bg-input rounded-xl">
          <p className="text-theme-muted text-xs uppercase tracking-wider mb-0.5">
            Logged in as
          </p>
          <p className="text-theme-primary font-medium text-sm truncate">
            {user?.email}
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium text-sm transition-all"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
