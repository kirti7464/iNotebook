import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext';
import {Link, useNavigate} from "react-router-dom"

const Signup = (props) => {
  const context = useContext(UserContext)
    const {signup} = context
    const navigate = useNavigate();
    const [user, setuser] = useState({name:'',email: '', password:''})
  const handleSumbit= async (e)=>{
    e.preventDefault()
    const json = await signup(user.name,user.email, user.password)
    if(json.status){
      //redirect and set token
      localStorage.setItem('token', json.data.token)
      props.showAlert(json.message,"success")
      navigate("/")
    }else{
      props.showAlert(json.message,"danger")
    }
}
const onChange = (e)=>{
    setuser({...user, [e.target.name] : e.target.value})
}
  return (
    <div className="mt-3 mx-auto " style={{ maxWidth: "400px" }}>
      <form className="mb-3" onSubmit={handleSumbit}>
        <div className="form-group" >
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" onChange={onChange} name="name" id="name" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" onChange={onChange} name="password" id="password" placeholder="Password"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
        <p className='my-3'>Already Registerd? <Link to="/login">Login</Link></p>
    </form>
    </div>
  )
}

export default Signup