import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { setLogin } from "../../services/userFetch";

function Login() {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function setUserLogin(){
		setLoading(true);
		const req = await setLogin(name,password);
		const data = req.data;
		if(data.success === true){
			document.cookie = `accessToken=${data.accessToken}; path=/`;
			document.cookie = `refreshToken=${data.refreshToken}; path=/`;
			navigate("/main");
		}
	}

	async function tryLogin(){
		try{
			await setUserLogin();
		}catch(error){
			console.error(error);
		}finally{
			setLoading(false);
		}
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
						onClick={tryLogin}
						disabled={loading}
					>{loading ? "Logging in..." : "Login"}</button>
					<a className="register" href="https://www.w3schools.com">
						Don&#39;t have a Login? Click here to register
					</a>
				</div>
			</div>
		</div>
	);
}

export default Login;
