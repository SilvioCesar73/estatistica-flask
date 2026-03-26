let dadosCSV = [];
let cabecalhoCSV = [];

function carregarTesteNormalidade() {
  const panel = document.querySelector('.main-panel');
  if (!panel) return;
  panel.scrollTo({ top: 0, behavior: 'auto' });
  panel.innerHTML = `
    <div class="content-shell normality-shell">
      <section class="page-hero theory-hero compact-hero">
        <span class="eyebrow">Premissas antes do teste</span>
        <h2 class="hero-title-single-line">Testes de normalidade</h2>
        <p class="hero-subtitle-short">Antes de comparar grupos ou calcular correlações paramétricas, vale avaliar se a variável contínua se aproxima de uma distribuição normal.</p>
      </section>

      <section class="theory-section normality-section">
        <div class="theory-section-head">
          <span class="theory-section-number">1</span>
          <div>
            <p class="theory-kicker">Antes do clique</p>
            <h2>O que observar nesta etapa?</h2>
          </div>
        </div>
        <p>A normalidade ajuda a decidir entre testes paramétricos e não paramétricos quando a variável principal é contínua. Aqui, o ideal é combinar <strong>inspeção visual</strong> com <strong>testes formais</strong>.</p>
        <div class="theory-summary-grid">
          <div class="theory-mini-card"><h4>Shapiro-Wilk</h4><p>Costuma ser a escolha preferencial em amostras pequenas e moderadas.</p></div>
          <div class="theory-mini-card"><h4>Kolmogorov-Smirnov</h4><p>Pode ser usado em amostras maiores, mas não deve ser lido de forma isolada.</p></div>
          <div class="theory-mini-card"><h4>Leitura ideal</h4><p>Use histograma, gráfico Q-Q e bom senso metodológico junto do p-valor.</p></div>
        </div>
      </section>

      <section class="normality-tool-grid">
        <article class="surface-card normality-upload-card">
          <h3>1. Envie uma planilha</h3>
          <p>Faça upload de um arquivo <strong>.csv</strong>. A plataforma exibirá apenas as colunas numéricas elegíveis para o teste.</p>
          <label for="arquivo-csv" class="surface-badge">Arquivo CSV</label>
          <input type="file" id="arquivo-csv" accept=".csv" onchange="processarCSV(event)">

          <div id="normality-upload-feedback" class="callout info hidden"></div>

          <div id="variavel-container" class="field-group hidden" style="margin-top:16px;">
            <label for="variavel">Escolha a variável contínua</label>
            <select id="variavel"></select>
          </div>
        </article>

        <article class="surface-card normality-guide-card">
          <h3>2. Como interpretar</h3>
          <div class="normality-test-cards">
            <div class="normality-test-card">
              <h4>Shapiro-Wilk</h4>
              <p>Útil quando a amostra não é muito grande. Se o p-valor for pequeno, a hipótese de normalidade fica menos plausível.</p>
            </div>
            <div class="normality-test-card">
              <h4>Kolmogorov-Smirnov</h4>
              <p>Compara a distribuição observada com uma distribuição teórica. Deve ser lido com cautela e sempre junto da inspeção gráfica.</p>
            </div>
          </div>
          <div class="callout warning" style="margin-top:16px;">
            <strong>Lembrete:</strong> em amostras muito grandes, pequenos desvios podem produzir significância estatística sem grande relevância prática.
          </div>
        </article>
      </section>

      <section class="normality-results-grid">
        <article class="surface-card normality-result-card">
          <h3>3. Aplicar Shapiro-Wilk</h3>
          <p>Indicado quando você quer uma leitura formal rápida da aderência à normalidade.</p>
          <div class="button-row"><button class="primary-button" onclick="aplicarShapiro()">Aplicar Shapiro-Wilk</button></div>
          <div id="resultado-shapiro" class="normality-result-box"></div>
        </article>

        <article class="surface-card normality-result-card">
          <h3>4. Aplicar Kolmogorov-Smirnov</h3>
          <p>Ajuda a complementar a avaliação quando o tamanho amostral é maior ou quando se deseja comparação com distribuição teórica.</p>
          <div class="button-row"><button class="primary-button" onclick="aplicarKolmogorov()">Aplicar Kolmogorov-Smirnov</button></div>
          <div id="resultado-ks" class="normality-result-box"></div>
        </article>
      </section>
    </div>
  `;
}

function processarCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const linhas = e.target.result.split(/\r?\n/).filter((l) => l.trim() !== '');
    cabecalhoCSV = linhas[0].split(',').map((c) => c.trim());
    dadosCSV = linhas.slice(1).map((l) => l.split(',').map((v) => v.trim()));

    const colunasNumericas = [];
    cabecalhoCSV.forEach((col, i) => {
      const amostra = dadosCSV.map((linha) => parseFloat(linha[i])).filter((n) => !Number.isNaN(n));
      if (amostra.length >= 5) colunasNumericas.push({ nome: col, indice: i, n: amostra.length });
    });

    const feedback = document.getElementById('normality-upload-feedback');
    const container = document.getElementById('variavel-container');
    const select = document.getElementById('variavel');

    if (!colunasNumericas.length) {
      feedback.className = 'callout danger';
      feedback.innerHTML = 'Nenhuma coluna numérica com pelo menos 5 observações foi encontrada no arquivo enviado.';
      container.classList.add('hidden');
      return;
    }

    select.innerHTML = colunasNumericas.map((col) => `<option value="${col.indice}">${col.nome} (n = ${col.n})</option>`).join('');
    container.classList.remove('hidden');
    feedback.className = 'callout success';
    feedback.innerHTML = `Arquivo carregado com sucesso. ${colunasNumericas.length} coluna(s) numérica(s) disponível(is) para avaliação.`;
  };
  reader.readAsText(file);
}

function renderResultadoNormalidade(targetId, dados, nomeTeste) {
  const box = document.getElementById(targetId);
  if (!box) return;

  if (dados.erro) {
    box.innerHTML = `<div class="callout danger">❌ Erro: ${dados.erro}</div>`;
    return;
  }

  const classe = dados.normal ? 'success' : 'warning';
  box.innerHTML = `
    <div class="callout ${classe}">
      <strong>${nomeTeste}</strong><br>
      ${dados.mensagem} <strong>(p = ${dados.p_valor})</strong>
    </div>
    <div class="normality-interpretation-note">
      <p><strong>Leitura didática:</strong> este resultado deve ser lido junto com histograma e gráfico Q-Q. Um único teste formal não esgota a avaliação da normalidade.</p>
    </div>
  `;
}

function obterValoresSelecionados() {
  const select = document.getElementById('variavel');
  if (!select) return [];
  const indice = parseInt(select.value, 10);
  return dadosCSV.map((linha) => parseFloat(linha[indice])).filter((n) => !Number.isNaN(n));
}

function aplicarShapiro() {
  const valores = obterValoresSelecionados();
  if (valores.length < 5) {
    document.getElementById('resultado-shapiro').innerHTML = `<div class="callout danger">⚠️ Dados insuficientes para o teste.</div>`;
    return;
  }

  fetch('/api/teste-normalidade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metodo: 'shapiro', valores })
  })
    .then((res) => res.json())
    .then((dados) => renderResultadoNormalidade('resultado-shapiro', dados, 'Shapiro-Wilk'));
}

function aplicarKolmogorov() {
  const valores = obterValoresSelecionados();
  if (valores.length < 5) {
    document.getElementById('resultado-ks').innerHTML = `<div class="callout danger">⚠️ Dados insuficientes para o teste.</div>`;
    return;
  }

  fetch('/api/teste-normalidade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metodo: 'ks', valores })
  })
    .then((res) => res.json())
    .then((dados) => renderResultadoNormalidade('resultado-ks', dados, 'Kolmogorov-Smirnov'));
}

window.carregarTesteNormalidade = carregarTesteNormalidade;
window.processarCSV = processarCSV;
window.aplicarShapiro = aplicarShapiro;
window.aplicarKolmogorov = aplicarKolmogorov;
