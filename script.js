// Vamos lá, vamos calcular as parcelas e mostrar na tela como se fosse um número mágico
function calcularParcelas() {
    const valorAVista = parseFloat(document.getElementById("valorAVista").value); 
    const valorTotal = parseFloat(document.getElementById("valorTotal").value);
    const parcelasMaximas = parseInt(document.getElementById("parcelasMaximas").value);
    const nomeProduto = document.getElementById("nomeProduto").value;
    const descricaoProduto = document.getElementById("descricaoProduto").value;
  
    // Caso você tenha esquecido de preencher algum campo, vamos te lembrar com um alert
    if (isNaN(valorAVista) || isNaN(valorTotal) || isNaN(parcelasMaximas)) {
      alert("Preencha todos os campos corretamente. Não seja preguiçoso!");
      return;
    }
  
    // Criando a tabela de um jeito tão simples que qualquer um faria (mas com muito estilo)
    const tabela = document.createElement("table");
    const cabecalho = tabela.createTHead().insertRow();
    cabecalho.innerHTML = `
      <th>Parcelas</th>
      <th>Valor da Parcela</th>
      <th>Total</th>
    `;
    const corpo = tabela.createTBody();
  
    // Calculando o valor de cada parcela, porque a matemática é nossa amiga
    const incremento = (valorTotal - valorAVista) / (parcelasMaximas - 1);
  
    // Laço de repetição, porque calculadora que se preze não pode ser preguiçosa
    for (let i = 1; i <= parcelasMaximas; i++) {
      const row = corpo.insertRow();
      const totalParcela = valorAVista + incremento * (i - 1); // Olha a matemática rolando
      const valorParcela = totalParcela / i; // Porque dividir é importante
      row.innerHTML = `
        <td>${i}x</td>
        <td>R$ ${valorParcela.toFixed(2)}</td>
        <td>R$ ${totalParcela.toFixed(2)}</td>
      `;
    }
  
    // Vamos renderizar tudo isso de uma vez, porque ninguém tem tempo a perder
    const resultadoDiv = document.getElementById("tabelaResultado");
    resultadoDiv.innerHTML = `<h2>${nomeProduto}</h2><p>${descricaoProduto}</p>`;
    resultadoDiv.appendChild(tabela);
  
    // E claro, não vamos esquecer de mostrar os botões. Afinal, alguém tem que ganhar essa função!
    document.getElementById("copiarButton").style.display = "inline-block";
    document.getElementById("gerarPdfButton").style.display = "inline-block";
  }
  
  // Função para copiar apenas as parcelas e valores. Total? Aquele detalhe sem importância.
  function copiarTabela() {
    const tabela = document.querySelector("#tabelaResultado table");
    if (!tabela) return;
    let textoParaCopiar = "Parcelas:\n";
  
    const rows = tabela.querySelectorAll("tr");
    // Começamos do 1 porque o cabeçalho aqui não vai salvar vidas
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const parcela = cells[0].innerText.trim();
      const valor = cells[1].innerText.trim();
      textoParaCopiar += `${parcela} - ${valor}\n`; // O mundo precisa disso
    }
  
    const temp = document.createElement("textarea");
    temp.value = textoParaCopiar;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  
    // Porque copiar informações é sempre útil, ainda mais se for com estilo
    alert("Informações copiadas para a área de transferência. Não vá perder essa oportunidade!");
  }
  
  // Gerar PDF? Sim, porque o PDF sempre faz você parecer mais profissional
  function gerarPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const nomeProduto = document.getElementById("nomeProduto").value;
    const descricaoProduto = document.getElementById("descricaoProduto").value;
    const tabela = document.querySelector("#tabelaResultado table");
    if (!tabela) return;
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    doc.text(`Nome do Produto: ${nomeProduto}`, 10, 10); // Vamos deixar claro qual é o nome, porque né...
    doc.text(`Descrição: ${descricaoProduto}`, 10, 20); // Porque descrição nunca é demais
  
    let y = 30; // Já vai começar a sair do topo porque a tela é limitada
    doc.text("Parcelas:", 10, y);
    y += 10;
  
    const rows = tabela.querySelectorAll("tr");
    // Percorrendo a tabela e colocando tudo no PDF como um profissional faria
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const parcela = cells[0].innerText.trim();
      const valor = cells[1].innerText.trim();
      doc.text(`${parcela} - ${valor}`, 10, y);
      y += 10; // Vai subindo, né? Porque não cabe tudo de uma vez
    }
  
    // Salva o PDF com o nome do produto, porque quem não ama um bom nome de arquivo
    doc.save(`${nomeProduto}.pdf`);
  }
  
  // Ah, o modo noturno! Porque, sim, todo mundo ama ficar na escuridão digital de vez em quando
  function alternarModoNoturno() {
    document.body.classList.toggle("dark-mode"); // Se joga na escuridão!
  }
  