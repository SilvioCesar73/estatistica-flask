/* quadrantes_testes.js – banner introdutório + quadrantes (corrigido) */

function carregarTestes() {

  /* ---------- 1. Introdução (banner) ---------- */
  const introHTML = `
    <div class="intro-testes mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm leading-relaxed">
      <p><strong>Como usar:</strong> abaixo você encontrará diversos testes estatísticos
      agrupados em <em>quatro quadrantes</em>, de acordo com a finalidade:</p>

      <ul class="list-disc ml-5 my-2 space-y-1">
        <li>📊 <strong>Comparação entre grupos diferentes</strong></li>
        <li>🔁 <strong>Comparação dentro do mesmo grupo</strong></li>
        <li>🔗 <strong>Correlação / Regressão</strong></li>
        <li>🤝 <strong>Concordância entre avaliadores</strong></li>
      </ul>

      <p>Clique em qualquer teste para visualizar:</p>
      <ul class="list-disc ml-5">
        <li>Descrição e requisitos</li>
        <li>Exemplo prático de estudo em simulação em saúde</li>
        <li>Planilha-modelo para organizar seus dados</li>
      </ul>
    </div>`;

  /* ---------- 2. Quadrantes ---------- */
  const quadrantesHTML = `
    <div class="quadrantes grid grid-cols-2 gap-6">

      <!-- 1) COMPARAÇÃO ENTRE GRUPOS -->
      <div class="quadrante bg-white border rounded-lg shadow p-4">
        <h3 class="font-semibold text-blue-700 mb-2">📊 Comparação entre grupos</h3>

        <button onclick="carregarExemplo('/static/data/casos/teste_t_independente_simulacao.json')">Teste t independente</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_anova_simulacao.json')">ANOVA</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_kruskal_simulacao.json')">Kruskal-Wallis</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_mannwhitney_simulacao.json')">Mann-Whitney</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_chiquadrado_simulacao.json')">Qui-quadrado</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_fisher_simulacao.json')">Fisher</button>

        <button onclick="carregarExemplo('/static/data/casos/regressao_logistica_simulacao.json')">Regressão logística binária</button>
        <button onclick="carregarExemplo('/static/data/casos/odds_ratio_simulacao.json')">Razão de chances (OR)</button>
        <button onclick="carregarExemplo('/static/data/casos/risk_ratio_simulacao.json')">Razão de riscos (RR)</button>
        <button onclick="carregarExemplo('/static/data/casos/hazard_ratio_simulacao.json')">Hazard Ratio</button>
      </div>

      <!-- 2) COMPARAÇÃO DENTRO DO MESMO GRUPO -->
      <div class="quadrante bg-white border rounded-lg shadow p-4">
        <h3 class="font-semibold text-blue-700 mb-2">🔁 Comparação dentro do mesmo grupo</h3>
        <button onclick="carregarExemplo('/static/data/casos/teste_t_pareado_simulacao.json')">Teste t pareado</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_wilcoxon_simulacao.json')">Wilcoxon</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_mcnemar_simulacao.json')">McNemar</button>
      </div>

      <!-- 3) CORRELAÇÃO / REGRESSÃO -->
      <div class="quadrante bg-white border rounded-lg shadow p-4">
        <h3 class="font-semibold text-blue-700 mb-2">🔗 Correlação / Regressão</h3>
        <button onclick="carregarExemplo('/static/data/casos/teste_pearson_simulacao.json')">Pearson</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_spearman_simulacao.json')">Spearman</button>
        <button onclick="carregarExemplo('/static/data/casos/regressao_linear_simples_simulacao.json')">Regressão linear simples</button>
        <button onclick="carregarExemplo('/static/data/casos/regressao_linear_multipla_simulacao.json')">Regressão linear múltipla</button>
        <button onclick="carregarExemplo('/static/data/casos/regressao_multipla_ajustada_simulacao.json')">Regressão múltipla ajustada</button>
      </div>

      <!-- 4) CONCORDÂNCIA -->
      <div class="quadrante bg-white border rounded-lg shadow p-4">
        <h3 class="font-semibold text-blue-700 mb-2">🤝 Concordância entre avaliadores</h3>
        <button onclick="carregarExemplo('/static/data/casos/teste_kappa_simulacao.json')">Índice Kappa</button>
        <button onclick="carregarExemplo('/static/data/casos/teste_icc_simulacao.json')">Correlação Intraclasse</button>
      </div>

    </div>`;

  /* ---------- 3. Injeta no painel ---------- */
  const panel = document.querySelector('.main-panel');
  if (panel) {
    panel.scrollTo({ top: 0, behavior: 'smooth' });
    panel.innerHTML = introHTML + quadrantesHTML;
  } else {
    console.error('Elemento .main-panel não encontrado.');
  }
}

/* ---------- POP-UP DE EXEMPLO ---------- */
function carregarExemplo(caminhoJson) {
  fetch(caminhoJson)
    .then(r => r.json())
    .then(d => {
      const popup   = document.getElementById('popup');
      const overlay = document.getElementById('overlay');
      const cont    = document.getElementById('popup-content');

      /* Ajuste das estatísticas se nome/valor não vierem prontos */
      if (d.estatisticas) {
        const e = d.estatisticas;
        if (!e.nome_estatistica || !e.valor_estatistica) {
          if (e.icc_2_1       !== undefined) { e.nome_estatistica = 'ICC';                e.valor_estatistica = e.icc_2_1; }
          else if (e.coeficiente_kappa)      { e.nome_estatistica = 'Kappa';              e.valor_estatistica = e.coeficiente_kappa; }
          else if (e.coeficiente_r)          { e.nome_estatistica = 'r (Pearson)';        e.valor_estatistica = e.coeficiente_r; }
          else if (e.coeficiente_rho)        { e.nome_estatistica = 'ρ (Spearman)';       e.valor_estatistica = e.coeficiente_rho; }
          else if (e.media_pre && e.media_pos){
            e.nome_estatistica = 'Δ Média';
            e.valor_estatistica = 'Pré: ' + e.media_pre + ' → Pós: ' + e.media_pos;
          } else if (e.mediana_pre && e.mediana_pos){
            e.nome_estatistica = 'Δ Mediana';
            e.valor_estatistica = 'Pré: ' + e.mediana_pre + ' → Pós: ' + e.mediana_pos;
          }
          e.p_valor = e.p_valor ?? '–';
        }
      }

      /* Monta HTML */
      const requisitos = d.requisitos?.length
        ? '<p><strong>Requisitos:</strong></p><ul>' +
          d.requisitos.map(r=>'<li>'+r+'</li>').join('') + '</ul>'
        : '';

      const estat = d.estatisticas
        ? '<p><strong>Estatísticas do teste:</strong></p><ul>' +
            '<li><strong>'+d.estatisticas.nome_estatistica+':</strong> '+d.estatisticas.valor_estatistica+'</li>' +
            '<li><strong>Valor de p:</strong> '+d.estatisticas.p_valor+'</li></ul>'
        : '';

      const tabela = d.dados_exemplo?.length
        ? (()=>{
            const cols = Object.keys(d.dados_exemplo[0]);
            const head = cols.map(c=>'<th>'+c+'</th>').join('');
            const body = d.dados_exemplo.map(row=>
              '<tr>'+cols.map(c=>'<td>'+row[c]+'</td>').join('')+'</tr>').join('');
            return '<p><strong>Dados simulados:</strong></p><table border="1" cellpadding="4" cellspacing="0"><thead><tr>'
                   + head + '</tr></thead><tbody>' + body + '</tbody></table>';
          })()
        : '';

      cont.innerHTML =
        '<h3>'+d.nome+'</h3>' +
        '<p><strong>Descrição:</strong> '+d.descricao+'</p>' +
        (d.tipo ? '<p><strong>Tipo de teste:</strong> '+d.tipo+'</p>' : '') +
        (d.quando_usar ? '<p><strong>Quando usar:</strong> '+d.quando_usar+'</p>' : '') +
        requisitos +
        '<p><strong>Exemplo:</strong> '+d.exemplo+'</p>' +
        (d.instrumento ? '<p><strong>Instrumento:</strong> '+d.instrumento.tipo+'</p><ul>'
          + d.instrumento.itens.map(i=>'<li>'+i+'</li>').join('')+'</ul><p><strong>Escore final:</strong> '
          + d.instrumento.escore_final+'</p>' : '') +
        tabela +
        estat +
        (d.interpretacao ? '<p><strong>Interpretação:</strong> '+d.interpretacao+'</p>' : '') +
        (d.planilha_exemplo ? '<p><a href="/static/data/casos/planilhas_exemplos/'+d.planilha_exemplo+'" target="_blank">📥 Baixar planilha de exemplo</a></p>' : '');

      popup.style.display = 'block';
      overlay.style.display = 'block';
    })
    .catch(err => alert('Erro ao carregar o exemplo: ' + err));
}

/* Torna globais para o onclick dos botões */
window.carregarTestes   = carregarTestes;
window.carregarExemplo  = carregarExemplo;
