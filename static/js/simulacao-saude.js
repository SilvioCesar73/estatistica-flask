function carregarSimulacaoSaude() {
  const html = `
    <div class="content-shell theory-shell simulation-shell">
      <section class="page-hero theory-hero compact-hero">
        <span class="eyebrow">Contexto da plataforma</span>
        <h2 class="hero-title-single-line">Simulação em saúde</h2>
        <p class="hero-subtitle-short">Estratégias de simulação que geram dados de pesquisa e ajudam a entender por que diferentes testes estatísticos entram em cena.</p>
      </section>

      <section class="theory-section simulation-section">
        <div class="theory-section-head">
          <span class="theory-section-number">1</span>
          <div>
            <p class="theory-kicker">Ponto de partida</p>
            <h2>Por que falar de simulação antes dos testes?</h2>
          </div>
        </div>
        <p>Em uma plataforma voltada à pesquisa em simulação, a estatística não nasce do nada. Ela depende da <strong>estratégia de simulação</strong>, do tipo de desfecho medido, do instrumento utilizado e do desenho do estudo. Por isso, antes de entrar nos testes, vale situar de onde esses dados costumam surgir.</p>
        <div class="theory-summary-grid">
          <div class="theory-mini-card"><h4>O que muda</h4><p>Muda o tipo de variável, a forma de coleta, o número de momentos avaliados e a lógica da análise.</p></div>
          <div class="theory-mini-card"><h4>O que permanece</h4><p>A necessidade de alinhar pergunta de pesquisa, delineamento, instrumento de medida e leitura metodológica.</p></div>
          <div class="theory-mini-card"><h4>Por que isso importa</h4><p>Sem essa ponte, o usuário vê o teste como receita pronta e perde o raciocínio por trás da escolha.</p></div>
        </div>
      </section>

      <section class="theory-section simulation-section">
        <div class="theory-section-head">
          <span class="theory-section-number">2</span>
          <div>
            <p class="theory-kicker">Estratégias centrais</p>
            <h2>Três estratégias de simulação que aparecem com frequência</h2>
          </div>
        </div>

        <div class="simulation-strategy-grid">
          <article class="simulation-strategy-card">
            <h3>Prática deliberada em ciclos rápidos (PDCR)</h3>
            <p>Estratégia baseada em repetição, correção imediata e retomada rápida da tarefa. É especialmente útil quando o foco está em desempenho progressivo ao longo do treino.</p>
            <ul>
              <li>Pré-teste e pós-teste</li>
              <li>Número de acertos em checklist</li>
              <li>Tempo de execução</li>
              <li>Satisfação e confiança</li>
            </ul>
            <div class="theory-callout info compact-callout">
              <h4>Exemplo didático</h4>
              <p>Uma PDCR sobre atendimento à parada cardiorrespiratória pode comparar escore antes e depois do treinamento, além de analisar taxa de acertos em etapas críticas do roteiro.</p>
            </div>
          </article>

          <article class="simulation-strategy-card">
            <h3>Simulação clínica</h3>
            <p>Estratégia centrada em cenários clínicos mais completos, com tomada de decisão, comunicação e integração de condutas.</p>
            <ul>
              <li>Desempenho global no cenário</li>
              <li>Escalas de satisfação e autoconfiança</li>
              <li>Comparação entre grupos ou entre momentos</li>
              <li>Classificações categóricas de desempenho</li>
            </ul>
            <div class="theory-callout info compact-callout">
              <h4>Exemplo didático</h4>
              <p>Em uma simulação clínica sobre sepse, o pesquisador pode comparar grupos expostos a métodos diferentes de preparação e avaliar desempenho, satisfação e retenção.</p>
            </div>
          </article>

          <article class="simulation-strategy-card">
            <h3>Treino de habilidades</h3>
            <p>Foco em procedimentos e execução técnica. É comum gerar dados objetivos e altamente estruturados.</p>
            <ul>
              <li>Checklist técnico</li>
              <li>Tempo de realização</li>
              <li>Número de erros ou acertos</li>
              <li>Avaliação por mais de um examinador</li>
            </ul>
            <div class="theory-callout info compact-callout">
              <h4>Exemplo didático</h4>
              <p>Em um treino de punção venosa, é possível medir tempo, escore técnico, concordância entre avaliadores e consistência de uma rubrica utilizada no estudo.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="theory-section simulation-section">
        <div class="theory-section-head">
          <span class="theory-section-number">3</span>
          <div>
            <p class="theory-kicker">Ponte com a análise</p>
            <h2>Que tipos de dados essas estratégias podem gerar?</h2>
          </div>
        </div>
        <div class="theory-grid-2">
          <div class="theory-mini-card"><h4>Dados contínuos</h4><p>Escore total, nota, tempo, número de acertos e variação entre pré e pós.</p></div>
          <div class="theory-mini-card"><h4>Dados categóricos</h4><p>Adequado/inadequado, realizou/não realizou, sucesso/insucesso e classificações por nível de desempenho.</p></div>
          <div class="theory-mini-card"><h4>Dados pareados</h4><p>Pré-teste e pós-teste, reavaliação e repetição do mesmo participante ao longo do tempo.</p></div>
          <div class="theory-mini-card"><h4>Qualidade do instrumento</h4><p>Escalas, rubricas e checklists podem pedir alfa, ômega, Kappa ou ICC, dependendo do tipo de medida.</p></div>
        </div>
        <div class="theory-callout accent">
          <h4>Gancho para a próxima seção</h4>
          <p>Na seção de <strong>exemplos práticos</strong>, cada teste estatístico será apresentado com um exemplo aplicado à simulação em saúde. A ideia é mostrar como os dados produzidos nessas estratégias se conectam com escolhas analíticas reais.</p>
        </div>
      </section>

      <section class="theory-section simulation-section theory-section-reference">
        <div class="theory-section-head">
          <span class="theory-section-number">4</span>
          <div>
            <p class="theory-kicker">Leitura de apoio</p>
            <h2>Referências abertas sobre simulação em saúde</h2>
          </div>
        </div>
        <div class="theory-reference-list">
          <article><strong>WHO Regional Office for Europe.</strong><p><em>Simulation in nursing and midwifery education</em>. Documento aberto com fundamentos, aplicações e recomendações para ensino, avaliação e pesquisa.</p><a href="https://www.who.int/europe/publications/i/item/WHO-EURO-2018-3296-43055-60253" target="_blank" rel="noopener noreferrer">Abrir documento</a></article>
          <article><strong>INACSL.</strong><p><em>Healthcare Simulation Standards of Best Practice®</em>. Página oficial com acesso aos padrões em múltiplos idiomas, incluindo português.</p><a href="https://www.inacsl.org/healthcare-simulation-standards-of-best-practice-multiple-languages" target="_blank" rel="noopener noreferrer">Abrir página</a></article>
          <article><strong>Acta Paulista de Enfermagem.</strong><p><em>Implementação de boas práticas de simulação clínica</em>. Artigo aberto em português sobre delineamento e desafios de implementação.</p><a href="https://www.scielo.br/j/ape/a/snwSCdqwQLr4M4Nz75MJMZP/?lang=pt" target="_blank" rel="noopener noreferrer">Abrir artigo</a></article>
        </div>
      </section>
    </div>
  `;

  const panel = document.querySelector('.main-panel');
  if (panel) {
    panel.scrollTo({ top: 0, behavior: 'auto' });
    panel.innerHTML = html;
  }
}

window.carregarSimulacaoSaude = carregarSimulacaoSaude;
