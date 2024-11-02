import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Assuming you have this component
import About from './components/About'; // Create this component as needed
import Contact from './components/Contact'; // Create this component as needed
import LoginPage from './components/login';
import SignupPage from './components/signup';
import MyProjects from './components/myProjects';
import SubmitProjectForm from './components/submitProject';
import PostDetail from './components/postDetail';

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/myProjects" element={<MyProjects/>} />
          <Route path="/submitProject" element={<SubmitProjectForm/>} />
          <Route path="/post/:postId" element={<PostDetail/>} />
        </Routes>
      
    </Router>
  );
}

export default App;