import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    country: '',
    gender: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Expresiones regulares para validaciones
  const regexPatterns = {
    fullName: /^[a-záéíóúñ\s]{3,50}$/i, // Mínimo 3 caracteres, solo letras y espacios
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email válido
    age: /^(1[8-9]|[2-9]\d|1[01]\d|120)$/ // Entre 18 y 120
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar Nombre Completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (!regexPatterns.fullName.test(formData.fullName)) {
      newErrors.fullName = 'El nombre debe tener mínimo 3 caracteres y solo letras';
    }

    // Validar Email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!regexPatterns.email.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    // Validar Edad
    if (!formData.age) {
      newErrors.age = 'La edad es requerida';
    } else if (!regexPatterns.age.test(formData.age)) {
      newErrors.age = 'Debes tener entre 18 y 120 años';
    }

    // Validar País
    if (!formData.country) {
      newErrors.country = 'Debes seleccionar un país';
    }

    // Validar Género
    if (!formData.gender) {
      newErrors.gender = 'Debes seleccionar un género';
    }

    // Validar Términos y Condiciones
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Datos del formulario válidos:', formData);
      setSubmitted(true);
      
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          age: '',
          country: '',
          gender: '',
          agreeTerms: false
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Crear Cuenta</h1>
        <p className="text-slate-400 mb-8">Completa el formulario para registrarte</p>

        {submitted && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6 border-l-4 border-green-600 shadow-lg">
            <p className="font-semibold">✅ ¡Registro Exitoso!</p>
            <p className="text-sm mt-1">Tu cuenta ha sido creada correctamente. Bienvenido.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-8 space-y-6">
          
          {/* Campo Nombre Completo - Input Text */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Juan Pérez"
              className={`w-full px-4 py-2 rounded bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.fullName ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.fullName}
              </p>
            )}
          </div>

          {/* Campo Email - Input Text */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ejemplo@correo.com"
              className={`w-full px-4 py-2 rounded bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.email ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Campo Edad - Input Numeric */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Edad <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="25"
              min="18"
              max="120"
              className={`w-full px-4 py-2 rounded bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.age ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.age && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.age}
              </p>
            )}
          </div>

          {/* Campo País - Select */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              País <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded bg-slate-600 text-white focus:outline-none focus:ring-2 transition ${
                errors.country ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-blue-500'
              }`}
            >
              <option value="">Selecciona un país</option>
              <option value="mexico">México</option>
              <option value="colombia">Colombia</option>
              <option value="argentina">Argentina</option>
              <option value="españa">España</option>
              <option value="chile">Chile</option>
              <option value="peru">Perú</option>
            </select>
            {errors.country && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.country}
              </p>
            )}
          </div>

          {/* Campo Género - Radio Buttons */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Género <span className="text-red-500">*</span>
            </label>
            <div className={`space-y-2 p-4 rounded bg-slate-600 ${errors.gender ? 'border-2 border-red-500' : ''}`}>
              <label className="flex items-center cursor-pointer hover:bg-slate-500 p-2 rounded transition">
                <input
                  type="radio"
                  name="gender"
                  value="masculino"
                  checked={formData.gender === 'masculino'}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4"
                />
                <span>Masculino</span>
              </label>
              <label className="flex items-center cursor-pointer hover:bg-slate-500 p-2 rounded transition">
                <input
                  type="radio"
                  name="gender"
                  value="femenino"
                  checked={formData.gender === 'femenino'}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4"
                />
                <span>Femenino</span>
              </label>
              <label className="flex items-center cursor-pointer hover:bg-slate-500 p-2 rounded transition">
                <input
                  type="radio"
                  name="gender"
                  value="otro"
                  checked={formData.gender === 'otro'}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4"
                />
                <span>Otro</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.gender}
              </p>
            )}
          </div>

          {/* Checkbox - Términos y Condiciones */}
          <div className={`p-4 rounded ${errors.agreeTerms ? 'bg-red-900 border-2 border-red-500' : 'bg-slate-600'}`}>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm">
                Acepto los <span className="text-blue-400">términos y condiciones</span> <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-300 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.agreeTerms}
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition mt-8 transform hover:scale-105"
          >
            Registrarse
          </button>
        </form>

        {/* Mostrar datos enviados (DEBUG) */}
        {submitted && (
          <div className="mt-8 bg-slate-700 rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4">✓ Datos Registrados:</h2>
            <div className="bg-slate-600 p-4 rounded text-sm space-y-2">
              <p><span className="text-blue-400 font-semibold">Nombre:</span> {formData.fullName}</p>
              <p><span className="text-blue-400 font-semibold">Email:</span> {formData.email}</p>
              <p><span className="text-blue-400 font-semibold">Edad:</span> {formData.age} años</p>
              <p><span className="text-blue-400 font-semibold">País:</span> {formData.country}</p>
              <p><span className="text-blue-400 font-semibold">Género:</span> {formData.gender}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
