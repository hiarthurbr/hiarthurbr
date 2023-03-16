import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RPC from './RPC';
import Resume from './Resume';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resumes",
    element: <RPC />,
  },
  {
    path: "/resume/:resume",
    element: <Resume />,
  }
]);

ReactDOM.createRoot(document.getElementsByTagName('main')[0]).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
