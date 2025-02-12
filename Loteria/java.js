function verificarBoleto() {
    const telefono = document.getElementById("telefono").value;
    const boleto = document.getElementById("boleto").value;
  
    // Validación básica (puedes agregar más validaciones)
    if (telefono === "" || boleto === "") {
      Swal.fire("Error", "Por favor, completa todos los campos.", "error");
      return;
    }
  
    // Lógica de verificación (simulada)
    const numerosGanadores = ["12345", "67890", "13579"];
  
    if (numerosGanadores.includes(boleto)) {
      Swal.fire("¡Felicidades!", "Tu boleto es ganador.", "success");
    } else {
      Swal.fire("Lo sentimos", "Tu boleto no es ganador.", "error");
    }
  }