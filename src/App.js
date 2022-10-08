import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Profile />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
