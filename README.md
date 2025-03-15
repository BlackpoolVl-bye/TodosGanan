Proyecto_TodosGanan
 cambios que se le hicieron:

 mejoras en la verificacion (en progreso)
 autoamtizacion del registro de los tiques.(en progreso)
 agregar un registro de usuarios para la base de datos (en progreso, ya se esta viendo con la base de datos)
 crear una interaccion de admin para vaciar la data de los numeros de loteria (en progreso)
 mejorar el sistema de ruleta (en progreso)

mejoras en la estructura y control de archivos:

vamos a tratar de que el proyecto sea modular y maneje esta estructura en el desarrollo

les dejo un pequeño mapeado de como van a ir las estucturas de manejo de archivo para que sea mas responsivo,
modular y comodo de trabajar:

/proyecto
│
├── /CSS
│   ├── estilo.css       # Estilos generales
│   ├── header.css       # Estilos del header
│   └── footer.css       # Estilos del footer
│
├── /JS
│   ├── ValidacionBoletos.js  # Lógica de validación
│   └── api.js                # Funciones para interactuar con el backend
│
├── /SRC
│   └── main.html         # Página de prueba
│
├── index.html            # Página principal
└── Server.js             # Servidor en Node.js

/Jesus
 Creacion del HTML (INICIO.html, Gano.html y cambio del Verficador.html). Esctructura nueva de index.html
 Modificacion conjunta con CSS 10/10