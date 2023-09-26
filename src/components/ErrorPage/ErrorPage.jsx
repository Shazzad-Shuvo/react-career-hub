import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <h2>Oops...!!!</h2>
            <Link to='/'><button className="border-fuchsia-700 border-2 rounded-lg p-3">Go back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;