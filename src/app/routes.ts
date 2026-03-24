import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { JobCreation } from './components/JobCreation';
import { Requisitions } from './components/Requisitions';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: JobCreation },
      { path: 'requisitions', Component: Requisitions },
    ],
  },
]);
