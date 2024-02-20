import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { setLogin } from "../../services/userFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {

	const [name, setName] = useState('');
	const [channel, setChannel] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCase, setPasswordCase] = useState({
		item1: false,
		item2: false,
		item3: false,
		item4: false
	})
	const [photo, setPhoto] = useState('');
	const [showNext, setShowNext] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function nextPage(){
		const regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/;
		
		// Pelo menos uma letra minúscula ((?=.*[a-z])).
		// Pelo menos uma letra maiúscula ((?=.*[A-Z])).
		// Pelo menos um dígito ((?=.*\d)).
		// Pelo menos um caractere especial entre @$!%*?& (?=.*[@$!%*?&_\-]).
		// Um comprimento mínimo de 8 caracteres ({8,}).
		
		if(name === "" || email === "" || password === ""){
			errorToast("Please complete all the fields!");
		}else if(!(regexEmail.test(email))){
			errorToast("Please insert a valid E-mail!");
		}else if(!(regexPass.test(password))){
			errorToast("Please insert a strong password!");
		}else{
			setShowNext(true);
		}
	}

	const checkPassword = (e) =>{
		const lowerRegex = /.*[a-z].*/;
		const upperRegex = /.*[A-Z].*/;
		const specialRegex = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/;
		const eightRegex = /^.{8,}$/;
		const updatePassCase = passwordCase;
		if(lowerRegex.test(e)){
			updatePassCase.item1 = true;
		}else{
			updatePassCase.item1 = false;
		}
		if(upperRegex.test(e)){
			updatePassCase.item2 = true;
		}else{
			updatePassCase.item2 = false;
		}
		if(specialRegex.test(e)){
			updatePassCase.item3 = true;
		}else{
			updatePassCase.item3 = false;
		}
		if(eightRegex.test(e)){
			updatePassCase.item4 = true;
		}else{
			updatePassCase.item4 = false;
		}

		setPasswordCase(updatePassCase);
	}

	function returnPage(){
		setShowNext(false);
	}

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

	const errorToast = (message) =>{
		toast.error(message,{
			autoClose: 2000
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
			{showNext ? (
				<div className="card_reg">
					<div className="reg_corner">
					<button className="reg_back" onClick={returnPage}>
						←
					</button>
					</div>
					<input 
						className="reg_channel" 
						id="channel_r_input" 
						placeholder="Channel Name"
						onChange={(e)=>setChannel(e.target.value)}
					/>
					<div className="photo_space">
						<button
							className="photo_button"
							id="photo_button"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<img className="button_image" src="../icons/default_user.png"></img>
							<div className="image_placeholder">Click to change</div>
						</button>
					</div>
					<button
						className="btn_next"
						onClick={tryLogin}
						disabled={loading}
					>Register</button>
				</div>
			) : (
				<div className="card_reg">
					<div className="register_title">Motivision</div>
					<div className="user_div">
						<input 
							className="reg_input" 
							id="name_r_input"
							placeholder="Username"
							value={name}
							onChange={(e)=>setName(e.target.value)}
						/>
					</div>
					<div className="email_div">
						<input 
							type="text" 
							className="reg_input" 
							id="email_r_input"
							placeholder="E-Mail"
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
						/>
					</div>
					<div className="pass_div">
						<input 
							type="password" 
							className="reg_input" 
							id="pass_r_input" 
							placeholder="Password"
							value={password}
							onChange={(e)=>{
								setPassword(e.target.value);
								checkPassword(e.target.value);
							}}
						/>
						<div className="pass_rec">
						Your password needs at least:
						<ul className="all_itens">
							<li id={passwordCase.item1 ? "item1c": "item1"}>One lowercase letter</li>
							<li id={passwordCase.item2 ? "item2c": "item2"}>One uppercase letter</li>
							<li id={passwordCase.item3 ? "item3c": "item3"}>One special character</li>
							<li id={passwordCase.item4 ? "item4c": "item4"}>Minimum length of 8 characters</li>
						</ul>
					</div>
					</div>
					<button
						className="btn_next"
						onClick={nextPage}
					>Next</button>
				</div>
			)}
			</div>
			<ToastContainer/>
		</div>
	);
}

export default Register;
