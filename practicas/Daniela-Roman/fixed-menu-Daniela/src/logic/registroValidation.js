export function validarFormulario(form) {
  let errores = {};

  if (!form.user || form.user.trim().length < 3) {
    errores.user = "El usuario debe tener al menos 3 caracteres";
  }

  if (!form.pass || form.pass.length < 6) {
    errores.pass = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!form.rol) {
    errores.rol = "Selecciona un rol";
  }

  return errores;
}
