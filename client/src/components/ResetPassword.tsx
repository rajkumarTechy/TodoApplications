import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../utils/API_URL";

interface ResetData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<ResetData>({ mode: "all" });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const checkUserRevoked = async (decode: any) => {
    const Id = decode.userId;
  
    try {
      const res = await axios.get(`${API_URL}/auth/isRevoked/${Id}`);

      if(res.data.isRevoked === true) {
        alert("Token Already Used");
        navigate("/");
      }

    } catch (err) {
      console.log(err);
    }
  } 

  useEffect(() => {
    const token = searchParams.get("token");

    if(token) {
      const decoded = jwtDecode(token);
      checkUserRevoked(decoded);
    }

    if (!token) {
      toast.error("Invalid Link");
      navigate("/");
      return;
    }

    const decoded: { exp?: number } = jwtDecode(token);

    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      toast.error("Link Expired");
      navigate("/");
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data: ResetData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    const token = searchParams.get("token");

    try {
      const res = await axios.patch(`${API_URL}/auth/newPassword`, {
        password: data.newPassword,
        token: token,
      },);

      if (res.status === 200 || 201) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                required
                {...register("newPassword")}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                {...register("confirmPassword")}
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
