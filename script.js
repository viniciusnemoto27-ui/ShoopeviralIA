
document.addEventListener("DOMContentLoaded", function () {
  const botoes = document.querySelectorAll(
    "button, [data-page], [data-tab]"
  );

  const secoes = document.querySelectorAll(
    "main section, .page, .tab-content"
  );

  function mostrarSecao(alvo) {
    if (!alvo) return;

    let secao = document.getElementById(alvo);

    if (!secao) {
      secao = document.querySelector(
        '[data-page="' + alvo + '"], [data-tab="' + alvo + '"]'
      );
    }

    if (!secao) return;

    secoes.forEach(function (item) {
      item.style.display = "none";
    });

    secao.style.display = "block";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const alvo =
        botao.dataset.page ||
        botao.dataset.tab ||
        botao.dataset.target;

      if (alvo) {
        mostrarSecao(alvo);
      }
    });
  });

  console.log("Shopee Viral IA iniciado!");
});
