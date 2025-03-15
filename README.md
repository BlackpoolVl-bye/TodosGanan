Proyecto_TodosGanan
 cambios que se le hicieron:
 configuracion modular
 agrego de dominio
 mejoras en la verificacion (en progreso)
 Boton validacion (listo desde mi punto de vista aaron no me mates porfa :>)
 Conexion a la base de datos (Listo)
 autoamtizacion del registro de los tiques.(en progreso)

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