import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Contacto</h1>
        <form className="bg-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input type="text" className="w-full px-4 py-2 rounded bg-slate-600 text-white" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded bg-slate-600 text-white" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea className="w-full px-4 py-2 rounded bg-slate-600 text-white h-32" placeholder="Tu mensaje aquí..."></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
