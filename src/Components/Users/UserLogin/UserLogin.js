import './UserLogin.css'
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"

function UserLogin({ setCurrUser, setShow }) {
  const formRef = useRef()
  const navigate = useNavigate()

  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/api/v1/login"
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok)
        throw data.error
      localStorage.setItem("token", response.headers.get("Authorization"))
      setCurrUser(data)
      navigate("/api/v1/users") // Redirect to Users page
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
      "user": { email: data.email, password: data.password }
    }
    login(userInfo, setCurrUser)
    e.target.reset()
  }

  const handleClick = e => {
    e.preventDefault()
    setShow(false)
  }

  return (
    <div>
      <h1>Log In</h1>
      <form className="login-form" ref={formRef} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name='email' placeholder="your@email.com" />
        <br />
        <label>Password:</label>
        <input type="password" name='password' placeholder="Is it ... password?" />
        <br />
        <input type='submit' value="Login" />
      </form>
      <br />
      <div>
        Not registered yet, <Link to="/api/v1/signup">Sign Up</Link>.
      </div>
    </div>
  )
}

export default UserLogin;
