function desenharGrafico(valores) {
  const ctx = document.getElementById("grafico-normalidade").getContext("2d");

  const media = math.mean(valores);
  const desvio = math.std(valores);

  const histograma = criarHistograma(valores, 10); // você pode usar d3.js ou fazer no braço

  const curvaNormal = histograma.x.map(x =>
    (1 / (desvio * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((x - media) / desvio) ** 2)
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: histograma.x,
      datasets: [
        {
          label: "Histograma",
          data: histograma.y,
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: "Curva Normal Teórica",
          data: curvaNormal,
          type: 'line',
          borderColor: 'red',
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Valores' } },
        y: { title: { display: true, text: 'Frequência / Densidade' } }
      }
    }
  });
}
