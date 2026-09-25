/* Fórmula exatamente como aplicada na coluna IPH da aba "Calculadora IPH". */
const pesos = {
    pessoas: 0.1538,
    criancas: 0.1410,
    idosos: 0.1410,
    pcd: 0.1410,
    gestantes: 0.1474,
    tempo: 0.1474,
    estoque: 0.1282
};

function abrirFormulario() {
    document
        .getElementById("formulario")
        .classList.remove("escondido");
}

function calcularIPH() {
    const pessoas = Number(document.getElementById("pessoas").value);
    const criancas = Number(document.getElementById("criancas").value);
    const idosos = Number(document.getElementById("idosos").value);
    const pcd = Number(document.getElementById("pcd").value);
    const tempo = Number(document.getElementById("tempo").value);
    const gestantes = Number(document.getElementById("gestantes").value);
    const estoque = Number(document.getElementById("estoque").value);

    /* Notas de 0 a 10, conforme a aba "Calculadora IPH". */
    const notaPessoas = pessoas <= 100 ? 2 : pessoas <= 300 ? 6 : 10;
    const notaCriancas = pessoas === 0 ? 0 : (criancas / pessoas) * 10;
    const notaIdosos = pessoas === 0 ? 0 : (idosos / pessoas) * 10;
    const notaPcd = pcd > 0 ? 10 : 0;
    const notaTempo = tempo <= 6 ? 2 : tempo <= 24 ? 6 : 10;
    const notaGestantes = gestantes > 0 ? 10 : 0;
    const notaEstoque = (100 - estoque) / 10;

    /* Ordem e pesos iguais à fórmula das células P5:P8 da planilha. */
    const iph = 10 * (
        (notaPessoas * pesos.pessoas) +
        (notaCriancas * pesos.criancas) +
        (notaIdosos * pesos.idosos) +
        (notaPcd * pesos.pcd) +
        (notaGestantes * pesos.gestantes) +
        (notaTempo * pesos.tempo) +
        (notaEstoque * pesos.estoque)
    );

    const resultado = document.getElementById("resultado");
    resultado.classList.remove("escondido");

    document.getElementById("valorIPH").textContent = iph.toFixed(2);

    let classificacao = "";

    if (iph >= 81) {
        classificacao = "URGENTE";
    } else if (iph >= 61) {
        classificacao = "ALTA";
    } else if (iph >= 31) {
        classificacao = "MÉDIA";
    } else {
        classificacao = "ESTOQUE";
    }

    document.getElementById("classificacao").textContent = classificacao;
}

/* Permite instalar o SAPH como aplicativo quando ele estiver publicado. */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js");
    });
}
