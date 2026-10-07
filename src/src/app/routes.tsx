import { createBrowserRouter } from 'react-router';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { AppLayout } from './components/layout/AppLayout';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { TrainingPage } from './components/training/TrainingPage';
import { SimulationPage } from './components/simulation/SimulationPage';
import { ProgressPage } from './components/progress/ProgressPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserManagement } from './components/admin/UserManagement';
import { ModuleManagement } from './components/admin/ModuleManagement';
import { ReportsPage } from './components/admin/ReportsPage';
import { SimulationManagement } from './components/admin/SimulationManagement';

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignUpPage },
  {
    Component: AppLayout,
    children: [
      { path: '/dashboard', Component: UserDashboard },
      { path: '/training', Component: TrainingPage },
      { path: '/simulation', Component: SimulationPage },
      { path: '/progress', Component: ProgressPage },
      { path: '/admin', Component: AdminDashboard },
      { path: '/admin/users', Component: UserManagement },
      { path: '/admin/modules', Component: ModuleManagement },
      { path: '/admin/reports', Component: ReportsPage },
      { path: '/admin/simulations', Component: SimulationManagement },
    ],
  },
]);
