export function validarFormularioContacto(form) {
  let errores = {};

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexAsunto = /^.{5,100}$/;
  const regexMensaje = /^.{10,500}$/;

  if (!form.nombre || !regexNombre.test(form.nombre.trim())) {
    errores.nombre = "El nombre solo debe contener letras y tener entre 3 y 50 caracteres.";
  }

  if (!form.email || !regexEmail.test(form.email.trim())) {
    errores.email = "Ingresa un correo electrónico válido.";
  }

  if (!form.asunto || !regexAsunto.test(form.asunto.trim())) {
    errores.asunto = "El asunto debe tener entre 5 y 100 caracteres.";
  }

  if (!form.mensaje || !regexMensaje.test(form.mensaje.trim())) {
    errores.mensaje = "El mensaje debe tener entre 10 y 500 caracteres.";
  }

  return errores;
}
