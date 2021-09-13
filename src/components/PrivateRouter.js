import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const dataAuth = useSelector((data) => data.auth);
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const render = () =>
    // dataAuth === null ? <Redirect to="/login" /> : children;
    dataAuth === null ? children : children;
  const history = useHistory();

  useEffect(() => {
    if (!roomSelect || (!roomSelect.roomID && roomSelect.roomID !== 0)) {
      history.push(process.env.REACT_APP_REDIRECT_MAIN_PAGE);
    }
  }, [roomSelect, history]);
  return <Route {...rest} render={render} />;
};
