import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	function changePage() {
		axios.post("http://192.168.15.146:8080/user/postUserCredentials", {
			"name": name,
			"password": password
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((resp)=>{
			let retorno = resp.data;
			alert(retorno.message);
			if(retorno.success === true){
				document.cookie = `authToken=${retorno.token}; path=/`;
				navigate('main');
			}
		})
		.catch((err)=>{
			console.error("ERRO:", err);
			alert("An error occurred, please try again later.")
		})
	}
	return (
		<div className="loginpage">
			<div className="center">
				<div className="card">
					<div className="login_title">Motivision</div>
					<div className="input_title">Username</div>
					<div className="user_div">
						<input 
						className="log_input" 
						id="user_input" 
						onChange={(e)=>setName(e.target.value)}
					/>
					</div>
					<div className="input_title">Password</div>
					<div className="pass_div">
						<input 
							type="password" 
							className="log_input" 
							id="pass_input" 
							onChange={(e)=>setPassword(e.target.value)}
						/>
					</div>
					<button
						className="btn_login"
						onClick={changePage}
					>Login</button>
					<a className="register" href="https://www.w3schools.com">
						Don&#39;t have a Login? Click here to register
					</a>
				</div>
			</div>
		</div>
	);
}

export default Login;
