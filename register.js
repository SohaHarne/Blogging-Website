import React from "react";
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import "./register.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit= async(e)=>{ 
    e.preventDefault();
     try {
      console.log({
  name,
  email,
  password
});
      // Send data to your Node.js backend
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (
    response.ok ||
    data.message === "User already exists"
) {
    alert(data.message);
    navigate('/dashboard');
} else {
    alert(data.message || "Registration failed");
}
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Could not connect to the server.");
    }
  };
    
  
  return (
    <div className="form-container">
      <h1>Register Account</h1>
      <form onSubmit={handleSubmit}></form>
       
      <input type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
          required
      placeholder="Full Name" />
      <br /><br /> 
       

      <input type="email" value={email}
      onChange={(e)=> setEmail(e.target.value)}
      placeholder="Email" />
      <br /><br />

      <input type="password" 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Password" />
      <br /><br />

      <button onClick = {handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default Register;