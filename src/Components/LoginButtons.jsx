const LoginButton = ({ disabled, onClick }) => (
	<button
		data-testid="login-btn"
		className="btn btn-primary my-2 mx-auto"
		disabled={disabled}
		onClick={onClick}>
		LOGIN
	</button>
);

export default LoginButton;
