import "../Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

	const navigate = useNavigate();

	function changePage() {
		navigate('video');
	}
	return (
		<div className="loginpage">
			<div className="center">
				<div className="card">
					<div className="login_title">Motivision</div>
					<div className="input_title">Username</div>
					<div className="user_div">
						<input className="log_input" id="user_input" />
					</div>
					<div className="input_title">Password</div>
					<div className="pass_div">
						<input className="log_input" id="pass_input" />
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
