const flow = {
  start: {
    text: "Olá, tudo bem? 👋\n\nConsultoria Thayana Vilaça\nAgenda: (81) 92002-3267\nE-mail: consultoriathayanavilaca@gmail.com\n\nVou te ajudar a conquistar seu objetivo com planejamento e estratégia.\n\nO que você busca hoje?",
    options: [
      { label: "🏡 Imóvel", next: "imovel" },
      { label: "🚗 Veículo", next: "veiculo" },
      { label: "📈 Investimento", next: "investimento" }
    ]
  },

  imovel: {
    text: "Perfeito! O consórcio de imóvel é ideal para comprar, construir, reformar ou investir.\n\nQual faixa de crédito você busca?",
    options: [
      { label: "Até R$ 100 mil", next: "parcela" },
      { label: "R$ 100 mil a R$ 300 mil", next: "parcela" },
      { label: "Acima de R$ 300 mil", next: "parcela" },
      { label: "Ainda não sei", next: "parcela" }
    ]
  },

  veiculo: {
    text: "Ótima escolha! Com planejamento, você pode conquistar seu veículo sem juros.\n\nQual faixa de crédito você busca?",
    options: [
      { label: "Até R$ 50 mil", next: "parcela" },
      { label: "R$ 50 mil a R$ 100 mil", next: "parcela" },
      { label: "Acima de R$ 100 mil", next: "parcela" },
      { label: "Ainda não sei", next: "parcela" }
    ]
  },

  investimento: {
    text: "Excelente decisão. Muita gente usa consórcio para construir patrimônio com estratégia.\n\nQual seu objetivo principal?",
    options: [
      { label: "Renda extra", next: "parcela" },
      { label: "Construir patrimônio", next: "parcela" },
      { label: "Comprar para alugar", next: "parcela" }
    ]
  },

  parcela: {
    text: "Entendi. Qual valor de parcela ficaria confortável pra você?",
    inputNext: "tempo"
  },

  tempo: {
    text: "Você pretende começar quando?",
    options: [
      { label: "Agora", next: "decisor" },
      { label: "Em breve", next: "decisor" },
      { label: "Só pesquisando", next: "decisor" }
    ]
  },

  decisor: {
    text: "Hoje tem mais alguém que participa dessa decisão com você?",
    options: [
      { label: "Sim", next: "transicao" },
      { label: "Não", next: "transicao" }
    ]
  },

  transicao: {
    text: "Perfeito, entendi seu perfil.\n\nEnquanto muitos adiam decisões e perdem oportunidades, quem utiliza o consórcio transforma sonhos em metas concretas, com parcelas acessíveis e estratégia financeira.\n\nCom base no que você me falou, consigo te direcionar para um atendimento especializado. Vamos agendar?",
    options: [
      { label: "Sim, quero agendar", next: "agenda" },
      { label: "Quero mais informações", next: "info" }
    ]
  },

  info: {
    text: "Sem problema. Nosso atendimento é personalizado e feito para mostrar as melhores oportunidades de acordo com seu perfil.\n\nAgora escolha um horário disponível para falar com a consultoria.",
    next: "agenda"
  },

  agenda: {
    text: "Temos os seguintes horários de segunda a sexta. Qual você prefere?",
    options: [
      { label: "09h", next: "confirmacao" },
      { label: "10h", next: "confirmacao" },
      { label: "11h", next: "confirmacao" },
      { label: "14h", next: "confirmacao" },
      { label: "16h", next: "confirmacao" },
      { label: "17h30", next: "confirmacao" }
    ]
  },

  confirmacao: {
    text: "Perfeito! Vou reservar esse horário pra você.\n\nEsse atendimento é exclusivo e personalizado. Você confirma sua presença no horário combinado?",
    options: [
      { label: "Confirmo", next: "fechamento" },
      { label: "Quero outro horário", next: "agenda" }
    ]
  },

  fechamento: {
    text: "Agendamento confirmado ✅\n\nClique no botão abaixo para falar direto comigo no WhatsApp e finalizar seu atendimento 👇",
    options: [
      { label: "📲 Falar no WhatsApp", next: "whatsapp" }
    ]
  },

  whatsapp: {
    text: "Abrindo seu atendimento..."
  }
};

const messages = document.getElementById("messages");
const composer = document.getElementById("composer");
const input = document.getElementById("textInput");
let currentStep = "start";

/* Armazena os dados do lead */
const leadData = {
  interesse: "",
  faixaCredito: "",
  parcelaIdeal: "",
  quandoPretende: "",
  decisor: "",
  querAgendar: "",
  horario: "",
  confirmacao: ""
};

function salvarResposta(step, answer) {
  if (step === "start") {
    leadData.interesse = answer;
  } else if (step === "imovel" || step === "veiculo") {
    leadData.faixaCredito = answer;
  } else if (step === "investimento") {
    leadData.faixaCredito = answer;
  } else if (step === "parcela") {
    leadData.parcelaIdeal = answer;
  } else if (step === "tempo") {
    leadData.quandoPretende = answer;
  } else if (step === "decisor") {
    leadData.decisor = answer;
  } else if (step === "transicao") {
    leadData.querAgendar = answer;
  } else if (step === "agenda") {
    leadData.horario = answer;
  } else if (step === "confirmacao") {
    leadData.confirmacao = answer;
  }
}

function montarMensagemWhatsApp() {
  return `Olá! Acabei de fazer o agendamento pelo site e quero continuar meu atendimento.

*Resumo do lead:*
• Interesse: ${leadData.interesse || "Não informado"}
• Faixa de crédito / objetivo: ${leadData.faixaCredito || "Não informado"}
• Parcela confortável: ${leadData.parcelaIdeal || "Não informado"}
• Pretende começar: ${leadData.quandoPretende || "Não informado"}
• Participa da decisão: ${leadData.decisor || "Não informado"}
• Desejo de agendamento: ${leadData.querAgendar || "Não informado"}
• Horário escolhido: ${leadData.horario || "Não informado"}
• Confirmação final: ${leadData.confirmacao || "Não informado"}`;
}

function abrirWhatsApp() {
  const numero = "5581920023267";
  const mensagem = encodeURIComponent(montarMensagemWhatsApp());
  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}

function addBubble(text, type = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function addChoices(options) {
  if (!options || !options.length) return;

  const wrap = document.createElement("div");
  wrap.className = "choices";

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = option.label;

    btn.onclick = () => {
      clearChoices();

      if (option.next === "whatsapp") {
        addBubble(option.label, "user");
        setTimeout(() => {
          goToStep("whatsapp");
          setTimeout(() => {
            abrirWhatsApp();
          }, 400);
        }, 250);
      } else {
        handleAnswer(option.label, option.next);
      }
    };

    wrap.appendChild(btn);
  });

  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
}

function clearChoices() {
  document.querySelectorAll(".choices").forEach((el) => el.remove());
}

function goToStep(stepKey) {
  currentStep = stepKey;
  const step = flow[stepKey];
  if (!step) return;

  addBubble(step.text, "bot");

  if (step.next) {
    setTimeout(() => goToStep(step.next), 350);
    return;
  }

  addChoices(step.options);
}

function handleAnswer(answer, next) {
  clearChoices();

  /* salva a resposta antes de mudar de etapa */
  salvarResposta(currentStep, answer);

  addBubble(answer, "user");

  if (next) {
    setTimeout(() => goToStep(next), 300);
    return;
  }

  const step = flow[currentStep];
  if (step && step.inputNext) {
    setTimeout(() => goToStep(step.inputNext), 300);
  }
}

composer.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  handleAnswer(value, null);
  input.value = "";
});

goToStep("start");
