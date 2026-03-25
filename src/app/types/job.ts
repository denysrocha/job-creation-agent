import { JDAnalysisResult, QuestoesEstruturaisData, CamposFaltantesData } from './jdAnalysis';

export interface Posicao {
  quantidade: number;
  motivo: string;
}

export interface CampoPersonalizadoVaga {
  id: string;
  nome: string;
  valor: string;
  tipo: 'text' | 'select';
  obrigatorio?: boolean;
  opcoes?: string[];
}

export interface PlataformaDivulgacao {
  id: string;
  nome: string;
  logoColor: string;   // cor do ícone/badge
  ativa: boolean;
  comRestricoes?: boolean; // badge laranja "Ver restrições"
  isPacote?: boolean;      // exibe múltiplos logos
}

export const PLATAFORMAS_PADRAO: PlataformaDivulgacao[] = [
  { id: 'linkedin',        nome: 'LinkedIn',          logoColor: '#0077B5', ativa: true  },
  { id: 'indeed',          nome: 'Indeed',             logoColor: '#003A9B', ativa: false, comRestricoes: true },
  { id: 'netvagas',        nome: 'NetVagas',           logoColor: '#00A859', ativa: true  },
  { id: 'talentcom',       nome: 'Talent.com',         logoColor: '#E03D3D', ativa: true  },
  { id: 'pacotejobboards', nome: 'Pacote Job Boards',  logoColor: '#555',    ativa: true,  isPacote: true },
  { id: 'ondetrabalhar',   nome: 'OndeTrabalhar',      logoColor: '#7C3AED', ativa: true  },
];

export type TipoQuestao =
  | 'escolha_unica'
  | 'multipla_escolha'
  | 'texto_curto'
  | 'texto_longo'
  | 'sim_nao';

export interface OpcaoFormulario {
  id: string;
  texto: string;
  correta: boolean;
}

export interface QuestaoFormulario {
  id: string;
  texto: string;
  tipo: TipoQuestao;
  opcoes: OpcaoFormulario[];
  obrigatorio: boolean;
  preEliminatoria: boolean;
}

export const QUESTOES_PADRAO: QuestaoFormulario[] = [
  {
    id: 'q1',
    texto: 'Qual é o seu nível de experiência com metodologias ágeis?',
    tipo: 'escolha_unica',
    opcoes: [
      { id: 'o1', texto: 'Nunca utilizei ou só conheço conceitualmente', correta: false },
      { id: 'o2', texto: 'Já utilizei com apoio ou em tarefas simples', correta: false },
      { id: 'o3', texto: 'Consigo aplicar de forma autônoma', correta: true },
    ],
    obrigatorio: true,
    preEliminatoria: false,
  },
  {
    id: 'q2',
    texto: 'Qual desses pontos você considera mais importante ao gerenciar um projeto?',
    tipo: 'multipla_escolha',
    opcoes: [
      { id: 'o4', texto: 'Cumprimento de prazos', correta: true },
      { id: 'o5', texto: 'Redução de custos', correta: true },
      { id: 'o6', texto: 'Aumento da carga de trabalho', correta: false },
      { id: 'o7', texto: 'Relação com stakeholders', correta: true },
    ],
    obrigatorio: true,
    preEliminatoria: false,
  },
  {
    id: 'q3',
    texto: 'Como você lida com mudanças de escopo no meio de um projeto?',
    tipo: 'texto_longo',
    opcoes: [],
    obrigatorio: true,
    preEliminatoria: false,
  },
  {
    id: 'q4',
    texto: 'Qual das seguintes técnicas você usa para priorizar tarefas?',
    tipo: 'multipla_escolha',
    opcoes: [
      { id: 'o8', texto: 'Matriz de Eisenhower', correta: true },
      { id: 'o9', texto: 'MoSCoW', correta: true },
      { id: 'o10', texto: 'FIFO (primeiro a entrar, primeiro a sair)', correta: false },
    ],
    obrigatorio: false,
    preEliminatoria: false,
  },
];

export type PesoCriterio = 'essencial' | 'importante' | 'diferencial';

export interface CriterioAnalise {
  id: string;
  texto: string;
  peso: PesoCriterio;
}

export const CRITERIOS_PADRAO: CriterioAnalise[] = [
  { id: 'c1', peso: 'essencial',   texto: 'Ensino superior completo em Administração, Gestão Empresarial, Engenharias ou áreas relacionadas à tecnologia' },
  { id: 'c2', peso: 'importante',  texto: 'Inglês avançado' },
  { id: 'c3', peso: 'essencial',   texto: 'Experiência em gerenciamento de riscos' },
  { id: 'c4', peso: 'importante',  texto: 'Certificado de PMP' },
  { id: 'c5', peso: 'importante',  texto: 'MBA ou especialização em gestão de projetos' },
];

export interface AgenteTriagemConfig {
  usarAgente: boolean;
  limiteSalarial: {
    usarNoAgente: boolean;
    salarioMinimo?: string;   // pode sobrescrever o da vaga
    salarioMaximo?: string;
  };
  criterios: {
    usarNoAgente: boolean;
    pedirCurriculo: boolean;
    curriculoObrigatorio: boolean;
  };
  formulario: {
    usarNoAgente: boolean;
    correcaoAutomatica: boolean;
  };
}

export const AGENTE_TRIAGEM_PADRAO: AgenteTriagemConfig = {
  usarAgente: true,
  limiteSalarial: {
    usarNoAgente: true,
    salarioMinimo: 'R$ 8.000,00',
    salarioMaximo: 'R$ 12.000,00',
  },
  criterios: {
    usarNoAgente: true,
    pedirCurriculo: true,
    curriculoObrigatorio: true,
  },
  formulario: {
    usarNoAgente: true,
    correcaoAutomatica: true,
  },
};

export interface Etapa {
  id: string;
  nome: string;
  fase: string;    // ex: 'Listagem', 'Candidatura', 'Fit Cultural'
  ordem: number;   // número global exibido no sidesheet
}

export const FASES_PADRAO = [
  'Listagem',
  'Abordagem',
  'Candidatura',
  'Fit Cultural',
  'Fit Técnico',
  'Oferta',
  'Contratação',
];

export const ETAPAS_PADRAO: Etapa[] = [
  { id: 'e1', nome: 'Listados',                  fase: 'Listagem',     ordem: 1 },
  { id: 'e2', nome: 'Em abordagem',              fase: 'Abordagem',    ordem: 2 },
  { id: 'e3', nome: 'Inscritos',                 fase: 'Candidatura',  ordem: 3 },
  { id: 'e4', nome: 'Bate-papo com RH',          fase: 'Fit Cultural', ordem: 4 },
  { id: 'e5', nome: 'Entrevista com a Liderança', fase: 'Fit Cultural', ordem: 5 },
  { id: 'e6', nome: 'Entrevista Técnica',        fase: 'Fit Técnico',  ordem: 6 },
  { id: 'e7', nome: 'Offer',                     fase: 'Oferta',       ordem: 7 },
  { id: 'e8', nome: 'Contratados',               fase: 'Contratação',  ordem: 8 },
];

// ── Scorecard da vaga ────────────────────────────────────────────────────────

export interface ScorecardCriterio {
  id: string;
  nome: string;
}

export interface ScorecardCategoria {
  id: string;
  nome: string;
  criterios: ScorecardCriterio[];
}

export interface KitEntrevista {
  id: string;
  nome: string;
  etapaId: string;         // referencia Etapa.id
  roteiro: string;         // HTML do roteiro da entrevista
  criteriosFoco: string[]; // IDs dos critérios marcados como foco nesse kit
}

export const SCORECARD_CATEGORIAS_PADRAO: ScorecardCategoria[] = [
  {
    id: 'sc-cat-1',
    nome: 'Linguagens',
    criterios: [
      { id: 'sc-c-1', nome: 'Kotlin' },
      { id: 'sc-c-2', nome: 'Typescript' },
    ],
  },
  {
    id: 'sc-cat-2',
    nome: 'Outros',
    criterios: [
      { id: 'sc-c-3', nome: 'Node.js' },
      { id: 'sc-c-4', nome: 'AWS' },
      { id: 'sc-c-5', nome: 'Comunicação' },
      { id: 'sc-c-6', nome: 'Resiliência' },
    ],
  },
];

export const KITS_ENTREVISTA_PADRAO: KitEntrevista[] = [
  {
    id: 'kit-1',
    nome: 'Scorecard - Extensão',
    etapaId: 'e4',
    roteiro:
      '<p><strong>Introdução:</strong></p><p><br></p><p><strong>Pergunta 1:</strong></p><p><br></p><p><strong>Pergunta 2:</strong></p><p><br></p><p><strong>Pergunta 3:</strong></p>',
    criteriosFoco: ['sc-c-1', 'sc-c-2', 'sc-c-3', 'sc-c-5', 'sc-c-6'],
  },
];

export interface JobData {
  // Campos preenchidos automaticamente pelo agente
  titulo?: string;
  descricao?: string;
  senioridade?: string;
  etapas?: string;           // legado (string separada por vírgulas)
  etapasVaga?: Etapa[];      // novo: etapas estruturadas com fases
  // Divulgação (sidesheet)
  divulgarVaga?: boolean;
  quemPodeVerVaga?: string;              // 'Pública' | 'Privada' | 'Somente internos'
  paginaVagas?: string;                  // 'Padrão' | outras
  plataformasDivulgacaoList?: PlataformaDivulgacao[];
  // Formulário de inscrição (divulgação)
  pedirLinkedIn?: boolean;
  linkedInObrigatorio?: boolean;
  pedirCurriculo?: boolean;
  curriculoObrigatorio?: boolean;
  pedirLocalizacaoCandidato?: boolean;
  localizacaoCandidatoObrigatoria?: boolean;
  pedirIndicacao?: boolean;
  // Publicação
  nomeVagaDivulgacao?: string;
  templateDescricao?: string;
  informacoesVaga?: string;
  divulgacao?: string;
  confirmacaoInscricao?: string;
  formularioPersonalizado?: string;
  criteriosAnalise?: string;        // legado
  criteriosAnaliseList?: CriterioAnalise[];  // novo: critérios estruturados
  templateCriterios?: string;
  agenteTriagem?: string;
  agenteTriagemConfig?: AgenteTriagemConfig;
  kitEntrevistaScorecard?: string;
  
  // Detalhes da vaga (sidesheet)
  confidencial?: boolean;
  area?: string;
  cliente?: string;
  notasInternas?: string;
  recrutador?: string;

  // Campos que o agente pergunta ao usuário
  avaliadores?: string[]; // Array de avaliadores
  gestor?: string;
  sla?: string;
  posicoes?: Posicao[]; // Array de posições com quantidade e motivo
  salarioMinimo?: string;
  salarioMaximo?: string;
  // Orçamento da vaga (sidesheet)
  tiposContratacao?: string[];   // ex: ['CLT', 'PJ']
  salarioVaga?: string;          // valor principal (R$)
  pedirPretensaoSalarial?: boolean;
  pretensaoSalarialObrigatoria?: boolean;
  localizacao?: string;
  modeloTrabalho?: string;       // 'Presencial' | 'Remoto' | 'Híbrido'
  pais?: string;
  estado?: string;
  cidade?: string;
  perguntarDisponibilidade?: boolean;
  disponibilidadeObrigatoria?: boolean;
  complementoDisponibilidade?: string; // ex: "2x por semana"
  tipoContrato?: string;
  departamento?: string;
  requisicao?: string;       // legado (CamposFaltantesForm)
  requisicoes?: string[];    // novo: múltiplas requisições vinculadas (sidesheet)
  camposPersonalizados?: CampoPersonalizadoVaga[];

  // Campos personalizados fixos (legado)
  projeto?: string;
  time?: string;
  squad?: string;
  centroCusto?: string;
  bu?: string;

  // Formulário personalizado (sidesheet)
  usarFormulario?: boolean;
  questoesFormulario?: QuestaoFormulario[];
  // Confirmação de inscrição (sidesheet)
  enviarEmailConfirmacao?: boolean;
  templateEmailConfirmacao?: string;
  assuntoEmailConfirmacao?: string;
  corpoEmailConfirmacao?: string;
  modoEnvioEmail?: 'proprio' | 'sistema';
  // Kit de entrevista e Scorecard
  scorecardCategorias?: ScorecardCategoria[];
  kitsEntrevista?: KitEntrevista[];
}

export type DataSource = 'extracted' | 'inferred' | 'user';

export interface FieldMetadata {
  source: DataSource;
  confidence?: number;
}

export interface JobDataMetadata {
  // Campos preenchidos automaticamente pelo agente
  titulo?: FieldMetadata;
  descricao?: FieldMetadata;
  senioridade?: FieldMetadata;
  etapas?: FieldMetadata;
  etapasVaga?: FieldMetadata;
  divulgarVaga?: FieldMetadata;
  quemPodeVerVaga?: FieldMetadata;
  paginaVagas?: FieldMetadata;
  pedirLinkedIn?: FieldMetadata;
  pedirCurriculo?: FieldMetadata;
  pedirLocalizacaoCandidato?: FieldMetadata;
  pedirIndicacao?: FieldMetadata;
  nomeVagaDivulgacao?: FieldMetadata;
  informacoesVaga?: FieldMetadata;
  divulgacao?: FieldMetadata;
  confirmacaoInscricao?: FieldMetadata;
  formularioPersonalizado?: FieldMetadata;
  criteriosAnalise?: FieldMetadata;
  criteriosAnaliseList?: FieldMetadata;
  templateCriterios?: FieldMetadata;
  agenteTriagem?: FieldMetadata;
  agenteTriagemConfig?: FieldMetadata;
  kitEntrevistaScorecard?: FieldMetadata;

  // Detalhes da vaga
  confidencial?: FieldMetadata;
  area?: FieldMetadata;
  cliente?: FieldMetadata;
  notasInternas?: FieldMetadata;
  recrutador?: FieldMetadata;
  
  // Campos que o agente pergunta ao usuário
  avaliadores?: FieldMetadata;
  gestor?: FieldMetadata;
  sla?: FieldMetadata;
  posicoes?: FieldMetadata;
  salarioMinimo?: FieldMetadata;
  salarioMaximo?: FieldMetadata;
  tiposContratacao?: FieldMetadata;
  salarioVaga?: FieldMetadata;
  pedirPretensaoSalarial?: FieldMetadata;
  pretensaoSalarialObrigatoria?: FieldMetadata;
  localizacao?: FieldMetadata;
  modeloTrabalho?: FieldMetadata;
  pais?: FieldMetadata;
  estado?: FieldMetadata;
  cidade?: FieldMetadata;
  perguntarDisponibilidade?: FieldMetadata;
  disponibilidadeObrigatoria?: FieldMetadata;
  complementoDisponibilidade?: FieldMetadata;
  tipoContrato?: FieldMetadata;
  departamento?: FieldMetadata;
  requisicao?: FieldMetadata;
  requisicoes?: FieldMetadata;
  camposPersonalizados?: FieldMetadata;

  // Campos personalizados fixos (legado)
  projeto?: FieldMetadata;
  time?: FieldMetadata;
  squad?: FieldMetadata;
  centroCusto?: FieldMetadata;
  bu?: FieldMetadata;

  // Formulário personalizado (sidesheet)
  usarFormulario?: FieldMetadata;
  questoesFormulario?: FieldMetadata;
  // Confirmação de inscrição (sidesheet)
  enviarEmailConfirmacao?: FieldMetadata;
  templateEmailConfirmacao?: FieldMetadata;
  assuntoEmailConfirmacao?: FieldMetadata;
  corpoEmailConfirmacao?: FieldMetadata;
  modoEnvioEmail?: FieldMetadata;
  // Kit de entrevista e Scorecard
  scorecardCategorias?: FieldMetadata;
  kitsEntrevista?: FieldMetadata;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  options?: { label: string; value: string; secondary?: boolean }[];
  selectOptions?: { label: string; value: string }[];
  searchableSelect?: boolean;  // render selectOptions as searchable dropdown
  
  // Formulários especiais
  faixaSalarialForm?: boolean;
  localizacaoForm?: boolean;
  avaliadoresForm?: boolean;
  posicoesForm?: boolean;
  camposPersonalizadosForm?: boolean;

  // Painel de distribuição JD
  distribuicaoPainel?: JDAnalysisResult;
  distribuicaoPainelTitulo?: string;
  
  // Questões estruturais pós-JD
  questoesEstruturaisForm?: boolean;
  onQuestoesEstruturaisSubmit?: (data: QuestoesEstruturaisData) => void;
  questoesEstruturaisInitial?: {
    salMin?: string;
    salMax?: string;
    tipoContrato?: string;
    modeloTrabalho?: string;
    localizacao?: string;
    jaInformado?: {
      salario?: boolean;
      modeloTrabalho?: boolean;
      localizacao?: boolean;
    };
  };

  // Campos faltantes — form unificado
  camposFaltantesForm?: boolean;
  camposFaltantesAutoExpand?: boolean;
  camposFaltantesOnlyCampos?: boolean;
  onCamposFaltantesSubmit?: (data: CamposFaltantesData) => void;
  camposFaltantesInitial?: {
    requisicao?: { id: string; label: string };
    posicoes?: Posicao[];
    hidePosicoes?: boolean;
  };

  // Draft button inline
  hasDraftButton?: boolean;

  // Generic inline action button (label + callback)
  inlineActionButton?: { label: string; onClick: () => void };

  // Confirmação de extração round 2 (salário/localização)
  confirmacaoRound2?: {
    tipoContrato: string;
    pais: string;
    estado: string;
    cidade: string;
    modeloTrabalho: string;
    salarioMinimo?: string;
    salarioMaximo?: string;
  };
  onConfirmacaoRound2Submit?: (data: { tipoContrato: string; localizacao: string; modeloTrabalho: string; salarioMinimo?: string; salarioMaximo?: string }) => void;
  
  // Campos antigos (compatibilidade)
  posicoesField?: boolean;
  doubleFields?: { field1: string; field2: string };
  
  // Callbacks
  onFaixaSalarialSubmit?: (salarioMin: string, salarioMax: string, tipoContrato: string) => void;
  onLocalizacaoSubmit?: (localizacao: string, modeloTrabalho: string) => void;
  onAvaliadoresSubmit?: (avaliadores: string[], gestor: string) => void;
  onSlaSubmit?: (sla: string) => void;
  onPosicoesSubmit?: (posicoes: Posicao[]) => void;
  onCamposPersonalizadosSubmit?: (projeto: string, time: string, squad: string, centroCusto: string, bu: string) => void;
  
  onSubmit?: (value: string) => void;
  onDoubleSubmit?: (field1Value: string, field2Value: string) => void;
  onLocationSubmit?: (pais: string, estado: string, cidade: string) => void;
  locationFields?: boolean;
  isProcessing?: boolean;
  onProcessingComplete?: () => void;
  processingSummary?: {
    steps: string[];
    isExpanded: boolean;
  };
  iconExplanation?: {
    completedIcon?: boolean;
    pendingIcon?: boolean;
  };

  // Áudio
  isAudioMessage?: boolean;
  audioDuration?: string;
  transcription?: string;

  // Link discreto de template (exibido abaixo do conteúdo)
  hasTemplateLink?: boolean;
}

export interface ConversationState {
  flow: 'initial' | 'has_description' | 'duplicate' | 'use_requisition' | 'use_template' | 'help_create' | 'completing_data' | 'sla_input' | 'from_scratch_round1' | 'from_scratch_round2';
  step: number;
  waitingForInput: boolean;
  selectedField?: string;
}

export interface RequisitionPosicao {
  quantidade: number;
  motivo: string;
}

export interface RequisitionCampoPersonalizado {
  nome: string;
  valor: string;
}

export interface RequisitionFullData {
  id: string;
  name: string;
  recResponsavel: string | null;
  salarioIdeal?: string;
  salarioMaximo?: string;
  descricaoCargo?: string;
  posicoes?: RequisitionPosicao[];
  camposPersonalizados?: RequisitionCampoPersonalizado[];
}