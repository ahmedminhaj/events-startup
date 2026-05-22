import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import About from './pages/AboutUs/About';
import Contact from './pages/Contact/Contact';
import EventDetails from './components/Events/EventDetails';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true,          element: <Home />    },
      { path: '/events',      element: <Events />  },
      { path: '/events/:id',  element: <EventDetails />  },
      { path: '/about',       element: <About />   },
      { path: '/contact',     element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
