import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/Login";

const RouterComponent = ({ element }) => (
	<BrowserRouter>
		<Routes>
			<Route element={element} path={"/"} />
		</Routes>
	</BrowserRouter>
);

function typeElement(elem, value) {
	fireEvent.change(elem, { target: { value } });
	expect(elem).toHaveValue(value);
}



var LOCAL_STORAGE = {};

describe("jwt", () => {
	beforeEach(() => {
		LOCAL_STORAGE = {};
		Object.defineProperty(window, "localStorage", {
			value: {
				getItem: (key) => LOCAL_STORAGE[key],
				setItem: (key, val) => (LOCAL_STORAGE[key] = val),
				removeItem: (key) => delete LOCAL_STORAGE[key],
			},
			writable: true,
		});
	});

	test("/login initial rendering", () => {
		render(<RouterComponent element={<Login />} />);

		const errormsg = screen.queryByTestId("error-message");
		expect(errormsg).not.toBeInTheDocument();

		const robot = screen.queryByTestId("robot");
		expect(robot).not.toBeInTheDocument();

		const btn = screen.getByTestId("login-btn");
		expect(btn).toBeDisabled();
	});

	test("/login button must be disabled email only", () => {
		render(<RouterComponent element={<Login />} />);

		const email = screen.getByTestId("email");
		typeElement(email, "sth@sth.com");

		const btn = screen.getByTestId("login-btn");
		expect(btn).toBeDisabled();
	});
});