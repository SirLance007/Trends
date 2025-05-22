import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { mergeCart, fetchCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [
    user,
    navigate,
    isCheckoutRedirect,
    dispatch,
    cart?.products.length,
    guestId,
  ]);

  useEffect(() => {
    if (user) {
      // Fetch user cart after login
      dispatch(fetchCart({ userId: user._id }));
    }
  }, [user, dispatch]);

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(err?.message || "Login failed", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Left: Login Form */}
      <div className="w-full flex md:w-1/2 flex-col justify-center items-center md:p-16 p-8 bg-white/90">
        <form
          onSubmit={handleSumbit}
          className="w-full p-10 rounded-2xl shadow-2xl max-w-md bg-white border border-gray-100"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-3xl font-extrabold text-rabbit-red tracking-tight drop-shadow-lg">
              Rabbit
            </h2>
          </div>
          <h2 className="text-4xl text-center font-bold mb-4 text-gray-900 tracking-tight">
            Welcome Back! 👋
          </h2>
          <p className="text-center mb-8 text-gray-500 text-base">
            Sign in to your account to continue
          </p>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="font-semibold mb-2 block text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rabbit-red transition-all text-base bg-gray-50"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="font-semibold mb-2 block text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rabbit-red transition-all text-base bg-gray-50"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-gradient-to-r from-rabbit-red to-pink-500 text-white p-3 rounded-lg font-bold text-lg shadow-lg hover:from-pink-600 hover:to-rabbit-red hover:scale-105 transition-all duration-200"
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className="mt-8 text-center text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-rabbit-red font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      {/* Right: Image */}
      <div className="hidden md:block w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            className="h-[750px] w-full object-cover rounded-l-3xl shadow-2xl"
            src={login}
            alt="Login to Account"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
