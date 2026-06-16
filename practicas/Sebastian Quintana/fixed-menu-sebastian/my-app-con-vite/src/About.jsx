import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Acerca de Nosotros</h1>
        <div className="bg-slate-700 rounded-lg p-8 space-y-6">
          <p className="text-lg leading-relaxed">
            En TechNexus Solutions, nos especializamos en proporcionar soluciones tecnológicas innovadoras y de alta calidad para empresas de todos los tamaños.
          </p>
          <p className="text-lg leading-relaxed">
            Con más de una década de experiencia, nuestro equipo de expertos está comprometido con la excelencia y la satisfacción del cliente.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
          <p className="text-lg leading-relaxed">
            Transformar la forma en que las empresas utilizan la tecnología para alcanzar sus objetivos comerciales.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
