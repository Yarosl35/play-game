import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children, ...rest }) => {
  const dataAuth = useSelector((data) => data.auth);
  const render = () => (dataAuth === null ? children : children);
  // dataAuth === null ? <Redirect to="/login" /> : children;
  return <Route {...rest} render={render} />;
};
