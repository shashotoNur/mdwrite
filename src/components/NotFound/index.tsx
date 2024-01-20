import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate("/mdwrite/");
    };

    return (
        <div className="error-boundary">
            <h2>Error 404: Not Found</h2>
            <p>Sorry for the inconvenience!</p>
            <p>Looks like what you were looking for does not exist!</p>
            <p onClick={goBackHome}>
                Go back to the <b>Home page</b>
            </p>
        </div>
    );
};
export default NotFound;
