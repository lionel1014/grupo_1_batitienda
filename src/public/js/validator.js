const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{2,16}$/,
        apellido: /^[a-zA-ZÀ-ÿ\s]{2,16}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        usuario: /^[a-zA-Z0-9\_\-]{5,16}$/,
        contrasena: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
        imagen: /\.(jpeg|jpg|png|gif)$/i
    }

    const campos = {
        nombre: false,
        apellido: false,
        correo: false,
        usuario: false,
        contrasena: false,
        imagen: false,
        userAccount: false,
        password: false,

    }

window.addEventListener("load", function () {
    const formulario = document.getElementById('form-register');
    const inputs = document.querySelectorAll('#form-register input');

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, e.target.name);
            break;
            case "apellido":
                validarCampo(expresiones.apellido, e.target, e.target.name);
            break;
            case "correo":
                validarCampo(expresiones.correo, e.target, e.target.name);
                validarPassword2();
            break;
            case "usuario":
                validarCampo(expresiones.usuario, e.target, e.target.name);
            break;
            case "contrasena":
                validarCampo(expresiones.contrasena, e.target, e.target.name);
                validarPassword();
            break;
            case "confirmar_contrasena":
                validarPassword();
            break;
            case "imagen":
                validarCampo(expresiones.imagen, e.target, e.target.name);
            break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`${campo}`).classList.remove('incorrect');
            document.getElementById(`${campo}`).classList.add('correct');

            document.querySelector(`#${campo}-Error`).classList.remove('warning');
            campos[campo] = true;
        } else {
            document.getElementById(`${campo}`).classList.add('incorrect');
            document.getElementById(`${campo}`).classList.remove('correct');

            document.querySelector(`#${campo}-Error`).classList.add('warning');
            campos[campo] = false;
        }
    }

    const validarPassword = () => {
        const inputPassword = document.getElementById('contrasena');
        const inputRepassword = document.getElementById('confirmar_contrasena');

        if(inputPassword.value !== inputRepassword.value){
            document.getElementById(`confirmar_contrasena`).classList.add('incorrect');
            document.getElementById(`confirmar_contrasena`).classList.remove('correct');

            document.querySelector(`#confirmar_contrasena-Error`).classList.add('warning');
            campos['contrasena'] = false;
        } else {
            document.getElementById(`confirmar_contrasena`).classList.remove('incorrect');
            document.getElementById(`confirmar_contrasena`).classList.add('correct');

            document.querySelector(`#confirmar_contrasena-Error`).classList.remove('warning');
            campos['contrasena'] = true;
        }
    }

    inputs.forEach((input) => {
        // input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
        input.addEventListener('change', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (campos.nombre && campos.apellido && campos.correo && campos.usuario && campos.contrasena && campos.imagen){
            formulario.submit()
        }else{
            document.querySelector(`#button-Error`).classList.add('warning');
        }
    });    
})

window.addEventListener("load", function () {
    const loginForm = document.getElementById('form-login');
    const usernameInput = document.getElementById('email');
    const passwordInput = document.getElementById('contrasena');

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!expresiones.correo.test(username)) {
            document.querySelector(`#userAccount-Error`).classList.add('warning');
        }else{
            document.querySelector(`#userAccount-Error`).classList.remove('warning');

            campos['userAccount'] = true;
        }
            
        if (password.length === 0) {
            document.querySelector(`#password-Error`).classList.add('warning');
        }else{
            document.querySelector(`#password-Error`).classList.remove('warning');

            campos['password'] = true;
        }

        if (campos.userAccount && campos.password){
            loginForm.submit()
        }
    });
})