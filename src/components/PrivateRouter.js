import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const dataAuth = useSelector((data) => data.auth);
  const render = () =>
    dataAuth === null ? <Redirect to="/login" /> : children;
  return <Route {...rest} render={render} />;
};
