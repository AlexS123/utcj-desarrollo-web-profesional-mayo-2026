import React from 'react';

function Services() {
  const services = [
    { title: 'Desarrollo Web', description: 'Creamos sitios web modernos y responsivos' },
    { title: 'Consultoría TI', description: 'Asesoramiento estratégico en tecnología' },
    { title: 'Cloud Solutions', description: 'Soluciones en la nube escalables y seguras' },
    { title: 'Soporte 24/7', description: 'Asistencia técnica disponible todo el tiempo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Nuestros Servicios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition">
              <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
              <p className="text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
