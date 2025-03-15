async function crearUsuario() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;

  if (!nombre || !apellido || !telefono) {
    Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: Math.floor(Math.random() * 1000), // Generar un ID aleatorio (puedes cambiarlo)
        Nombre: nombre,
        Apellido: apellido,
        Telf: telefono,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire('Éxito', 'Usuario registrado correctamente.', 'success');
    } else {
      Swal.fire('Error', data.error, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
  }
}

async function obtenerNumeros() {
  try {
    const response = await fetch('http://localhost:3000/api/numeros');
    const data = await response.json();
    console.log('Números:', data);
  } catch (error) {
    console.error('Error al obtener números:', error);
  }
}

// Llamar a la función para obtener números (opcional)
obtenerNumeros();