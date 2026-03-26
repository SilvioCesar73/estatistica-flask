function carregarTiposTestes() {
  document.querySelector('.main-panel').innerHTML = `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-blue-700 flex items-center gap-2">
        📊 Entenda os Tipos de Testes Estatísticos
      </h2>
      <p class="text-gray-700">
        Antes de escolher um teste, é importante entender a diferença entre testes <strong>paramétricos</strong> e <strong>não paramétricos</strong>.
      </p>

      <div class="bg-gray-50 rounded-md shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-blue-600 flex items-center gap-2">🧪 Testes Paramétricos</h3>
        <ul class="list-disc pl-5 text-gray-800 mt-2 space-y-1">
          <li>Assumem que os dados seguem uma <strong>distribuição normal</strong>.</li>
          <li>Usam parâmetros como média e desvio padrão.</li>
          <li>Exigem variáveis numéricas (contínuas ou intervalares).</li>
          <li>São mais sensíveis e <strong>mais poderosos</strong> quando os pressupostos são atendidos.</li>
        </ul>
        <p class="mt-3 text-gray-800">
          <strong>Exemplos comuns:</strong> Teste t, ANOVA, Correlação de Pearson.
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md mt-4">
          <p class="font-semibold">👩‍⚕️ Exemplos em simulação em saúde:</p>
          <ul class="list-disc pl-5 mt-2 text-gray-700 space-y-1">
            <li><strong>Teste t independente:</strong> comparar a média de desempenho entre um grupo de estudantes que participou de um cenário de simulação com feedback e outro sem feedback.</li>
            <li><strong>ANOVA:</strong> avaliar se há diferença entre três grupos de estudantes (simulação tradicional, com briefing estruturado, virtual) quanto à nota final em um checklist clínico.</li>
          </ul>
        </div>
      </div>

      <div class="bg-gray-50 rounded-md shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-purple-600 flex items-center gap-2">🧪 Testes Não Paramétricos</h3>
        <ul class="list-disc pl-5 text-gray-800 mt-2 space-y-1">
          <li><strong>Não exigem distribuição normal.</strong></li>
          <li>São usados quando os dados são ordinais, assimétricos ou com poucos casos.</li>
          <li>Menos sensíveis, mas mais seguros quando os pressupostos paramétricos não são atendidos.</li>
        </ul>
        <p class="mt-3 text-gray-800">
          <strong>Exemplos comuns:</strong> Mann-Whitney, Kruskal-Wallis, Wilcoxon, Qui-quadrado.
        </p>
        <div class="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md mt-4">
          <p class="font-semibold">👨‍⚕️ Exemplos em simulação em saúde:</p>
          <ul class="list-disc pl-5 mt-2 text-gray-700 space-y-1">
            <li><strong>Mann-Whitney:</strong> comparar a mediana do escore de confiança entre estudantes que participaram ou não de uma simulação de emergência obstétrica, quando os dados não são normais.</li>
            <li><strong>Qui-quadrado:</strong> verificar associação entre o tipo de simulação utilizada (virtual, presencial) e a proporção de estudantes que classificaram a experiência como "muito satisfatória".</li>
          </ul>
        </div>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-gray-800">
        💡 <strong>Dica:</strong> Sempre que possível, verifique se os dados seguem distribuição normal antes de escolher um teste paramétrico. Se não tiver certeza, opte por um teste não paramétrico!
      </div>
    </div>
  `;
}

// Torna a função visível globalmente
window.carregarTiposTestes = carregarTiposTestes;
