function abrirPopup(content) {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const popupContentDiv = document.getElementById('popup-content');

  if (popupContentDiv) {
    popupContentDiv.innerHTML = content;
  }

  if (popup && overlay) {
    popup.style.display = 'block';
    overlay.style.display = 'block';
  }
}

// Deixa a função visível no escopo global
window.abrirPopup = abrirPopup;

function fecharPopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Deixa a função visível no escopo global
window.fecharPopup = fecharPopup;