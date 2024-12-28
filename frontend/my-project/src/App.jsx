import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Signup from "./components/signup";
import Signin  from "./components/signin";

const App = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/todo-lists" element={<div>Todo Lists Page</div>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<div>Profile Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
    </Routes>
  </Router>
);

export default App;
