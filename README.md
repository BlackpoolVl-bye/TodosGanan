*Proyecto_TodosGanan*

 cambios que se le hicieron:

    mejoras en la verificacion (en progreso)

    autoamtizacion del registro de los tiques.(en progreso)

    crear una interaccion de admin para vaciar la data de los numeros de loteria (en progreso)

    mejorar el sistema de ruleta (en progreso)

sugerencias futuras para seguridad:

    Protección contra ataques comunes:

        SQL Injection: Usa consultas parametrizadas o un ORM (como Sequelize) para evitar inyecciones SQL.

        XSS (Cross-Site Scripting): Sanitiza los datos que se muestran en la página para evitar la ejecución de scripts maliciosos.

        CSRF (Cross-Site Request Forgery): Implementa tokens CSRF para proteger las solicitudes POST.

cambios en el proyecto:

    se agrego un logion de usuario medio pidrero para evitar informacion comprometedora a la pagina

    *(nota: nunca poner datos de resgitro de pagos directamente en la pagina, eso se tiene que manejar en privado, a nivel de soporte)*