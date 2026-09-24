// ==========================================
// CONTROLE DO MODAL DE AJUDA
// ==========================================
const btnAjuda = document.getElementById("btnAjuda");
const modalAjuda = document.getElementById("modalAjuda");
const btnFecharModal = document.getElementById("btnFecharModal");

if (btnAjuda && modalAjuda && btnFecharModal) {
    btnAjuda.addEventListener("click", () => {
        modalAjuda.classList.add("ativo");
    });

    btnFecharModal.addEventListener("click", () => {
        modalAjuda.classList.remove("ativo");
    });
}

// ==========================================
// TAMANHO DE FONTES (ACESSIBILIDADE)
// ==========================================
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual + valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual - valorSubtraido;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

// ==========================================
// LEITURA DE TELA (SÍNTESE DE FALA)
// ==========================================
let lendo = false;
const btnLeitura = document.getElementById("btnVoz");

btnLeitura.addEventListener("click", lerEmVozAlta);

function lerEmVozAlta() {
    // Se já iniciou a leitura, alterna entre Pausar e Retomar
    if (lendo === true) {
        if (speechSynthesis.paused === true) {
            speechSynthesis.resume();
            btnLeitura.textContent = "Pausar Leitura";
        } else {
            speechSynthesis.pause();
            btnLeitura.textContent = "Continuar Leitura";
        }
        return;
    }

    // Captura o conteúdo de texto da tag <main>
    const conteudo = document.querySelector("main");
    const texto = conteudo.innerText;

    // Configura a leitura em voz alta
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.onend = finalizarLeitura;

    // Cancela leituras anteriores pendentes
    speechSynthesis.cancel();
    speechSynthesis.speak(fala);

    lendo = true;
    btnLeitura.textContent = "Pausar Leitura";
}

function finalizarLeitura() {
    lendo = false;
    btnLeitura.textContent = "Ouvir Página";
}