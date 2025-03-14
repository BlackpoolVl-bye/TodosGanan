async function verificarBoleto() {
  const telefono = document.getElementById('telefono').value;
  const boleto = document.getElementById('boleto').value;

  if (!telefono || !boleto) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/api/verificar-boleto', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telefono, boleto }),
      });

      const data = await response.json();

      if (response.ok) {
          Swal.fire('Éxito', data.message, 'success');
      } else {
          Swal.fire('Error', data.error, 'error');
      }
  } catch (error) {
      Swal.fire('Error', 'Hubo un problema al verificar el boleto.', 'error');
  }
}