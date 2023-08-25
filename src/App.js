
import About from './components/About'; 
import NoteState from './context/NoteState';
import UsersState from './context/UsersState';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert,setAlert] =useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  return (
    <>
<UsersState>
    <NoteState>
      <Router>
        <NavBar showAlert={showAlert}/> 
        <Alert  alert={alert}/> 
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/about" element={<About showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
      </NoteState>
      </UsersState>
    </>
  );
}

export default App;
