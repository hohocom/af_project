import { Navigate } from "react-router-dom";

function withPrivate(Component) {
  return ({ user = null, redirectURL = "/" }) => {
    return user ? <Component /> : <Navigate to={redirectURL} />;
  };
}

export default withPrivate;
