function injectarHeader() {
    document.getElementById("header").innerHTML = `
        <section>
            <img src="https://static.vecteezy.com/system/resources/previews/021/011/502/original/minimalist-furniture-logo-design-template-vector.jpg" alt="Logo tienda de muebles" class="logo-header">
            <h1 class="no-select">Tienda de muebles</h1>
        </section>

        <nav>
            <a href="index.html">Inicio</a>
            <a href="contacto.html">Contacto</a>
            <a href="catalogo.html">Catalogo</a>
            <a href="tutoriales.html">Tutoriales</a>
            <a href="registro.html">Registrarse</a>
            <a href="InicioSesion.html">Iniciar sesion</a>
            <a href="carrito.html">Carrito 🛒</a>
        </nav>
    `;
}

function injectarFooter() {
    let footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = `
            <p>&copy; 2026 Tienda de Muebles</p>
            <p>
                <a href="contacto.html">Contacto</a> |
                <a href="catalogo.html">Catálogo</a> |
                <a href="tutoriales.html">Tutoriales</a>
            </p>
        `;
    }
}

injectarHeader();
injectarFooter();

function validarString(text, min, max) {
    if (typeof text !== "string") {
        return false;
    }
    let trimmedText = text.trim();
    if (trimmedText.length >= min && trimmedText.length <= max) {
        return true;
    } else {
        return false;
    }
}

function validarCorreo(value) {
    let trimmedValue = value.trim().toLowerCase();

    if (trimmedValue === "") {
        return false;
    }

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(trimmedValue)) {
        return true;
    } else {
        return false;
    }
}

function validarContrasena(value) {
    if (value.trim().length >= 8) {
        return true;
    } else {
        return false;
    }
}

function apuntarInput(elemento, variable, valor) {
    if (valor) {
        elemento.classList.remove("border-red");
        return true;
    } else {
        elemento.classList.add("border-red");
        elemento.focus();
        return false;
    }
}

function mostrarError(idError, mensaje) {
    let elem = document.getElementById(idError);
    if (elem) {
        elem.textContent = mensaje;
    }
}

function limpiarError(idError) {
    let elem = document.getElementById(idError);
    if (elem) {
        elem.textContent = "";
    }
}

function validarRegistro(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("correo");
    let usuario = document.getElementById("nombre-usuario");
    let contrasena = document.getElementById("contrasena");
    let confirmar = document.getElementById("confirmar-contrasena");
    let valido = true;

    if (validarString(nombre.value, 2, 30)) {
        apuntarInput(nombre, "nombre", true);
        limpiarError("error-nombre");
    } else {
        apuntarInput(nombre, "nombre", false);
        mostrarError("error-nombre", "El nombre debe tener entre 2 y 30 caracteres.");
        valido = false;
    }

    if (validarCorreo(correo.value)) {
        apuntarInput(correo, "correo", true);
        limpiarError("error-correo");
    } else {
        apuntarInput(correo, "correo", false);
        mostrarError("error-correo", "Ingresa un correo electrónico válido (ej: usuario@correo.com).");
        valido = false;
    }

    if (validarString(usuario.value, 3, 20)) {
        apuntarInput(usuario, "usuario", true);
        limpiarError("error-usuario");
    } else {
        apuntarInput(usuario, "usuario", false);
        mostrarError("error-usuario", "El nombre de usuario debe tener entre 3 y 20 caracteres.");
        valido = false;
    }

    if (validarContrasena(contrasena.value)) {
        apuntarInput(contrasena, "contraseña", true);
        limpiarError("error-contrasena");
    } else {
        apuntarInput(contrasena, "contraseña", false);
        mostrarError("error-contrasena", "La contraseña debe tener al menos 8 caracteres.");
        valido = false;
    }

    if (confirmar.value === contrasena.value && confirmar.value !== "") {
        apuntarInput(confirmar, "confirmación", true);
        limpiarError("error-confirmar");
    } else {
        apuntarInput(confirmar, "confirmación", false);
        mostrarError("error-confirmar", "Las contraseñas no coinciden.");
        valido = false;
    }

    if (valido) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioNuevo = {
            nombre: nombre.value.trim(),
            correo: correo.value.trim().toLowerCase(),
            usuario: usuario.value.trim(),
            contrasena: contrasena.value
        };
        usuarios.push(usuarioNuevo);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registro exitoso. Bienvenido, " + nombre.value + "! Ya puedes iniciar sesión.");
        window.location.href = "InicioSesion.html";
    }

    return false;
}

function validarLogin(event) {
    event.preventDefault();

    let usuario = document.getElementById("nombre-usuario");
    let contrasena = document.getElementById("contrasena");

    if (usuario.value.trim().toLowerCase() === "grupo-muebles2026@gmail.com" && contrasena.value === "grupo-muebles2026") {
        localStorage.setItem("admin", "true");
        window.location.href = "admin.html";
        return false;
    }

    let valido = true;

    if (validarString(usuario.value, 3, 20)) {
        apuntarInput(usuario, "usuario", true);
        limpiarError("error-usuario");
    } else {
        apuntarInput(usuario, "usuario", false);
        mostrarError("error-usuario", "Ingresa tu nombre de usuario (entre 3 y 20 caracteres).");
        valido = false;
    }

    if (validarContrasena(contrasena.value)) {
        apuntarInput(contrasena, "contraseña", true);
        limpiarError("error-contrasena");
    } else {
        apuntarInput(contrasena, "contraseña", false);
        mostrarError("error-contrasena", "La contraseña debe tener al menos 8 caracteres.");
        valido = false;
    }

    if (valido) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let encontrado = usuarios.find(function (u) {
            return u.usuario === usuario.value.trim() && u.contrasena === contrasena.value;
        });

        if (encontrado) {
            localStorage.setItem("sesion", encontrado.nombre);
            alert("Sesión iniciada correctamente. Bienvenido, " + encontrado.nombre + "!");
            window.location.href = "index.html";
        } else {
            mostrarError("error-usuario", "Usuario o contraseña incorrectos. Si no tienes cuenta, regístrate.");
        }
    }

    return false;
}

function validarContacto(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre-contacto");
    let correo = document.getElementById("correo-contacto");
    let mensaje = document.getElementById("mensaje-contacto");
    let valido = true;

    if (validarString(nombre.value, 2, 30)) {
        apuntarInput(nombre, "nombre", true);
        limpiarError("error-nombre");
    } else {
        apuntarInput(nombre, "nombre", false);
        mostrarError("error-nombre", "El nombre debe tener entre 2 y 30 caracteres.");
        valido = false;
    }

    if (validarCorreo(correo.value)) {
        apuntarInput(correo, "correo", true);
        limpiarError("error-correo");
    } else {
        apuntarInput(correo, "correo", false);
        mostrarError("error-correo", "Ingresa un correo electrónico válido.");
        valido = false;
    }

    if (validarString(mensaje.value, 10, 500)) {
        apuntarInput(mensaje, "mensaje", true);
        limpiarError("error-mensaje");
    } else {
        apuntarInput(mensaje, "mensaje", false);
        mostrarError("error-mensaje", "El mensaje debe tener entre 10 y 500 caracteres.");
        valido = false;
    }

    if (valido) {
        alert("Mensaje enviado correctamente. Te contactaremos pronto.");
        event.target.reset();
    }

    return false;
}

let carrito = [];

function agregarAlCarrito(nombre, precio, codigo) {
    carrito.push({ codigo: codigo, nombre: nombre, precio: precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " agregado al carrito.");
}

function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let totalElem = document.getElementById("total-carrito");
    if (!lista) return;

    let data = localStorage.getItem("carrito");
    carrito = data ? JSON.parse(data) : [];

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío. Visita el <a href='catalogo.html'>catálogo</a> para agregar productos.</p>";
        if (totalElem) totalElem.textContent = "";
        return;
    }

    let html = "";
    let total = 0;
    carrito.forEach(function (item, index) {
        total += item.precio;
        html += `
            <div class="item-carrito">
                <span>${item.codigo ? item.codigo + " - " : ""}${item.nombre}</span>
                <span>$${item.precio.toLocaleString('es-CL')}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });

    lista.innerHTML = html;
    if (totalElem) totalElem.textContent = "Total: $" + total.toLocaleString('es-CL');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function finalizarCompra() {
    let data = localStorage.getItem("carrito");
    carrito = data ? JSON.parse(data) : [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let agrupados = [];
    carrito.forEach(function (item) {
        let existente = agrupados.find(function (a) {
            return a.codigo === item.codigo;
        });
        if (existente) {
            existente.cantidad += 1;
        } else {
            agrupados.push({ codigo: item.codigo, nombre: item.nombre, precio: item.precio, cantidad: 1 });
        }
    });

    let total = 0;
    agrupados.forEach(function (a) {
        total += a.precio * a.cantidad;
    });

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push({
        folio: pedidos.length + 1,
        fecha: new Date().toLocaleString("es-CL"),
        cliente: localStorage.getItem("sesion") || "Invitado",
        productos: agrupados,
        total: total
    });
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.removeItem("carrito");
    carrito = [];

    alert("Compra finalizada. Factura guardada.");
    mostrarCarrito();
}

function mostrarAdmin() {
    let contenedor = document.getElementById("pedidos");
    if (!contenedor) return;

    if (localStorage.getItem("admin") !== "true") {
        window.location.href = "InicioSesion.html";
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let info = document.getElementById("admin-info");
    if (info) {
        if (pedidos.length === 0) {
            info.innerHTML = "<p>No hay pedidos registrados aún.</p>";
        } else {
            info.innerHTML = "<p>Total de pedidos: " + pedidos.length + "</p>";
        }
    }

    if (pedidos.length === 0) {
        contenedor.innerHTML = "";
        return;
    }

    let html = "";
    pedidos.forEach(function (p) {
        html += "<h3>Factura N° " + p.folio + " - " + p.fecha + " - Cliente: " + p.cliente + "</h3>";
        p.productos.forEach(function (prod) {
            html += `
                <div class="item-carrito">
                    <span>${prod.codigo} - ${prod.nombre} x${prod.cantidad}</span>
                    <span>$${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</span>
                </div>
            `;
        });
        html += '<p class="total">Total: $' + p.total.toLocaleString('es-CL') + '</p>';
    });

    contenedor.innerHTML = html;
}

function cerrarAdmin() {
    localStorage.removeItem("admin");
    window.location.href = "InicioSesion.html";
}

mostrarCarrito();
mostrarAdmin();