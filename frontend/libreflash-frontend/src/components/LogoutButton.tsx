import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<button
		onClick={handleLogout}
		style={{
			padding: "0.5rem 1rem",
			background: "#f44336",
			color: "white",
			border: "none",
			borderRadius: "4px",
		}}
		>
		Logout
		</button>
	);
}