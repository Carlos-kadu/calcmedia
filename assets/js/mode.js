const colorToggleBtn = document.getElementById('color-toggle');
let isLightMode = localStorage.getItem('isLightMode') === 'true';

colorToggleBtn.innerText = isLightMode ? "🌒 Modo escuro" : "☀️ Modo claro";

if (isLightMode) {
    document.body.classList.add('light-mode');
}

colorToggleBtn.addEventListener('click', () => {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);

    localStorage.setItem('isLightMode', isLightMode);

    colorToggleBtn.innerText = isLightMode ? "🌒 Modo escuro" : "☀️ Modo claro";
});