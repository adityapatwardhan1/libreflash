import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleRegister(e: React.FormEvent) {
		e.preventDefault();
		try {
			const res = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(text);
			}

			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (err: any) {
			setError(err.message);
		}
	}

	return (
		<div>
			<main className="form-main">
				<form onSubmit={handleRegister} className="form-box">
					<h2 style={{ marginBottom: "1rem" }}>Register</h2>

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

					<button className="button" type="submit">Register</button>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<p style={{ marginTop: "1rem" }}>
						Already have an account?{" "}
						<button type="button" onClick={() => navigate("/login")} className="button">
							Login
						</button>
					</p>
				</form>
			</main>
		</div>
	);
}
