import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactNode} from 'react';
import { jwtDecode } from 'jwt-decode';

interface RoleProtectedProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleProtected = ({ allowedRoles, children }: RoleProtectedProps) => {

  const token = Cookies.get('token');

  let decode = null;
  if (token) {
      try {
          decode = jwtDecode(token);
      } catch (error) {
          console.error("Invalid token:", error);
      }
  }
  
  const role = decode ? decode.role : null;
  
  try {

    if (role && allowedRoles.includes(role)) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch {
    return <Navigate to="/" />;
  }

};

export default RoleProtected;