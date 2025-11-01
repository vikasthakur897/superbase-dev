import { useState, type FormEvent, type ChangeEvent } from "react";
import { supabaseClient } from "../superbase-client";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        const { error } = await supabaseClient.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("✅ Account created! Please check your email to verify.");
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("✅ Login successful!");
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-center mb-6">
          {isSignUp ? "Sign up to get started" : "Sign in to continue"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 text-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 text-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {message && (
            <p
              className={`text-sm text-center ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : message.startsWith("❌")
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-all"
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white font-semibold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};
