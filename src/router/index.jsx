import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import PlaceholderPage from '../pages/PlaceholderPage';

// Module pages
import EnterpriseManagement from '../pages/modules/EnterpriseManagement';
import UserManagement from '../pages/modules/UserManagement';
import EmployeeProfile from '../pages/modules/EmployeeProfile';
import Attendance from '../pages/modules/Attendance';
import TaskPerformance from '../pages/modules/TaskPerformance';
import VacationRequest from '../pages/modules/VacationRequest';
import DocumentRequest from '../pages/modules/DocumentRequest';
import Payroll from '../pages/modules/Payroll';
import Recruitment from '../pages/modules/Recruitment';
import WorkflowBuilder from '../pages/modules/WorkflowBuilder';

/**
 * Application router.
 * All authenticated routes are wrapped in MainLayout.
 * New modules are added as children of the layout route.
 */
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Dashboard
      { index: true,              element: <Dashboard /> },

      // HR & People
      { path: 'enterprise',       element: <EnterpriseManagement /> },
      { path: 'users',            element: <UserManagement /> },
      { path: 'profile',          element: <EmployeeProfile /> },
      { path: 'attendance',       element: <Attendance /> },
      { path: 'recruitment',      element: <Recruitment /> },

      // Workflows
      { path: 'tasks',            element: <TaskPerformance /> },
      { path: 'vacation',         element: <VacationRequest /> },
      { path: 'documents',        element: <DocumentRequest /> },
      { path: 'payroll',          element: <Payroll /> },

      // Process Management (future)
      { path: 'processes',        element: <WorkflowBuilder /> },
      { path: 'instances',        element: <PlaceholderPage title="Active Instances" /> },
      { path: 'rules',            element: <PlaceholderPage title="Rules Engine" /> },

      // Intelligence (future)
      { path: 'analytics',        element: <PlaceholderPage title="Analytics" /> },
      { path: 'ai-assistant',     element: <PlaceholderPage title="AI Assistant" /> },
      { path: 'notifications',    element: <PlaceholderPage title="Notifications" /> },

      // System (future)
      { path: 'permissions',      element: <PlaceholderPage title="Permissions" /> },
      { path: 'settings',         element: <PlaceholderPage title="Settings" /> },

      // Catch-all
      { path: '*',                element: <PlaceholderPage title="Page Not Found" /> },
    ],
  },
]);

export default router;
