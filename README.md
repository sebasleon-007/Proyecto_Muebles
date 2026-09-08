#Proyecto_Muebles

Tienda de muebles en línea

#Estructura del proyecto

Proyecto_Muebles
 index.html            # Página principal 
 InicioSesion.html     # Inicio de sesión
 admin.html            # Modo administrador para ver compras de usuarios
 registro.html         # Registro de usuario
 catalogo.html         # Catálogo de productos
 contacto.html         # Información de contacto y formulario
 tutoriales.html       # Tutoriales con video embebido
 pasostutoriales1.html  # Pasos: Escritorio
 pasostutoriales2.html  # Pasos: Velador
 pasostutoriales3.html  # Pasos: Armario
 pasostutoriales4.html  # Pasos: Mueble de cocina
 carrito.html           # Carrito de compras
 estilos
│  styles.css          # Hoja de estilos CSS
 metodos
│  sripts.js           # JavaScript: header, footer, validaciones y LocalStorage

#LocalStorage

El proyecto usa el método LocalStorage del navegador para guardar datos:

Usuarios registrados  (usuarios)  (registro.html) guarda y (InicioSesion.html) verifica 
Carrito de compras  (carrito)  (catalogo.html) agrega y (carrito.html) muestra/elimina 

#Características

Estructura HTML5 semántica (<header>, <nav>, <main>, <section>, <article>, <footer>)
Hojas de estilos CSS externas
Formularios de registro, inicio de sesión y contacto con validación en JavaScript
Mensajes de error claros y específicos junto a cada campo
Páginas interconectadas 
Videos embebidos en la página de tutoriales
Carrito de compras que usa el LocatStorage
Header y footer compartidos
