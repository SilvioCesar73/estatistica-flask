/* quadrantes_testes.js – exemplos práticos organizados pela pergunta analítica */

(function () {
  const EXEMPLOS_COLUNAS = [
    {
      classe: 'coluna-principal',
      blocos: [
        {
          grupo: '1️⃣ Estou comparando grupos ou momentos?',
          descricao: 'Diferenças entre grupos independentes, mudanças no mesmo grupo e comparações pareadas categóricas.',
          subgrupos: [
            {
              titulo: 'Grupos independentes',
              itens: [
                { rotulo: 'Teste t independente', arquivo: '/static/data/casos/teste_t_independente_simulacao.json' },
                { rotulo: 'ANOVA', arquivo: '/static/data/casos/teste_anova_simulacao.json' },
                { rotulo: 'Kruskal-Wallis', arquivo: '/static/data/casos/teste_kruskal_simulacao.json' },
                { rotulo: 'Mann-Whitney', arquivo: '/static/data/casos/teste_mannwhitney_simulacao.json' }
              ]
            },
            {
              titulo: 'Mesmo grupo em momentos diferentes',
              itens: [
                { rotulo: 'Teste t pareado', arquivo: '/static/data/casos/teste_t_pareado_simulacao.json' },
                { rotulo: 'Wilcoxon', arquivo: '/static/data/casos/teste_wilcoxon_simulacao.json' }
              ]
            },
            {
              titulo: 'Comparações pareadas categóricas',
              itens: [{ rotulo: 'McNemar', arquivo: '/static/data/casos/teste_mcnemar_simulacao.json' }]
            }
          ]
        }
      ]
    },
    {
      classe: 'coluna-dupla',
      blocos: [
        {
          grupo: '2️⃣ Estou avaliando associação ou correlação?',
          descricao: 'Associação entre variáveis categóricas e correlação entre variáveis numéricas ou ordinais.',
          itens: [
            { rotulo: 'Qui-quadrado', arquivo: '/static/data/casos/teste_chiquadrado_simulacao.json' },
            { rotulo: 'Fisher', arquivo: '/static/data/casos/teste_fisher_simulacao.json' },
            { rotulo: 'Pearson', arquivo: '/static/data/casos/teste_pearson_simulacao.json' },
            { rotulo: 'Spearman', arquivo: '/static/data/casos/teste_spearman_simulacao.json' }
          ]
        },
        {
          grupo: '3️⃣ Estou modelando ou predizendo?',
          descricao: 'Modelos para explicar desfechos contínuos, binários e relações multivariadas.',
          itens: [
            { rotulo: 'Regressão linear simples', arquivo: '/static/data/casos/regressao_linear_simples_simulacao.json' },
            { rotulo: 'Regressão linear múltipla', arquivo: '/static/data/casos/regressao_linear_multipla_simulacao.json' },
            { rotulo: 'Regressão múltipla ajustada', arquivo: '/static/data/casos/regressao_multipla_ajustada_simulacao.json' },
            { rotulo: 'Regressão logística binária', arquivo: '/static/data/casos/regressao_logistica_simulacao.json' }
          ]
        }
      ]
    },
    {
      classe: 'coluna-dupla',
      blocos: [
        {
          grupo: '4️⃣ Estou avaliando a qualidade de uma medida ou instrumento?',
          descricao: 'Concordância entre avaliadores, estabilidade das medidas e consistência interna de escalas.',
          itens: [
            { rotulo: 'Índice Kappa', arquivo: '/static/data/casos/teste_kappa_simulacao.json' },
            { rotulo: 'Correlação Intraclasse', arquivo: '/static/data/casos/teste_icc_simulacao.json' },
            { rotulo: 'Alfa de Cronbach', arquivo: '/static/data/casos/alfa_cronbach_simulacao.json' },
            { rotulo: 'Ômega de McDonald', arquivo: '/static/data/casos/omega_mcdonald_simulacao.json' }
          ]
        },
        {
          grupo: '5️⃣ Preciso estimar a magnitude do efeito?',
          descricao: 'Medidas que ajudam a interpretar o tamanho prático de diferenças e associações.',
          itens: [
            { rotulo: 'd de Cohen', arquivo: '/static/data/casos/cohen_d_simulacao.json' },
            { rotulo: 'V de Cramer', arquivo: '/static/data/casos/v_cramer_simulacao.json' },
            { rotulo: 'Phi', arquivo: '/static/data/casos/phi_simulacao.json' },
            { rotulo: 'Razão de chances (OR)', arquivo: '/static/data/casos/odds_ratio_simulacao.json' },
            { rotulo: 'Risco relativo (RR)', arquivo: '/static/data/casos/risk_ratio_simulacao.json' },
            { rotulo: 'Hazard Ratio', arquivo: '/static/data/casos/hazard_ratio_simulacao.json' }
          ]
        }
      ]
    }
  ];

  const EXPLAINERS = [
    { match: /^t pareado$/i, titulo: 't pareado', texto: 'É a estatística central do teste t para medidas repetidas. Compara o tamanho da diferença média observada com a variabilidade das diferenças dentro do mesmo grupo.' },
    { match: /^t$/i, titulo: 't', texto: 'É a estatística central do teste t. Ela resume quão distante a diferença entre médias ficou de zero, levando em conta a variabilidade dos dados.' },
    { match: /^f$/i, titulo: 'F', texto: 'É a estatística principal da ANOVA. Compara a variação entre grupos com a variação dentro dos próprios grupos.' },
    { match: /kruskal/i, titulo: 'H', texto: 'É a estatística do teste de Kruskal-Wallis. Ela compara a distribuição dos postos entre três ou mais grupos independentes.' },
    { match: /mann-whitney/i, titulo: 'U', texto: 'É a estatística central do teste de Mann-Whitney. Ela resume como os postos de um grupo se posicionam em relação aos postos do outro grupo.' },
    { match: /χ² de pearson/i, titulo: 'χ² de Pearson', texto: 'No qui-quadrado, a estatística compara frequências observadas com frequências esperadas sob independência.' },
    { match: /^r de pearson$/i, titulo: 'r de Pearson', texto: 'É o coeficiente de correlação linear. Varia de -1 a +1 e informa direção e força da relação linear entre duas variáveis contínuas.' },
    { match: /spearman/i, titulo: 'ρ de Spearman', texto: 'É o coeficiente de correlação monotônica. Também varia de -1 a +1, mas trabalha com postos e é útil quando os dados são ordinais ou não normais.' },
    { match: /kappa/i, titulo: 'Kappa', texto: 'Resume a concordância entre avaliadores acima do que seria esperado apenas pelo acaso.' },
    { match: /icc/i, titulo: 'ICC', texto: 'O coeficiente de correlação intraclasse mede quanta semelhança há entre medidas numéricas feitas por avaliadores ou instrumentos diferentes.' },
    { match: /mcnemar/i, titulo: 'χ² de McNemar', texto: 'É a estatística que contrasta as discordâncias em uma tabela pareada 2×2. O foco está em quem mudou de categoria, e não em quem permaneceu igual.' },
    { match: /^odds ratio$/i, titulo: 'Odds Ratio', texto: 'Compara as chances do desfecho entre expostos e não expostos. Valores acima de 1 sugerem maior chance no grupo exposto; abaixo de 1, menor chance.' },
    { match: /^risco relativo$/i, titulo: 'Risco Relativo', texto: 'Compara probabilidades de ocorrência do desfecho. RR = 1 indica ausência de diferença de risco entre os grupos.' },
    { match: /^hazard ratio$/i, titulo: 'Hazard Ratio', texto: 'Compara o risco instantâneo do evento ao longo do tempo. É comum em análises de sobrevivência e modelos de Cox.' },
    { match: /beta/i, titulo: 'Coeficiente β', texto: 'É o tamanho esperado da mudança no desfecho quando o preditor aumenta uma unidade, mantendo os demais termos constantes quando houver ajuste.' },
    { match: /cronbach/i, titulo: 'Alfa de Cronbach', texto: 'Resume a consistência interna do instrumento, isto é, o quanto os itens parecem medir o mesmo construto.' },
    { match: /ômega|omega/i, titulo: 'Ômega de McDonald', texto: 'É uma medida de consistência interna que estima a confiabilidade do escore total com menos dependência da suposição de tau-equivalência do que o alfa.' },
    { match: /cohen/i, titulo: 'd de Cohen', texto: 'Resume a magnitude padronizada da diferença entre grupos ou momentos. Ajuda a responder se a diferença é pequena, moderada ou grande.' },
    { match: /cram[eé]r/i, titulo: 'V de Cramer', texto: 'Quantifica a força da associação entre variáveis categóricas em tabelas de contingência. Complementa a significância do qui-quadrado.' },
    { match: /^phi$/i, titulo: 'Phi', texto: 'É uma medida de magnitude para associação em tabelas 2×2. Ajuda a interpretar o tamanho da relação entre categorias.' },
    { match: /teste exato de fisher/i, titulo: 'Teste exato de Fisher', texto: 'Em vez de depender de uma aproximação assintótica, o teste calcula a probabilidade exata da tabela observada, sendo útil em amostras pequenas.' },
    { match: /wilcoxon/i, titulo: 'W de Wilcoxon', texto: 'É a estatística do teste de Wilcoxon. Ela se baseia nos postos das diferenças entre os dois momentos pareados.' }
  ];

  function getPanel() {
    return document.querySelector('.main-panel');
  }

  function renderButtons(itens = []) {
    return itens.map(item => `<button class="teste-pill" onclick="carregarExemplo('${item.arquivo}')">${item.rotulo}</button>`).join('');
  }

  function renderBloco(bloco) {
    return `
      <section class="quadrante card-sistema">
        <div class="quadrante-topo">
          <h3>${bloco.grupo}</h3>
          <p>${bloco.descricao}</p>
        </div>
        ${Array.isArray(bloco.subgrupos) ? `
          <div class="quadrante-subgrupos">
            ${bloco.subgrupos.map(sub => `
              <div class="quadrante-subgrupo">
                <strong>${sub.titulo}</strong>
                <div class="quadrante-botoes quadrante-botoes-subgrupo">
                  ${renderButtons(sub.itens)}
                </div>
              </div>`).join('')}
          </div>` :
          `<div class="quadrante-botoes">${renderButtons(bloco.itens)}</div>`}
      </section>
    `;
  }

  function renderGrid() {
    return `
      <section class="quadrantes-grid quadrantes-grid-balanceado">
        ${EXEMPLOS_COLUNAS.map(coluna => `
          <div class="quadrantes-coluna ${coluna.classe}">
            ${coluna.blocos.map(renderBloco).join('')}
          </div>`).join('')}
      </section>
    `;
  }

  function renderIntro() {
    return `
      <div class="content-shell examples-shell">
        <section class="page-hero theory-hero compact-hero">
          <span class="eyebrow">Aplicações em simulação em saúde</span>
          <h2 class="hero-title-single-line">Exemplos práticos e planilhas</h2>
          <p class="hero-subtitle-short">Cada teste aparece com um exemplo didático, dados simulados, estatística principal, parâmetros complementares e interpretação em linguagem mais clara.</p>
        </section>

        <section class="intro-testes intro-testes-reforcada">
          <div class="intro-testes-bloco">
            <span class="eyebrow">Organização atual</span>
            <h3>Explore os testes pela pergunta analítica</h3>
            <p>Os exemplos estão distribuídos conforme as cinco perguntas orientadoras da teoria. Assim, a navegação fica mais coerente com o raciocínio metodológico.</p>
          </div>
          <div class="intro-testes-resumo">
            <div class="mini-card"><strong>O que você verá</strong><span>dados simulados, estatística principal, p-valor, parâmetros complementares e leitura didática.</span></div>
            <div class="mini-card"><strong>Como usar</strong><span>compare o desenho do estudo com o tipo de variável e use os exemplos como apoio, não como receita fixa.</span></div>
          </div>
        </section>

        ${renderGrid()}
      </div>
    `;
  }

function normalizarEstatisticas(estatisticas = {}) {
    const itens = Array.isArray(estatisticas.itens_destaque) ? estatisticas.itens_destaque : [];
    return {
      nome: estatisticas.nome_estatistica || 'Estatística principal',
      valor: estatisticas.valor_estatistica ?? '—',
      p: estatisticas.p_valor ?? '—',
      itens,
      explicacoes: Array.isArray(estatisticas.explicacoes_parametros) ? estatisticas.explicacoes_parametros : []
    };
  }

  function formatCellValue(value) {
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
    return String(value);
  }

  function renderTabela(dados = []) {
    if (!dados.length) return '';
    const cols = Object.keys(dados[0]);
    return `
      <div class="popup-bloco">
        <div class="popup-bloco-topo">
          <h4>Dados simulados</h4>
          <p>Tabela-resumo usada para construir o exemplo didático.</p>
        </div>
        <div class="popup-tabela-wrap">
          <table class="popup-tabela">
            <thead>
              <tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${dados.map(row => `
                <tr>${cols.map(c => `<td>${formatCellValue(row[c])}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderLista(titulo, itens = []) {
    if (!itens.length) return '';
    return `
      <div class="popup-bloco">
        <div class="popup-bloco-topo">
          <h4>${titulo}</h4>
        </div>
        <ul class="popup-lista">
          ${itens.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  function renderInstrumento(instrumento) {
    if (!instrumento) return '';
    return `
      <div class="popup-bloco">
        <div class="popup-bloco-topo">
          <h4>Instrumento do exemplo</h4>
          <p>${instrumento.tipo || ''}</p>
        </div>
        ${Array.isArray(instrumento.itens) && instrumento.itens.length ? `
          <ul class="popup-lista">
            ${instrumento.itens.map(item => `<li>${item}</li>`).join('')}
          </ul>` : ''
        }
        ${instrumento.escore_final ? `<p class="popup-texto-suave"><strong>Escore final:</strong> ${instrumento.escore_final}</p>` : ''}
      </div>
    `;
  }

  function explainLabel(label) {
    if (!label) return '';
    const lower = label.toLowerCase();
    if (lower.includes('graus de liberdade')) return 'Indicam quantas informações independentes entram no cálculo da estatística. Também ajudam a identificar a distribuição de referência usada no teste.';
    if (lower.includes('média')) return 'A média resume o valor central dos escores. Quando o teste compara grupos, ela ajuda a localizar para onde a diferença está apontando.';
    if (lower.includes('mediana')) return 'A mediana é o ponto central da distribuição. Em testes não paramétricos, costuma ser mais informativa do que a média.';
    if (lower.includes('diferença média') || lower.includes('ganho médio')) return 'Mostra o tamanho absoluto da mudança entre grupos ou momentos. Ajuda a interpretar relevância prática, e não só significância.';
    if (lower.includes('ic 95%')) return 'O intervalo de confiança mostra a faixa de valores plausíveis para o parâmetro na população. Intervalos mais estreitos sugerem estimativas mais precisas.';
    if (lower.includes('tamanho de efeito')) return 'O tamanho de efeito informa a magnitude da diferença ou associação. Ele ajuda a responder se o resultado é apenas significativo ou também relevante na prática.';
    if (lower.includes('eta²') || lower.includes('eta2')) return 'Eta² estima a proporção da variabilidade do desfecho explicada pelo fator estudado na ANOVA.';
    if (lower.includes('epsilon²') || lower.includes('epsilon2')) return 'Epsilon² é uma medida de magnitude para o Kruskal-Wallis. Resume quanto os grupos se diferenciam além do acaso.';
    if (lower.includes('v de cramér')) return 'V de Cramér quantifica a força da associação entre variáveis categóricas. Ele complementa o qui-quadrado.';
    if (lower.includes('discordantes')) return 'Nas tabelas pareadas do McNemar, os pares discordantes são o coração do teste, porque são eles que indicam mudança real de categoria.';
    if (lower.includes('proporção')) return 'A proporção ajuda a traduzir o resultado em linguagem mais intuitiva, mostrando a frequência relativa de acertos, eventos ou classificações.';
    if (lower.includes('variação absoluta')) return 'Expressa o quanto a taxa mudou em pontos percentuais. É uma medida simples e comunicável do impacto observado.';
    if (lower.includes('r²') || lower.includes('coeficiente de determinação')) return 'R² indica quanto da variabilidade do desfecho é explicada pelo modelo ou pela relação entre as variáveis.';
    if (lower.includes('classificação')) return 'A classificação traduz o coeficiente para uma leitura prática, como concordância fraca, moderada ou excelente.';
    if (lower.includes('leitura prática') || lower.includes('leitura da magnitude')) return 'Esta linha ajuda a levar o número para a prática, resumindo o significado aplicado da magnitude observada.';
    if (lower.includes('odds ratio')) return 'A razão de chances compara as chances do desfecho entre grupos. Valores maiores que 1 sugerem aumento de chance; menores que 1, redução.';
    if (lower.includes('risco no')) return 'Mostra a probabilidade do evento em cada grupo. Ler os riscos absolutos evita interpretar apenas medidas relativas.';
    if (lower.includes('hazard ratio')) return 'Resume a diferença de risco instantâneo ao longo do seguimento, não apenas no final do estudo.';
    if (lower.includes('erro padrão')) return 'O erro padrão informa a precisão da estimativa do coeficiente. Quanto menor, mais estável tende a ser a estimativa.';
    if (lower.includes('intercepto')) return 'O intercepto representa o valor esperado do desfecho quando todos os preditores são zero.';
    if (lower.includes('n')) return 'O tamanho amostral informa quantas observações entraram na análise e ajuda a interpretar a estabilidade do resultado.';
    if (lower.includes('alfa')) return 'O alfa de Cronbach resume o quanto os itens caminham juntos na medição do mesmo construto. Não mede validade, mas pode sinalizar coerência interna.';
    return 'Este parâmetro complementa a leitura da estatística principal e ajuda a transformar o resultado numérico em interpretação aplicada.';
  }

  function explainMainStatistic(nome) {
    const hit = EXPLAINERS.find(item => item.match.test(String(nome || '')));
    return hit ? { termo: hit.titulo, texto: hit.texto } : null;
  }

  function explainPValue() {
    return {
      termo: 'p-valor',
      texto: 'É a probabilidade de observar um resultado tão extremo quanto o encontrado, ou ainda mais extremo, se a hipótese nula fosse verdadeira. Ele não mede tamanho de efeito nem importância clínica.'
    };
  }

  function buildExplanations(estatisticas) {
    if (!estatisticas) return [];
    const info = normalizarEstatisticas(estatisticas);
    const explicacoes = [];

    const main = explainMainStatistic(info.nome);
    if (main) explicacoes.push(main);
    explicacoes.push(explainPValue());

    info.itens.forEach(item => {
      explicacoes.push({
        termo: item.rotulo,
        texto: explainLabel(item.rotulo)
      });
    });

    info.explicacoes.forEach(item => {
      if (item && item.termo && item.texto) explicacoes.push(item);
    });

    const unique = [];
    const seen = new Set();
    explicacoes.forEach(item => {
      const key = `${item.termo}::${item.texto}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });
    return unique;
  }

  function renderEstatisticas(estatisticas) {
    if (!estatisticas) return '';
    const info = normalizarEstatisticas(estatisticas);
    return `
      <div class="popup-bloco popup-bloco-destaque">
        <div class="popup-bloco-topo">
          <h4>Resultados estatísticos</h4>
          <p>O p-valor aparece junto com a estatística central e medidas complementares.</p>
        </div>

        <div class="stats-hero">
          <div class="stat-card stat-card-principal">
            <span class="stat-label">${info.nome}</span>
            <strong class="stat-value">${info.valor}</strong>
          </div>
          <div class="stat-card">
            <span class="stat-label">Valor de p</span>
            <strong class="stat-value">${info.p}</strong>
          </div>
        </div>

        ${info.itens.length ? `
          <div class="stats-grid">
            ${info.itens.map(item => `
              <div class="stat-mini-card">
                <span class="stat-mini-label">${item.rotulo}</span>
                <strong class="stat-mini-value">${item.valor}</strong>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderExplicacoes(estatisticas) {
    const itens = buildExplanations(estatisticas);
    if (!itens.length) return '';
    return `
      <div class="popup-bloco popup-bloco-explicativo">
        <div class="popup-bloco-topo">
          <h4>Como ler estas estatísticas</h4>
          <p>Leitura rápida dos parâmetros apresentados neste exemplo.</p>
        </div>
        <div class="stats-explain-grid">
          ${itens.map(item => `
            <div class="stats-explain-card">
              <strong>${item.termo}</strong>
              <p>${item.texto}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPopup(d) {
    return `
      <article class="popup-artigo">
        <header class="popup-cabecalho">
          <span class="popup-tag">Exemplo didático</span>
          <h3>${d.nome}</h3>
          ${d.descricao ? `<p>${d.descricao}</p>` : ''}
        </header>

        <div class="popup-grid-info">
          ${d.tipo ? `<div class="popup-info-chip"><span>Tipo</span><strong>${d.tipo}</strong></div>` : ''}
          ${d.quando_usar ? `<div class="popup-info-chip"><span>Quando usar</span><strong>${d.quando_usar}</strong></div>` : ''}
        </div>

        ${d.exemplo ? `
          <div class="popup-bloco">
            <div class="popup-bloco-topo">
              <h4>Situação de pesquisa</h4>
            </div>
            <p>${d.exemplo}</p>
          </div>
        ` : ''}

        ${renderLista('Requisitos', d.requisitos)}
        ${renderInstrumento(d.instrumento)}
        ${renderTabela(d.dados_exemplo)}
        ${renderEstatisticas(d.estatisticas)}
        ${renderExplicacoes(d.estatisticas)}

        ${d.interpretacao ? `
          <div class="popup-bloco">
            <div class="popup-bloco-topo">
              <h4>Interpretação</h4>
            </div>
            <p>${d.interpretacao}</p>
          </div>
        ` : ''}

        ${d.planilha_exemplo ? `
          <div class="popup-rodape-acoes">
            <a class="popup-download-btn" href="/static/data/casos/planilhas_exemplos/${d.planilha_exemplo}" target="_blank" rel="noopener noreferrer">📥 Baixar planilha de exemplo</a>
          </div>
        ` : ''}
      </article>
    `;
  }

  function carregarTestes() {
    const panel = getPanel();
    if (!panel) return;
    panel.scrollTo({ top: 0, behavior: 'smooth' });
    panel.innerHTML = renderIntro();
  }

  function carregarExemplo(caminhoJson) {
    fetch(caminhoJson)
      .then(r => {
        if (!r.ok) throw new Error('Arquivo do exemplo não encontrado');
        return r.json();
      })
      .then(d => {
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const cont = document.getElementById('popup-content');

        cont.innerHTML = renderPopup(d);
        popup.style.display = 'block';
        overlay.style.display = 'block';
      })
      .catch(err => {
        alert('Erro ao carregar o exemplo: ' + err.message);
      });
  }

  window.carregarTestes = carregarTestes;
  window.carregarExemplo = carregarExemplo;
})();
