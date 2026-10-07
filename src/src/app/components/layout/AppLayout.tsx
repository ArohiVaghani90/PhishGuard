import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link, Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Mail, TrendingUp, Users,
  Settings, LogOut, Shield, ChevronLeft, ChevronRight,
  Bell, Menu, X, BarChart2, MonitorPlay, Layers
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { label: 'Training', icon: <BookOpen size={20} />, path: '/training' },
  { label: 'Simulations', icon: <Mail size={20} />, path: '/simulation' },
  { label: 'My Progress', icon: <TrendingUp size={20} />, path: '/progress' },
];

const adminNavItems: NavItem[] = [
  { label: 'Admin Overview', icon: <Layers size={20} />, path: '/admin', adminOnly: true },
  { label: 'User Management', icon: <Users size={20} />, path: '/admin/users', adminOnly: true },
  { label: 'Module Management', icon: <Settings size={20} />, path: '/admin/modules', adminOnly: true },
  { label: 'Simulations', icon: <MonitorPlay size={20} />, path: '/admin/simulations', adminOnly: true },
  { label: 'Reports', icon: <BarChart2 size={20} />, path: '/admin/reports', adminOnly: true },
];

export function AppLayout() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const getPageTitle = (pathname: string): string => {
    const map: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/training': 'Training Modules',
      '/simulation': 'Phishing Simulations',
      '/progress': 'My Progress',
      '/admin': 'Admin Overview',
      '/admin/users': 'Admin › User Management',
      '/admin/modules': 'Admin › Module Management',
      '/admin/simulations': 'Admin › Simulation Management',
      '/admin/reports': 'Admin › Reports & Analytics',
    };
    return map[pathname] || 'PhishGuard';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
        <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-slate-900" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold tracking-wide text-lg">PHISHGUARD</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {/* User Section */}
        {!collapsed && (
          <p className="px-4 text-xs text-slate-500 uppercase tracking-widest mb-2">User</p>
        )}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-1 transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}

        {/* Admin Section */}
        {isAdmin && (
          <>
            {!collapsed && (
              <p className="px-4 text-xs text-slate-500 uppercase tracking-widest mb-2 mt-4">Admin</p>
            )}
            {collapsed && <div className="mx-4 my-2 border-t border-slate-700" />}
            {adminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-1 transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User Footer */}
      <div className="border-t border-slate-700 p-3">
        <div className={`flex items-center gap-3 mb-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {user?.firstName[0]}{user?.lastName[0]}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-slate-400 text-xs truncate">{user?.role === 'admin' ? 'Administrator' : 'User'}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-2 w-full px-2 py-2 mt-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-slate-800 border-r border-slate-700 transition-all duration-300 flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-slate-800 border-r border-slate-700 z-50 transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-800 border-b border-slate-700 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <h1 className="text-white text-base capitalize">
              {getPageTitle(location.pathname)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {user?.firstName[0]}{user?.lastName[0]}
                </span>
              </div>
              <span className="hidden md:block text-slate-300 text-sm">{user?.firstName}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}