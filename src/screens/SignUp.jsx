import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
const isProduction = window.location.hostname !== 'localhost';

export const API_URL = isProduction 
  ? 'https://faster-ui-alpha.vercel.app'  
  : ''; 
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // TODO: replace with your own backend call
      try {
      const response = await fetch(`${API_URL}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }

    navigate('/profile');
  }

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Create your account to get started."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-3">
          <label
            className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
            htmlFor="email"
          >
            email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="h-[70px] rounded-[10px] border-[#d6ddec] bg-transparent px-8 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
          />
        </div>
        <div className="space-y-3">
          <label
            className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
            htmlFor="password"
          >
            password
          </label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="h-[70px] rounded-[10px] border-[#d6ddec] bg-transparent px-8 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
          />
        </div>
        <div className="space-y-3">
          <label
            className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
            htmlFor="confirm"
          >
            confirm password
          </label>
          <Input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
            className="h-[70px] rounded-[10px] border-[#d6ddec] bg-transparent px-8 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
          />
        </div>

        {error && (
          <p className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-[60px] w-full rounded-[10px] bg-[#4d47ff] [font-family:'Raleway',Helvetica] text-base font-bold text-white hover:bg-[#3f39e6] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-6 text-center [font-family:'Inter',Helvetica] text-sm text-[#8987a1]">
        Already have an account?{" "}
        <Link to="/signin" className="font-bold text-[#4d47ff] hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
