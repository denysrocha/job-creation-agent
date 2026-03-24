import { CampoPersonalizadoVaga } from './job';

export interface Requisito {
  id: string;
  descricao: string;
  tipo: 'tecnico' | 'comportamental' | 'situacional' | 'fato_objetivo';
  destinos: ('criterio_curriculo' | 'formulario' | 'scorecard' | 'automacao')[];
  justificativa: string;
  ambiguo: boolean;
}

export interface PerguntaFormulario {
  id: string;
  requisito_id: string;
  pergunta: string;
  tipo: 'dissertativa' | 'multipla_escolha' | 'sim_nao';
  opcoes: string[] | null;
  tem_gabarito: boolean;
  gabarito: string | null;
  justificativa: string;
}

export interface CriterioCurriculo {
  id: string;
  requisito_id: string;
  criterio: string;
  peso: 'eliminatorio' | 'alto' | 'medio' | 'baixo';
  justificativa: string;
}

export interface HabilidadeScorecard {
  id: string;
  requisito_id: string;
  habilidade: string;
  descricao: string;
  etapa: string;
  justificativa: string;
}

export interface KitEntrevistaEtapa {
  etapa: string;
  objetivo: string;
  perguntas_sugeridas: string[];
  scorecards_vinculados: string[];
}

export interface Automacao {
  tipo: 'salario' | 'modelo_trabalho' | 'formulario';
  ativo: boolean;
  parametro: string;
  justificativa: string;
}

export interface DistribuicaoResumo {
  total_requisitos: number;
  criterios_curriculo: number;
  perguntas_formulario: number;
  habilidades_scorecard: number;
  automacoes: number;
  ambiguos_resolvidos: number;
  agente_triagem: {
    criterios_curriculo: number;
    analise_salarial: boolean;
    formulario_com_gabarito: number;
  };
}

export interface JDAnalysisResult {
  job_description: { texto: string };
  requisitos: Requisito[];
  formulario: PerguntaFormulario[];
  criterios_curriculo: CriterioCurriculo[];
  scorecard: HabilidadeScorecard[];
  kit_entrevista: KitEntrevistaEtapa[];
  automacoes: Automacao[];
  distribuicao_resumo: DistribuicaoResumo;
}

export interface QuestoesEstruturaisData {
  salarioMinimo: string;
  salarioMaximo: string;
  tipoContrato: string;
  modeloTrabalho: string;
  pais: string;
  estado: string;
  cidade: string;
  reprovarPorSalario: boolean;
  reprovarPorModeloTrabalho: boolean;
}

export interface CamposFaltantesData {
  sla: string;
  gestorResponsavel: string;
  avaliadores: string[];
  requisicoes: string[];
  posicoes: { quantidade: number; motivo: string }[];
  camposPersonalizados: CampoPersonalizadoVaga[];
  area: string;
  cliente: string;
}