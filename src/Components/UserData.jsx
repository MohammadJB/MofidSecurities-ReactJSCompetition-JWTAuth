const UserData = ({ label, children }) => (
	<div className="col-5 mx-auto">
		<p>
			<strong>{label}:</strong> {children ?? ""}
		</p>
	</div>
);

export default UserData;