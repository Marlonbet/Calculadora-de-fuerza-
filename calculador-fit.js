function calcularIFR() {
  // Obtener datos del usuario
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const banca = parseFloat(document.getElementById("banca").value);
  const biceps = parseFloat(document.getElementById("biceps").value);
  const prensa = parseFloat(document.getElementById("prensa").value);

  // Validar que los campos no estén vacíos
  if (isNaN(peso) || isNaN(altura) || isNaN(banca) || isNaN(biceps) || isNaN(prensa)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Cálculos de IFR
  const ifrBanca = banca / peso;
  const ifrBiceps = biceps / peso;
  const ifrPrensa = prensa / peso;

  // Determinar nivel por rangos de IFR
  const nivelBanca = determinarNivel("banca", ifrBanca);
  const nivelBiceps = determinarNivel("biceps", ifrBiceps);
  const nivelPrensa = determinarNivel("prensa", ifrPrensa);

  // Mostrar resultados
  const resultadoDiv = document.getElementById("resultado-ifr");
  resultadoDiv.innerHTML = `
    <h3>Resultados IFR</h3>
    <div class="graficas">
      <div class="grafica-item">
        <p>Press de banca: ${ifrBanca.toFixed(2)} (${nivelBanca})</p>
        <div class="barra-contenedor">
          <div class="barra" style="width: ${ifrBanca * 50}%; background-color: ${colorNivel(nivelBanca)};"></div>
        </div>
      </div>
      <div class="grafica-item">
        <p>Bíceps con barra: ${ifrBiceps.toFixed(2)} (${nivelBiceps})</p>
        <div class="barra-contenedor">
          <div class="barra" style="width: ${ifrBiceps * 50}%; background-color: ${colorNivel(nivelBiceps)};"></div>
        </div>
      </div>
      <div class="grafica-item">
        <p>Prensa para piernas: ${ifrPrensa.toFixed(2)} (${nivelPrensa})</p>
        <div class="barra-contenedor">
          <div class="barra" style="width: ${ifrPrensa * 50}%; background-color: ${colorNivel(nivelPrensa)};"></div>
        </div>
      </div>
    </div>
  `;
}

// Función para determinar el nivel basado en el rango de IFR
function determinarNivel(ejercicio, ifr) {
  const rangos = {
    banca: { bajo: 0.6, medio: 1.0, alto: 1.5 },
    biceps: { bajo: 0.3, medio: 0.6, alto: 0.9 },
    prensa: { bajo: 1.0, medio: 1.8, alto: 2.5 },
  };

  const rango = rangos[ejercicio];

  if (ifr < rango.bajo) return "Bajo";
  if (ifr < rango.medio) return "Medio";
  return "Alto";
}

// Función para determinar el color basado en el nivel
function colorNivel(nivel) {
  switch (nivel) {
    case "Bajo":
      return "#ff4d4d"; // Rojo
    case "Medio":
      return "#ffcc00"; // Amarillo
    case "Alto":
      return "#4caf50"; // Verde
    default:
      return "#ffffff"; // Blanco
  }
}

// Función para volver a la pantalla principal
function volverAPrincipal() {
  window.location.href = "index.html"; // Cambia esto si el nombre del archivo principal es diferente
}
