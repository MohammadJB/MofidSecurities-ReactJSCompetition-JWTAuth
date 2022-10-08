const Input = ({ onChange, label, type, value, placeholder, ...other }) => {
	return (
		<div className="form-group row my-3">
			<label className="col-sm-4 col-form-label">{label}</label>
			<div className="col-sm-8">
				<input
					type={type}
					onChange={onChange}
					value={value}
					className="form-control"
					placeholder={placeholder}
					{...other}
				/>
			</div>
		</div>
	);
};

export default Input;
