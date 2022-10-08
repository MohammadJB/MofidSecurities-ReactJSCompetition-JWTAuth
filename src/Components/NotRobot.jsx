const NotRobot = ({ checked, onChange }) => (
	<div className="my-3">
		<span>🤖🚫</span>
		<input
			data-testid="robot"
			id="robot"
			type="checkbox"
			checked={checked}
			onChange={onChange}
			className="form-check-input"
		/>
	</div>
);

export default NotRobot;
