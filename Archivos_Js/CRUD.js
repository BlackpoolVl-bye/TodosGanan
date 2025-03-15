// Array para almacenar los datos
let datos = [];
let indiceEdicion = -1;

// Función para agregar o actualizar datos
function agregarOActualizar(nombre, edad) {
    if (indiceEdicion === -1) {
        // Agregar nuevo registro
        datos.push({ nombre, edad });
    } else {
        // Actualizar registro existente
        datos[indiceEdicion] = { nombre, edad };
        indiceEdicion = -1; // Resetear índice de edición
    }
    mostrarDatos();
}

// Función para mostrar los datos en la consola
function mostrarDatos() {
    console.clear(); // Limpiar la consola
    console.table(datos); // Mostrar datos en formato tabla
}

// Función para editar un registro
function editar(index) {
    const dato = datos[index];
    console.log(`Editando: ${dato.nombre}, Edad: ${dato.edad}`);
    indiceEdicion = index; // Guardar índice de edición
}

// Función para eliminar un registro
function eliminar(index) {
    datos.splice(index, 1);
    mostrarDatos();
}

// Ejemplo de uso
agregarOActualizar('Juan', 25);
agregarOActualizar('Ana', 30);
editar(0); // Editar el primer registro
agregarOActualizar('Juan', 26); // Actualizar el registro editado
eliminar(1); // Eliminar el segundo registro