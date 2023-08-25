import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext';
import {Link, useNavigate} from "react-router-dom"
const Login = (props) => {
    const context = useContext(UserContext)
    const {login} = context

    const [user, setuser] = useState({email: '', password:''})
    
    const navigate = useNavigate();
    const handleSumbit= async (e)=>{
        e.preventDefault()
        let json =await login(user.email, user.password)
        if(json.status){
          //redirect and set token
          localStorage.setItem('token', json.data.token)
          props.showAlert(json.message,"success")
          navigate("/")
        }else{
          props.showAlert(json.message,"danger")
        }
        
    }
    const handleChange = (e)=>{
        setuser({...user, [e.target.name] : e.target.value})
    }
  return (
    <div className="mt-3 mx-auto" style={{ maxWidth: "400px" }}>
      <form className="mb-3" onSubmit={handleSumbit}>
          <div className="form-label">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name='email' onChange={handleChange}/>
          </div>
          <div className="form-label">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={handleChange}/>
          </div>
          <div className="form-label">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
          <p className='my-3'>New User? <Link to="/signup">Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login