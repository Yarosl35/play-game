import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

export const PrivateRoute = ({ children, ...rest }) => {
  const dataAuth = useSelector((data) => data.auth);

  const render = () =>
    // dataAuth === null ? <Redirect to="/login" /> : children;
    dataAuth === null ? children : children;
  const history = useHistory();

  const currentPath = history.location.pathname.replace(/\//, '');
  const ignoreRedirectRegex = 'room-list|user';
  if (!(new Cookies()).get('roomID') && ignoreRedirectRegex.indexOf(currentPath) === -1) {
    setTimeout(function () {
      history.push(process.env.REACT_APP_REDIRECT_MAIN_PAGE);
    }, 2000);
  }

  return <Route {...rest} render={render} />;
};
