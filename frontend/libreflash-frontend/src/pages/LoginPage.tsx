// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		try {
		const res = await fetch("http://localhost:8000/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}

		const { token } = await res.json();
		localStorage.setItem("token", token);
		navigate("/"); // redirect to home
		} catch (err: any) {
		setError(err.message);
		}
	}

	return (
	<div>
		<main className="form-main">
		<form onSubmit={handleLogin} className="form-box">
			<h2 style={{ marginBottom: "1rem" }}>Login</h2>

			<div className="form-group">
			<label>Username</label>
			<input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				placeholder="Enter username"
			/>
			</div>

			<div className="form-group">
			<label>Password</label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				placeholder="Enter password"
			/>
			</div>

			<button className="button" type="submit">Login</button>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<p style={{ marginTop: "1rem" }}>
			Don't have an account?{" "}
			<button type="button" onClick={() => navigate("/register")} className="button"> 
				Register
			</button>
			</p>
		</form>
		</main>
	</div>
	);
}
