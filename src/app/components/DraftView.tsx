import { 
  FileText, 
  Clipboard, 
  Users, 
  Sliders, 
  DollarSign, 
  MapPin, 
  GitBranch, 
  CheckCircle,
  FileInput,
  Target,
  Bot,
  Globe,
  Zap,
  Check,
  ChevronRight,
  AlertCircle,
  Pencil,
  Sparkles,
  Save,
  Star
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { JobData, JobDataMetadata } from '../types/job';
import { SideSheet } from './SideSheet';
import { DetalhesVagaSideSheet } from './DetalhesVagaSideSheet';
import { RequisicaoSideSheet, REQUISICOES_MOCK } from './RequisicaoSideSheet';
import { PosicoesSideSheet } from './PosicoesSideSheet';
import { CamposPersonalizadosSideSheet } from './CamposPersonalizadosSideSheet';
import { OrcamentoSideSheet } from './OrcamentoSideSheet';
import { LocalizacaoSideSheet } from './LocalizacaoSideSheet';
import { EtapasSideSheet } from './EtapasSideSheet';
import { DivulgacaoSideSheet } from './DivulgacaoSideSheet';
import { FormularioPersonalizadoSideSheet } from './FormularioPersonalizadoSideSheet';
import { CriteriosSideSheet } from './CriteriosSideSheet';
import { AgenteTriagemSideSheet } from './AgenteTriagemSideSheet';
import { ConfirmacaoInscricaoSideSheet } from './ConfirmacaoInscricaoSideSheet';
import { KitEntrevistaScorecardSideSheet } from './KitEntrevistaScorecardSideSheet';
import { ETAPAS_PADRAO, QUESTOES_PADRAO, CRITERIOS_PADRAO, AGENTE_TRIAGEM_PADRAO, SCORECARD_CATEGORIAS_PADRAO, KITS_ENTREVISTA_PADRAO } from '../types/job';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { CandidateView } from './CandidateView';
import { Progress } from './ui/progress';

interface DraftCardProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  isCompleted?: boolean;
  onClick?: () => void;
  hasAutomation?: boolean;
  automationActive?: boolean;
  onAutomationClick?: () => void;
  hasInferredData?: boolean;
  isHighlighted?: boolean;
  cardId?: string;
}

function DraftCard({ icon, title, children, isCompleted, onClick, hasAutomation, automationActive, onAutomationClick, hasInferredData, isHighlighted, cardId }: DraftCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<'edit' | 'check' | 'alert' | null>(null);
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md relative overflow-hidden aspect-square flex flex-col"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHighlighted ? {
        boxShadow: [
          '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          '0 0 0 4px rgb(168 85 247 / 0.3)',
          '0 0 0 4px rgb(168 85 247 / 0.3)',
          '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        ],
        scale: [1, 1.02, 1.02, 1],
      } : {}}
      transition={isHighlighted ? {
        duration: 2,
        ease: "easeInOut",
      } : {}}
    >
      <div className="flex-1 flex flex-col p-6 min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-purple-600 flex-shrink-0">
              {icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-[14px] truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {/* Lápis - sempre renderizado, opacity controlada pelo hover */}
            <div 
              className={`w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setHoveredIcon('edit')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </div>
            
            {/* Check ou Alerta */}
            {isCompleted ? (
              <div 
                className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"
                onMouseEnter={() => setHoveredIcon('check')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Check className="w-4 h-4 text-green-600" />
              </div>
            ) : (
              <div 
                className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0"
                onMouseEnter={() => setHoveredIcon('alert')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="overflow-hidden flex-1 min-h-0">
          {children}
        </div>

        {/* Chip "Gerado pela IA" — abaixo do conteúdo */}
        {hasInferredData && (
          <div className="mt-3 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 rounded-md">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-purple-600 flex-shrink-0">
                <path d="M5 0L5.8 3.5L9 5L5.8 6.5L5 10L4.2 6.5L1 5L4.2 3.5L5 0Z" fill="currentColor"/>
              </svg>
              <span style={{ fontSize: '11px' }} className="text-purple-700 font-medium leading-none">Gerado pela IA</span>
            </span>
          </div>
        )}
      </div>
      
      {/* Automação — botão outline no rodapé */}
      {hasAutomation && (
        <>
          <div className="border-t border-gray-200 flex-shrink-0" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAutomationClick?.();
            }}
            className={`px-5 py-3 flex-shrink-0 w-full flex items-center justify-center gap-1.5 text-[12px] font-medium transition-all cursor-pointer ${
              automationActive
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Automação {automationActive ? 'ativa' : 'inativa'}</span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </>
      )}
      
      {/* Tooltips */}
      {hoveredIcon === 'edit' && (
        <div className="absolute top-12 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          Clique para editar
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
      {hoveredIcon === 'check' && (
        <div className="absolute top-12 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          Informações preenchidas
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
      {hoveredIcon === 'alert' && (
        <div className="absolute top-12 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          Nenhuma informação cadastrada nesta seção
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
    </motion.div>
  );
}

interface FieldRowProps {
  label: string;
  value?: string;
}

function FieldRow({ label, value }: FieldRowProps) {
  return (
    <div className="flex items-start gap-2 py-1">
      <span className="text-gray-600 text-[14px] flex-shrink-0">{label}:</span>
      <span className="text-gray-900 font-medium text-[14px] truncate flex-1">{value || '-'}</span>
    </div>
  );
}

interface DraftViewProps {
  jobData: JobData;
  jobDataMetadata: JobDataMetadata;
  highlightedCard?: string | null;
}

export function DraftView({ jobData, jobDataMetadata, highlightedCard }: DraftViewProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [localJobData, setLocalJobData] = useState<JobData>(jobData);
  const [isSaving, setIsSaving] = useState(false);
  const [currentView, setCurrentView] = useState<'creation' | 'candidate'>('creation');

  // Simula salvamento automático periódico
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    }, 5000); // A cada 5 segundos simula um salvamento

    return () => clearInterval(interval);
  }, []);

  const handleSave = (updatedData: Partial<JobData>) => {
    setLocalJobData(prev => ({ ...prev, ...updatedData }));
    
    // Simula salvamento automático
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleCloseSideSheet = () => {
    setSelectedCard(null);
  };

  // Configurações de campos para cada card
  const cardFieldConfigs: Record<string, { title: string; icon: React.ReactNode; fields: any[] }> = {
    detalhes: {
      title: 'Detalhes da vaga',
      icon: <FileText className="w-5 h-5" />,
      fields: [
        { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Ex: Engenheiro de Software' },
        { key: 'senioridade', label: 'Senioridade', type: 'select', options: ['Junior', 'Pleno', 'Senior', 'Staff', 'Principal'] },
        { key: 'gestor', label: 'Gestor responsável', type: 'text' },
        { key: 'sla', label: 'SLA (dias)', type: 'number' },
        { key: 'avaliadores', label: 'Avaliadores', type: 'text', placeholder: 'Separar por vírgula' },
      ]
    },
    requisicao: {
      title: 'Requisições',
      icon: <Clipboard className="w-5 h-5" />,
      fields: [
        { key: 'requisicao', label: 'Requisição vinculada', type: 'text', placeholder: 'Ex: REQ-2024-001' },
      ]
    },
    posicoes: {
      title: 'Posições',
      icon: <Users className="w-5 h-5" />,
      fields: [
        { key: 'posicoes', label: 'Total de posições', type: 'number', placeholder: 'Ex: 3' },
      ]
    },
    camposPersonalizados: {
      title: 'Campos personalizados',
      icon: <Sliders className="w-5 h-5" />,
      fields: [
        { key: 'centroCusto', label: 'Centro de custo', type: 'text', placeholder: 'Ex: TI-2024-001' },
        { key: 'squad', label: 'Squad', type: 'text', placeholder: 'Ex: Squad de Produtos' },
        { key: 'time', label: 'Time', type: 'text', placeholder: 'Ex: Time de Engenharia' },
        { key: 'beneficios', label: 'Benefícios', type: 'textarea', placeholder: 'Descreva os benefícios' },
      ]
    },
    orcamento: {
      title: 'Orçamento',
      icon: <DollarSign className="w-5 h-5" />,
      fields: [
        { key: 'salario', label: 'Faixa salarial', type: 'text', placeholder: 'Ex: R$ 8.000 - R$ 12.000' },
      ]
    },
    localizacao: {
      title: 'Localização',
      icon: <MapPin className="w-5 h-5" />,
      fields: [
        { key: 'modeloTrabalho', label: 'Modelo de trabalho', type: 'select', options: ['Remoto', 'Presencial', 'Híbrido'] },
        { key: 'pais', label: 'País', type: 'select', options: ['Brasil', 'Portugal', 'Estados Unidos', 'Outro'] },
        { key: 'estado', label: 'Estado', type: 'select', options: ['SP', 'RJ', 'MG', 'RS', 'SC', 'PR', 'BA', 'PE', 'CE', 'Outro'] },
        { key: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Ex: São Paulo' },
      ]
    },
    etapas: {
      title: 'Etapas',
      icon: <GitBranch className="w-5 h-5" />,
      fields: [
        { key: 'etapas', label: 'Etapas do processo', type: 'textarea', placeholder: 'Separar por vírgula ou quebra de linha' },
      ]
    },
    divulgacao: {
      title: 'Divulgação',
      icon: <Globe className="w-5 h-5" />,
      fields: [
        { key: 'divulgarVaga', label: 'Divulgar a vaga', type: 'select', options: ['Sim', 'Não'] },
        { key: 'quemPodeVerVaga', label: 'Quem pode ver a vaga', type: 'select', options: ['Pública', 'Privada', 'Apenas recrutadores'] },
        { key: 'qualPaginaVaga', label: 'Qual a página da vaga', type: 'select', options: ['Padrão', 'Personalizada'] },
        { key: 'plataformasDivulgacao', label: 'Plataformas de divulgação', type: 'text', placeholder: 'Ex: LinkedIn, Indeed, NetVagas' },
        { key: 'pedirLinkedIn', label: 'Pedir LinkedIn', type: 'select', options: ['Sim (obrigatório)', 'Sim (opcional)', 'Não'] },
        { key: 'pedirPretencaoSalarial', label: 'Pedir pretensão salarial', type: 'select', options: ['Sim (obrigatório)', 'Sim (opcional)', 'Não'] },
        { key: 'pedirCurriculo', label: 'Pedir currículo', type: 'select', options: ['Sim (obrigatório)', 'Sim (opcional)', 'Não'] },
        { key: 'pedirLocalizacao', label: 'Pedir localização', type: 'select', options: ['Sim (obrigatório)', 'Sim (opcional)', 'Não'] },
        { key: 'perguntarDisponibilidadeModelo', label: 'Perguntar sobre disponibilidade de modelo', type: 'select', options: ['Sim (obrigatório)', 'Sim (opcional)', 'Não'] },
        { key: 'pedirIndicacao', label: 'Pedir indicação', type: 'select', options: ['Sim', 'Não'] },
        { key: 'nomeVaga', label: 'Nome da vaga', type: 'text', placeholder: 'Ex: Engenheiro Fullstack Sênior' },
        { key: 'informacoesVaga', label: 'Informações da vaga', type: 'textarea', placeholder: 'Descreva as informações da vaga' },
      ]
    },
    confirmacao: {
      title: 'Confirmação de inscrição',
      icon: <CheckCircle className="w-5 h-5" />,
      fields: [
        { key: 'confirmacao', label: 'Mensagem de confirmação', type: 'textarea', placeholder: 'Mensagem enviada ao candidato' },
      ]
    },
    formulario: {
      title: 'Formulário personalizado',
      icon: <FileInput className="w-5 h-5" />,
      fields: [
        { 
          key: 'usarFormulario', 
          label: 'Usar formulário personalizado', 
          type: 'toggle'
        },
        { 
          key: 'perguntas', 
          label: 'Perguntas', 
          type: 'custom',
          customType: 'questions'
        }
      ]
    },
    criterios: {
      title: 'Critérios para analisar currículos',
      icon: <Target className="w-5 h-5" />,
      fields: [
        { 
          key: 'usarCriterios', 
          label: 'Usar critérios de análise', 
          type: 'toggle'
        },
        { 
          key: 'criterios', 
          label: 'Critérios', 
          type: 'custom',
          customType: 'criteria'
        }
      ]
    },
    agenteTriagem: {
      title: 'Agente na triagem',
      icon: <Bot className="w-5 h-5" />,
      fields: [
        { 
          key: 'agenteTriagem', 
          label: 'Configurações do agente', 
          type: 'custom',
          customType: 'agentConfig'
        }
      ]
    },
    orcamentoAutomacao: {
      title: 'Automação - Reprovação por faixa salarial',
      icon: <Zap className="w-5 h-5" />,
      fields: [
        { 
          key: 'automacaoSalario', 
          label: 'Configurações da automação', 
          type: 'custom',
          customType: 'salaryAutomation'
        }
      ]
    },
    localizacaoAutomacao: {
      title: 'Automação - Reprovação por localização',
      icon: <Zap className="w-5 h-5" />,
      fields: [
        { 
          key: 'automacaoLocalizacao', 
          label: 'Configurações da automação', 
          type: 'custom',
          customType: 'locationAutomation'
        }
      ]
    },
  };

  // Mock data para campos que não estão no JobData ainda
  const mockData = {
    area: 'Tecnologia',
    cliente: undefined,
    notasInternas: 'Vaga urgente para expansão do time',
    recrutadorResponsavel: 'Ana Paula Costa',
    posicaoTipo1: '2 - Aumento de quadro',
    posicaoTipo2: '1 - Substituição',
    centroCusto: 'TI-2024-001',
    projeto: 'Plataforma Nova',
    departamento: 'Engenharia',
    salarioVaga: '10.000',
    salarioMaximo: '12.000',
    modeloContratacao: 'CLT',
    pedirPretencao: 'Sim',
    tornarObrigatorio: 'Sim',
    pais: 'Brasil',
    estado: 'São Paulo',
    cidade: 'São Paulo',
    perguntarDisponibilidade: 'Sim',
    tornarObrigatorioLocalizacao: 'Sim',
    enviarEmail: 'Sim',
    assuntoEmail: 'Confirmação de inscrição - {{titulo}}',
    corpoMensagem: 'Olá! Recebemos sua inscrição para a vaga de {{titulo}}. Em breve entraremos em contato.',
    divulgarVaga: 'Sim',
    quemPodeVerVaga: 'Pública',
    qualPaginaVaga: 'Padrão',
    plataformasDivulgacao: 'LinkedIn, Indeed, NetVagas',
    pedirLinkedIn: 'Sim (obrigatório)',
    pedirPretencaoSalarial: 'Sim (obrigatório)',
    pedirCurriculo: 'Sim (obrigatório)',
    pedirLocalizacao: 'Sim (obrigatório)',
    perguntarDisponibilidadeModelo: 'Sim (obrigatório)',
    pedirIndicacao: 'Não',
    nomeVaga: 'Engenheiro Fullstack Sênior',
    informacoesVaga: 'Estamos em busca de um engenheiro de software senior...',
    usarFormulario: true,
    perguntas: [
      { id: '1', texto: 'Você tem experiência com React e Node.js?', tipo: 'multipla_escolha', obrigatoria: true },
      { id: '2', texto: 'Descreva sua experiência com arquitetura de software', tipo: 'texto_longo', obrigatoria: true },
      { id: '3', texto: 'Você está disponível para trabalhar remotamente?', tipo: 'sim_nao', obrigatoria: true },
      { id: '4', texto: 'Qual sua pretensão salarial?', tipo: 'texto_curto', obrigatoria: false },
    ],
    usarCriterios: true,
    criterios: [
      { id: '1', texto: 'Experiência mínima de 5 anos com desenvolvimento fullstack', peso: 'alto' },
      { id: '2', texto: 'Conhecimento avançado em React, TypeScript e Node.js', peso: 'alto' },
      { id: '3', texto: 'Experiência com arquitetura de microsserviços', peso: 'médio' },
      { id: '4', texto: 'Experiência com cloud (AWS, GCP ou Azure)', peso: 'médio' },
      { id: '5', texto: 'Inglês fluente', peso: 'baixo' },
    ],
  };

  const hasJobDetails = localJobData.titulo || localJobData.senioridade || localJobData.gestor || localJobData.sla || localJobData.avaliadores;
  const hasRequisition = !!(localJobData.requisicoes?.length) || !!localJobData.requisicao;
  const hasPositions = !!(localJobData.posicoes?.length);
  const hasCustomFields = !!(localJobData.camposPersonalizados?.some(c => c.valor));
  const hasBudget = !!(localJobData.salarioVaga || localJobData.salarioMinimo || localJobData.tiposContratacao?.length);
  const hasLocation = !!(localJobData.localizacao || localJobData.modeloTrabalho || localJobData.cidade);
  const hasStages = !!(localJobData.etapasVaga?.length || localJobData.etapas);
  const hasDivulgation = !!(localJobData.divulgarVaga !== undefined || localJobData.quemPodeVerVaga || localJobData.nomeVagaDivulgacao);
  const hasForm = !!(localJobData.usarFormulario !== undefined || localJobData.questoesFormulario?.length);
  const hasCriterios = !!(localJobData.criteriosAnaliseList?.length || localJobData.criteriosAnalise);

  // Calcula a qualidade da vaga baseada no preenchimento dos cards
  const qualityCards = [
    { isCompleted: hasJobDetails },
    { isCompleted: hasRequisition },
    { isCompleted: hasPositions },
    { isCompleted: hasCustomFields },
    { isCompleted: hasBudget },
    { isCompleted: hasLocation },
    { isCompleted: hasStages },
    { isCompleted: hasDivulgation },
    { isCompleted: true }, // Confirmação
    { isCompleted: hasForm || mockData.usarFormulario },
    { isCompleted: hasCriterios || mockData.usarCriterios },
    { isCompleted: true }, // Agente
  ];

  const completedCards = qualityCards.filter(card => card.isCompleted).length;
  const qualityProgress = (completedCards / qualityCards.length) * 100;

  // Define a cor da barra de progresso baseada no percentual
  const getProgressColor = (progress: number) => {
    if (progress <= 30) {
      return 'bg-red-500';
    } else if (progress <= 80) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Barra de ação e status */}
        <div className="flex items-center justify-between">
          {/* Indicador de salvamento */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
            <span className="italic">{isSaving ? 'Salvando...' : 'Salvo'}</span>
          </div>
          
          {/* Botões */}
          <div className="flex items-center gap-3">
            {/* Button group */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                className={`px-4 py-2 ${currentView === 'creation' ? 'bg-purple-50 text-purple-700' : 'bg-white text-gray-700'} text-sm font-medium border-r border-gray-300 hover:bg-gray-50`}
                onClick={() => setCurrentView('creation')}
              >
                Rascunho
              </button>
              <button
                className={`px-4 py-2 ${currentView === 'candidate' ? 'bg-purple-50 text-purple-700' : 'bg-white text-gray-700'} text-sm font-medium hover:bg-gray-50`}
                onClick={() => setCurrentView('candidate')}
              >
                Visão do candidato
              </button>
            </div>
            
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Criar vaga
            </Button>
          </div>
        </div>

        {/* Renderização condicional */}
        {currentView === 'creation' ? (
          <>
            {/* Barra de qualidade da vaga */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm uppercase tracking-wide text-gray-500">Qualidade da vaga</h2>
                <span className="text-sm text-gray-600">{Math.round(qualityProgress)}%</span>
              </div>
              <Progress value={qualityProgress} className="h-2" color={getProgressColor(qualityProgress)} />
            </div>

            {/* Sobre a vaga */}
            <section>
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Sobre a vaga</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Detalhes da vaga */}
                <DraftCard
                  icon={<FileText className="w-5 h-5" />}
                  title="Detalhes da vaga"
                  isCompleted={hasJobDetails}
                  onClick={() => setSelectedCard('detalhes')}
                  hasInferredData={true}
                >
                  <FieldRow label="Título" value={localJobData.titulo} />
                  <FieldRow label="Área" value={localJobData.area} />
                  <FieldRow label="Gestor" value={localJobData.gestor} />
                  <FieldRow label="Recrutador" value={localJobData.recrutador} />
                  <p className="text-gray-500 italic mt-2 text-[12px]">+ 4 campos</p>
                </DraftCard>

                {/* Requisições */}
                <DraftCard
                  icon={<Clipboard className="w-5 h-5" />}
                  title="Requisições"
                  isCompleted={hasRequisition}
                  onClick={() => setSelectedCard('requisicao')}
                >
                  {localJobData.requisicoes && localJobData.requisicoes.length > 0 ? (
                    localJobData.requisicoes.map((r, i) => (
                      <FieldRow key={i} label={`Req. ${i + 1}`} value={getRequisicaoLabel(r)} />
                    ))
                  ) : localJobData.requisicao ? (
                    <FieldRow label="Requisição" value={localJobData.requisicao} />
                  ) : (
                    <p className="text-gray-400 italic text-[12px]">Nenhuma requisição vinculada</p>
                  )}
                </DraftCard>

                {/* Posições */}
                <DraftCard
                  icon={<Users className="w-5 h-5" />}
                  title="Posições"
                  isCompleted={hasPositions}
                  onClick={() => setSelectedCard('posicoes')}
                >
                  {localJobData.posicoes && localJobData.posicoes.length > 0 ? (
                    <>
                      {localJobData.posicoes.map((p, i) => (
                        <FieldRow
                          key={i}
                          label={p.motivo || `Posição ${i + 1}`}
                          value={`${p.quantidade} vaga${p.quantidade !== 1 ? 's' : ''}`}
                        />
                      ))}
                      <p className="text-gray-500 italic mt-2 text-[12px]">
                        Total: {localJobData.posicoes.reduce((s, p) => s + p.quantidade, 0)} posições
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 italic text-[12px]">Nenhuma posição cadastrada</p>
                  )}
                </DraftCard>

                {/* Campos personalizados */}
                <DraftCard
                  icon={<Sliders className="w-5 h-5" />}
                  title="Campos personalizados"
                  isCompleted={hasCustomFields}
                  onClick={() => setSelectedCard('camposPersonalizados')}
                >
                  {localJobData.camposPersonalizados?.filter(c => c.valor).length ? (
                    localJobData.camposPersonalizados.filter(c => c.valor).slice(0, 4).map((c) => (
                      <FieldRow key={c.id} label={c.nome} value={c.valor} />
                    ))
                  ) : (
                    <p className="text-gray-400 italic text-[12px]">Nenhum campo preenchido</p>
                  )}
                </DraftCard>

                {/* Orçamento */}
                <DraftCard
                  icon={<DollarSign className="w-5 h-5" />}
                  title="Orçamento"
                  isCompleted={hasBudget}
                  onClick={() => setSelectedCard('orcamento')}
                  hasAutomation={true}
                  automationActive={true}
                  onAutomationClick={() => setSelectedCard('orcamentoAutomacao')}
                  hasInferredData={jobDataMetadata?.salario?.source === 'inferred'}
                >
                  {hasBudget ? (
                    <>
                      {localJobData.tiposContratacao?.length ? (
                        <FieldRow label="Contratação" value={localJobData.tiposContratacao.join(', ')} />
                      ) : null}
                      {(localJobData.salarioVaga || localJobData.salarioMinimo) && (
                        <FieldRow label="Salário da vaga" value={localJobData.salarioVaga ?? localJobData.salarioMinimo} />
                      )}
                      {localJobData.salarioMaximo && (
                        <FieldRow label="Salário máximo" value={localJobData.salarioMaximo} />
                      )}
                      {localJobData.pedirPretensaoSalarial !== undefined && (
                        <FieldRow label="Pretensão salarial" value={localJobData.pedirPretensaoSalarial ? 'Solicitada' : 'Não solicitada'} />
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic text-[14px]">Não definido</p>
                  )}
                </DraftCard>

                {/* Localização */}
                <DraftCard
                  icon={<MapPin className="w-5 h-5" />}
                  title="Localização"
                  isCompleted={hasLocation}
                  onClick={() => setSelectedCard('localizacao')}
                  hasAutomation={true}
                  automationActive={true}
                  onAutomationClick={() => setSelectedCard('localizacaoAutomacao')}
                  hasInferredData={jobDataMetadata?.localizacao?.source === 'inferred'}
                  isHighlighted={highlightedCard === 'localizacao'}
                  cardId="localizacao"
                >
                  {hasLocation ? (
                    <>
                      {localJobData.modeloTrabalho && (
                        <FieldRow label="Modelo" value={localJobData.modeloTrabalho} />
                      )}
                      {localJobData.pais && (
                        <FieldRow label="País" value={localJobData.pais} />
                      )}
                      {localJobData.estado && (
                        <FieldRow label="Estado" value={localJobData.estado} />
                      )}
                      {localJobData.cidade && (
                        <FieldRow label="Cidade" value={localJobData.cidade} />
                      )}
                      {localJobData.perguntarDisponibilidade !== undefined && (
                        <FieldRow
                          label="Disponibilidade"
                          value={localJobData.perguntarDisponibilidade ? 'Perguntada' : 'Não perguntada'}
                        />
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic text-[14px]">Não definido</p>
                  )}
                </DraftCard>
              </div>
            </section>

            {/* Seleção e triagem */}
            <section>
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Seleção e triagem</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Etapas */}
                <DraftCard
                  icon={<GitBranch className="w-5 h-5" />}
                  title="Etapas"
                  isCompleted={hasStages}
                  onClick={() => setSelectedCard('etapas')}
                  hasInferredData={true}
                >
                  {(() => {
                    const lista = localJobData.etapasVaga?.length
                      ? localJobData.etapasVaga
                      : ETAPAS_PADRAO;
                    return (
                      <div className="space-y-1">
                        {lista.slice(0, 5).map((etapa) => (
                          <div key={etapa.id} className="flex items-center gap-2">
                            <span className="text-gray-400 text-[13px]">{etapa.ordem}.</span>
                            <span className="text-gray-900 text-[13px] truncate">{etapa.nome}</span>
                          </div>
                        ))}
                        {lista.length > 5 && (
                          <p className="text-gray-500 italic text-[12px] mt-1">+ {lista.length - 5} etapas</p>
                        )}
                      </div>
                    );
                  })()}
                </DraftCard>

                <DraftCard
                  icon={<FileInput className="w-5 h-5" />}
                  title="Formulário personalizado"
                  isCompleted={hasForm || mockData.usarFormulario}
                  onClick={() => setSelectedCard('formulario')}
                  hasInferredData={true}
                >
                  {(() => {
                    const lista = localJobData.questoesFormulario?.length
                      ? localJobData.questoesFormulario
                      : QUESTOES_PADRAO;
                    return (
                      <div className="space-y-1.5">
                        {lista.slice(0, 3).map((q, i) => (
                          <div key={q.id} className="flex items-start gap-2">
                            <span className="text-[12px] text-gray-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                            <p className="text-[13px] text-gray-700 line-clamp-2 leading-snug">{q.texto}</p>
                          </div>
                        ))}
                        {lista.length > 3 && (
                          <p className="text-[12px] text-gray-500 italic">+ {lista.length - 3} perguntas</p>
                        )}
                      </div>
                    );
                  })()}
                </DraftCard>
                
                <DraftCard
                  icon={<Target className="w-5 h-5" />}
                  title="Critérios para analisar currículos"
                  isCompleted={hasCriterios || mockData.usarCriterios}
                  onClick={() => setSelectedCard('criterios')}
                  hasInferredData={true}
                >
                  {(() => {
                    const lista = localJobData.criteriosAnaliseList?.length
                      ? localJobData.criteriosAnaliseList
                      : CRITERIOS_PADRAO;
                    return (
                      <div className="space-y-1.5">
                        {lista.slice(0, 3).map((c, i) => (
                          <div key={c.id} className="flex items-start gap-1.5">
                            <span className="text-gray-400 text-[12px] mt-0.5 flex-shrink-0">•</span>
                            <p className="text-[13px] text-gray-700 line-clamp-1 leading-snug">{c.texto}</p>
                          </div>
                        ))}
                        {lista.length > 3 && (
                          <p className="text-[12px] text-gray-500 italic">+ {lista.length - 3} critérios</p>
                        )}
                      </div>
                    );
                  })()}
                </DraftCard>
                
                <DraftCard
                  icon={<Bot className="w-5 h-5" />}
                  title="Agente na triagem"
                  isCompleted={true}
                  onClick={() => setSelectedCard('agenteTriagem')}
                  hasInferredData={true}
                >
                  {(() => {
                    const cfg = localJobData.agenteTriagemConfig ?? AGENTE_TRIAGEM_PADRAO;
                    return (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Análise salarial</span>
                          <span className={`text-[12px] font-medium ${cfg.limiteSalarial.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
                            {cfg.limiteSalarial.usarNoAgente ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Critérios de currículo</span>
                          <span className={`text-[12px] font-medium ${cfg.criterios.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
                            {cfg.criterios.usarNoAgente ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Formulário</span>
                          <span className={`text-[12px] font-medium ${cfg.formulario.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
                            {cfg.formulario.usarNoAgente ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </DraftCard>

                {/* Kit de entrevista e Scorecards */}
                {(() => {
                  const cats = localJobData.scorecardCategorias?.length ? localJobData.scorecardCategorias : SCORECARD_CATEGORIAS_PADRAO;
                  const kits = localJobData.kitsEntrevista?.length ? localJobData.kitsEntrevista : KITS_ENTREVISTA_PADRAO;
                  const totalCrits = cats.reduce((s, c) => s + c.criterios.length, 0);
                  return (
                    <DraftCard
                      icon={<Star className="w-5 h-5" />}
                      title="Kit de entrevista e Scorecards"
                      isCompleted={true}
                      onClick={() => setSelectedCard('kitEntrevista')}
                      hasInferredData={true}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Categorias</span>
                          <span className="text-[12px] font-medium text-gray-800">{cats.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Critérios</span>
                          <span className="text-[12px] font-medium text-gray-800">{totalCrits}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-600">Kits de entrevista</span>
                          <span className="text-[12px] font-medium text-gray-800">{kits.length}</span>
                        </div>
                      </div>
                    </DraftCard>
                  );
                })()}
              </div>
            </section>

            {/* Divulgação e comunicação */}
            <section>
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Divulgação e comunicação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Divulgação */}
                <DraftCard
                  icon={<Globe className="w-5 h-5" />}
                  title="Divulgação"
                  isCompleted={hasDivulgation}
                  onClick={() => setSelectedCard('divulgacao')}
                  hasInferredData={true}
                >
                  <FieldRow label="Divulgar" value={localJobData.divulgarVaga !== undefined ? (localJobData.divulgarVaga ? 'Sim' : 'Não') : mockData.divulgarVaga} />
                  <FieldRow label="Visibilidade" value={localJobData.quemPodeVerVaga ?? mockData.quemPodeVerVaga} />
                  <FieldRow label="Página" value={localJobData.paginaVagas ?? mockData.qualPaginaVaga} />
                  {localJobData.plataformasDivulgacaoList?.filter(p => p.ativa).length ? (
                    <FieldRow label="Plataformas" value={localJobData.plataformasDivulgacaoList.filter(p => p.ativa).map(p => p.nome).join(', ')} />
                  ) : (
                    <FieldRow label="Plataformas" value={mockData.plataformasDivulgacao} />
                  )}
                  <p className="text-xs text-gray-500 italic mt-2">+ 8 campos</p>
                </DraftCard>

                {/* Confirmação de inscrição */}
                <DraftCard
                  icon={<CheckCircle className="w-5 h-5" />}
                  title="Confirmação de inscrição"
                  isCompleted={true}
                  onClick={() => setSelectedCard('confirmacao')}
                  hasInferredData={true}
                >
                  <FieldRow label="Enviar email" value={mockData.enviarEmail} />
                  <FieldRow label="Assunto do email" value={mockData.assuntoEmail} />
                  <div className="py-1">
                    <span className="text-gray-600 text-sm">Corpo da mensagem:</span>
                    <p className="text-gray-900 text-xs mt-1 p-2 bg-gray-50 rounded border border-gray-100">
                      {mockData.corpoMensagem}
                    </p>
                  </div>
                </DraftCard>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Visão do candidato */}
            <CandidateView />
          </>
        )}
      </div>

      {/* SideSheet Requisição (customizado) */}
      {selectedCard === 'requisicao' && (
        <RequisicaoSideSheet
          data={localJobData}
          extraOption={
            localJobData.requisicao
              ? { id: localJobData.requisicao, label: localJobData.requisicao }
              : undefined
          }
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Posições (customizado) */}
      {selectedCard === 'posicoes' && (
        <PosicoesSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Detalhes (customizado) */}
      {selectedCard === 'detalhes' && (
        <DetalhesVagaSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Campos personalizados */}
      {selectedCard === 'camposPersonalizados' && (
        <CamposPersonalizadosSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Orçamento */}
      {selectedCard === 'orcamento' && (
        <OrcamentoSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Localização */}
      {selectedCard === 'localizacao' && (
        <LocalizacaoSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Etapas */}
      {selectedCard === 'etapas' && (
        <EtapasSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Divulgação */}
      {selectedCard === 'divulgacao' && (
        <DivulgacaoSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Formulário Personalizado */}
      {selectedCard === 'formulario' && (
        <FormularioPersonalizadoSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Critérios */}
      {selectedCard === 'criterios' && (
        <CriteriosSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Agente na triagem */}
      {selectedCard === 'agenteTriagem' && (
        <AgenteTriagemSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Confirmação de Inscrição */}
      {selectedCard === 'confirmacao' && (
        <ConfirmacaoInscricaoSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet Kit de entrevista e Scorecards */}
      {selectedCard === 'kitEntrevista' && (
        <KitEntrevistaScorecardSideSheet
          data={localJobData}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}

      {/* SideSheet genérico para outros cards */}
      {selectedCard && !['detalhes','requisicao','posicoes','camposPersonalizados','orcamento','localizacao','etapas','divulgacao','formulario','criterios','agenteTriagem','confirmacao','kitEntrevista'].includes(selectedCard) && (
        <SideSheet
          title={cardFieldConfigs[selectedCard].title}
          icon={cardFieldConfigs[selectedCard].icon}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
          fields={cardFieldConfigs[selectedCard].fields}
          data={(selectedCard === 'formulario' || selectedCard === 'criterios' || selectedCard === 'agenteTriagem' || selectedCard === 'divulgacao') ? mockData : localJobData}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}