import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../library/supabaseClient";


export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email to confirm signup");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6 text-center">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              placeholder="johndoe@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-stone-700 text-white py-2 rounded-xl hover:bg-stone-800 transition"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-stone-500 text-center mt-6">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-stone-700 font-medium hover:underline"
  >
    Login
  </Link>
</p>

      </div>
    </div>
  );
}
