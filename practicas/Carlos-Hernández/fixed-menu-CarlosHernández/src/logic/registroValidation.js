export function validarFormulario(form) {
  let errores = {};

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexTelefono = /^[0-9]{10}$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;

  // NOMBRE
  if (!form.nombre || !regexNombre.test(form.nombre)) {
    errores.nombre = "Nombre inválido (Unicamente letras)";
  }

  // EDAD
  if (!form.edad || form.edad < 18) {
    errores.edad = "Debes ser mayor de 18 años";
  }

  // EMAIL
  if (!form.email || !regexEmail.test(form.email)) {
    errores.email = "El correo es inválido";
  }

  // TELÉFONO
  if (!form.telefono || !regexTelefono.test(form.telefono)) {
    errores.telefono = "El teléfono debe contener 10 dígitos numéricos";
  }

  // PASSWORD
  if (!form.password || !regexPassword.test(form.password)) {
    errores.password = "La contraseña debe tener 8-15 caracteres, mayúscula, minúscula, número y símbolo";
  }

  // GÉNERO
  if (!form.genero) {
    errores.genero = "Selecciona un género";
  }

  // TÉRMINOS
  if (!form.terminos) {
    errores.terminos = "Debes aceptar los términos";
  }

  return errores;
}