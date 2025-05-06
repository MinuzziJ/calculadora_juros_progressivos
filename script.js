// Quando a página carrega, vamos ver se o usuário é um ser noturno
document.addEventListener("DOMContentLoaded", () => {
  const modoSalvo = localStorage.getItem("modo-noturno");
  if (modoSalvo === "ativado") {
    // Oh não, lá vamos nós de novo pro lado sombrio...
    document.body.classList.add("dark-mode");
  }
});

// Alterna entre claro e escuro porque, aparentemente, os olhos das pessoas são sensíveis agora
function alternarModoNoturno() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modo-noturno", isDarkMode ? "ativado" : "desativado");
}

// A mágica dos cálculos que todo mundo espera que funcione sem entender como
function calcularParcelas() {
  const valorAVista = parseFloat(document.getElementById("valorAVista").value); 
  const valorTotal = parseFloat(document.getElementById("valorTotal").value);
  const parcelasMaximas = parseInt(document.getElementById("parcelasMaximas").value);
  const nomeProduto = document.getElementById("nomeProduto").value;
  const descricaoProduto = document.getElementById("descricaoProduto").value;

  // Vamos tentar evitar que o usuário que não preencheu tudo reclame depois
  if (isNaN(valorAVista) || isNaN(valorTotal) || isNaN(parcelasMaximas)) {
    alert("Preencha todos os campos corretamente."); // Literalmente implorando
    return;
  }

  const tabela = document.createElement("table");
  const cabecalho = tabela.createTHead().insertRow();
  cabecalho.innerHTML = `
    <th>Parcelas</th>
    <th>Valor da Parcela</th>
    <th>Total</th>
  `;
  const corpo = tabela.createTBody();

  // Fórmula maravilhosa baseada em uma matemática de confiança... mais ou menos
  const incremento = (valorTotal - valorAVista) / (parcelasMaximas - 1);

  for (let i = 1; i <= parcelasMaximas; i++) {
    const row = corpo.insertRow();
    const totalParcela = valorAVista + incremento * (i - 1);
    const valorParcela = totalParcela / i;
    row.innerHTML = `
      <td>${i}x</td>
      <td>R$ ${valorParcela.toFixed(2)}</td>
      <td>R$ ${totalParcela.toFixed(2)}</td>
    `;
  }

  // A galeria de resultados aparece como se fosse mágica
  const resultadoDiv = document.getElementById("tabelaResultado");
  resultadoDiv.innerHTML = `<h2>${nomeProduto}</h2><p>${descricaoProduto}</p>`;
  resultadoDiv.appendChild(tabela);

  // Parabéns, agora você pode copiar ou imprimir isso como se fosse um relatório corporativo
  document.getElementById("copiarButton").style.display = "inline-block";
  document.getElementById("gerarPdfButton").style.display = "inline-block";
}

// A função mais subestimada: copiar com glamour
function copiarTabela() {
  const tabela = document.querySelector("#tabelaResultado table");
  if (!tabela) return;
  let textoParaCopiar = "Parcelas:\n";

  const rows = tabela.querySelectorAll("tr");
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const parcela = cells[0].innerText.trim();
    const valor = cells[1].innerText.trim();
    textoParaCopiar += `${parcela} - ${valor}\n`;
  }

  // A famosa gambiarra funcional pra copiar texto
  const temp = document.createElement("textarea");
  temp.value = textoParaCopiar;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy"); // Se não funcionar, culpe o navegador
  document.body.removeChild(temp);
  alert("Informações copiadas para a área de transferência."); // Sim, você é um hacker agora
}

// Porque PDF é a linguagem oficial dos orçamentos sérios
function gerarPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const nomeProduto = document.getElementById("nomeProduto").value;
  const descricaoProduto = document.getElementById("descricaoProduto").value;
  const tabela = document.querySelector("#tabelaResultado table");
  if (!tabela) return;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(`Nome do Produto: ${nomeProduto}`, 10, 10);
  doc.text(`Descrição: ${descricaoProduto}`, 10, 20);

  let y = 30;
  doc.text("Parcelas:", 10, y);
  y += 10;

  const rows = tabela.querySelectorAll("tr");
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const parcela = cells[0].innerText.trim();
    const valor = cells[1].innerText.trim();
    doc.text(`${parcela} - ${valor}`, 10, y);
    y += 10;
  }

  doc.save(`${nomeProduto}.pdf`); // Porque a galera adora baixar arquivos com nomes personalizados
}
