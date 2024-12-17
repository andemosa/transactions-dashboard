import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EyeOff, Eye } from "../components/Icons";

import { loginUser } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, loading } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    setFormData({
      ...formData,
      loading: true,
    });
    try {
      await loginUser(email, password);
      toast.update(id, {
        render: "Login successful",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.update(id, {
        render: error.message ?? "An error occurred. Please try again",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };

  return (
    <div className="p-8 flex-1 h-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
          Sign in
        </h1>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="bg-custom-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-custom-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="bg-custom-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-custom-500 pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-custom-600 text-white font-semibold rounded-md hover:bg-custom-600 focus:outline-none focus:ring-2 focus:ring-custom-400 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="space-y-2 text-center mt-6">
          <h3 className="font-semibold text-lg">Test User</h3>
          <p>Email: test@abc.com</p>
          <p>Password: Pass1234</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
