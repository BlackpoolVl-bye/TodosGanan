async function verificarBoleto() {
  const telefono = document.getElementById('telefono').value;
  const boleto = document.getElementById('boleto').value;

  if (!telefono || !boleto) {
    Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    return;
  }

  try {
    // Crear un nuevo boleto
    const response = await fetch('http://localhost:3000/api/boletos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telefono, boleto }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire('Éxito', 'Boleto registrado correctamente.', 'success');
    } else {
      Swal.fire('Error', data.error, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Hubo un problema al registrar el boleto.', 'error');
  }
}

// Función para obtener todos los boletos (opcional, si necesitas mostrar una lista)
async function obtenerBoletos() {
  try {
    const response = await fetch('http://localhost:3000/api/boletos');
    const data = await response.json();
    console.log('Boletos:', data);
  } catch (error) {
    console.error('Error al obtener boletos:', error);
  }
}

// Llamar a la función para obtener boletos (opcional)
obtenerBoletos();