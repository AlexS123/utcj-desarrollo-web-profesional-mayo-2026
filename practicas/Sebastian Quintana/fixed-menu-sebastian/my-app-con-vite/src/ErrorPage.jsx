import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Mensajes para diferentes códigos de error
const ERROR_MESSAGES = {
  400: {
    title: 'Solicitud Inválida',
    subtitle: '¡Ups! Tu solicitud no es válida.',
    description: 'Parece que enviaste una solicitud malformada. Verifica los datos e intenta de nuevo.',
    icon: 'error_outline'
  },
  403: {
    title: 'Acceso Prohibido',
    subtitle: '¡Ups! No tienes permiso.',
    description: 'No tienes autorización para acceder a este recurso. Contacta con el administrador si crees que es un error.',
    icon: 'lock'
  },
  404: {
    title: 'No Encontrado',
    subtitle: '¡Ups! Esta página se ha perdido en el espacio.',
    description: 'Parece que el enlace que seguiste está roto o la página ha sido movida a una dimensión desconocida.',
    icon: 'link_off'
  },
  500: {
    title: 'Error del Servidor',
    subtitle: '¡Ups! Algo salió mal.',
    description: 'Nuestros servidores están experimentando problemas. Por favor, intenta más tarde.',
    icon: 'settings_suggest'
  },
  503: {
    title: 'Servicio No Disponible',
    subtitle: '¡Ups! El servicio está en mantenimiento.',
    description: 'Estamos realizando tareas de mantenimiento. Volveremos pronto.',
    icon: 'construction'
  }
};

function ErrorPage() {
  const { code } = useParams();
  const errorCode = code || '404';
  const errorInfo = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES[404];

  // Efecto para seguimiento del cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.querySelector('.cursor-follow-glow');
      if (glow) {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        glow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="dark">
      <style>{`
        :root {
          color-scheme: dark;
        }
        html, body, #app {
          background-color: #131313;
          color: #e5e2e1;
        }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(167, 200, 255, 0.4), 0 0 40px rgba(50, 145, 255, 0.2);
        }
        .bento-card {
          background: #1E1E1E;
          border: 1px solid rgba(51, 65, 85, 0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bento-card:hover {
          border-color: #a7c8ff;
          background: #252525;
        }
        .animate-spin {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#131313', color: '#e5e2e1' }}>
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50" style={{ backgroundColor: 'rgba(19, 19, 19, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(65, 71, 83, 0.2)' }}>
          <nav className="flex justify-between items-center h-16 px-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl" style={{ color: '#a7c8ff' }}>TechNexus</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                Inicio
              </a>
              <a href="/" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                Servicios
              </a>
              <a href="/" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                Contacto
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 rounded-lg font-medium active:scale-95 transition-transform" style={{ backgroundColor: '#3291ff', color: '#001b3c' }}>
                Get Started
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content Area (Error Page) */}
        <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="inline-block px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(167, 200, 255, 0.1)', border: '1px solid rgba(167, 200, 255, 0.2)' }}>
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#a7c8ff' }}>
                  Error {errorCode}
                </span>
              </div>

              <h1 className="font-bold tracking-tighter glow-text" style={{ fontSize: 'clamp(32px, 8vw, 48px)', color: '#a7c8ff' }}>
                {errorCode}
              </h1>

              <h2 className="text-2xl font-semibold" style={{ color: '#e5e2e1' }}>
                {errorInfo.subtitle}
              </h2>

              <p className="max-w-lg" style={{ color: '#c0c6d5', fontSize: '16px', lineHeight: '1.6' }}>
                {errorInfo.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/" className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold active:scale-95 transition-all hover:brightness-110" style={{ backgroundColor: '#a7c8ff', color: '#003061' }}>
                  <span className="material-symbols-outlined">home</span>
                  Volver al Inicio
                </a>
                <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold active:scale-95 transition-all" style={{ border: '2px solid #a7c8ff', color: '#a7c8ff', backgroundColor: 'transparent' }}>
                  <span className="material-symbols-outlined">support_agent</span>
                  Contactar Soporte
                </button>
              </div>
            </div>

            {/* Illustration Column */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Background Glow */}
                <div className="cursor-follow-glow absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(167, 200, 255, 0.1)', filter: 'blur(100px)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>

                {/* Main Visual Element */}
                <div className="bento-card relative z-10 w-full h-full rounded-[32px] overflow-hidden flex items-center justify-center">
                  <img
                    alt="Background technical pattern"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.2, mixBlendMode: 'overlay' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuJujj4eHqkd4Szgf8UJx8EsfxBQWwIjPdSmD_Q-fAEaV0TQNVJ1a-V5dIu7TbQveK2QUcrAf9RkxhP4I8Z3xwlR27jMxtJKpjqEWJEpUuf-iwF_BP-mLbBLfChsxn50_NcEXSagqs1S06534icRsqX0JXkdRpTMKJ2vWxvVb6SxWK5KfbX8LxENfjkRj-2zFHNzskWmOLP_OPKrcbVLOYxka0CqBnd9_uYNanohkDl_Tv2Xi2jYSi1-MSUbd6mpziagrpHoEeMHo"
                  />

                  <div className="relative flex flex-col items-center gap-8">
                    {/* High-tech icon visual */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed animate-spin flex items-center justify-center" style={{ borderColor: '#a7c8ff' }}>
                        <span className="material-symbols-outlined text-6xl" style={{ color: '#a7c8ff' }}>
                          {errorInfo.icon}
                        </span>
                      </div>
                      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffb4ab', animation: 'bounce 1s infinite' }}>
                        <span className="material-symbols-outlined text-sm" style={{ color: '#690005' }}>warning</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="px-4 py-2 rounded-lg border flex items-center gap-2" style={{ backgroundColor: '#2a2a2a', borderColor: 'rgba(65, 71, 83, 0.3)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ffb4ab', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                        <span className="text-xs font-medium" style={{ color: '#c0c6d5' }}>ERROR_DETECTED</span>
                      </div>
                      <div className="px-4 py-2 rounded-lg border flex items-center gap-2" style={{ backgroundColor: '#2a2a2a', borderColor: 'rgba(65, 71, 83, 0.3)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a7c8ff', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                        <span className="text-xs font-medium" style={{ color: '#c0c6d5' }}>SUPPORT_READY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -bottom-6 -right-6 bento-card p-6 rounded-2xl hidden md:block">
                  <p className="text-xs font-medium mb-2" style={{ color: '#a7c8ff' }}>Protocolo Error</p>
                  <div className="h-1 w-24 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}>
                    <div className="h-full w-2/3" style={{ backgroundColor: '#a7c8ff' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-12 mt-auto" style={{ borderTop: '1px solid rgba(65, 71, 83, 0.1)', backgroundColor: '#0e0e0e' }}>
          <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
              <div className="flex flex-col items-center md:items-start space-y-2">
                <span className="font-bold text-xl" style={{ color: '#a7c8ff' }}>TechNexus</span>
                <p className="text-xs" style={{ color: '#c0c6d5' }}>
                  © 2024 TechNexus Solutions. All rights reserved.
                </p>
              </div>
              <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <a href="#" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                  Privacy Policy
                </a>
                <a href="#" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                  Terms of Service
                </a>
                <a href="#" className="font-medium transition-colors duration-200" style={{ color: '#c0c6d5' }}>
                  Status
                </a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ErrorPage;
