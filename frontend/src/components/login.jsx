import React from "react";
import { useState } from "react";
import { LoginApi } from "../services/app/login";
import { getUsers } from "../services/app/usersGestor";
import { useNavigate } from 'react-router-dom';
import '../assets/login.css'

export function LoginForm() {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

    function handleClick(event) {
        event.preventDefault()
        LoginApi({email, password})
    }


    return (
        <>
       
        <div className="container">
	<div className="screen">
		<div className="screen__content">
        <form  onSubmit={handleClick}>
				<div className="login__field">
                <span className="login__field_span">Username</span>
	                <input type="email" name="username" id="username" placeholder="prueba@vidalibarraquer.net"  onChange={(e) => setEmail(e.target.value)}/><br />
				</div>
				
				<div className="login__field">
                <span className="login__field_span">Password</span>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} /><br />
				</div>
				
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>	
							
			</form>
			<div className="social-login">
				<h3>log in via</h3>
				{/* <div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div> */}
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>

        </>
    )
	
}
