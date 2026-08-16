// ==================================================
// ASTRA SPACE - FRONTEND
// ==================================================


// Obtenemos elementos del HTML
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');

const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

const userName = document.getElementById('userName');


// ==================================================
// ELEMENTOS PARA CONSULTAR USUARIOS
// ==================================================

const usersLink =
    document.getElementById('usersLink');

const consultUsersButton =
    document.getElementById('consultUsersButton');

const usersMessage =
    document.getElementById('usersMessage');

const jsonContainer =
    document.getElementById('jsonContainer');

const usersJson =
    document.getElementById('usersJson');


// ==================================================
// ELEMENTOS DEL REGISTRO
// ==================================================

const registerLink =
    document.getElementById('registerLink');

const registerModal =
    document.getElementById('registerModal');

const closeRegister =
    document.getElementById('closeRegister');

const registerForm =
    document.getElementById('registerForm');

const registerMessage =
    document.getElementById('registerMessage');

const backToLogin =
    document.getElementById('backToLogin');


// ==================================================
// ABRIR LOGIN
// ==================================================

loginButton.addEventListener('click', () => {

    // Agrega la clase active para mostrar el modal
    loginModal.classList.add('active');

});


// ==================================================
// CERRAR LOGIN CON LA X
// ==================================================

closeLogin.addEventListener('click', () => {

    // Ocultamos el modal
    loginModal.classList.remove('active');

    // Limpiamos cualquier mensaje anterior
    loginMessage.textContent = "";

});


// ==================================================
// CERRAR LOGIN PRESIONANDO FUERA DEL FORMULARIO
// ==================================================

loginModal.addEventListener('click', (event) => {

    /*
        Verificamos si el usuario hizo clic directamente
        en el fondo del modal y no dentro del formulario.
    */
    if(event.target === loginModal){

        loginModal.classList.remove('active');

        loginMessage.textContent = "";

    }

});


// ==================================================
// INICIAR SESIÓN
// ==================================================

loginForm.addEventListener('submit', async (event) => {

    /*
        Evita que el formulario recargue toda
        la página al presionar Iniciar sesión.
    */
    event.preventDefault();


    // Obtenemos los datos escritos en el formulario
    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;


    // Mensaje mientras se realiza la consulta
    loginMessage.textContent = "Verificando usuario...";

    loginMessage.style.color = "#ffffff";


    try {

        // ==================================================
        // CONEXIÓN CON NUESTRA RUTA /login
        // ==================================================

        const respuesta = await fetch('/login', {

            method: 'POST',

            headers: {

                // Indicamos que enviaremos información JSON
                'Content-Type': 'application/json'

            },

            // Convertimos usuario y contraseña a JSON
            body: JSON.stringify({

                username: username,

                password: password

            })

        });


        /*
            La respuesta que envía nuestro servidor
            también viene en formato JSON.
        */
        const datos = await respuesta.json();


        // ==================================================
        // LOGIN CORRECTO
        // ==================================================

        if(respuesta.ok){

            // Mostramos el mensaje del servidor
            loginMessage.textContent = datos.mensaje;

            loginMessage.style.color = "#4cff91";


            // Mostramos información en la consola
            // para comprobar que el servidor respondió.
            console.log("Usuario:", datos.usuario);

            console.log("Rol:", datos.rol);

            console.log("Token:", datos.token);

                    // ==================================================
        // GUARDAR DATOS DE LA SESIÓN
        // ==================================================

        /*
            Guardamos el JWT en Local Storage.

            Esto permite conservar el token aunque
            el usuario cambie de sección o recargue la página.
        */
        localStorage.setItem("token", datos.token);


        /*
            También guardamos el nombre y rol.

            Esto nos permitirá reconstruir la interfaz
            cuando el usuario recargue la página.
        */
        localStorage.setItem("usuario", datos.usuario);

        localStorage.setItem("rol", datos.rol);


            // ==================================================
            // CREAR COOKIES
            // ==================================================

            /*
                Creamos una cookie con el nombre del usuario.

                max-age=7200 significa que tendrá una
                duración máxima de 2 horas.
            */
            document.cookie =
                `usuario=${encodeURIComponent(datos.usuario)}; max-age=7200; path=/`;


            /*
                También guardamos el rol en otra cookie.
            */
            document.cookie =
                `rol=${encodeURIComponent(datos.rol)}; max-age=7200; path=/`;
                        /*
                        POR AHORA:

                        El token todavía NO se guarda.

                        En el siguiente paso lo guardaremos
                        en Local Storage.
                    */


            // ==================================================
            // CAMBIAR LA NAVBAR
            // ==================================================

            /*
                Cambiamos el texto "Invitado"
                por el usuario que inició sesión.
            */
            userName.textContent = datos.usuario;


            // Ocultamos el botón Iniciar sesión
            loginButton.style.display = "none";


            // Mostramos el botón Cerrar sesión
            logoutButton.style.display = "block";


            /*
                Esperamos un segundo antes de cerrar
                automáticamente la ventana de login.
            */
            setTimeout(() => {

                loginModal.classList.remove('active');

                loginMessage.textContent = "";

                // Limpiamos los campos del formulario
                loginForm.reset();

            }, 1000);

        }


        // ==================================================
        // LOGIN INCORRECTO
        // ==================================================

        else {

            // Mostramos el mensaje enviado por el servidor
            loginMessage.textContent = datos.mensaje;

            loginMessage.style.color = "#ff5c5c";

        }


    } catch(error) {

        // Mostramos el error en la consola
        console.error(
            "Error al conectar con /login:",
            error
        );


        // Mensaje para el usuario
        loginMessage.textContent =
            "No fue posible conectar con el servidor";


        loginMessage.style.color = "#ff5c5c";

    }

});


// ==================================================
// CERRAR SESIÓN
// ==================================================

logoutButton.addEventListener('click', () => {

    // ==================================================
    // ELIMINAR LOCAL STORAGE
    // ==================================================

    // Eliminamos el JWT
    localStorage.removeItem("token");

    // Eliminamos el nombre del usuario
    localStorage.removeItem("usuario");

    // Eliminamos el rol
    localStorage.removeItem("rol");


    // ==================================================
    // ELIMINAR COOKIES
    // ==================================================

    /*
        Para eliminar una cookie establecemos
        max-age=0.
    */
    document.cookie =
        "usuario=; max-age=0; path=/";

    document.cookie =
        "rol=; max-age=0; path=/";


    // ==================================================
    // RESTAURAR LA INTERFAZ
    // ==================================================

    // Volvemos al estado Invitado
    userName.textContent = "Invitado";

    // Mostramos Iniciar sesión
    loginButton.style.display = "block";

    // Ocultamos Cerrar sesión
    logoutButton.style.display = "none";

    // Ocultamos los registros de usuarios
jsonContainer.style.display = "none";

// Limpiamos el contenido JSON mostrado
usersJson.textContent = "";

// Restablecemos el mensaje de la sección
usersMessage.textContent =
    'Selecciona "Consultar registros" para acceder a la información.';

usersMessage.style.color = "#bfc5d8";

    console.log(
        "Sesión cerrada correctamente"
    );

});

// ==================================================
// RECUPERAR SESIÓN
// ==================================================

/*
    Cuando la página se carga buscamos si existe
    información de una sesión anterior.
*/
const tokenGuardado = localStorage.getItem("token");

const usuarioGuardado = localStorage.getItem("usuario");

const rolGuardado = localStorage.getItem("rol");


/*
    Si existe un token y un usuario significa que
    existe información de una sesión iniciada.
*/
if(tokenGuardado && usuarioGuardado){

    // Mostramos nuevamente el nombre del usuario
    userName.textContent = usuarioGuardado;

    // Ocultamos Iniciar sesión
    loginButton.style.display = "none";

    // Mostramos Cerrar sesión
    logoutButton.style.display = "block";

    console.log(
        "Sesión recuperada:",
        usuarioGuardado
    );

    console.log(
        "Rol:",
        rolGuardado
    );
}

// ==================================================
// CONSULTAR USUARIOS
// ==================================================

async function consultarUsuarios(){

    /*
        Recuperamos el JWT almacenado anteriormente
        cuando el usuario inició sesión.
    */
    const token = localStorage.getItem("token");


    // Limpiamos resultados anteriores
    jsonContainer.style.display = "none";

    usersJson.textContent = "";


    // Mostramos mensaje mientras se realiza la consulta
    usersMessage.textContent =
        "Verificando permisos de acceso...";

    usersMessage.style.color = "#ffffff";


    try {

        /*
            Preparamos los encabezados que enviaremos
            hacia nuestro servidor.
        */
        const headers = {};


        /*
            Si existe un JWT lo enviamos utilizando
            Authorization con el formato Bearer Token.
        */
        if(token){

            headers["Authorization"] =
                `Bearer ${token}`;

        }


        /*
            Consumimos exactamente la misma ruta
            que anteriormente probamos en Postman.
        */
        const respuesta = await fetch(
            '/consultarUsuarios',
            {
                method: 'GET',
                headers: headers
            }
        );


        /*
            Convertimos la respuesta enviada por
            Express a formato JSON.
        */
        const datos = await respuesta.json();


        // ==================================================
        // ADMINISTRADOR
        // ==================================================

        if(respuesta.ok){

            usersMessage.textContent =
                "Acceso autorizado. Registros obtenidos correctamente.";

            usersMessage.style.color = "#4cff91";


            /*
                JSON.stringify permite convertir los datos
                recibidos desde MongoDB en texto JSON.

                El número 2 agrega espacios para que sea
                mucho más fácil de leer.
            */
            usersJson.textContent =
                JSON.stringify(datos, null, 2);


            // Mostramos el contenedor del JSON
            jsonContainer.style.display = "block";

        }


        // ==================================================
        // SIN PERMISOS
        // ==================================================

        else {

            /*
                Aquí aparecerán directamente los mensajes
                que programamos en nuestro backend.

                Por ejemplo:

                "Necesitas iniciar sesión para acceder"

                o

                "Necesitas permisos de administrador para acceder"
            */

            usersMessage.textContent =
                datos.mensaje;

            usersMessage.style.color = "#ff6b75";


            // No mostramos información de MongoDB
            jsonContainer.style.display = "none";

        }


    } catch(error){

        console.error(
            "Error al consultar usuarios:",
            error
        );


        usersMessage.textContent =
            "No fue posible realizar la consulta";

        usersMessage.style.color = "#ff6b75";

    }

}


// ==================================================
// BOTÓN CONSULTAR
// ==================================================

consultUsersButton.addEventListener(
    'click',
    consultarUsuarios
);
// ==================================================
// COMPROBACIÓN
// ==================================================

// ==================================================
// ABRIR REGISTRO
// ==================================================

registerLink.addEventListener('click', (event) => {

    // Evita que el enlace recargue o mueva la página
    event.preventDefault();

    // Cerramos el login
    loginModal.classList.remove('active');

    // Abrimos el registro
    registerModal.classList.add('active');

});


// ==================================================
// CERRAR REGISTRO
// ==================================================

closeRegister.addEventListener('click', () => {

    registerModal.classList.remove('active');

    registerMessage.textContent = "";

});


// Cerrar si se presiona fuera del formulario
registerModal.addEventListener('click', (event) => {

    if(event.target === registerModal){

        registerModal.classList.remove('active');

        registerMessage.textContent = "";

    }

});


// ==================================================
// REGRESAR AL LOGIN
// ==================================================

backToLogin.addEventListener('click', (event) => {

    event.preventDefault();

    registerModal.classList.remove('active');

    loginModal.classList.add('active');

});


// ==================================================
// REGISTRAR USUARIO
// ==================================================

registerForm.addEventListener('submit', async (event) => {

    // Evita que la página se recargue
    event.preventDefault();


    // Obtenemos los datos del formulario
    const user =
        document.getElementById('registerUser').value;

    const pass =
        document.getElementById('registerPass').value;

    const rol =
        document.getElementById('registerRole').value;


    registerMessage.textContent =
        "Registrando usuario...";

    registerMessage.style.color = "#ffffff";


    try {

        /*
            Enviamos los datos hacia la ruta
            POST /registrar que ya tenemos
            funcionando en nuestro servidor.
        */
        const respuesta = await fetch('/registrar', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                user: user,
                pass: pass,
                rol: rol
            })

        });


        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();


        // ==================================================
        // REGISTRO CORRECTO
        // ==================================================

        if(respuesta.ok){

            registerMessage.textContent =
                "Usuario registrado correctamente";

            registerMessage.style.color =
                "#4cff91";


            console.log(
                "Nuevo usuario:",
                datos.user
            );


            /*
                Limpiamos los campos una vez
                que el usuario fue registrado.
            */
            registerForm.reset();


            /*
                Después de 1.5 segundos cerramos
                el registro y abrimos el login.
            */
            setTimeout(() => {

                registerModal.classList.remove('active');

                registerMessage.textContent = "";

                loginModal.classList.add('active');

            }, 1500);

        }


        // ==================================================
        // ERROR DEL SERVIDOR
        // ==================================================

        else {

            registerMessage.textContent =
                "No fue posible registrar el usuario";

            registerMessage.style.color =
                "#ff6b75";

        }


    } catch(error){

        console.error(
            "Error al registrar:",
            error
        );


        registerMessage.textContent =
            "No fue posible conectar con el servidor";

        registerMessage.style.color =
            "#ff6b75";

    }

});

console.log(
    "ASTRA SPACE - Sistema de login cargado correctamente"
);