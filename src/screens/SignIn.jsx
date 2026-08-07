import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
const isProduction = window.location.hostname !== 'localhost';

  export const API_URL = isProduction 
    ? 'https://faster-ui-alpha.vercel.app'  
    : ''; 
export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // TODO: replace with your own backend call
    await new Promise((r) => setTimeout(r, 500));

    setLoading(false);
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });


    const data = await response.json();


    if (!response.ok) {
        setError(data.message);
        return;
    }


    localStorage.setItem(
        "token",
        data.token
    );


    navigate("/profile");
  }

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back. Sign in to manage your account."
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
            placeholder="••••••••"
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
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center [font-family:'Inter',Helvetica] text-sm text-[#8987a1]">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-bold text-[#4d47ff] hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
