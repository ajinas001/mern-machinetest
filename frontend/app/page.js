"use client";
import {  useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/common/Themtoggle";
import { login } from "./Util/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/dashboard");
        toast.success("Logged in successfully!");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 right-0 -mt-12">
          <ThemeToggle />
        </div>

        <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please sign in to access your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition duration-200 ease-in-out
                             placeholder-gray-400 dark:placeholder-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition duration-200 ease-in-out
                             placeholder-gray-400 dark:placeholder-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg
                       hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       dark:focus:ring-offset-gray-800
                       transform transition duration-200 ease-in-out
                       hover:scale-[1.02] active:scale-[0.98]
                       font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
}
