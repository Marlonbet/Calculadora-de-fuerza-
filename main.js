// Función para calcular el FIR
function calcularFIR(pesoCorporal, pesoTotal) {
  return (pesoTotal / pesoCorporal).toFixed(2); // FIR = peso total levantado / peso corporal
}

// Crear la gráfica del medidor FIR
function crearGraficoFIR(valorFIR) {
  const ctx = document.getElementById('grafico-fir').getContext('2d');

  // Si ya existe un gráfico previo, destrúyelo antes de crear uno nuevo
  if (window.firChart) {
    window.firChart.destroy();
  }

  // Crear nuevo gráfico
  window.firChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['FIR', 'Resto'],
      datasets: [
        {
          data: [valorFIR, 5 - valorFIR], // FIR máximo = 5 (arbitrario)
          backgroundColor: ['#4CAF50', '#E0E0E0'], // Colores del medidor
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '80%',
      plugins: {
        tooltip: { enabled: false }, // Ocultar tooltip
        legend: { display: false }, // Ocultar leyenda
        title: {
          display: true,
          text: `FIR: ${valorFIR}`, // Mostrar FIR en el centro
          font: { size: 18 },
        },
      },
    },
  });
}

// Manejar el formulario y cálculo
document.getElementById('fir-form')?.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener valores ingresados por el usuario
  const pesoCorporal = parseFloat(document.getElementById('peso-corporal').value);
  const pesoTotal = parseFloat(document.getElementById('peso-total').value);

  // Validar que los valores sean números válidos
  if (isNaN(pesoCorporal) || isNaN(pesoTotal) || pesoCorporal <= 0 || pesoTotal <= 0) {
    alert('Por favor, introduce valores válidos.');
    return;
  }

  // Calcular FIR
  const valorFIR = calcularFIR(pesoCorporal, pesoTotal);

  // Mostrar resultado en texto
  document.getElementById('resultado-fir').innerText = `Tu FIR es: ${valorFIR}`;

  // Generar gráfica
  crearGraficoFIR(valorFIR);
});