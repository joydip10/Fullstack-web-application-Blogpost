import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from './Components/AuthProvider/AuthProvider';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Addblog from './Pages/Addblog';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Blog from "./Pages/Blog";


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route exact path="/home" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/registration" element={<Registration />}></Route>
          <Route exact path="/addblog" element={<PrivateRoute><Addblog /></PrivateRoute>}></Route>
          <Route exact path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
          <Route exact path="/blog/:id" element={<PrivateRoute><Blog /></PrivateRoute>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
