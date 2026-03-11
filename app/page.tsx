"use client";

import { useState } from "react";
import Image from "next/image";

// Tipos para los pasos del flujo
type LoginStep = "identifier" | "password" | "forgot-email" | "recovery-code";

export default function GoogleLogin() {
  const [step, setStep] = useState<LoginStep>("identifier");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulación de carga para darle realismo
  const handleNext = (e: React.FormEvent, nextStep: LoginStep) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white sm:bg-[#f0f2f5] font-sans selection:bg-blue-100">
      <main className="w-full max-w-[450px] overflow-hidden rounded-lg border-none bg-white p-6 sm:border sm:border-gray-300 sm:px-10 sm:py-12">
        
        {/* Google Logo */}
        <div className="flex justify-center pb-3">
          <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="block">
            <path d="M7.06 11v2.52h5.66c-.15 1.05-1.12 3.06-5.66 3.06-3.91 0-7.1-3.23-7.1-7.22s3.19-7.22 7.1-7.22c2.22 0 3.7.93 4.55 1.76l2-1.93C12.3 1.03 10 0 7.06 0 3.15 0 0 3.13 0 7s3.15 7 7.06 7c4.07 0 6.78-2.86 6.78-6.9 0-.46-.05-.81-.11-1.1H7.06z" fill="#4285F4"/>
            <path d="M23.08 4.86c-3.11 0-5.61 2.31-5.61 5.3s2.5 5.3 5.61 5.3c3.11 0 5.61-2.31 5.61-5.3s-2.5-5.3-5.61-5.3zm0 8.44c-1.74 0-3.18-1.42-3.18-3.14s1.44-3.14 3.18-3.14 3.18 1.42 3.18 3.14-1.44 3.14-3.18 3.14z" fill="#EA4335"/>
            <path d="M35.42 4.86c-3.11 0-5.61 2.31-5.61 5.3s2.5 5.3 5.61 5.3c3.11 0 5.61-2.31 5.61-5.3s-2.5-5.3-5.61-5.3zm0 8.44c-1.74 0-3.18-1.42-3.18-3.14s1.44-3.14 3.18-3.14 3.18 1.42 3.18 3.14-1.44 3.14-3.18 3.14z" fill="#FBBC05"/>
            <path d="M47.2 4.86c-3.04 0-5.46 2.34-5.46 5.3 0 4.1 3.5 5.3 5.46 5.3 1.25 0 2.22-.32 2.8-.75V14.1c-.5.23-1.14.33-1.84.33-1.63 0-2.91-.81-3.32-2.3h7.61c.05-.23.08-.51.08-.81 0-3.03-2.34-5.33-5.33-5.33zm-2.97 4.22c.31-1.44 1.5-2.39 2.94-2.39 1.46 0 2.53.95 2.82 2.39h-5.76z" fill="#4285F4"/>
            <path d="M56.4 0h2.43v15h-2.43z" fill="#34A853"/>
            <path d="M67.36 4.86c-2.4 0-4.01 1.07-4.89 2.19V5.12h-2.33V19h2.43v-4.52c.81 1.04 2.43 2.1 4.79 2.1 2.65 0 4.96-2.15 4.96-5.3s-2.31-5.3-4.96-5.3zm-.2 8.44c-1.74 0-3.18-1.42-3.18-3.14s1.44-3.14 3.18-3.14 3.18 1.42 3.18 3.14-1.44 3.14-3.18 3.14z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Dynamic Content based on Step */}
        <div className="mt-2 text-center">
          {step === "identifier" && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-2xl font-normal text-gray-900">Sign in</h1>
              <p className="mt-2 text-base text-gray-700">Use your Google Account</p>
              
              <form onSubmit={(e) => handleNext(e, "password")} className="mt-8 text-left">
                <div className="relative mb-2">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full rounded border border-gray-300 px-3 py-4 text-base focus:border-2 focus:border-blue-600 focus:outline-none"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-4 origin-[0] -translate-y-7 scale-75 transform bg-white px-1 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-600">
                    Email or phone
                  </label>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setStep("forgot-email")}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot email?
                </button>

                <p className="mt-10 text-sm text-gray-600">
                  Not your computer? Use Guest mode to sign in privately.{" "}
                  <a href="#" className="font-semibold text-blue-600">Learn more</a>
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <button type="button" className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-2 py-2 rounded">
                    Create account
                  </button>
                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-70"
                  >
                    {isLoading ? "Loading..." : "Next"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "password" && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Welcome</h1>
              <div 
                onClick={() => setStep("identifier")}
                className="mx-auto mt-2 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-3 py-1 hover:bg-gray-50"
              >
                <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-gray-600">👤</span>
                </div>
                <span className="text-sm text-gray-700">{email || "user@example.com"}</span>
                <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <form onSubmit={(e) => handleNext(e, "recovery-code")} className="mt-10 text-left">
                <div className="relative mb-2">
                  <input
                    type="password"
                    required
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer block w-full rounded border border-gray-300 px-3 py-4 text-base focus:border-2 focus:border-blue-600 focus:outline-none"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-4 origin-[0] -translate-y-7 scale-75 transform bg-white px-1 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-600">
                    Enter your password
                  </label>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <input type="checkbox" id="show-pass" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="show-pass" className="text-sm text-gray-700">Show password</label>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep("recovery-code")}
                    className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-2 py-2 rounded"
                  >
                    Forgot password?
                  </button>
                  <button 
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "forgot-email" && (
            <div className="animate-in slide-in-from-left-4 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Find your email</h1>
              <p className="mt-2 text-base text-gray-700">Enter your phone number or recovery email</p>
              
              <form onSubmit={(e) => handleNext(e, "identifier")} className="mt-8 text-left">
                <div className="relative mb-8">
                  <input
                    type="text"
                    required
                    className="peer block w-full rounded border border-gray-300 px-3 py-4 text-base focus:border-2 focus:border-blue-600 focus:outline-none"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-4 origin-[0] -translate-y-7 scale-75 transform bg-white px-1 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-600">
                    Phone number or email
                  </label>
                </div>

                <div className="mt-10 flex items-center justify-end">
                  <button 
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "recovery-code" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Account recovery</h1>
              <p className="mt-2 text-base text-gray-700">
                A verification code was sent to your recovery device.
              </p>
              
              <form onSubmit={(e) => handleNext(e, "identifier")} className="mt-8 text-left">
                <div className="relative mb-2">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="peer block w-full rounded border border-gray-300 px-3 py-4 text-base tracking-[0.5em] text-center focus:border-2 focus:border-blue-600 focus:outline-none"
                    placeholder="G-XXXXXX"
                  />
                </div>
                
                <button type="button" className="text-sm font-semibold text-blue-600">
                  Try another way
                </button>

                <div className="mt-10 flex items-center justify-end">
                  <button 
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 flex w-full max-w-[450px] justify-between px-6 text-xs text-gray-600 sm:relative sm:mt-4 sm:max-w-3xl">
        <div className="flex gap-4">
          <select className="bg-transparent hover:bg-gray-100 rounded px-1 cursor-pointer outline-none">
            <option>English (United States)</option>
            <option>Español (España)</option>
          </select>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:bg-gray-100 p-1 rounded">Help</a>
          <a href="#" className="hover:bg-gray-100 p-1 rounded">Privacy</a>
          <a href="#" className="hover:bg-gray-100 p-1 rounded">Terms</a>
        </div>
      </footer>
    </div>
  );
}