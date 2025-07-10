import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import '../App.css';


export default function HomePage() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>LibreFlash</h1>
			<Form
				onSubmitSuccess={(data) => {
				navigate("/deck", {
					state: {
					...data,
					link: data.link ?? "",
					notes: data.notes ?? ""
					}
				});
				}}
				onError={(msg) => alert(msg)}
			/>
		</div>
	);
}

