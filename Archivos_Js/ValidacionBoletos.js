async function verificarBoleto() {
  const telefono = document.getElementById('telefono').value;
  const boleto = document.getElementById('boleto').value;

  if (!telefono || !boleto) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }
  
    if (numerosGanadores.includes(boleto)) {
      Swal.fire("¡Felicidades!", "Tu boleto es ganador.", "success");
      window.location.href="Gano.html";
    } else {
      Swal.fire("Lo sentimos", "Tu boleto no es ganador.", "error");
    }
  }