function carregarMensagemBoasVindas() {
  const painel = document.getElementById('testes-container');
  painel.innerHTML = `
    <div style="
      max-width: 850px;
      padding: 2rem;
      background-color: #f0f7ff;
      border-radius: 12px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
      margin: 2rem auto;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    ">
      <h2 style="color: #1e88e5; font-size: 1.8rem; margin-bottom: 1rem;">
        Bem-vindo ao seu painel
      </h2>

      <p>
        Este é o seu espaço exclusivo dentro do <strong>Laboratório Virtual de Pesquisa em Simulação</strong>.  
        Aqui você encontrará ferramentas para aprender estatística aplicada à pesquisa de forma interativa, dinâmica e orientada.  
        Nossa proposta é tornar o raciocínio estatístico mais acessível, principalmente para quem está envolvido com simulação clínica, educação em saúde e investigação científica.
      </p>

      <p style="margin-top: 1rem;">
        No menu à esquerda, você poderá explorar os conceitos fundamentais, praticar com exemplos simulados e, em breve, aplicar testes estatísticos aos seus próprios dados.  
        <strong>Posicione o cursor sobre cada botão</strong> para visualizar instruções detalhadas e saber qual o melhor caminho a seguir.
      </p>

      <p style="margin-top: 1rem;">
        Aproveite a experiência e sinta-se à vontade para explorar, testar e aprender no seu ritmo.
      </p>
    </div>
  `;
}

// Executa ao carregar a página
window.addEventListener('load', () => {
  carregarMensagemBoasVindas();

  if (typeof sugestoesTestes === 'undefined') {
    console.warn('Arquivo sugestoes-testes.js não carregado.');
  }
});
