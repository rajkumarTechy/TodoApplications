import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface RoleProtectedProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleProtected = ({ allowedRoles, children }: RoleProtectedProps) => {
  const token = Cookies.get('token');

  if (!token) {
    console.warn("No token found. Redirecting...");
    return <Navigate to="/" />;
  }

  let role: string | null = null;

  try {
    const decodedToken: any = jwtDecode(token);
    role = decodedToken?.role ?? null;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }

  if (!role || !allowedRoles.includes(role)) {
    console.warn(`Access denied for role: ${role}. Redirecting...`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtected;



// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { ReactNode} from 'react';
// import { jwtDecode } from 'jwt-decode';

// interface RoleProtectedProps {
//   allowedRoles: string[];
//   children: ReactNode;
// }

// const RoleProtected = ({ allowedRoles, children }: RoleProtectedProps) => {

//   const token = Cookies.get('token');

//   let decode = null;
//   if (token) {
//       try {
//           decode = jwtDecode(token);
//       } catch (error) {
//           console.error("Invalid token:", error);
//       }
//   }
  
//   const role = decode ? decode.role : null;
  
//   try {

//     if (role && allowedRoles.includes(role)) {
//       return children;
//     } else {
//       return <Navigate to="/unauthorized" />;
//     }
//   } catch {
//     return <Navigate to="/" />;
//   }

// };

// export default RoleProtected;