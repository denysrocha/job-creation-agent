import { TopBar } from "./TopBar";
import { ChatArea } from "./ChatArea";
import { InfoPanel } from "./InfoPanel";
import { DraftView } from "./DraftView";
import { TourGuide } from "./TourGuide";
import { CelebrationModal } from "./CelebrationModal";
import { RecursosPanel } from "./RecursosPanel";
import { RightFormPanel } from "./RightFormPanel";
import { CamposFaltantesForm } from "./CamposFaltantesForm";
import { ConfirmacaoRound2Form } from "./ChatMessage";
import { ChatMessage, JobData, JobDataMetadata, ConversationState, RequisitionFullData, Posicao } from "../types/job";
import { JDAnalysisResult, QuestoesEstruturaisData, CamposFaltantesData } from "../types/jdAnalysis";
import { simulateJDAnalysis } from "../data/jdSimulation";
import { JD_PROCESSING_STEPS, FIRST_ROUND_STEPS, REQUISITION_ROUND2_STEPS } from "./ChatMessage";
import { mockJobs, mockRequisitions, mockTemplates, jobFullDataFromId, requisitionFullDataFromId, templateDetailsFromId } from "../data/mockData";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { AnimatePresence } from "motion/react";
import { CAMPOS_CONFIG } from "./CamposPersonalizadosSideSheet";

// Fixed audio transcription — round 1 (job description)
const FIXED_AUDIO_TRANSCRIPTION =
  "A gente tá buscando um Engenheiro Frontend Sênior pra trabalhar no nosso produto principal, que é um SaaS B2B. A pessoa precisa ter experiência sólida com React e TypeScript, pelo menos cinco anos, e entender bem de arquitetura de componentes e microfrontends. É importante ter vivência com testes automatizados, Jest e React Testing Library. Como diferencial, a gente valoriza quem já trabalhou com design systems e GraphQL. A empresa oferece plano de saúde, vale refeição, stock options e auxílio home office. O ambiente é bem técnico, com muita autonomia e colaboração próxima com produto e design.";

// Fixed audio transcription — round 2 (salary / location / positions)
const FIXED_AUDIO_TRANSCRIPTION_ROUND2 =
  "O salário é entre 12 e 16 mil, CLT. A vaga é presencial em São Paulo. São 2 posições, as duas por aumento de quadro.";

const FIXED_AUDIO_TRANSCRIPTION_REQ_ROUND2 =
  "A contratação vai ser CLT, a localização é São Paulo, SP, e o modelo de trabalho é Híbrido.";

// Local Message type (extends ChatMessage with any extra fields used in the component)
type Message = ChatMessage;

export function JobCreation() {
  const location = useLocation();
  const navigate = useNavigate();
  const messageIdCounter = useRef(2);
  const [showTour, setShowTour] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [jobData, setJobData] = useState<JobData>({});
  const [jobDataMetadata, setJobDataMetadata] = useState<JobDataMetadata>({});
  const [jdAnalysis, setJdAnalysis] = useState<JDAnalysisResult | null>(null);
  const [conversationState, setConversationState] = useState<ConversationState>({
    flow: 'initial',
    step: 0,
    waitingForInput: false,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("Descreva a vaga ou responda às perguntas...");
  const [isDraftView, setIsDraftView] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [processingStep, setProcessingStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const [hasProcessingCompleted, setHasProcessingCompleted] = useState(false);

  // Robot state for hover on "Criar rascunho" button
  const [robotLookingAtDraft, setRobotLookingAtDraft] = useState(false);

  // Celebration modal (shown once per session on first draft creation)
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const celebrationShownRef = useRef(false);
  const currentRequisitionRef = useRef<RequisitionFullData | null>(null);

  // Recursos (right panel) + InfoPanel collapsed
  const [showRecursosPanel, setShowRecursosPanel] = useState(false);
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);
  const [recursosExpandedKey, setRecursosExpandedKey] = useState<string | null>(null);
  const [formPanel, setFormPanel] = useState<{ title: string; node: React.ReactNode } | null>(null);

  const openFormPanel = (title: string, node: React.ReactNode) => {
    setShowRecursosPanel(false);
    setFormPanel({ title, node });
  };

  const addMessage = (message: Omit<ChatMessage, 'id'>, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newId = (messageIdCounter.current++).toString();
      setMessages(prev => [...prev, { ...message, id: newId }]);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
    }]);
  };

  const fieldDefinitions: Record<string, { label: string; options?: { label: string; value: string }[] }> = {
    // Campos preenchidos automaticamente (não aparecem aqui)
    titulo: { label: 'Título da vaga' },
    descricao: { label: 'Descrição' },
    senioridade: { 
      label: 'Senioridade', 
      options: [
        { label: 'Estagiário', value: 'Estagiário' },
        { label: 'Junior', value: 'Junior' },
        { label: 'Pleno', value: 'Pleno' },
        { label: 'Senior', value: 'Senior' },
        { label: 'Staff', value: 'Staff' },
        { label: 'Principal', value: 'Principal' },
      ]
    },
    etapas: { label: 'Etapas' },
    divulgacao: { label: 'Divulgação' },
    confirmacaoInscricao: { label: 'Confirmação de inscrição' },
    formularioPersonalizado: { label: 'Formulário personalizado' },
    criteriosAnalise: { label: 'Critérios de análise' },
    agenteTriagem: { label: 'Agente na triagem' },
    kitEntrevistaScorecard: { label: 'Kit de entrevista e Scorecard' },
    
    // Campos que o agente pergunta
    avaliadores: { label: 'Avaliadores responsáveis' },
    gestor: { label: 'Gestor responsável' },
    sla: { label: 'SLA (prazo de contratação)' },
    posicoes: { label: 'Número de posições' },
    salario: { label: 'Faixa salarial' },
    localizacao: { label: 'Localização' },
    modeloTrabalho: { 
      label: 'Modelo de trabalho', 
      options: [
        { label: 'Presencial', value: 'Presencial' },
        { label: 'Remoto', value: 'Remoto' },
        { label: 'Híbrido', value: 'Híbrido' },
      ]
    },
    tipoContrato: {
      label: 'Tipo de contrato',
      options: [
        { label: 'CLT', value: 'CLT' },
        { label: 'PJ', value: 'PJ' },
        { label: 'Estágio', value: 'Estágio' },
      ]
    },
    departamento: { label: 'Departamento' },
    requisicao: { label: 'Requisição' },
    camposPersonalizados: { label: 'Campos personalizados' },
  };

  const fieldGroups = {
    localizacaoModelo: {
      label: 'Localização e modelo de trabalho',
      fields: ['modeloTrabalho', 'localizacao'] as (keyof JobData)[],
    },
    processo: {
      label: 'Processo seletivo',
      fields: ['avaliadores', 'camposPersonalizados'] as (keyof JobData)[],
    },
  };

  const getMissingFields = (currentJobData?: JobData) => {
    const dataToCheck = currentJobData || jobData;
    
    // Define os grupos de campos
    const groups = [
      {
        id: 'faixaSalarial',
        label: 'Faixa salarial',
        fields: ['salarioMinimo', 'salarioMaximo', 'tipoContrato'] as (keyof JobData)[],
      },
      {
        id: 'localizacao',
        label: 'Localização',
        fields: ['localizacao', 'modeloTrabalho'] as (keyof JobData)[],
      },
      {
        id: 'avaliadores',
        label: 'Avaliadores e gestor',
        fields: ['avaliadores', 'gestor'] as (keyof JobData)[],
      },
      {
        id: 'camposPersonalizados',
        label: 'Campos personalizados',
        fields: ['projeto', 'time', 'squad', 'centroCusto', 'bu'] as (keyof JobData)[],
      },
      {
        id: 'requisicao',
        label: 'Requisição',
        fields: ['requisicao', 'requisicoes'] as (keyof JobData)[],
      },
    ];

    // Retorna os grupos que têm pelo menos um campo faltando
    return groups.filter(group => {
      return group.fields.some(field => {
        const value = dataToCheck[field];
        if (typeof value === 'string') {
          return value.trim() === '';
        }
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        return !value;
      });
    });
  };

  const getMissingFieldGroups = (currentJobData?: JobData) => {
    const missingFields = getMissingFields(currentJobData);
    const groups: { label: string; fields: string[] }[] = [];

    Object.entries(fieldGroups).forEach(([, group]) => {
      const missingInGroup = group.fields.filter(field => missingFields.includes(field));
      if (missingInGroup.length > 0) {
        groups.push({
          label: group.label,
          fields: missingInGroup,
        });
      }
    });

    return groups;
  };

  const showMissingFieldsOptions = (
    currentJobData?: JobData,
    isDraftContext = false,
    formInitialData?: { requisicao?: { id: string; label: string }; posicoes?: Posicao[] },
  ) => {
    const data = currentJobData || jobData;

    if (isDraftContext) {
      addMessage({
        type: 'agent',
        content: 'Quer deixar sua vaga ainda mais completa? Clique nos cards para editar ou vá direto para o rascunho clicando no botão ao lado direito da tela.',
      }, 5000);
      setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });
      setHasProcessingCompleted(true);
      return;
    }

    const missingGroups = getMissingFields(data);

    if (missingGroups.length === 0) {
      addMessage({
        type: 'agent',
        content: 'Perfeito! Todos os dados essenciais foram coletados. Você pode criar o rascunho da vaga agora! 🎉',
      }, 1500);
      setConversationState({ flow: 'initial', step: 0, waitingForInput: false });
      setHasProcessingCompleted(true);
      return;
    }

    // posições já informadas antes → não exibir no form, mas passar o valor capturado
    const posicoesJaInformadas =
      Array.isArray(data.posicoes) && data.posicoes.length > 0;

    // initial posicoes: prefer explicitly passed value, fallback to what's in jobData
    const resolvedInitialPosicoes =
      formInitialData?.posicoes ??
      (posicoesJaInformadas ? data.posicoes : undefined);

    const camposFaltantesId = (messageIdCounter.current++).toString();
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: camposFaltantesId,
        type: 'agent',
        content: 'Ótimo, os principais recursos da vaga foram configurados. Para finalizá-la, preciso de mais alguns dados: avaliadores, gestor, requisição e campos personalizados.\nSe não quiser preencher agora, clique em "Criar rascunho" no painel à esquerda.',
        camposFaltantesForm: true,
        camposFaltantesInitial: {
          ...formInitialData,
          posicoes: resolvedInitialPosicoes,
          hidePosicoes: posicoesJaInformadas,
        },
        onCamposFaltantesSubmit: (data: CamposFaltantesData) => {
          handleCamposFaltantesSubmit(data, currentJobData);
        },
      }]);
    }, 1500);

    setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });
    setHasProcessingCompleted(true);
  };

  const handleDoubleFieldSubmit = (field1: string, field2: string, field1Value: string, field2Value: string) => {
    addUserMessage(field1Value);
    addUserMessage(field2Value);
    
    const updatedJobData = {
      ...jobData,
      [field1]: field1Value,
      [field2]: field2Value,
    };
    
    setJobData(updatedJobData);

    const fieldToCardMap: Record<string, string> = {
      'titulo': 'detalhes',
      'senioridade': 'detalhes',
      'gestor': 'detalhes',
      'sla': 'detalhes',
      'avaliadores': 'detalhes',
      'posicoes': 'posicoes',
      'salario': 'orcamento',
      'localizacao': 'localizacao',
      'modeloTrabalho': 'localizacao',
      'requisicao': 'requisicao',
      'camposPersonalizados': 'camposPersonalizados',
      'etapas': 'etapas',
      'divulgacao': 'divulgacao',
    };

    if (isDraftView && fieldToCardMap[field1]) {
      setHighlightedCard(fieldToCardMap[field1]);
      setTimeout(() => setHighlightedCard(null), 2500);
    }

    if (isDraftView && fieldToCardMap[field2]) {
      setHighlightedCard(fieldToCardMap[field2]);
      setTimeout(() => setHighlightedCard(null), 2500);
    }

    setConversationState(prev => ({ ...prev, selectedField: undefined, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handlePosicoesSubmit = (posicoes: Posicao[]) => {
    // Formata para exibição no chat
    const posicoesText = posicoes.map(p => `${p.quantidade} vaga(s) - Motivo: ${p.motivo}`).join('; ');
    addUserMessage(posicoesText);
    
    const updatedJobData = {
      ...jobData,
      posicoes,
    };
    
    setJobData(updatedJobData);

    const fieldToCardMap: Record<string, string> = {
      'titulo': 'detalhes',
      'senioridade': 'detalhes',
      'gestor': 'detalhes',
      'sla': 'detalhes',
      'avaliadores': 'detalhes',
      'posicoes': 'posicoes',
      'salario': 'orcamento',
      'localizacao': 'localizacao',
      'modeloTrabalho': 'localizacao',
      'requisicao': 'requisicao',
      'camposPersonalizados': 'camposPersonalizados',
      'etapas': 'etapas',
      'divulgacao': 'divulgacao',
    };

    if (isDraftView && fieldToCardMap['posicoes']) {
      setHighlightedCard(fieldToCardMap['posicoes']);
      setTimeout(() => setHighlightedCard(null), 2500);
    }

    setConversationState(prev => ({ ...prev, selectedField: undefined, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleFieldSelection = (fieldKey: string) => {
    const field = fieldDefinitions[fieldKey];

    setConversationState(prev => ({ ...prev, selectedField: fieldKey }));

    if (field.options) {
      addMessage({
        type: 'agent',
        content: `Selecione ${field.label.toLowerCase()}:`,
        selectOptions: field.options,
        onSubmit: (value: string) => handleFieldValueSubmit(fieldKey, value),
      }, 1500);
    } else {
      setInputPlaceholder(`Digite ${field.label.toLowerCase()}...`);
      addMessage({
        type: 'agent',
        content: `Digite ${field.label.toLowerCase()}:`,
      }, 1500);
      setConversationState(prev => ({ ...prev, waitingForInput: true }));
    }
  };

  const handleFieldValueSubmit = (fieldKey: string, value: string) => {
    addUserMessage(value);
    
    const updatedJobData = {
      ...jobData,
      [fieldKey]: value,
    };
    
    setJobData(updatedJobData);

    const fieldToCardMap: Record<string, string> = {
      'titulo': 'detalhes',
      'senioridade': 'detalhes',
      'gestor': 'detalhes',
      'sla': 'detalhes',
      'avaliadores': 'detalhes',
      'posicoes': 'posicoes',
      'salario': 'orcamento',
      'localizacao': 'localizacao',
      'modeloTrabalho': 'localizacao',
      'requisicao': 'requisicao',
      'camposPersonalizados': 'camposPersonalizados',
      'etapas': 'etapas',
      'divulgacao': 'divulgacao',
    };

    if (isDraftView && fieldToCardMap[fieldKey]) {
      setHighlightedCard(fieldToCardMap[fieldKey]);
      setTimeout(() => setHighlightedCard(null), 2500);
    }

    setConversationState(prev => ({ ...prev, selectedField: undefined, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleSendMessage = (message: string) => {
    if (conversationState.flow === 'from_scratch_round1') {
      addUserMessage(message);
      processFirstRound(message);
    } else if (conversationState.flow === 'from_scratch_round2') {
      addUserMessage(message);
      processSecondRound(message);
    } else if (conversationState.flow === 'use_requisition_round2') {
      addUserMessage(message);
      processRequisitionRound2({ ...jobData });
    } else if (conversationState.flow === 'has_description') {
      handleDescriptionSubmit(message);
    } else if (conversationState.flow === 'help_create') {
      handleInterviewAnswer(message);
    } else if (conversationState.flow === 'completing_data' && conversationState.selectedField) {
      handleFieldValueSubmit(conversationState.selectedField, message);
    } else if (conversationState.flow === 'sla_input') {
      handleSlaSubmit(message);
    }
  };

  // ── Audio send handler ─────────────────────────────────────────────────────
  const handleSendAudio = (duration: string) => {
    const isRound2 = conversationState.flow === 'from_scratch_round2';
    const isReqRound2 = conversationState.flow === 'use_requisition_round2';
    const transcription = isRound2 ? FIXED_AUDIO_TRANSCRIPTION_ROUND2 : isReqRound2 ? FIXED_AUDIO_TRANSCRIPTION_REQ_ROUND2 : FIXED_AUDIO_TRANSCRIPTION;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: transcription,
      isAudioMessage: true,
      audioDuration: duration,
      transcription,
    }]);

    if (conversationState.flow === 'from_scratch_round1') {
      processFirstRound(FIXED_AUDIO_TRANSCRIPTION);
    } else if (conversationState.flow === 'from_scratch_round2') {
      processSecondRound(FIXED_AUDIO_TRANSCRIPTION_ROUND2, true);
    } else if (conversationState.flow === 'use_requisition_round2') {
      processRequisitionRound2({ ...jobData });
    }
  };

  // ── Detect "prosseguir" vs informative message ────────────────���────────────
  const isInformativeMessage = (text: string): boolean => {
    const lower = text.toLowerCase().trim();
    const proceedKeywords = [
      'prossiga', 'prosseguir', 'pode continuar', 'não tenho', 'nao tenho',
      'sem essas informações', 'sem essas informacoes', 'próximo', 'proximo',
      'avança', 'avançar', 'avance', 'continua', 'continuar', 'pode ir', 'tudo bem',
    ];
    if (proceedKeywords.some(k => lower.includes(k))) return false;

    const words = lower.split(/\s+/).filter(Boolean);
    const hasNumbers = /\d/.test(lower);
    const hasLocationKeywords = /são paulo|sp\b|rio\b|rj\b|belo horizonte|mg\b|remoto|presencial|híbrido|hibrido|curitiba|pr\b|porto alegre|fortaleza/i.test(lower);
    const hasCurrency = /r\$|reais|salário|salario|mil\b|\bk\b/i.test(lower);

    if (words.length < 5 && !hasNumbers && !hasLocationKeywords && !hasCurrency) return false;
    return true;
  };

  // ── Round 1: quick extraction (titulo + senioridade) → ask for more ────────
  const processFirstRound = (text: string) => {
    setConversationState(prev => ({ ...prev, waitingForInput: false }));

    const processingMsgId = `processing-${messageIdCounter.current++}`;

    const onComplete = () => {
      setMessages(prev => prev.map(msg =>
        msg.id === processingMsgId
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: { steps: FIRST_ROUND_STEPS, isExpanded: false },
            }
          : msg
      ));

      const extracted: JobData = {
        titulo: 'Engenheiro Frontend Sênior',
        descricao: text,
        senioridade: 'Sênior',
        area: 'Tecnologia',
        notasInternas: 'Perfil sênior escasso no mercado — priorizar hunting ativo no LinkedIn.',
        etapas: 'Triagem → Teste técnico → Entrevista com gestor → Proposta',
        divulgacao: 'LinkedIn, Site da empresa, Gupy',
        divulgarVaga: true,
        quemPodeVerVaga: 'Pública',
        confirmacaoInscricao: 'Olá! Recebemos sua inscrição para a vaga de Engenheiro Frontend Sênior. Em breve entraremos em contato.',
        formularioPersonalizado: 'Ativo - perguntas geradas pela JD',
        criteriosAnalise: 'Ativo - critérios gerados pela JD',
        agenteTriagem: 'Ativo',
        kitEntrevistaScorecard: 'Ativo - roteiro gerado pela JD',
      };
      setJobData(extracted);
      setJobDataMetadata({
        titulo: { source: 'extracted' },
        descricao: { source: 'extracted' },
        senioridade: { source: 'inferred' },
        area: { source: 'inferred' },
        notasInternas: { source: 'inferred' },
        etapas: { source: 'inferred' },
        divulgacao: { source: 'inferred' },
        confirmacaoInscricao: { source: 'inferred' },
        formularioPersonalizado: { source: 'inferred' },
        criteriosAnalise: { source: 'inferred' },
        agenteTriagem: { source: 'inferred' },
        kitEntrevistaScorecard: { source: 'inferred' },
      });

      setConversationState({ flow: 'from_scratch_round2', step: 0, waitingForInput: true });
      setInputPlaceholder("Pode falar do jeito que quiser — texto ou áudio...");

      addMessage({
        type: 'agent',
        content: 'Boa! Já extraí o título, senioridade e os principais requisitos. Para montar um processo seletivo de verdade, preciso também de: **faixa salarial e tipo de contrato, localização e modelo de trabalho**. Cada informação que você me der agora aumenta diretamente a qualidade da vaga — e vagas mais completas contratam mais rápido. Me manda o que tiver, do jeito que for mais fácil.',
      }, 1500);
    };

    setMessages(prev => [...prev, {
      id: processingMsgId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete: onComplete,
      customProcessingSteps: FIRST_ROUND_STEPS,
      customProcessingDuration: 600,
    } as any]);
  };

  // ── Round 2: detect informative vs proceed, then full BUM ─────────────────
  const processSecondRound = (text: string, forceInformative = false) => {
    setConversationState(prev => ({ ...prev, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    const informative = forceInformative || isInformativeMessage(text);

    let updatedJobData: JobData = { ...jobData };
    const localJaInformado = { salario: false, modeloTrabalho: false, localizacao: false };

    if (informative) {
      const secondRound: Partial<JobData> = {
        salarioMinimo: 'R$ 12.000',
        salarioMaximo: 'R$ 16.000',
        tipoContrato: 'CLT',
        localizacao: 'São Paulo, SP',
        modeloTrabalho: 'Presencial',
        posicoes: [{ quantidade: 2, motivo: 'Aumento de quadro' }],
      };
      updatedJobData = { ...updatedJobData, ...secondRound };
      setJobData(updatedJobData);
      setJobDataMetadata(prev => ({
        ...prev,
        salarioMinimo: { source: 'extracted' },
        salarioMaximo: { source: 'extracted' },
        tipoContrato: { source: 'inferred' },
        localizacao: { source: 'extracted' },
        modeloTrabalho: { source: 'extracted' },
        posicoes: { source: 'extracted' },
      }));
      localJaInformado.salario = true;
      localJaInformado.modeloTrabalho = true;
      localJaInformado.localizacao = true;
    }

    const processingMsgId = `processing-${messageIdCounter.current++}`;

    const onComplete = () => {
      setMessages(prev => prev.map(msg =>
        msg.id === processingMsgId
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: { steps: JD_PROCESSING_STEPS, isExpanded: false },
            }
          : msg
      ));

      const description = updatedJobData.descricao || text;
      const analysis = simulateJDAnalysis(description);
      setJdAnalysis(analysis);

      // Auto-open recursos panel
      setShowRecursosPanel(true);

      const distribId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: distribId,
          type: 'agent',
          content: 'Com base na descrição da vaga, montei os recursos do seu processo seletivo — da triagem à seleção. Revise e ajuste o que quiser:',
          distribuicaoPainel: analysis,
          distribuicaoPainelTitulo: updatedJobData.titulo,
        }]);
      }, 800);

      const structId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: structId,
          type: 'agent',
          content: informative
            ? 'Já capturei os dados que você informou. Confirme as automações abaixo ou ajuste o que precisar:'
            : 'Agora preciso de alguns dados para completar a vaga e configurar as automações.',
          questoesEstruturaisForm: true,
          questoesEstruturaisInitial: {
            salMin: updatedJobData.salarioMinimo || '',
            salMax: updatedJobData.salarioMaximo || '',
            tipoContrato: updatedJobData.tipoContrato || '',
            modeloTrabalho: updatedJobData.modeloTrabalho || '',
            localizacao: updatedJobData.localizacao || '',
            jaInformado: {
              salario: localJaInformado.salario,
              modeloTrabalho: localJaInformado.modeloTrabalho,
              localizacao: localJaInformado.localizacao,
            },
          },
          onQuestoesEstruturaisSubmit: (data: QuestoesEstruturaisData) => {
            handleQuestoesEstruturaisSubmit(data, updatedJobData, analysis);
          },
        }]);
      }, 4000);
    };

    setMessages(prev => [...prev, {
      id: processingMsgId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete: onComplete,
      customProcessingSteps: JD_PROCESSING_STEPS,
    } as any]);
  };

  const handleDescriptionSubmit = (description: string) => {
    addUserMessage(description);
    setConversationState(prev => ({ ...prev, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    const processingMessageId = `processing-${messageIdCounter.current++}`;
    
    const onProcessingComplete = () => {
      const processingSteps = JD_PROCESSING_STEPS;
      
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessageId && msg.type === 'agent'
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: {
                steps: processingSteps,
                isExpanded: false,
              }
            }
          : msg
      ));
      
      // Agente preenche APENAS os 10 campos automáticos
      const extractedData: JobData = {
        titulo: 'Engenheiro de Software',
        descricao: description,
        senioridade: 'Pleno',
        notasInternas: 'Vaga identificada como prioridade para o time de tecnologia. Substituição de colaborador sênior — manter nível de senioridade e fit técnico.',
        etapas: 'Triagem → Teste técnico → Entrevista com gestor → Proposta',
        divulgacao: 'LinkedIn, Site da empresa, Gupy',
        divulgarVaga: true,
        quemPodeVerVaga: 'Pública',
        confirmacaoInscricao: 'Olá! Recebemos sua inscrição para a vaga de Engenheiro de Software. Em breve entraremos em contato.',
        formularioPersonalizado: 'Ativo - perguntas geradas pela JD',
        criteriosAnalise: 'Ativo - critérios gerados pela JD',
        agenteTriagem: 'Ativo',
        kitEntrevistaScorecard: 'Ativo - roteiro gerado pela JD',
      };
      setJobData(extractedData);

      setJobDataMetadata({
        titulo: { source: 'extracted' },
        descricao: { source: 'extracted' },
        senioridade: { source: 'inferred' },
        etapas: { source: 'inferred' },
        divulgacao: { source: 'inferred' },
        confirmacaoInscricao: { source: 'inferred' },
        formularioPersonalizado: { source: 'inferred' },
        criteriosAnalise: { source: 'inferred' },
        agenteTriagem: { source: 'inferred' },
        kitEntrevistaScorecard: { source: 'inferred' },
      });

      // Simulate JD analysis
      const analysis = simulateJDAnalysis(description);
      setJdAnalysis(analysis);

      // Auto-open recursos panel
      setShowRecursosPanel(true);

      // Show distribution panel
      const distribId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: distribId,
          type: 'agent',
          content: 'Com base na descrição da vaga, montei os recursos do seu processo seletivo — da triagem à seleção. Revise e ajuste o que quiser:',
          distribuicaoPainel: analysis,
          distribuicaoPainelTitulo: extractedData.titulo,
        }]);
      }, 800);

      // Show structural questions — separate message, with breathing room
      const structId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: structId,
          type: 'agent',
          content: 'Agora preciso de alguns dados para completar a vaga e configurar as automações.',
          questoesEstruturaisForm: true,
          onQuestoesEstruturaisSubmit: (data: QuestoesEstruturaisData) => {
            handleQuestoesEstruturaisSubmit(data, extractedData, analysis);
          },
        }]);
      }, 4000);
    };

    setMessages(prev => [...prev, {
      id: processingMessageId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete,
      customProcessingSteps: JD_PROCESSING_STEPS,
    } as any]);
  };

  const handleQuestoesEstruturaisSubmit = (
    data: QuestoesEstruturaisData,
    baseJobData?: JobData,
    analysis?: JDAnalysisResult | null,
    camposFaltantesInitialData?: { requisicao?: { id: string; label: string }; posicoes?: Posicao[] },
  ) => {
    // Compose localização from pais/estado/cidade
    const localizacao = [data.cidade, data.estado, data.pais].filter(Boolean).join(', ');

    // Build user summary message
    const parts: string[] = [];
    if (data.salarioMinimo && data.salarioMaximo && data.tipoContrato) {
      parts.push(`Faixa salarial: ${data.salarioMinimo} – ${data.salarioMaximo} (${data.tipoContrato})`);
    }
    if (data.modeloTrabalho) parts.push(`Modelo: ${data.modeloTrabalho}`);
    if (localizacao) parts.push(`Localização: ${localizacao}`);
    if (data.reprovarPorSalario) parts.push('Automação de salário: ativa');
    if (data.reprovarPorModeloTrabalho) parts.push('Automação de modelo de trabalho: ativa');
    addUserMessage(parts.join(' · '));

    // Update job data
    const updatedJobData: JobData = {
      ...(baseJobData || jobData),
      ...(data.salarioMinimo ? { salarioMinimo: data.salarioMinimo } : {}),
      ...(data.salarioMaximo ? { salarioMaximo: data.salarioMaximo } : {}),
      ...(data.tipoContrato ? { tipoContrato: data.tipoContrato } : {}),
      ...(data.modeloTrabalho ? { modeloTrabalho: data.modeloTrabalho } : {}),
      ...(localizacao ? { localizacao } : {}),
    };
    setJobData(updatedJobData);

    // Update automations in analysis if requested
    if (analysis) {
      const updatedAnalysis: JDAnalysisResult = {
        ...analysis,
        automacoes: analysis.automacoes.map(a => ({
          ...a,
          ativo: a.tipo === 'salario' ? data.reprovarPorSalario : a.tipo === 'modelo_trabalho' ? data.reprovarPorModeloTrabalho : a.ativo,
          parametro: a.tipo === 'salario' && data.reprovarPorSalario && data.salarioMinimo
            ? `${data.salarioMinimo} – ${data.salarioMaximo}`
            : a.tipo === 'modelo_trabalho' && data.reprovarPorModeloTrabalho && data.modeloTrabalho
            ? data.modeloTrabalho
            : a.parametro,
        })),
      };
      setJdAnalysis(updatedAnalysis);
    }

    setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });
    setHasProcessingCompleted(true);

    // Show remaining missing fields
    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData, false, camposFaltantesInitialData);
    }, 600);
  };

  const handleCamposFaltantesSubmit = (data: CamposFaltantesData, baseJobData?: JobData) => {
    // Build user summary
    const parts: string[] = [];
    if (data.sla) parts.push(`SLA: ${data.sla}`);
    if (data.gestorResponsavel) parts.push(`Gestor: ${data.gestorResponsavel}`);
    if (data.avaliadores.length > 0) parts.push(`Avaliadores: ${data.avaliadores.join(', ')}`);
    if (data.requisicoes.length > 0) parts.push(`Requisições: ${data.requisicoes.join(', ')}`);
    if (data.posicoes.length > 0) parts.push(`${data.posicoes.reduce((s, p) => s + p.quantidade, 0)} posição(ões)`);
    if (data.area) parts.push(`Área: ${data.area}`);
    if (data.cliente) parts.push(`Cliente: ${data.cliente}`);
    if (parts.length > 0) addUserMessage(parts.join(' · '));

    const updatedJobData: JobData = {
      ...(baseJobData || jobData),
      ...(data.sla ? { sla: data.sla } : {}),
      ...(data.gestorResponsavel ? { gestor: data.gestorResponsavel } : {}),
      ...(data.avaliadores.length > 0 ? { avaliadores: data.avaliadores } : {}),
      ...(data.requisicoes.length > 0 ? { requisicoes: data.requisicoes } : {}),
      ...(data.posicoes.length > 0 ? { posicoes: data.posicoes } : {}),
      ...(data.camposPersonalizados.some(c => c.valor) ? { camposPersonalizados: data.camposPersonalizados } : {}),
      ...(data.area ? { area: data.area } : {}),
      ...(data.cliente ? { cliente: data.cliente } : {}),
    };
    setJobData(updatedJobData);

    addMessage({
      type: 'agent',
      content: 'Perfeito! Dados salvos. Você possui todas as informações para criar o rascunho da vaga. Clique no botão à direita da sua tela "Criar rascunho".',
    }, 800);

    setHasProcessingCompleted(true);
  };

  const handleJobSelect = (jobId: string) => {
    const selectedJob = mockJobs.find(j => j.value === jobId);
    addUserMessage(selectedJob?.label || jobId);
    setConversationState(prev => ({ ...prev, waitingForInput: false }));

    const processingMessageId = `processing-${messageIdCounter.current++}`;

    const onProcessingComplete = () => {
      setMessages(prev => prev.map(msg =>
        msg.id === processingMessageId && msg.type === 'agent'
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: { steps: JD_PROCESSING_STEPS, isExpanded: false },
            }
          : msg
      ));

      const jobFull = jobFullDataFromId(jobId);
      const description = jobFull.descricao;

      // Fill ALL fields so no "campos faltantes" prompt is needed
      const extractedData: JobData = {
        titulo: jobFull.titulo,
        descricao: description,
        senioridade: 'Pleno',
        salarioMinimo: jobFull.salarioIdeal || 'R$ 8.000',
        salarioMaximo: jobFull.salarioMaximo || 'R$ 14.000',
        tipoContrato: 'CLT',
        localizacao: 'São Paulo, SP',
        modeloTrabalho: 'Remoto',
        avaliadores: ['Ana Beatriz Santos', 'Carlos Eduardo Lima'],
        gestor: 'Denys Rocha',
        sla: '30 dias',
        posicoes: [{ quantidade: 1, motivo: 'Expansão de time' }],
        projeto: 'Plataforma Core',
        time: 'Engenharia',
        squad: 'Squad Produto',
        centroCusto: 'CC-001',
        bu: 'Tecnologia',
        camposPersonalizados: CAMPOS_CONFIG.map(cfg => ({
          ...cfg,
          valor: cfg.id === 'teste-duda'    ? 'Duplicado'
               : cfg.id === 'tipo-vaga'     ? 'Efetivo'
               : cfg.id === 'proc-seletivo' ? 'Seletivo Interno'
               : cfg.id === 'area'          ? 'Tecnologia'
               : cfg.id === 'area2'         ? 'Tecnologia'
               : cfg.id === 'centro-custo'  ? 'CC-001'
               : '',
        })),
        etapas: 'Triagem → Teste técnico → Entrevista com gestor → Proposta',
        divulgacao: 'LinkedIn, Site da empresa, Gupy',
        divulgarVaga: true,
        quemPodeVerVaga: 'Pública',
        confirmacaoInscricao: `Olá! Recebemos sua inscrição para a vaga de ${jobFull.titulo}. Em breve entraremos em contato.`,
        formularioPersonalizado: 'Ativo - gerado pela duplicação',
        criteriosAnalise: 'Ativo - gerado pela duplicação',
        agenteTriagem: 'Ativo',
        kitEntrevistaScorecard: 'Ativo - roteiro gerado pela duplicação',
      };

      setJobData(extractedData);
      setJobDataMetadata({
        titulo: { source: 'extracted' },
        descricao: { source: 'extracted' },
        senioridade: { source: 'inferred' },
        salarioMinimo: { source: 'extracted' },
        salarioMaximo: { source: 'extracted' },
        tipoContrato: { source: 'inferred' },
        localizacao: { source: 'extracted' },
        modeloTrabalho: { source: 'extracted' },
        avaliadores: { source: 'inferred' },
        gestor: { source: 'inferred' },
        sla: { source: 'inferred' },
        posicoes: { source: 'inferred' },
        etapas: { source: 'inferred' },
        divulgacao: { source: 'inferred' },
        confirmacaoInscricao: { source: 'inferred' },
        formularioPersonalizado: { source: 'inferred' },
        criteriosAnalise: { source: 'inferred' },
        agenteTriagem: { source: 'inferred' },
        kitEntrevistaScorecard: { source: 'inferred' },
      });

      const analysis = simulateJDAnalysis(description);
      setJdAnalysis(analysis);

      // Auto-open recursos panel
      setShowRecursosPanel(true);

      // All data is filled — skip all forms and go straight to draft CTA
      setHasProcessingCompleted(true);
      setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });

      setTimeout(() => {
        addMessage({
          type: 'agent',
          content: `Prontinho! Copiei todos os dados de **${jobFull.titulo}** e já preenchi o rascunho com todas as informações. Clique em **"Criar rascunho"** no painel ao lado para revisar e publicar a vaga. 🎉`,
        }, 800);
      }, 0);
    };

    setMessages(prev => [...prev, {
      id: processingMessageId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete,
      customProcessingSteps: JD_PROCESSING_STEPS,
    } as any]);
  };

  const handleRequisitionSelect = (reqId: string) => {
    const selectedReq = mockRequisitions.find(r => r.value === reqId);
    addUserMessage(selectedReq?.label || reqId);
    setConversationState(prev => ({ ...prev, waitingForInput: false }));

    // Delegate to the same full flow used by navigation from Requisitions page
    const reqFull = requisitionFullDataFromId(reqId);
    handleFromRequisition(reqFull);
  };

  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = mockTemplates.find(t => t.value === templateId);
    addUserMessage(selectedTemplate?.label || templateId);
    setConversationState(prev => ({ ...prev, waitingForInput: false }));

    const processingMessageId = `processing-${messageIdCounter.current++}`;
    
    const onProcessingComplete = () => {
      const processingSteps = [
        "Lendo descrição da vaga",
        "Extraindo título",
        "Extraindo descrição",
        "Observando vagas semelhantes",
        "Sugerindo faixa salarial",
        "Sugerindo etapas",
        "Sugerindo divulgação",
        "Sugerindo email de inscrição",
        "Criando formulário personalizado",
        "Criando critérios de análise de currículo",
        "Configurando o agente na triagem",
        "Sugerindo automações de reprovação",
      ];
      
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessageId && msg.type === 'agent'
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: {
                steps: processingSteps,
                isExpanded: false,
              }
            }
          : msg
      ));
      
      const templateDetails = templateDetailsFromId(templateId);
      setJobData(templateDetails);

      setTimeout(() => {
        showMissingFieldsOptions();
      }, 1000);
    };

    setMessages(prev => [...prev, {
      id: processingMessageId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete,
    }]);
  };

  const interviewQuestions = [
    { key: 'titulo', question: 'Qual é o título da vaga?', placeholder: 'Ex: Engenheiro de Software Senior' },
    { key: 'senioridade', question: 'Qual o nível de senioridade?', options: [
      { label: 'Estagiário', value: 'Estagiário' },
      { label: 'Junior', value: 'Junior' },
      { label: 'Pleno', value: 'Pleno' },
      { label: 'Senior', value: 'Senior' },
      { label: 'Staff', value: 'Staff' },
      { label: 'Principal', value: 'Principal' },
    ]},
    { key: 'salario', question: 'Qual a faixa salarial?', placeholder: 'Ex: R$ 8.000 - R$ 12.000' },
    { key: 'modeloTrabalho', question: 'Qual o modelo de trabalho?', options: [
      { label: 'Remoto', value: 'Remoto' },
      { label: 'Presencial', value: 'Presencial' },
      { label: 'Híbrido', value: 'Híbrido' },
    ]},
    { key: 'localizacao', question: 'Qual a localização?', placeholder: 'Ex: São Paulo, SP', useLocationFields: true },
    { key: 'contrato', question: 'Qual o tipo de contrato?', options: [
      { label: 'CLT', value: 'CLT' },
      { label: 'PJ', value: 'PJ' },
      { label: 'Estágio', value: 'Estágio' },
    ]},
    { key: 'departamento', question: 'Qual o departamento?', placeholder: 'Ex: Engenharia' },
  ];

  const handleInterviewAnswer = (answer: string) => {
    const currentQuestion = interviewQuestions[conversationState.step];
    
    addUserMessage(answer);

    setJobData(prev => ({
      ...prev,
      [currentQuestion.key]: answer,
    }));

    const nextStep = conversationState.step + 1;
    
    setTimeout(() => {
      if (nextStep < interviewQuestions.length) {
        const nextQuestion = interviewQuestions[nextStep];
        setConversationState(prev => ({ ...prev, step: nextStep }));
        
        if (nextQuestion.options) {
          setInputPlaceholder("Ou escolha uma opção acima...");
          addMessage({
            type: 'agent',
            content: nextQuestion.question,
            selectOptions: nextQuestion.options,
            onSubmit: handleInterviewAnswer,
          }, 1500);
        } else if ((nextQuestion as any).useLocationFields) {
          setInputPlaceholder("Ou preencha os campos acima...");
          addMessage({
            type: 'agent',
            content: nextQuestion.question,
            locationFields: true,
            onSubmit: handleInterviewAnswer,
          }, 1500);
        } else {
          setInputPlaceholder(nextQuestion.placeholder || "Digite sua resposta...");
          addMessage({
            type: 'agent',
            content: nextQuestion.question,
          }, 1500);
        }
      } else {
        setConversationState(prev => ({ ...prev, waitingForInput: false }));
        setInputPlaceholder("Descreva a vaga ou responda às perguntas...");
        addMessage({
          type: 'agent',
          content: 'Excelente! Coletei todas as informações principais. Agora você pode criar o rascunho da vaga!',
        }, 1500);
      }
    }, 500);
  };

  const startInterview = () => {
    const firstQuestion = interviewQuestions[0];
    setConversationState({ flow: 'help_create', step: 0, waitingForInput: true });
    setInputPlaceholder(firstQuestion.placeholder || "Digite sua resposta...");
    
    addMessage({
      type: 'agent',
      content: 'Ótimo! Vou fazer algumas perguntas para criar a descrição da vaga.\n\n' + firstQuestion.question,
    }, 1500);
  };

  const handleOptionClick = (value: string) => {
    if (value === 'go_to_draft') {
      handleCreateDraftClick();
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messages[messages.length - 1].options?.find(opt => opt.value === value)?.label || value,
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      // Verifica se é um clique em grupo de campos
      if (value === 'faixaSalarial') {
        addMessage({
          type: 'agent',
          content: '',
          faixaSalarialForm: true,
          onFaixaSalarialSubmit: (salarioMin, salarioMax, tipoContrato) => {
            handleFaixaSalarialSubmit(salarioMin, salarioMax, tipoContrato);
          },
        }, 1500);
        return;
      }

      if (value === 'localizacao') {
        addMessage({
          type: 'agent',
          content: '',
          localizacaoForm: true,
          onLocalizacaoSubmit: (localizacao, modeloTrabalho) => {
            handleLocalizacaoSubmit(localizacao, modeloTrabalho);
          },
        }, 1500);
        return;
      }

      if (value === 'avaliadores') {
        addMessage({
          type: 'agent',
          content: '',
          avaliadoresForm: true,
          onAvaliadoresSubmit: (avaliadores, gestor) => {
            handleAvaliadoresSubmit(avaliadores, gestor);
          },
        }, 1500);
        return;
      }

      if (value === 'sla') {
        setConversationState({ flow: 'sla_input', step: 0, waitingForInput: true });
        setInputPlaceholder('Ex: 30 dias, 2 meses...');
        addMessage({
          type: 'agent',
          content: 'Digite o SLA (prazo de contratação):',
        }, 1500);
        return;
      }

      if (value === 'posicoes') {
        addMessage({
          type: 'agent',
          content: '',
          posicoesForm: true,
          onPosicoesSubmit: (posicoes) => {
            handlePosicoesSubmit(posicoes);
          },
        }, 1500);
        return;
      }

      if (value === 'camposPersonalizados') {
        addMessage({
          type: 'agent',
          content: '',
          camposPersonalizadosForm: true,
          onCamposPersonalizadosSubmit: (projeto, time, squad, centroCusto, bu) => {
            handleCamposPersonalizadosSubmit(projeto, time, squad, centroCusto, bu);
          },
        }, 1500);
        return;
      }

      if (conversationState.flow === 'completing_data' && fieldDefinitions[value]) {
        handleFieldSelection(value);
        return;
      }

      if (value === 'has_description') {
        setConversationState({ flow: 'has_description', step: 0, waitingForInput: true });
        setInputPlaceholder("Cole a descrição completa da vaga aqui...");
        addMessage({
          type: 'agent',
          content: 'Perfeito! Por favor, cole a descrição da vaga no campo abaixo:',
        }, 1500);
      } else if (value === 'use_template') {
        setConversationState({ flow: 'use_template', step: 0, waitingForInput: true });
        addMessage({
          type: 'agent',
          content: 'Certo! Selecione o template que você quer usar:',
          selectOptions: mockTemplates,
          onSubmit: handleTemplateSelect,
        }, 1500);
      } else if (value === 'duplicate') {
        setConversationState({ flow: 'duplicate', step: 0, waitingForInput: true });
        addMessage({
          type: 'agent',
          content: 'Legal! Selecione a vaga que você quer duplicar:',
          selectOptions: mockJobs,
          searchableSelect: true,
          onSubmit: handleJobSelect,
        }, 1500);
      } else if (value === 'from_requisition') {
        setConversationState({ flow: 'use_requisition', step: 0, waitingForInput: true });
        addMessage({
          type: 'agent',
          content: 'Certo! Selecione a requisição que você quer usar como base:',
          selectOptions: mockRequisitions,
          searchableSelect: true,
          onSubmit: handleRequisitionSelect,
        }, 1500);
      } else if (value === 'from_scratch') {
        setConversationState({ flow: 'from_scratch_round1', step: 0, waitingForInput: true });
        setInputPlaceholder("Pode digitar livremente sobre a vaga...");
        addMessage({
          type: 'agent',
          content: 'Me conta tudo que você sabe sobre essa vaga — título, cargo, habilidades, salário, localização, modelo de trabalho, tipo de contrato... Quanto mais você me contar agora, menos vou precisar perguntar depois. Pode digitar livremente ou gravar um áudio.',
          hasTemplateLink: true,
        }, 1500);
      } else if (value === 'help_create') {
        startInterview();
      }
    }, 300);
  };

  const handleFaixaSalarialSubmit = (salarioMin: string, salarioMax: string, tipoContrato: string) => {
    addUserMessage(`Salário mínimo: ${salarioMin}, Salário máximo: ${salarioMax}, Tipo de contrato: ${tipoContrato}`);
    
    const updatedJobData = {
      ...jobData,
      salarioMinimo: salarioMin,
      salarioMaximo: salarioMax,
      tipoContrato,
    };
    
    setJobData(updatedJobData);

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleLocalizacaoSubmit = (localizacao: string, modeloTrabalho: string) => {
    addUserMessage(`Localização: ${localizacao}, Modelo de trabalho: ${modeloTrabalho}`);
    
    const updatedJobData = {
      ...jobData,
      localizacao,
      modeloTrabalho,
    };
    
    setJobData(updatedJobData);

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleAvaliadoresSubmit = (avaliadores: string[], gestor: string) => {
    addUserMessage(`Avaliadores: ${avaliadores.join(', ')}, Gestor: ${gestor}`);
    
    const updatedJobData = {
      ...jobData,
      avaliadores,
      gestor,
    };
    
    setJobData(updatedJobData);

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleSlaSubmit = (sla: string) => {
    addUserMessage(`SLA: ${sla}`);
    
    const updatedJobData = {
      ...jobData,
      sla,
    };
    
    setJobData(updatedJobData);

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const handleCamposPersonalizadosSubmit = (projeto: string, time: string, squad: string, centroCusto: string, bu: string) => {
    addUserMessage(`Campos personalizados: Projeto: ${projeto}, Time: ${time}, Squad: ${squad}, Centro de custo: ${centroCusto}, BU: ${bu}`);
    
    const updatedJobData = {
      ...jobData,
      projeto,
      time,
      squad,
      centroCusto,
      bu,
    };
    
    setJobData(updatedJobData);

    setTimeout(() => {
      showMissingFieldsOptions(updatedJobData);
    }, 500);
  };

  const processRequisitionRound2 = (baseJobData: JobData) => {
    setConversationState(prev => ({ ...prev, waitingForInput: false }));
    setInputPlaceholder("Descreva a vaga ou responda às perguntas...");

    const processingMsgId = `processing-${messageIdCounter.current++}`;

    const onComplete = () => {
      // Extracted mock values from user message
      const extracted = { tipoContrato: 'CLT', localizacao: 'São Paulo, SP', modeloTrabalho: 'Híbrido' };

      setMessages(prev => prev.map(msg =>
        msg.id === processingMsgId
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: { steps: REQUISITION_ROUND2_STEPS, isExpanded: false },
            }
          : msg
      ));

      setHasProcessingCompleted(true);
      setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });

      // Show confirmation form in right panel
      setTimeout(() => {
        const confirmId = (messageIdCounter.current++).toString();
        const confirmData = {
          tipoContrato: extracted.tipoContrato,
          pais: 'Brasil',
          estado: 'SP',
          cidade: 'São Paulo',
          modeloTrabalho: extracted.modeloTrabalho,
          salarioMinimo: baseJobData.salarioMinimo ?? '',
          salarioMaximo: baseJobData.salarioMaximo ?? '',
        };

        setMessages(prev => [...prev, {
          id: confirmId,
          type: 'agent',
          content: 'Entendi! Confirme os dados no painel ao lado antes de salvar.',
        } as any]);

        const handleConfirm = (confirmed: { tipoContrato: string; localizacao: string; modeloTrabalho: string; salarioMinimo?: string; salarioMaximo?: string }) => {
          setFormPanel(null);
          addUserMessage('Dados confirmados');

          const updatedJobData: JobData = {
            ...baseJobData,
            tipoContrato: confirmed.tipoContrato,
            localizacao: confirmed.localizacao,
            modeloTrabalho: confirmed.modeloTrabalho,
            salarioMinimo: confirmed.salarioMinimo ?? baseJobData.salarioMinimo,
            salarioMaximo: confirmed.salarioMaximo ?? baseJobData.salarioMaximo,
          };
          setJobData(updatedJobData);
          setJobDataMetadata(prev => ({
            ...prev,
            tipoContrato: { source: 'extracted' },
            localizacao: { source: 'extracted' },
            modeloTrabalho: { source: 'extracted' },
            salarioMinimo: { source: 'extracted' },
            salarioMaximo: { source: 'extracted' },
          }));

          setJdAnalysis(prev => prev ? {
            ...prev,
            automacoes: prev.automacoes.map(a => {
              if (a.tipo === 'salario') return { ...a, ativo: true, parametro: `${confirmed.salarioMinimo ?? '?'} – ${confirmed.salarioMaximo ?? '?'} (${confirmed.tipoContrato})` };
              if (a.tipo === 'modelo_trabalho') return { ...a, ativo: true, parametro: `${confirmed.modeloTrabalho} — ${confirmed.localizacao}` };
              return a;
            }),
          } : prev);

          // Agent message then open campos form with delay
          addMessage({
            type: 'agent',
            content: 'Pra finalizar, confere pra mim os campos personalizados e preencha os que faltaram.',
          }, 1600);

          setTimeout(() => {
            openFormPanel(
              'Campos adicionais',
              <CamposFaltantesForm
                onSubmit={(data: CamposFaltantesData) => {
                  setFormPanel(null);
                  handleRequisitionCamposFaltantesSubmit(data, updatedJobData);
                }}
                onlyCamposPersonalizados
              />,
            );
          }, 2400);
        };

        openFormPanel(
          'Confirme os dados',
          <ConfirmacaoRound2Form
            initial={confirmData}
            onSubmit={handleConfirm}
          />,
        );
      }, 600);
    };

    setMessages(prev => [...prev, {
      id: processingMsgId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete: onComplete,
      customProcessingSteps: REQUISITION_ROUND2_STEPS,
      customProcessingDuration: 800,
    } as any]);
  };

  const handleRequisitionCamposFaltantesSubmit = (data: import('../types/jdAnalysis').CamposFaltantesData, baseJobData: JobData) => {
    addUserMessage('Dados confirmados');

    const updatedJobData: JobData = {
      ...baseJobData,
      camposPersonalizados: data.camposPersonalizados?.length
        ? data.camposPersonalizados
        : baseJobData.camposPersonalizados,
    };
    setJobData(updatedJobData);

    setTimeout(() => {
      const doneId = (messageIdCounter.current++).toString();
      setMessages(prev => [...prev, {
        id: doneId,
        type: 'agent',
        content: 'Perfeito! Dados salvos. Você possui todas as informações para criar o rascunho da vaga.',
        hasDraftButton: true,
      } as any]);
    }, 400);
  };

  const handleCreateDraftClick = () => {
    handleCreateDraft();
  };

  const handleCelebrationComplete = () => {
    setShowCelebrationModal(false);
    handleCreateDraft();
  };

  const handleCreateDraft = () => {
    window.history.replaceState(null, '', '/passo2');
    setShowInfoPanel(false);

    setTimeout(() => {
      setIsDraftView(true);
    }, 300);
    
    setTimeout(() => {
      addMessage({
        type: 'agent',
        content: 'Perceba que os cards com este ícone foram preenchidos corretamente.\nOs que possuem alguma pendência possuem este ícone. Isso quer dizer que falta informação.',
        iconExplanation: {
          completedIcon: true,
          pendingIcon: true,
        }
      }, 500);
      
      setTimeout(() => {
        const missingGroups = getMissingFieldGroups();
        
        if (missingGroups.length > 0) {
          const firstGroup = missingGroups[0];
          const fieldOptions = firstGroup.fields.map(field => ({
            label: fieldDefinitions[field].label,
            value: field,
          }));
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: `Quer deixar sua vaga ainda mais completa? Clique nos cards para editar ou me diga o que preencher.`,
              options: fieldOptions,
            }, 1500);
          }, 5000);
          
          setConversationState({ flow: 'completing_data', step: 0, waitingForInput: false });
        } else {
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: 'Perfeito! Sua vaga está com ótima qualidade. Você pode revisar os cards ou criar a vaga quando quiser! 🎉',
            }, 1500);
          }, 5000);
        }
      }, 2000);
    }, 3000);
  };

  const handleToggleProcessing = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId && msg.processingSummary
        ? {
            ...msg,
            processingSummary: {
              ...msg.processingSummary,
              isExpanded: !msg.processingSummary.isExpanded,
            }
          }
        : msg
    ));
  };

  const handleStepChange = (step: string) => {
    if (processingStep && processingStep !== step) {
      setCompletedSteps(prev => [...prev, processingStep]);
    }
    setProcessingStep(step);
  };

  // ── From-Requisition flow (triggered from Requisitions page navigation) ──────
  const handleFromRequisition = (requisition: RequisitionFullData) => {
    currentRequisitionRef.current = requisition;
    const processingMessageId = `processing-${messageIdCounter.current++}`;

    const onProcessingComplete = () => {
      setMessages(prev => prev.map(msg =>
        msg.id === processingMessageId && msg.type === 'agent'
          ? {
              ...msg,
              isProcessing: false,
              onProcessingComplete: undefined,
              content: '',
              processingSummary: {
                steps: JD_PROCESSING_STEPS,
                isExpanded: false,
              },
            }
          : msg
      ));

      // Map requisition camposPersonalizados → JobData format
      const camposPersonalizados: import('../types/job').CampoPersonalizadoVaga[] = CAMPOS_CONFIG.map(cfg => {
        const match = requisition.camposPersonalizados?.find(rc =>
          rc.nome.toLowerCase().trim() === cfg.nome.toLowerCase().trim() ||
          cfg.nome.toLowerCase().includes(rc.nome.toLowerCase()) ||
          rc.nome.toLowerCase().includes(cfg.nome.toLowerCase())
        );
        return { ...cfg, valor: match?.valor ?? '' };
      });

      // Unmatched requisition campos → extra entries shown in the card
      const unmatchedReqCampos = (requisition.camposPersonalizados ?? []).filter(rc =>
        !CAMPOS_CONFIG.some(cfg =>
          rc.nome.toLowerCase().trim() === cfg.nome.toLowerCase().trim() ||
          cfg.nome.toLowerCase().includes(rc.nome.toLowerCase()) ||
          rc.nome.toLowerCase().includes(cfg.nome.toLowerCase())
        )
      );
      unmatchedReqCampos.forEach(rc => {
        camposPersonalizados.push({
          id: rc.nome.toLowerCase().replace(/\s+/g, '-'),
          nome: rc.nome,
          tipo: 'text',
          obrigatorio: false,
          valor: rc.valor,
        });
      });

      // Build extractedData — same fields as JD flow
      const description = requisition.descricaoCargo || '';
      const extractedData: JobData = {
        titulo: requisition.name || 'Título não especificado',
        descricao: description,
        senioridade: 'Pleno',
        notasInternas: 'Vaga criada a partir da requisição. Informações extraídas automaticamente.',
        gestor: 'Ana Silva',
        avaliadores: ['Carlos Mendes', 'Beatriz Costa'],
        posicoes: requisition.posicoes || [],
        salarioMinimo: requisition.salarioIdeal || '',
        salarioMaximo: requisition.salarioMaximo || '',
        requisicao: requisition.name,
        etapas: 'Triagem → Teste técnico → Entrevista com gestor → Proposta',
        divulgacao: 'LinkedIn, Site da empresa, Gupy',
        divulgarVaga: true,
        quemPodeVerVaga: 'Pública',
        confirmacaoInscricao: `Olá! Recebemos sua inscrição para a vaga de ${requisition.name}. Em breve entraremos em contato.`,
        formularioPersonalizado: 'Ativo - perguntas geradas pela requisição',
        criteriosAnalise: 'Ativo - critérios gerados pela requisição',
        agenteTriagem: 'Ativo',
        kitEntrevistaScorecard: 'Ativo - roteiro gerado pela requisição',
        camposPersonalizados: camposPersonalizados.some(c => c.valor) ? camposPersonalizados : undefined,
      };

      setJobData(extractedData);

      setJobDataMetadata({
        titulo: { source: 'extracted' },
        descricao: { source: 'extracted' },
        senioridade: { source: 'inferred' },
        posicoes: { source: 'extracted' },
        salarioMinimo: { source: 'extracted' },
        salarioMaximo: { source: 'extracted' },
        requisicao: { source: 'extracted' },
        gestor: { source: 'inferred' },
        avaliadores: { source: 'inferred' },
        etapas: { source: 'inferred' },
        divulgacao: { source: 'inferred' },
        confirmacaoInscricao: { source: 'inferred' },
        formularioPersonalizado: { source: 'inferred' },
        criteriosAnalise: { source: 'inferred' },
        agenteTriagem: { source: 'inferred' },
        kitEntrevistaScorecard: { source: 'inferred' },
        camposPersonalizados: camposPersonalizados.some(c => c.valor) ? { source: 'extracted' } : undefined,
      });

      // Run JD analysis on the description (same as JD flow)
      const analysis = simulateJDAnalysis(description);
      setJdAnalysis(analysis);

      // Auto-open recursos panel
      setShowRecursosPanel(true);

      // Show distribution panel — same message as JD flow
      const distribId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: distribId,
          type: 'agent',
          content: 'Com base na requisição, montei os recursos do seu processo seletivo — da triagem à seleção.',
          distribuicaoPainel: analysis,
          distribuicaoPainelTitulo: extractedData.titulo,
        }]);
      }, 800);

      // Show missing info request — free-text/audio approach
      const structId = (messageIdCounter.current++).toString();
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: structId,
          type: 'agent',
          content: 'Eu consegui extrair o **título**, **descrição**, **faixa salarial**, **posições e motivos**, além de alguns **campos personalizados**. Mas eu preciso de mais algumas informações:\n\n* Modelo de contratação (CLT/PJ/Contrato temporário/etc.)\n* Localização\n* Modelo de trabalho (Presencial/Híbrido/Remoto)\n\nPreciso que você escreva ou mande um áudio respondendo estas informações.',
        }]);
        setConversationState({ flow: 'use_requisition_round2', step: 0, waitingForInput: true });
        setInputPlaceholder("Pode escrever ou gravar um áudio...");
      }, 4000);
    };

    setMessages(prev => [...prev, {
      id: processingMessageId,
      type: 'agent',
      content: '',
      isProcessing: true,
      onProcessingComplete,
      customProcessingSteps: JD_PROCESSING_STEPS,
    } as any]);
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem('inhire-tour-completed');
    
    if (tourCompleted) {
      localStorage.removeItem('inhire-tour-completed');
    }

    const fromRequisition = (location.state as { fromRequisition?: RequisitionFullData } | null)?.fromRequisition;

    // Only show tour if NOT coming from a requisition
    if (!fromRequisition) {
      setShowTour(true);
    }

    // Update URL to reflect current step
    window.history.replaceState(null, '', '/passo1');

    if (fromRequisition) {
      // ── Show typing animation first, then greeting, then processing ────────
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{
          id: '1',
          type: 'agent',
          content: `Olá **Augusto**! 👋 Vou começar a criar o rascunho da vaga a partir da requisição **${fromRequisition.name}**. Já estou processando todas as informações disponíveis — só um momento!`,
        }]);

        setTimeout(() => {
          handleFromRequisition(fromRequisition);
        }, 1800);
      }, 2500);
    } else {
      // ── Default initial message ────────────────────────────────────────────
      setMessages([{
        id: '1',
        type: 'agent',
        content: 'Olá **Augusto**! 👋 Sou o Agente InHire e vou te ajudar a criar sua vaga. Como você quer começar?',
        options: [
          { label: 'Começar por uma requisição', value: 'from_requisition' },
          { label: 'Duplicar vaga existente', value: 'duplicate' },
          { label: 'Criar do zero', value: 'from_scratch', secondary: true },
        ],
      }]);
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* TourGuide is scoped to this route — unmounts cleanly on navigation */}
      {showTour && <TourGuide onComplete={handleTourComplete} />}

      {/* Celebration modal — only shown on first draft creation */}
      <AnimatePresence>
        {showCelebrationModal && (
          <CelebrationModal onComplete={handleCelebrationComplete} />
        )}
      </AnimatePresence>
      
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* ── InfoPanel — LEFT side ── */}
        <AnimatePresence>
          {showInfoPanel && !isDraftView && (
            <div data-tour="info-panel" className="h-full flex-shrink-0">
              <InfoPanel 
                jobData={jobData}
                metadata={jobDataMetadata}
                jdAnalysis={jdAnalysis}
                onCreateDraft={handleCreateDraftClick}
                processingStep={processingStep}
                completedSteps={completedSteps}
                hasProcessingCompleted={hasProcessingCompleted}
                onDraftButtonHover={setRobotLookingAtDraft}
                collapsed={infoPanelCollapsed}
                onToggleCollapsed={() => setInfoPanelCollapsed(v => !v)}
                onOpenRecursos={(key) => { setShowRecursosPanel(true); if (key) setRecursosExpandedKey(key); }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* ── Chat — CENTER ── */}
        <ChatArea 
          messages={messages} 
          onOptionClick={handleOptionClick}
          onSendMessage={handleSendMessage}
          onSendAudio={handleSendAudio}
          isTyping={isTyping}
          inputPlaceholder={inputPlaceholder}
          isDraftView={isDraftView}
          onToggleProcessing={handleToggleProcessing}
          onStepChange={handleStepChange}
          robotState={robotLookingAtDraft ? 'looking-right' : 'idle'}
          onOpenRecursos={(key) => { setShowRecursosPanel(true); if (key) setRecursosExpandedKey(key); }}
        />

        {/* ── Right panel — recursos OR form ── */}
        <AnimatePresence>
          {formPanel && !isDraftView && (
            <RightFormPanel
              key="form-panel"
              title={formPanel.title}
              onClose={() => setFormPanel(null)}
            >
              {formPanel.node}
            </RightFormPanel>
          )}
          {showRecursosPanel && jdAnalysis && !isDraftView && !formPanel && (
            <RecursosPanel
              key="recursos-panel"
              analysis={jdAnalysis}
              titulo={jobData.titulo}
              onClose={() => setShowRecursosPanel(false)}
              expandedKey={recursosExpandedKey}
            />
          )}
        </AnimatePresence>

        {isDraftView && <DraftView jobData={jobData} jobDataMetadata={jobDataMetadata} highlightedCard={highlightedCard} />}
      </div>
    </div>
  );
}
