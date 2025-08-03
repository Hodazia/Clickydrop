import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface PrivaterouteProps  {
    children:React.ReactNode,
    isAuthenticated:boolean,
  }
  
export const PrivateRoute = ({ children, isAuthenticated }:PrivaterouteProps) => {
    // If the user is authenticated, render the child component.
    if (isAuthenticated) {
        return children;
    }
    // If not authenticated, redirect them to the sign-in page.
    return <Navigate to="/signin" />;
  };