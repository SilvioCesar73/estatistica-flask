/* quiz_modal.js — tooltips detalhados + filtro corrigido + validação de inconsistências */
(function () {
  /* ===== Textos de Ajuda (tooltips) ===== */
  const HELP = {
    grupos: `• 1 grupo → análise intra-grupo (antes × depois, dose única, etc.)
• 2 grupos → Tratamento vs. Controle, Masculino vs. Feminino…
• 3+ grupos → múltiplas doses, 3 escolas, 4 materiais distintos, etc.`,

    repeticao: `Marque **Sim** quando:
• Avalia a MESMA pessoa/unidade em >1 ocasião (pré-pós, follow-up)
• Desenho crossover (cada participante recebe 2 tratamentos)
• Gêmeos ou pares casados emparelhados

Marque **Não** se cada indivíduo aparece uma única vez.`,

    variavel: `**Contínua:** idade, peso, pressão arterial, tempo em segundos  
**Ordinal:** escala Likert 1-5, classificação de dor 0-10  
**Categórica multinomial:** tipo sanguíneo (A/B/AB/O), escolaridade  
**Binária:** sucesso/fracasso, cura/não-cura  
**Tempo até evento:** sobrevida, tempo até alta hospitalar`,

    objetivo: `• **Diferença:** comparar médias, medianas ou proporções  
• **Associação / Risco:** odds ratio, risco relativo, hazard ratio  
• **Predição:** regressão para estimar Y a partir de X  
• **Concordância:** grau de acordo entre avaliadores/métodos  
• **Correlação:** força de relação linear ou monotônica entre duas variáveis`,

    independentes: `**Independentes:** amostras SEM relação (pacientes distintos em cada grupo).  
**Pareados/emparelhados:**  
• Mesmos indivíduos medidos 2×  
• Gêmeos ou sujeitos emparelhados por idade/sexo  
• Amostras correlacionadas`,

    distribuicao: `Use um teste de normalidade (Shapiro-Wilk, Kolmogorov) ou avalie histograma & QQ-plot.  
• **Normal:** distribuição simétrica sem caudas pesadas/outliers  
• **Não normal / não sei:** assimétrica, curtose, poucos casos ou outliers`,

    momentos: `Indica QUANTAS vezes cada participante foi medido:\n• 2 momentos → antes/depois, baseline vs. pós‐tratamento\n• 3 ou mais → baseline, 1 mês, 3 meses… ou 3 tratamentos A/B/C`
  };

  const icon = (k) =>
    `<span class="help group relative cursor-pointer ml-1 text-blue-800">❔
       <span class="tooltip hidden group-hover:block whitespace-pre-line">${HELP[k]}</span>
     </span>`;

  function htmlQuiz() {
    return `
    <h2 class="text-xl font-semibold text-blue-700 mb-4">🧭 Escolha o teste estatístico ideal</h2>

    <form id="quiz-form"
          class="bg-white border border-gray-200 rounded-lg shadow p-6 grid grid-cols-4 gap-6 max-w-full">

      <div id="aviso-inconsistencia" class="col-span-4 text-red-600 font-semibold"></div>

      <!-- ... [demais blocos de perguntas] ... -->

      <div class="col-span-4 flex flex-col items-center gap-4">
        <button type="button" class="quiz-btn" onclick="gerarSugestaoTeste()">Ver sugestão</button>
        <div id="sugestao-teste" class="w-full"></div>
      </div>
    </form>`;
  }

  function checarInconsistencias(f) {
    const avisos = [];

    if (f.repeticao === "sim" && f.indep === "indep")
      avisos.push("⚠️ Você marcou 'Sim (pareado)' e também 'Independentes'. Esses conceitos se contradizem.");

    if (f.variavel === "tempo" && f.objetivo !== "associacao")
      avisos.push("⚠️ 'Tempo até evento' costuma ser usado com objetivo de 'Associação / Risco'.");

    if (f.repeticao === "sim" && f.objetivo === "predicao")
      avisos.push("⚠️ Modelos de predição geralmente assumem dados independentes, não pareados.");

    if (f.variavel === "binaria" && f.objetivo === "relacao")
      avisos.push("⚠️ Correlação com variável binária pode ser enganosa. Considere associação.");

    if (f.variavel === "continua" && f.objetivo === "concordancia" && f.grupos !== "1")
      avisos.push("⚠️ Concordância entre avaliadores geralmente se aplica a 1 grupo com medições repetidas.");

    if (f.variavel === "ordinal" && f.objetivo === "relacao")
      avisos.push("⚠️ Correlação com variável ordinal requer atenção especial. Use Spearman com cautela.");

    if (f.variavel === "tempo" && f.repeticao === "sim")
      avisos.push("⚠️ Variável 'tempo até evento' não costuma ser usada com dados pareados.");

    if (f.objetivo === "concordancia" && f.repeticao === "nao")
      avisos.push("⚠️ Medidas de concordância geralmente se aplicam a dados pareados ou avaliadores múltiplos.");

    if (f.objetivo === "predicao" && f.variavel === "categorica")
      avisos.push("⚠️ Predição com variável categórica pode não ser adequada para regressão tradicional.");

    if (f.variavel === "continua" && f.objetivo === "associacao" && f.grupos === "1")
      avisos.push("⚠️ Para associação entre grupos, você precisa de mais de um grupo.");

    if (f.grupos === "1" && f.indep === "indep")
      avisos.push("⚠️ Apenas um grupo não pode ser independente. Reavalie suas escolhas.");

    document.getElementById("aviso-inconsistencia").innerHTML = avisos.join("<br>");
  }

  function atualizarEstado(form) {
    const v = (n) => form.querySelector(`input[name="${n}"]:checked`)?.value;

    const indepOK = v("grupos") !== "1" || v("objetivo") === "diferenca";
    form.querySelectorAll('input[name="indep"]').forEach(i=>{
      i.disabled = !indepOK; if(!indepOK) i.checked = false;
    });

    const needNorm = v("variavel")==="continua" && ["diferenca","relacao"].includes(v("objetivo"));
    form.querySelectorAll('input[name="norm"]').forEach(i=>{
      i.disabled = !needNorm; if(!needNorm) i.checked = false;
    });

    const rep = v("repeticao")==="sim";
    form.querySelectorAll('input[name="momentos"]').forEach(i=>{
      i.disabled = !rep; if(!rep) i.checked = false;
    });

    const f = {
      grupos: v("grupos"), repeticao: v("repeticao"), variavel: v("variavel"),
      objetivo: v("objetivo"), indep: v("indep"), norm: v("norm"), momentos: v("momentos")
    };

    checarInconsistencias(f);
  }

  function gerarSugestaoTeste() {
    const g = n => document.querySelector(`input[name="${n}"]:checked`)?.value || "";
    const f = {grupos:g("grupos"), repeticao:g("repeticao"), variavel:g("variavel"),
               objetivo:g("objetivo"), indep:g("indep"), norm:g("norm"), momentos:g("momentos")};
    const out = document.getElementById("sugestao-teste");

    checarInconsistencias(f);

    if(!f.grupos || !f.repeticao || !f.variavel || !f.objetivo){
      out.innerHTML = "<p class='text-red-600 font-semibold'>⚠️ Preencha as quatro primeiras perguntas.</p>";
      return;
    }

    const lista = typeof sugestoesTestes!=="undefined" ? sugestoesTestes.filter(t =>
      ["grupos","repeticao","variavel","objetivo"].every(k=>t[k]===f[k]) &&
      (!t.indep     || f.indep==="" || f.grupos==="1" || t.indep===f.indep) &&
      (!t.norm      || t.norm===f.norm) &&
      (!t.momentos  || t.momentos===f.momentos)
    ) : [];

    out.innerHTML = lista.length
      ? "<p><strong>Testes sugeridos:</strong></p>" +
        lista.map(t=>`<p><strong>${t.nome}</strong><br><em>${t.descricao}</em></p>`).join("")
      : "<p><strong>Nenhum teste disponível para essa combinação.</strong><br>Revise suas respostas ou consulte um estatístico.</p>";
  }

  function carregarQuizModal(){
    document.querySelector(".main-panel").innerHTML = htmlQuiz();
    const form = document.getElementById("quiz-form");
    form.addEventListener("change", () => atualizarEstado(form));
  }

  window.carregarQuizModal = carregarQuizModal;
  window.gerarSugestaoTeste = gerarSugestaoTeste;
})();
