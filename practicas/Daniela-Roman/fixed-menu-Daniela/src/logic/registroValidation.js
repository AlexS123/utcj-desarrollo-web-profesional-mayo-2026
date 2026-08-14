export function validarFormulario(form) {
  let errores = {};

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.nombre || !regexNombre.test(form.nombre.trim())) {
    errores.nombre = "El nombre solo debe contener letras y tener entre 3 y 50 caracteres.";
  }

  if (!form.email || !regexEmail.test(form.email.trim())) {
    errores.email = "Ingresa un correo electrónico válido.";
  }

  if (!form.password || form.password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return errores;
}
