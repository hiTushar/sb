import { useRouteError, Link } from "react-router-dom";
import caution from "../assets/triangle-caution-yellow-sign-icon-free-vector.jpg"

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <img src={caution}/>
            The URL does not Exist!
            <br/>
            <br/>
            <Link to="/" className="link-tag">
                Return to Homepage?
            </Link>
        </div>
    )
}