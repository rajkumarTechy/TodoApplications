import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { API_URL } from "../utils/API_URL";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const signOut = async () => {
    try {
        const res = await axios.post(
            `${API_URL}/auth/logout`, 
            {}, 
            { withCredentials: true } 
        );

        if (res.status === 200) {
            setIsLoggedIn("false");
            navigate('/');
        }
    } catch (err) {
        console.error(err);
    }
};


  return (
    <>
      <div className="w-full h-20 shadow-md items-center">
        <div className="flex justify-between mx-4 items-center h-20">
          <div className="image-cont">
            <h1>Logo Here</h1>
          </div>
          <div>
            <button
              onClick={
                isLoggedIn === "true" ? signOut : () => navigate("/")
              }
              className="py-1 px-4 bg-blue-600 cursor-pointer text-white rounded-sm"
            >
              {isLoggedIn === "true" ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
