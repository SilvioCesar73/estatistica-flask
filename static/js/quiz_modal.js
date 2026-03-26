(function () {
  const HELP = {
    grupos: `1 grupo → análise intra-grupo\n2 grupos → comparação entre grupos\n3 ou mais → comparação múltipla`,
    repeticao: `Marque Sim quando a mesma pessoa/unidade é medida mais de uma vez.`,
    variavel: `Contínua, ordinal, categórica, binária ou tempo até evento.`,
    objetivo: `Diferença, associação/risco, predição, concordância ou correlação.`,
    independentes: `Independentes = grupos distintos. Pareados = mesmas pessoas ou pares emparelhados.`,
    distribuicao: `A normalidade só entra em cena quando a variável principal é contínua.`,
    momentos: `Número de momentos em que cada participante foi observado.`
  };

  const icon = (k) => `<span class="help group relative cursor-pointer ml-1 text-blue-800">❔<span class="tooltip hidden group-hover:block whitespace-pre-line">${HELP[k]}</span></span>`;

  function optionGrid(name, options, disabled = false) {
    return `<div class="quiz-options-grid">${options.map(opt => `
      <label class="quiz-option-item"><input type="radio" name="${name}" value="${opt.value}" ${disabled ? 'disabled' : ''}> <span>${opt.label}</span></label>`).join('')}</div>`;
  }

  function htmlQuiz() {
    return `
      <div class="content-shell quiz-page-shell">
        <section class="page-hero theory-hero compact-hero">
          <span class="eyebrow">Ferramenta de apoio</span>
          <h2 class="hero-title-single-line">Ferramenta de seleção de teste</h2>
          <p class="hero-subtitle-short">Esta enquete oferece uma direção didática para a escolha do teste estatístico. A decisão final depende do delineamento do estudo, da natureza dos dados e do julgamento metodológico de quem analisa.</p>
        </section>

        <div class="quiz-shell cleaner-quiz-shell">
          <form id="quiz-form" class="quiz-form-grid cleaner-quiz-grid">
            <div class="quiz-question-card">
              <p class="quiz-question-title">1. Grupos comparados ${icon('grupos')}</p>
              ${optionGrid('grupos', [
                { value: '1', label: '1 grupo' },
                { value: '2', label: '2 grupos' },
                { value: '3', label: '3 ou mais' }
              ])}
            </div>

            <div class="quiz-question-card">
              <p class="quiz-question-title">2. Repetição ${icon('repeticao')}</p>
              ${optionGrid('repeticao', [
                { value: 'sim', label: 'Sim (pareado)' },
                { value: 'nao', label: 'Não' }
              ])}
            </div>

            <div class="quiz-question-card">
              <p class="quiz-question-title">3. Tipo da variável ${icon('variavel')}</p>
              ${optionGrid('variavel', [
                { value: 'continua', label: 'Contínua' },
                { value: 'ordinal', label: 'Ordinal' },
                { value: 'categorica', label: 'Categórica' },
                { value: 'binaria', label: 'Binária' },
                { value: 'tempo', label: 'Tempo até evento' }
              ])}
            </div>

            <div class="quiz-question-card">
              <p class="quiz-question-title">4. Objetivo ${icon('objetivo')}</p>
              ${optionGrid('objetivo', [
                { value: 'diferenca', label: 'Diferença' },
                { value: 'associacao', label: 'Associação / Risco' },
                { value: 'predicao', label: 'Predição' },
                { value: 'concordancia', label: 'Concordância' },
                { value: 'correlacao', label: 'Correlação' }
              ])}
            </div>

            <div class="quiz-question-card compact-card">
              <p class="quiz-question-title">5. Independentes ou pareados? ${icon('independentes')}</p>
              ${optionGrid('indep', [
                { value: 'indep', label: 'Independentes' },
                { value: 'pareado', label: 'Pareados' }
              ], true)}
            </div>

            <div class="quiz-question-card compact-card">
              <p class="quiz-question-title">6. Distribuição (contínua) ${icon('distribuicao')}</p>
              ${optionGrid('norm', [
                { value: 'normal', label: 'Normal' },
                { value: 'nao-normal', label: 'Não normal / não sei' }
              ], true)}
            </div>

            <div class="quiz-question-card compact-card">
              <p class="quiz-question-title">7. Número de momentos ${icon('momentos')}</p>
              ${optionGrid('momentos', [
                { value: '2', label: 'Dois' },
                { value: '3', label: 'Três ou mais' }
              ], true)}
            </div>

            <div class="quiz-actions-card cleaner-actions-card">
              <div class="button-row"><button type="button" class="quiz-btn" onclick="gerarSugestaoTeste()">Ver sugestão</button></div>
              <div id="aviso-inconsistencia" class="quiz-feedback quiz-feedback-warning hidden"></div>
              <div id="sugestao-teste" class="quiz-suggestion-box"></div>
            </div>
          </form>

          <section class="surface-card quiz-table-card">
            <div class="quiz-table-header">
              <h3>Quadro de escolha de teste estatístico</h3>
              <p>Resumo prático para consulta rápida, organizado por objetivo da análise.</p>
            </div>
            ${htmlQuadroTestes()}
          </section>
        </div>
      </div>`;
  }

  function htmlQuadroTestes() {
    return `
      <div class="quadro-testes table-shell quiz-table-shell">
        <table>
          <thead>
            <tr>
              <th>Objetivo da análise</th>
              <th>Variável dependente</th>
              <th>Variável independente</th>
              <th>Teste sugerido</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" class="quiz-table-section">Comparação entre grupos</td></tr>
            <tr><td>Comparar dois grupos independentes</td><td>Contínua normal</td><td>Categórica binária</td><td><strong>Teste t independente</strong></td></tr>
            <tr><td>Comparar dois grupos independentes</td><td>Ordinal ou contínua não normal</td><td>Categórica binária</td><td><strong>Mann-Whitney</strong></td></tr>
            <tr><td>Comparar mais de dois grupos independentes</td><td>Contínua normal</td><td>Categórica com 3+ categorias</td><td><strong>ANOVA</strong></td></tr>
            <tr><td>Comparar mais de dois grupos independentes</td><td>Ordinal ou contínua não normal</td><td>Categórica com 3+ categorias</td><td><strong>Kruskal-Wallis</strong></td></tr>

            <tr><td colspan="4" class="quiz-table-section">Comparação dentro do mesmo grupo</td></tr>
            <tr><td>Comparar dois momentos no mesmo grupo</td><td>Contínua normal</td><td>Tempo</td><td><strong>Teste t pareado</strong></td></tr>
            <tr><td>Comparar dois momentos no mesmo grupo</td><td>Ordinal ou contínua não normal</td><td>Tempo</td><td><strong>Wilcoxon</strong></td></tr>
            <tr><td>Comparar duas medidas pareadas binárias</td><td>Binária</td><td>Tempo</td><td><strong>McNemar</strong></td></tr>

            <tr><td colspan="4" class="quiz-table-section">Associação e correlação</td></tr>
            <tr><td>Associação entre variáveis categóricas</td><td>Categórica</td><td>Categórica</td><td><strong>Qui-quadrado</strong></td></tr>
            <tr><td>Associação categórica com contagens pequenas</td><td>Categórica</td><td>Categórica</td><td><strong>Fisher</strong></td></tr>
            <tr><td>Relação linear entre variáveis contínuas</td><td>Contínua normal</td><td>Contínua normal</td><td><strong>Pearson</strong></td></tr>
            <tr><td>Relação monotônica</td><td>Ordinal ou contínua sem normalidade</td><td>Ordinal ou contínua</td><td><strong>Spearman</strong></td></tr>

            <tr><td colspan="4" class="quiz-table-section">Qualidade de medidas e instrumentos</td></tr>
            <tr><td>Acordo entre avaliadores categóricos</td><td>Categórica</td><td>Avaliador 1 × Avaliador 2</td><td><strong>Kappa</strong></td></tr>
            <tr><td>Concordância entre avaliadores numéricos</td><td>Contínua</td><td>2 ou mais avaliadores</td><td><strong>ICC</strong></td></tr>
            <tr><td>Consistência interna de escala</td><td>Itens Likert / somativos</td><td>Mesmo construto</td><td><strong>Alfa de Cronbach / Ômega</strong></td></tr>
          </tbody>
        </table>
      </div>`;
  }

  function obterObjetivosValidos(grupos, repeticao, variavel) {
    if (typeof sugestoesTestes === 'undefined') {
      const objetivoPermitidoPorVariavel = {
        continua: ['diferenca', 'associacao', 'predicao', 'correlacao'],
        ordinal: ['diferenca', 'associacao', 'correlacao'],
        categorica: ['associacao', 'concordancia'],
        binaria: ['associacao', 'diferenca'],
        tempo: ['associacao', 'predicao']
      };
      return objetivoPermitidoPorVariavel[variavel] || [];
    }

    const objetivosValidos = new Set();
    sugestoesTestes.forEach((teste) => {
      const gruposCompativel = !grupos || teste.grupos === grupos || teste.grupos === 'any';
      const repeticaoCompativel = !repeticao || teste.repeticao === repeticao;
      const variavelCompativel = !variavel || teste.variavel === variavel;
      if (gruposCompativel && repeticaoCompativel && variavelCompativel) objetivosValidos.add(teste.objetivo);
    });

    if (variavel === 'ordinal') objetivosValidos.add('correlacao');
    if (variavel === 'categorica') objetivosValidos.add('concordancia');
    return Array.from(objetivosValidos);
  }

  function atualizarEstado(form) {
    const v = (n) => form.querySelector(`input[name="${n}"]:checked`)?.value;
    const indepOK = v('grupos') !== '1' || v('objetivo') === 'diferenca';
    form.querySelectorAll('input[name="indep"]').forEach((i) => {
      i.disabled = !indepOK;
      if (!indepOK) i.checked = false;
    });

    const needNorm = v('variavel') === 'continua' && ['diferenca', 'correlacao'].includes(v('objetivo'));
    form.querySelectorAll('input[name="norm"]').forEach((i) => {
      i.disabled = !needNorm;
      if (!needNorm) i.checked = false;
    });

    const rep = v('repeticao') === 'sim';
    form.querySelectorAll('input[name="momentos"]').forEach((i) => {
      i.disabled = !rep;
      if (!rep) i.checked = false;
    });
  }

  function aplicarRegrasEspecificas(form) {
    const v = (n) => form.querySelector(`input[name="${n}"]:checked`)?.value;
    const aviso = document.getElementById('aviso-inconsistencia');
    const mensagens = [];
    const objetivoInputs = form.querySelectorAll('input[name="objetivo"]');

    if (v('variavel')) {
      const objetivosValidos = obterObjetivosValidos(v('grupos'), v('repeticao'), v('variavel'));
      objetivoInputs.forEach((i) => {
        const desabilitar = !objetivosValidos.includes(i.value);
        i.disabled = desabilitar;
        if (desabilitar) i.checked = false;
      });
    } else {
      objetivoInputs.forEach((i) => { i.disabled = false; });
    }

    if (v('variavel') !== 'continua' && ['diferenca', 'correlacao'].includes(v('objetivo'))) mensagens.push('ℹ️ Normalidade só entra em cena quando a variável principal é contínua.');
    if (v('grupos') === '1' && v('indep') === 'indep') mensagens.push('⚠️ Um único grupo não costuma ser descrito como independente em comparação entre grupos.');
    if (v('repeticao') === 'sim' && v('indep') === 'indep') mensagens.push('⚠️ Se há medidas repetidas, a estrutura tende a ser pareada.');

    aviso.innerHTML = mensagens.join('<br>');
    aviso.classList.toggle('hidden', mensagens.length === 0);
  }

  function gerarSugestaoTeste() {
    const g = (n) => document.querySelector(`input[name="${n}"]:checked`)?.value || '';
    const f = {
      grupos: g('grupos'),
      repeticao: g('repeticao'),
      variavel: g('variavel'),
      objetivo: g('objetivo'),
      indep: g('indep'),
      norm: g('norm'),
      momentos: g('momentos')
    };

    const out = document.getElementById('sugestao-teste');
    const aviso = document.getElementById('aviso-inconsistencia');

    if (!f.grupos || !f.repeticao || !f.variavel || !f.objetivo) {
      out.innerHTML = '<p class="quiz-feedback quiz-feedback-error">⚠️ Preencha as quatro primeiras perguntas.</p>';
      aviso.classList.add('hidden');
      return;
    }

    const lista = typeof sugestoesTestes !== 'undefined' ? sugestoesTestes.filter((t) =>
      (t.grupos === f.grupos || t.grupos === 'any') &&
      t.repeticao === f.repeticao &&
      t.variavel === f.variavel &&
      t.objetivo === f.objetivo &&
      (!t.indep || f.indep === '' || f.grupos === '1' || t.indep === f.indep) &&
      (!t.norm || t.norm === f.norm) &&
      (!t.momentos || t.momentos === f.momentos)
    ) : [];

    out.innerHTML = lista.length ? `
      <div class="quiz-feedback quiz-feedback-success">✅ Sugestão encontrada.</div>
      <div class="quiz-suggestion-list">
        ${lista.map((t) => `<article class="quiz-suggestion-item"><strong>${t.nome}</strong><p>${t.descricao}</p></article>`).join('')}
      </div>
      <p class="quiz-note-final">Use a sugestão como ponto de partida. A escolha final deve considerar o desenho do estudo, os pressupostos do teste e a pergunta de pesquisa.</p>
    ` : '<p class="quiz-feedback quiz-feedback-error">Nenhum teste ficou compatível com essa combinação. Revise as respostas ou consulte apoio metodológico.</p>';
  }

  function carregarQuizModal() {
    document.querySelector('.main-panel').innerHTML = htmlQuiz();
    const form = document.getElementById('quiz-form');
    if (form) {
      form.addEventListener('change', () => {
        atualizarEstado(form);
        aplicarRegrasEspecificas(form);
      });
    }
  }

  window.carregarQuizModal = carregarQuizModal;
  window.gerarSugestaoTeste = gerarSugestaoTeste;
})();
