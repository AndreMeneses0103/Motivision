import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { setLogin } from "../../services/userFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [photo, setPhoto] = useState('');
	const [showNext, setShowNext] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function setUserLogin(){
		setLoading(true);
		const req = await setLogin(name,password);
		const data = req.data;
		if(data.success === true){
			successToast();
			document.cookie = `accessToken=${data.accessToken}; path=/`;
			document.cookie = `refreshToken=${data.refreshToken}; path=/`;
			setTimeout(()=>{
				navigate("/main");
			}, 2000);
		}else{
			console.log("ERRO");
			errorToast();
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

	const errorToast = () =>{
		toast.error("Invalid username or password. Please try again.",{
			autoClose: 5000
		});
	}

	const successToast = () =>{
		toast.success("Login successful. Welcome back!",{
			autoClose: 1500
		});
	}
	
	//
	return (
		<div className="registerpage">
			<div className="center">
				<div className="card">
					<div className="login_title">Motivision</div>
					<div className="input_title">Username</div>
					<div className="user_div">
						<input 
						className="reg_input" 
						id="name_r_input" 
						onChange={(e)=>setName(e.target.value)}
					/>
					</div>
					<div className="input_title">E-Mail</div>
					<div className="email_div">
						<input 
							type="text" 
							className="reg_input" 
							id="email_r_input" 
							onChange={(e)=>setPassword(e.target.value)}
						/>
					</div>
					<div className="input_title">Password</div>
					<div className="pass_div">
						<input 
							type="password" 
							className="reg_input" 
							id="pass_r_input" 
							onChange={(e)=>setPassword(e.target.value)}
						/>
					</div>
					<button
						className="btn_login"
						onClick={tryLogin}
						disabled={loading}
					>Next</button>
					<ToastContainer/>
				</div>
			</div>
		</div>
	);
}

export default Register;
