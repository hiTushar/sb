import { useRouteError, Link } from "react-router-dom";
import caution from "../assets/triangle-caution-yellow-sign-icon-free-vector.jpg"

export default function ErrorPage(props) {
    const error = useRouteError();
    if (error) console.error(error);

    return (
        <div className="error-page">
            <img src={caution}/>
            {props.errorMsg}
            <br/>
            <br/>
            <Link to="/" className="link-tag">
                Return to Homepage?
            </Link>
        </div>
    )
}