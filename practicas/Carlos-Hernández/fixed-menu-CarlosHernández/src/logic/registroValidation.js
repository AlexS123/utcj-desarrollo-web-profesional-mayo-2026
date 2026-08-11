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

  // FECHA DE NACIMIENTO
  if (!form.fechaNacimiento) {

    errores.fechaNacimiento =
      "Selecciona tu fecha de nacimiento.";

  } else {

    const hoy = new Date();
    const nacimiento = new Date(form.fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    if (edad < 18) {
      errores.fechaNacimiento =
        "Debes ser mayor de 18 años para registrarte.";
    }

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