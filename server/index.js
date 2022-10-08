require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN, PORT, REFRESH_TOKEN } = process.env;

var REFRESH_TOKENS = [];

const app = express();
app.use(cors());
app.use(express.json());

const USERS = [
	{
		email: "user@test.com",
		password: "123456",
		name: "Mofid",
		lastname: "Quera",
		phone: "+98 21 1111 1111",
		address: "Iran, Tehran",
	},
];

app.post("/api/login", (req, res) => {
	const user = getUser(req.body);

	if (!user) {
		return res.status(401).json({ message: "not a valid user" });
	}

	return res.send(generateToken(user.email));
});

app.post("/api/token", (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res.status(401).json({ message: "not valid token" });
	}

	if (!REFRESH_TOKENS.includes(token)) {
		return res.status(403).json({ message: "not valid token" });
	}

	jwt.verify(token, REFRESH_TOKEN, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "not valid token" });
		}
		res.send(generateToken(user.email));
	});
});

app.post("/api/user", validateToken, (req, res) => {
	res.send({
		user: USERS.filter((user) => user.email === req.email)[0],
	});
});

app.delete("/api/logout", (req, res) => {
	const { token } = req.body;
	REFRESH_TOKENS = REFRESH_TOKENS.filter((t) => t !== token);
	return res.status(204).json({ message: "logout successful" });
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	}
	console.clear();
	console.log(`LISTENING ON 127.0.0.1:${PORT}`);
	console.log("HAPPY HACKING ;)");
});

function getUser({ email, password }) {
	const user = USERS.filter(
		(user) => user.email === email && user.password === password
	);

	return user.length === 0 ? false : user[0];
}

function validateToken(req, res, next) {
	const token = req.headers["jwt"];
	if (!token) {
		return res.status(401).json({ message: "not valid token" });
	}
	jwt.verify(token, ACCESS_TOKEN, (err, email) => {
		if (err) {
			return res.status(403).json({ message: "not valid token" });
		}
		req.email = email.email;
		next();
	});
}

function generateToken(email) {
	const access = jwt.sign({ email }, ACCESS_TOKEN, {
		expiresIn: "5s",
	});
	const refresh = jwt.sign({ email }, REFRESH_TOKEN);

	REFRESH_TOKENS.push(refresh);

	return { access, refresh };
}
