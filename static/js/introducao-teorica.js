function buildTheorySectionCard(number, title, description) {
  return `
    <button class="theory-nav-link" data-target="section-${number}" type="button">
      <span class="theory-nav-index">${number}</span>
      <span class="theory-nav-copy">
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
    </button>
  `;
}

function setupTheoryInteractions(panel) {
  const navLinks = panel.querySelectorAll('.theory-nav-link');
  const sections = [...panel.querySelectorAll('.theory-section')];

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.target === id));
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = panel.querySelector(`#${link.dataset.target}`);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(link.dataset.target);
    });
  });

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { root: null, rootMargin: '-20% 0px -58% 0px', threshold: [0.2, 0.35, 0.6] });

    sections.forEach((section) => observer.observe(section));
  }

  setActive('section-1');
}

export function carregarIntroducaoTeorica() {
  const html = /* html */ `
    <div class="content-shell theory-shell">
      <section class="page-hero theory-hero compact-hero">
        <span class="eyebrow">Fundamentos para escolher e interpretar testes</span>
        <h2 class="hero-title-single-line">Introdução teórica à estatística aplicada</h2>
        <p class="hero-subtitle-short">Conceitos essenciais para entender os dados, interpretar resultados e escolher análises de forma mais consciente.</p>
      </section>

      <div class="theory-layout synchronized-scroll-layout">
        <aside class="theory-sidebar-card">
          <div class="theory-sidebar-header">
            <span class="eyebrow">Roteiro de leitura</span>
            <h3>Índice temático</h3>
            <p>Use a sequência completa ou entre diretamente no tópico que deseja revisar.</p>
          </div>

          <div class="theory-nav-list">
            ${buildTheorySectionCard(1, 'Introdução', '')}
            ${buildTheorySectionCard(2, 'Descritiva × inferencial', '')}
            ${buildTheorySectionCard(3, 'Normalidade', '')}
            ${buildTheorySectionCard(4, 'Paramétricos × não paramétricos', '')}
            ${buildTheorySectionCard(5, 'Cinco perguntas orientadoras', '')}
            ${buildTheorySectionCard(6, 'Passo a passo da escolha', '')}
            ${buildTheorySectionCard(7, 'Além do p-valor', '')}
            ${buildTheorySectionCard(8, 'Tabelas de contingência', '')}
            ${buildTheorySectionCard(9, 'Referências', '')}
          </div>
        </aside>

        <article class="theory-article">
          <section id="section-1" class="theory-section">
            <div class="theory-section-head">
              <span class="theory-section-number">1</span>
              <div>
                <p class="theory-kicker">Começo da trilha</p>
                <h2>Por que precisamos de testes estatísticos?</h2>
              </div>
            </div>
            <p>Em pesquisa, os dados variam. Mesmo quando dois grupos parecem diferentes à primeira vista, essa diferença pode ser apenas fruto da oscilação natural da amostra. Os testes estatísticos ajudam a avaliar se o padrão observado merece ser tratado como evidência ou apenas como flutuação aleatória.</p>
            <div class="theory-summary-grid">
              <div class="theory-mini-card"><h4>Função do teste</h4><p>Verificar se a diferença, associação ou efeito observado parece compatível com o acaso ou sugere um padrão mais consistente.</p></div>
              <div class="theory-mini-card"><h4>O que ele não faz</h4><p>Não substitui o delineamento do estudo, não corrige coleta ruim e não transforma uma pergunta fraca em resultado forte.</p></div>
              <div class="theory-mini-card"><h4>Leitura madura</h4><p>Teste estatístico deve vir junto com interpretação, contexto, tamanho do efeito e precisão das estimativas.</p></div>
            </div>
          </section>

          <section id="section-2" class="theory-section">
            <div class="theory-section-head">
              <span class="theory-section-number">2</span>
              <div>
                <p class="theory-kicker">Dois níveis de leitura</p>
                <h2>Estatística descritiva × estatística inferencial</h2>
              </div>
            </div>
            <div class="theory-grid-2">
              <div class="theory-panel theory-panel-blue">
                <h3>Descritiva</h3>
                <p>Resume o que foi observado na amostra: média, mediana, desvio-padrão, frequências, proporções, tabelas e gráficos.</p>
              </div>
              <div class="theory-panel theory-panel-violet">
                <h3>Inferencial</h3>
                <p>Usa a amostra para apoiar conclusões sobre uma população, sempre levando em conta incerteza e variabilidade.</p>
              </div>
            </div>
            <div class="theory-callout info">
              <h4>Ponto importante</h4>
              <p>Média e desvio-padrão sozinhos descrevem. Eles não substituem um teste inferencial quando a pergunta envolve comparação, associação, predição ou mudança ao longo do tempo.</p>
            </div>
          </section>

          <section id="section-3" class="theory-section">
            <div class="theory-section-head">
              <span class="theory-section-number">3</span>
              <div>
                <p class="theory-kicker">Premissas e forma dos dados</p>
                <h2>Distribuição normal: o que é e por que ela importa</h2>
              </div>
            </div>
            <p>A distribuição normal é uma forma de organização dos dados em que a maior parte das observações se concentra ao redor de um valor central e as frequências vão diminuindo à medida que nos afastamos desse centro. Ela aparece em muitos fenômenos naturais e biológicos quando observamos uma medida influenciada por várias pequenas fontes de variação.</p>
            <div class="theory-callout accent">
              <h4>Exemplo simples</h4>
              <p>Imagine a <strong>idade dos estudantes</strong> de uma turma universitária. Em geral, a maior parte fica perto de uma média, enquanto poucos estudantes são muito mais jovens ou muito mais velhos. Essa organização tende a formar uma curva aproximadamente simétrica ao redor do centro.</p>
            </div>
            <div class="theory-grid-2 theory-figure-grid">
              <figure class="theory-figure">
                <img src="/static/img/distribuicao_normal.png" alt="Curva de distribuição normal">
                <figcaption>Na distribuição normal ideal, média, mediana e moda ficam próximas do centro da curva.</figcaption>
              </figure>
              <figure class="theory-figure">
                <img src="/static/img/histograma_idades_estudantes.png" alt="Histograma das idades de estudantes com curva gaussiana sobreposta">
                <figcaption>Exemplo didático: idades de estudantes distribuídas em torno de um valor médio.</figcaption>
              </figure>
            </div>
            <div class="theory-grid-2">
              <div class="theory-mini-card"><h4>Histograma</h4><p>Mostra como as frequências se distribuem ao longo dos valores observados. Ajuda a perceber simetria, caudas longas, multimodalidade e outliers.</p></div>
              <div class="theory-mini-card"><h4>Gráfico Q-Q</h4><p>Compara os quantis observados com os quantis esperados numa distribuição normal. Quando os pontos ficam próximos de uma linha reta, a normalidade parece mais plausível.</p></div>
            </div>
            <figure class="theory-figure qq-figure">
              <img src="/static/img/qqplot_exemplo.png" alt="Exemplo de gráfico QQ">
              <figcaption>No gráfico Q-Q, quanto mais os pontos acompanham a reta, mais os dados se aproximam da distribuição normal teórica.</figcaption>
            </figure>
            <div class="theory-summary-grid">
              <div class="theory-mini-card"><h4>Shapiro-Wilk</h4><p>Costuma ser preferido em amostras pequenas e moderadas. É bastante sensível a desvios importantes da normalidade.</p></div>
              <div class="theory-mini-card"><h4>Kolmogorov-Smirnov</h4><p>Pode aparecer em amostras maiores, mas deve ser interpretado com cuidado e sempre junto da inspeção gráfica.</p></div>
              <div class="theory-mini-card"><h4>Leitura metodológica</h4><p>Normalidade não é ritual. Ela importa porque alguns testes funcionam melhor quando os dados seguem essa estrutura.</p></div>
            </div>
            <div class="theory-callout warning">
              <h4>Como decidir na prática</h4>
              <p>Não use o p-valor do teste de normalidade de forma isolada. Em amostras grandes, pequenos desvios podem gerar significância sem importância prática. Por isso, histograma e gráfico Q-Q continuam sendo muito úteis.</p>
            </div>
          </section>

          <section id="section-4" class="theory-section">
            <div class="theory-section-head"><span class="theory-section-number">4</span><div><p class="theory-kicker">Duas famílias de testes</p><h2>Paramétricos × não paramétricos</h2></div></div>
            <div class="theory-grid-2 theory-contrast-grid">
              <div class="theory-panel theory-panel-blue"><h3>Paramétricos</h3><ul><li>Trabalham com parâmetros como média e desvio-padrão.</li><li>Costumam ter maior poder quando as premissas são bem atendidas.</li><li>Exemplos: teste t, ANOVA, Pearson.</li></ul></div>
              <div class="theory-panel theory-panel-violet"><h3>Não paramétricos</h3><ul><li>Dependem menos da normalidade.</li><li>São úteis para dados ordinais ou distribuições claramente assimétricas.</li><li>Exemplos: Mann-Whitney, Wilcoxon, Kruskal-Wallis, Spearman.</li></ul></div>
            </div>
          </section>

          <section id="section-5" class="theory-section">
            <div class="theory-section-head"><span class="theory-section-number">5</span><div><p class="theory-kicker">Ponte entre teoria e prática</p><h2>Cinco perguntas para orientar a escolha da análise</h2></div></div>
            <p>Antes de decorar nomes de testes, vale responder qual <strong>tipo de pergunta analítica</strong> você está tentando resolver. Isso organiza o raciocínio e reduz escolhas automáticas.</p>
            <div class="theory-question-grid">
              <article class="theory-question-card theory-question-card-featured"><span class="theory-question-number">1</span><h3>Estou comparando grupos ou momentos?</h3><p>Diferenças entre grupos independentes, mudanças dentro do mesmo grupo ou comparações pareadas categóricas.</p><div class="theory-question-groups"><div class="theory-question-group"><strong>Grupos independentes</strong><div class="theory-question-examples"><span>Teste t independente</span><span>ANOVA</span><span>Mann-Whitney</span><span>Kruskal-Wallis</span></div></div><div class="theory-question-group"><strong>Mesmo grupo em momentos diferentes</strong><div class="theory-question-examples"><span>Teste t pareado</span><span>Wilcoxon</span></div></div><div class="theory-question-group"><strong>Pareadas categóricas</strong><div class="theory-question-examples"><span>McNemar</span></div></div></div></article>
              <article class="theory-question-card"><span class="theory-question-number">2</span><h3>Estou avaliando associação ou correlação?</h3><p>Relação entre categorias ou entre medidas numéricas/ordinais.</p><div class="theory-question-examples"><span>Qui-quadrado</span><span>Fisher</span><span>Pearson</span><span>Spearman</span></div></article>
              <article class="theory-question-card"><span class="theory-question-number">3</span><h3>Estou modelando ou predizendo?</h3><p>Quando o interesse está em explicar um desfecho com base em um ou mais preditores.</p><div class="theory-question-examples"><span>Regressão linear</span><span>Regressão logística</span></div></article>
              <article class="theory-question-card"><span class="theory-question-number">4</span><h3>Estou avaliando a qualidade de uma medida ou instrumento?</h3><p>Concordância entre avaliadores, estabilidade de medidas ou consistência interna de escalas.</p><div class="theory-question-examples"><span>Kappa</span><span>ICC</span><span>Alfa</span><span>Ômega</span></div></article>
              <article class="theory-question-card theory-question-card-wide"><span class="theory-question-number">5</span><h3>Preciso estimar a magnitude do efeito?</h3><p>Nem todo resultado importante se resume a significância estatística. Muitas vezes é preciso quantificar o tamanho prático da diferença ou associação.</p><div class="theory-question-examples"><span>d de Cohen</span><span>V de Cramer</span><span>Phi</span><span>OR</span><span>RR</span></div></article>
            </div>
          </section>

          <section id="section-6" class="theory-section">
            <div class="theory-section-head"><span class="theory-section-number">6</span><div><p class="theory-kicker">Sequência prática</p><h2>Passo a passo para escolher um teste</h2></div></div>
            <ol class="theory-steps-list">
              <li>Defina a pergunta principal da análise.</li>
              <li>Identifique o tipo da variável principal e do fator de comparação.</li>
              <li>Verifique se os dados são independentes ou pareados.</li>
              <li>Quando houver variável contínua, avalie a normalidade com gráficos e testes formais.</li>
              <li>Considere se o objetivo é diferença, associação, predição, concordância ou magnitude do efeito.</li>
            </ol>
          </section>

          <section id="section-7" class="theory-section">
            <div class="theory-section-head"><span class="theory-section-number">7</span><div><p class="theory-kicker">Interpretação</p><h2>Além do p-valor</h2></div></div>
            <div class="theory-summary-grid">
              <div class="theory-mini-card"><h4>p-valor</h4><p>Ajuda a avaliar a evidência estatística, mas não mede importância clínica nem tamanho do efeito.</p></div>
              <div class="theory-mini-card"><h4>Medida de efeito</h4><p>Mostra a magnitude prática da diferença ou associação observada.</p></div>
              <div class="theory-mini-card"><h4>Intervalo de confiança</h4><p>Ajuda a entender a precisão da estimativa e a faixa de valores plausíveis.</p></div>
            </div>
          </section>

          <section id="section-8" class="theory-section">
            <div class="theory-section-head"><span class="theory-section-number">8</span><div><p class="theory-kicker">Dados categóricos</p><h2>Tabelas de contingência</h2></div></div>
            <p>A tabela de contingência cruza duas variáveis categóricas e mostra quantos casos aparecem em cada combinação. Ela é a base de testes como Qui-quadrado, Fisher e McNemar.</p>
            <div class="theory-table-wrap"><table class="theory-table"><thead><tr><th>Grupo</th><th>Melhorou</th><th>Não melhorou</th><th>Total</th></tr></thead><tbody><tr><td><strong>Intervenção</strong></td><td>18</td><td>7</td><td>25</td></tr><tr><td><strong>Controle</strong></td><td>10</td><td>15</td><td>25</td></tr><tr><td><strong>Total</strong></td><td>28</td><td>22</td><td>50</td></tr></tbody></table></div>
            <div class="theory-callout info"><h4>Leitura prática</h4><p>A tabela organiza os dados, mas não escolhe o teste sozinha. Delineamento, pareamento e tamanho esperado das células continuam sendo decisivos.</p></div>
          </section>

          <section id="section-9" class="theory-section theory-section-reference">
            <div class="theory-section-head"><span class="theory-section-number">9</span><div><p class="theory-kicker">Para aprofundar</p><h2>Referências bibliográficas com acesso aberto</h2></div></div>
            <p>As referências abaixo priorizam materiais realmente acessíveis, com foco em livros-texto abertos, documentos institucionais e conteúdos em acesso livre.</p>
            <div class="theory-reference-list">
              <article><strong>OpenIntro.</strong><p><em>OpenIntro Statistics</em>. Livro-texto aberto com capítulos sobre descrição de dados, distribuição normal, inferência, regressão e interpretação de resultados.</p><a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">Abrir livro</a></article>
              <article><strong>NCBI Bookshelf.</strong><p><em>Exploratory Data Analysis: Frequencies, Descriptive Statistics, Histograms, and Boxplots</em>. Texto aberto sobre inspeção visual dos dados e leitura inicial da distribuição.</p><a href="https://www.ncbi.nlm.nih.gov/books/NBK557570/" target="_blank" rel="noopener noreferrer">Abrir capítulo</a></article>
              <article><strong>NCBI Bookshelf.</strong><p><em>Standard Deviation</em>. Material aberto sobre dispersão, desvio-padrão e interpretação de variabilidade.</p><a href="https://www.ncbi.nlm.nih.gov/books/NBK574574/" target="_blank" rel="noopener noreferrer">Abrir capítulo</a></article>
              <article><strong>BMJ Evidence-Based Medicine.</strong><p><em>On reporting and interpreting statistical significance and p values</em>. Discussão aberta sobre limites do p-valor e boas práticas de interpretação.</p><a href="https://ebm.bmj.com/content/26/2/39" target="_blank" rel="noopener noreferrer">Abrir artigo</a></article>
              <article><strong>WHO Regional Office for Europe.</strong><p><em>Simulation in nursing and midwifery education</em>. Documento aberto útil para articular estatística, educação e simulação em saúde.</p><a href="https://www.who.int/europe/publications/i/item/WHO-EURO-2018-3296-43055-60253" target="_blank" rel="noopener noreferrer">Abrir documento</a></article>
              <article><strong>INACSL.</strong><p><em>Healthcare Simulation Standards of Best Practice®</em>. Página oficial com acesso à versão em português dos padrões de boas práticas em simulação.</p><a href="https://www.inacsl.org/healthcare-simulation-standards-of-best-practice-multiple-languages" target="_blank" rel="noopener noreferrer">Abrir página</a></article>
            </div>
          </section>
        </article>
      </div>
    </div>
  `;

  const panel = document.querySelector('.main-panel');
  if (panel) {
    panel.scrollTo({ top: 0, behavior: 'auto' });
    panel.innerHTML = html;
    setupTheoryInteractions(panel);
  }
}

window.carregarIntroducaoTeorica = carregarIntroducaoTeorica;
