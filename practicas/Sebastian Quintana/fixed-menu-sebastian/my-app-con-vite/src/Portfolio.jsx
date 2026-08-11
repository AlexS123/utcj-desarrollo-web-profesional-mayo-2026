import React from 'react';

function Portfolio() {
  const projects = [
    { title: 'Proyecto 1', description: 'Sistema de gestión empresarial' },
    { title: 'Proyecto 2', description: 'Plataforma de e-commerce' },
    { title: 'Proyecto 3', description: 'Aplicación móvil multiplataforma' },
    { title: 'Proyecto 4', description: 'Dashboard analítico avanzado' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Nuestro Portafolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition">
              <h2 className="text-2xl font-semibold mb-3">{project.title}</h2>
              <p className="text-slate-300">{project.description}</p>
              <button className="mt-4 text-blue-400 hover:text-blue-300">Ver más →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
