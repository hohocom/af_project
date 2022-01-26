import { Navigate } from "react-router-dom";

function withPublic(Component) {
  return ({ user = null, restricted = false, redirectURL = "/" }) => {
    return user && restricted ? <Navigate to={redirectURL} /> : <Component />;
  };
}

export default withPublic;
