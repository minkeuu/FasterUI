import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f8ff] px-6 py-12">
      <img
        className="pointer-events-none absolute left-1/2 top-0 z-0 w-[min(1168px,100%)] -translate-x-1/2"
        alt=""
        src="/mask-group.png"
      />
      <div className="relative z-10 w-full max-w-[460px]">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#8987a1] transition-colors hover:text-[#252432]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="rounded-[20px] border border-[#e3e9f7] bg-white p-8 shadow-sm sm:p-10">
          <h1 className="[font-family:'Raleway',Helvetica] text-3xl font-bold leading-tight text-[#252432]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 [font-family:'Inter',Helvetica] text-sm leading-6 text-[#8987a1]">
              {subtitle}
            </p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
