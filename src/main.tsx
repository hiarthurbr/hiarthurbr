import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RPC from './RPC';
import Resume from './Resume';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/resumes",
//     element: <RPC />,
//   },
//   {
//     path: "/resume/:resume",
//     element: <Resume />,
//   }
// ]);

ReactDOM.createRoot(document.getElementsByTagName('main')[0]).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}/>
        <Route path="/resumes" Component={RPC}/>
        <Route path="/resume/:resume" Component={Resume}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
