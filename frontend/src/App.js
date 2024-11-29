import logo from './logo.svg';
import './App.css';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import RoleBasedTable from './components/Tabel';
import Login from './components/Login';
import SignUp from './components/Signup';
import TodoList from './components/Tabel';
function App() {
  return (
    <Router>
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/Table' element={<TodoList />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
