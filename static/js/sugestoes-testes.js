const sugestoesTestes = [
  // COMPARAÇÃO DE GRUPOS INDEPENDENTES
  {grupos:"2", repeticao:"nao", variavel:"continua", objetivo:"diferenca", indep:"indep", norm:"normal", nome:"Teste t para amostras independentes", tipo:"teste", descricao:"Compara as médias entre dois grupos distintos. Ex: Pressão arterial em Grupo A vs. Grupo B."},
  {grupos:"2", repeticao:"nao", variavel:"continua", objetivo:"diferenca", indep:"indep", norm:"nao-normal", nome:"Teste de Mann-Whitney U", tipo:"teste", descricao:"Alternativa não paramétrica ao Teste t. Compara medianas/distribuições de dois grupos."},
  {grupos:"3", repeticao:"nao", variavel:"continua", objetivo:"diferenca", indep:"indep", norm:"normal", nome:"ANOVA de uma via", tipo:"teste", descricao:"Compara as médias de três ou mais grupos distintos. Ex: Efeito de 3 tratamentos diferentes."},
  {grupos:"3", repeticao:"nao", variavel:"continua", objetivo:"diferenca", indep:"indep", norm:"nao-normal", nome:"Teste de Kruskal-Wallis", tipo:"teste", descricao:"Alternativa não paramétrica à ANOVA. Compara medianas/distribuições de três ou mais grupos."},

  {grupos:"2", repeticao:"nao", variavel:"ordinal", objetivo:"diferenca", indep:"indep", nome:"Teste de Mann-Whitney U", tipo:"teste", descricao:"Compara as distribuições de uma variável ordinal entre dois grupos. Ex: Escala de dor (leve, moderada, severa) em Grupo A vs. B."},
  {grupos:"2", repeticao:"nao", variavel:"categorica", objetivo:"diferenca", indep:"indep", nome:"Teste Qui-quadrado de Independência", tipo:"teste", descricao:"Verifica associação entre duas variáveis categóricas em uma tabela de contingência (ex: 2x2)."},
  {grupos:"2", repeticao:"nao", variavel:"categorica", objetivo:"diferenca", indep:"indep", nome:"Teste Exato de Fisher", tipo:"teste", descricao:"Alternativa ao Qui-quadrado, ideal para amostras pequenas (qualquer célula com contagem < 5)."},

  // MEDIDAS REPETIDAS
  {grupos:"1", repeticao:"sim", variavel:"continua", objetivo:"diferenca", indep:"pareado", norm:"normal", momentos:"2", nome:"Teste t pareado", tipo:"teste", descricao:"Compara as médias do mesmo grupo em dois momentos. Ex: Peso antes e depois da intervenção."},
  {grupos:"1", repeticao:"sim", variavel:"continua", objetivo:"diferenca", indep:"pareado", norm:"nao-normal", momentos:"2", nome:"Teste de Wilcoxon", tipo:"teste", descricao:"Alternativa não paramétrica ao Teste t pareado. Compara as medianas de dados pareados."},
  {grupos:"1", repeticao:"sim", variavel:"binaria", objetivo:"diferenca", indep:"pareado", momentos:"2", nome:"Teste de McNemar", tipo:"teste", descricao:"Compara proporções de uma variável binária em dados pareados. Ex: sucesso antes vs. depois."},

  {grupos:"1", repeticao:"sim", variavel:"continua", objetivo:"diferenca", indep:"pareado", norm:"normal", momentos:"3", nome:"ANOVA de Medidas Repetidas", tipo:"teste", descricao:"Compara médias em três ou mais momentos para o mesmo grupo. Ex: estresse em 3 fases do tratamento."},
  {grupos:"1", repeticao:"sim", variavel:"continua", objetivo:"diferenca", indep:"pareado", norm:"nao-normal", momentos:"3", nome:"Teste de Friedman", tipo:"teste", descricao:"Alternativa não paramétrica à ANOVA de medidas repetidas. Ideal para dados não normais."},
  {grupos:"1", repeticao:"sim", variavel:"binaria", objetivo:"diferenca", indep:"pareado", momentos:"3", nome:"Teste Q de Cochran", tipo:"teste", descricao:"Verifica mudança na proporção de sucesso entre três ou mais condições (dados pareados)."},

  // CORRELAÇÃO
  {grupos:"1", repeticao:"nao", variavel:"continua", objetivo:"relacao", norm:"normal", nome:"Correlação de Pearson (r)", tipo:"teste", descricao:"Mede associação linear entre duas variáveis contínuas com distribuição normal."},
  {grupos:"1", repeticao:"nao", variavel:"continua", objetivo:"relacao", norm:"nao-normal", nome:"Correlação de Spearman (ρ)", tipo:"teste", descricao:"Mede associação monotônica entre duas variáveis contínuas ou ordinais. Ideal quando não há normalidade."},
  {grupos:"1", repeticao:"nao", variavel:"ordinal", objetivo:"relacao", nome:"Correlação de Spearman (ρ)", tipo:"teste", descricao:"Avalia associação monotônica entre variáveis ordinais. Ex: escalas subjetivas como dor ou percepção."},

  // PREDIÇÃO
  {grupos:"1", repeticao:"nao", variavel:"continua", objetivo:"predicao", nome:"Regressão Linear Simples", tipo:"teste", descricao:"Prevê um desfecho contínuo (Y) com base em uma variável preditora (X)."},
  {grupos:"1", repeticao:"nao", variavel:"continua", objetivo:"predicao", nome:"Regressão Linear Múltipla", tipo:"teste", descricao:"Prevê um desfecho contínuo com múltiplas variáveis preditoras, ajustando para confundidores."},
  {grupos:"1", repeticao:"nao", variavel:"binaria", objetivo:"predicao", nome:"Regressão Logística Binária", tipo:"teste", descricao:"Prevê um desfecho binário (ex: sim/não) com uma ou mais variáveis preditoras. Usa odds ratio para interpretação."},

  // ASSOCIAÇÃO/RISCO
  {grupos:"2", repeticao:"nao", variavel:"binaria", objetivo:"associacao", indep:"indep", nome:"Razão de Chances (Odds Ratio - OR)", tipo:"medida", descricao:"Mede associação entre exposição e desfecho binário. Usado em estudos de caso-controle."},
  {grupos:"2", repeticao:"nao", variavel:"binaria", objetivo:"associacao", indep:"indep", nome:"Risco Relativo (RR)", tipo:"medida", descricao:"Compara o risco de um desfecho entre grupo exposto e não exposto. Usado em estudos de coorte."},
  {grupos:"2", repeticao:"nao", variavel:"tempo", objetivo:"associacao", indep:"indep", nome:"Hazard Ratio (HR)", tipo:"medida", descricao:"Compara o risco instantâneo de evento entre dois grupos ao longo do tempo (ex: sobrevida). Utilizado em modelos de Cox."},

  // CONCORDÂNCIA
  {grupos:"1", repeticao:"nao", variavel:"categorica", objetivo:"concordancia", nome:"Índice Kappa de Cohen", tipo:"teste", descricao:"Avalia concordância entre dois avaliadores em variáveis categóricas, corrigindo o acaso."},
  {grupos:"1", repeticao:"nao", variavel:"continua", objetivo:"concordancia", nome:"Coeficiente de Correlação Intraclasse (ICC)", tipo:"teste", descricao:"Mede a concordância entre avaliadores ou instrumentos em variáveis contínuas."}
];

// Função de verificação de inconsistências nas respostas do quiz
function verificarInconsistencias(respostas) {
  const mensagens = [];

  if (respostas.repeticao === "sim" && respostas.indep === "indep") {
    mensagens.push("Você selecionou 'dados pareados', mas também 'independentes'. Corrija essa escolha.");
  }

  if (respostas.repeticao === "nao" && respostas.indep === "pareado") {
    mensagens.push("Você selecionou 'dados independentes', mas também 'pareados'. Corrija essa escolha.");
  }

  if (respostas.objetivo === "relacao" && respostas.variavel === "categorica") {
    mensagens.push("Não é possível calcular correlação com variável categórica.");
  }

  if (respostas.objetivo === "predicao" && respostas.variavel === "categorica") {
    mensagens.push("Predição com variável categórica só é válida se for binária.");
  }

  if (respostas.objetivo === "associacao" && respostas.grupos === "1") {
    mensagens.push("A associação entre grupos requer pelo menos dois grupos comparados.");
  }

  return mensagens;
}
