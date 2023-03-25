import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
return (
  <div className="not-found-page">
      <h1 className="not-found-heading">4 0 4</h1>
      <p className="not-found-text">Oops! The page you requested could not be found.</p>
      <Link to="/" className="not-found-link">Back to home</Link>
    </div>
);
};

export default NotFound;