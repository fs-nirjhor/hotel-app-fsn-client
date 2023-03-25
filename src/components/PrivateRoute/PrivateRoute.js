import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
  const {children, isAllowed, redirectPath = "/login"} = props;
  const location = useLocation();
  if (!isAllowed) {
   return <Navigate replace to={redirectPath}  state={{ from: location }}/>  
  }
   return children ? children : <Outlet/> ;
};

export default PrivateRoute;