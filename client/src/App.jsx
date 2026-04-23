import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const AddProject = lazy(() => import('./pages/AddProject.jsx'));

const PageLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-theme-gradient">
          <Suspense fallback={<Loader fullScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <Home />
                  </PageLayout>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageLayout>
                    <Projects />
                  </PageLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageLayout>
                    <Contact />
                  </PageLayout>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/new"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
