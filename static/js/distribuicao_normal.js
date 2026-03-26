function carregarDistribuicoes() {
  document.querySelector('.main-panel').innerHTML = `
    <h2 class="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-2">📈 O que é uma Distribuição Normal?</h2>
    <p class="text-gray-800 mb-4">
      A distribuição normal, também conhecida como <strong>“curva de sino”</strong>, é uma das mais importantes na estatística. Muitos testes estatísticos 
      (especialmente os <strong>paramétricos</strong>) pressupõem que os dados sigam essa distribuição.
    </p>

    <div class="flex flex-col items-center mb-6">
      <img src="/static/img/distribuicao_normal.png" class="w-[320px] mx-auto rounded shadow-md mb-2 hover:scale-105 transition-transform duration-300" alt="Curva de distribuição normal">
      <p class="text-sm text-gray-600">Distribuição normal: média, mediana e moda coincidem.</p>
    </div>

    <div class="bg-white border border-blue-100 rounded-md p-4 shadow-sm mb-4">
      <h3 class="text-lg text-blue-600 font-semibold mb-2">🔍 Quando os dados não são normais?</h3>
      <p class="text-gray-800">
        Distribuições <strong>não normais</strong> podem ser assimétricas, achatadas ou apresentar dois picos (bimodais). Nesses casos, o uso de testes 
        <strong>não paramétricos</strong> é mais adequado.
      </p>
    </div>

    <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md mb-4 text-gray-800">
      <p><strong>Exemplo:</strong> Escore de estresse emocional de estudantes pode apresentar assimetria à direita, especialmente após um turno de simulação intensa com situações críticas.</p>
    </div>

    <div class="bg-white border border-green-100 rounded-md p-4 shadow-sm mb-4">
      <h3 class="text-lg text-green-600 font-semibold mb-2">🧪 Como verificar se os dados são normais?</h3>
      <p class="text-gray-800 mb-2">
        Você pode aplicar <strong>testes de normalidade</strong>, que avaliam se os dados seguem uma distribuição normal:
      </p>
      <ul class="list-disc pl-5 text-gray-800">
        <li><strong>Shapiro-Wilk</strong> – ideal para amostras pequenas (n &lt; 50).</li>
        <li><strong>Kolmogorov-Smirnov</strong> – usado em amostras maiores.</li>
        <li><strong>Visualização de histograma ou curva de densidade</strong> – complementa a análise.</li>
      </ul>
    </div>

    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-4 text-gray-800">
      <p><strong>Exemplo prático:</strong> Um pesquisador quer saber se os escores de autoconfiança após uma simulação seguem distribuição normal. 
      Ele aplica o <em>teste de Shapiro-Wilk</em> antes de decidir entre usar teste t ou Mann-Whitney.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-gray-800">
      💡 <strong>Dica:</strong> mesmo que os testes indiquem normalidade, fique atento ao <strong>tamanho da amostra</strong> e à <strong>forma do gráfico</strong>. A interpretação crítica é sempre parte da análise!
    </div>
  `;
}

// Torna a função acessível ao HTML
window.carregarDistribuicoes = carregarDistribuicoes;
