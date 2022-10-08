import Row from "./Row";
const LogoutButton = ({ onClick }) => (
	<Row>
		<button className="btn btn-danger mx-auto col-2" onClick={onClick}>
			Logout
		</button>
	</Row>
);

export default LogoutButton;
