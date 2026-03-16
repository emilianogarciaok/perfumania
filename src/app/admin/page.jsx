"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

const ADMIN_PIN = "832956";

const casaOptions = [
  "AFNAN",
  "AL HARAMAIN",
  "AL WATANIAH",
  "ARMAF",
  "BOROUJ",
  "DUA FRAGRANCES",
  "EMPER",
  "FRAGRANCE WORLD",
  "FRENCH AVENUE",
  "Lattafa",
  "MAISON ALHAMBRA",
  "NAUTICA",
  "RASASI",
  "RAYHAAN",
  "ZENTIDOS FRAGANCIAS",
  "ZIMAYA",
];

const generoOptions = ["Masculino", "Femenino", "Unisex"];
const perfilOptions = ["Fresco", "Dulce", "Intenso", "Floral", "Versátil"];

const EMPTY_FORM = {
  nombre: "",
  casa: "",
  genero: "",
  inspiracion: "",
  precio: "",
  imagen: "",
  descripcion: "",
  perfil_olfativo: [],
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePerfil = (perfil) => {
    setForm((prev) => ({
      ...prev,
      perfil_olfativo: prev.perfil_olfativo.includes(perfil)
        ? prev.perfil_olfativo.filter((p) => p !== perfil)
        : [...prev.perfil_olfativo, perfil],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!form.nombre || !form.casa || !form.precio) {
      setMessage({ type: "error", text: "Nombre, casa y precio son obligatorios." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("perfumania").insert({
      nombre: form.nombre.trim(),
      casa: form.casa,
      genero: form.genero || null,
      inspiracion: form.inspiracion.trim() || null,
      precio: Number(form.precio),
      imagen: form.imagen.trim() || null,
      description: form.descripcion.trim() || null,
      perfil_olfativo: form.perfil_olfativo.length > 0 ? form.perfil_olfativo : null,
    });

    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: `"${form.nombre}" agregado correctamente.` });
      setForm(EMPTY_FORM);
    }
  };

  // --- LOGIN SCREEN ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center space-y-6"
        >
          <div>
            <h1 className="font-serif text-2xl text-gray-900 mb-1">Admin</h1>
            <p className="text-gray-400 text-sm">Ingresá el código de acceso</p>
          </div>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false); }}
            placeholder="Código"
            className={`w-full border rounded-lg px-4 py-3 text-sm text-center tracking-[0.3em] focus:outline-none focus:ring-2 transition ${
              pinError
                ? "border-red-300 focus:ring-red-300"
                : "border-gray-200 focus:ring-yellow-500/40 focus:border-yellow-500"
            }`}
            autoFocus
          />
          {pinError && (
            <p className="text-red-500 text-xs">Código incorrecto</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  // --- ADMIN FORM ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-3xl text-gray-900 mb-2 text-center">
          Panel de Administración
        </h1>
        <p className="text-gray-400 text-sm text-center mb-10">
          Agregar nuevo perfume al catálogo
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6"
        >
          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Nombre del perfume *
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: AFFECTION"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition"
            />
          </div>

          {/* Casa */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Casa / Marca *
            </label>
            <select
              name="casa"
              value={form.casa}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition bg-white"
            >
              <option value="">Seleccionar marca</option>
              {casaOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Género */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Género
            </label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition bg-white"
            >
              <option value="">Seleccionar género</option>
              {generoOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Inspiración */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Inspiración
            </label>
            <input
              type="text"
              name="inspiracion"
              value={form.inspiracion}
              onChange={handleChange}
              placeholder="Ej: Dior Sauvage"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Precio (ARS) *
            </label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 54250"
              min="0"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition"
            />
          </div>

          {/* Imagen URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              URL de imagen
            </label>
            <input
              type="url"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/perfume.jpg"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition"
            />
            {form.imagen && (
              <div className="mt-3 relative w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-white mx-auto">
                <Image
                  src={form.imagen}
                  alt="Preview"
                  fill
                  className="object-contain p-1"
                  sizes="96px"
                />
              </div>
            )}
          </div>

          {/* Perfil Olfativo */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Perfil olfativo
            </label>
            <div className="flex flex-wrap gap-2">
              {perfilOptions.map((p) => {
                const selected = form.perfil_olfativo.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePerfil(p)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200
                      ${
                        selected
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción del perfume..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition resize-none"
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`text-sm px-4 py-3 rounded-lg ${
                message.type === "error"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-green-600 border border-green-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Agregar Perfume"}
          </button>
        </form>
      </div>
    </div>
  );
}
