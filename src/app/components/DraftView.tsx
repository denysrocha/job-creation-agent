import {
  FileText, Clipboard, Users, Sliders, DollarSign, MapPin, GitBranch,
  CheckCircle, FileInput, Target, Bot, Globe, Zap, Check, ChevronRight,
  AlertCircle, Pencil, Star, Send, X,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Robot1 from '../../imports/Robot';
import { JobData, JobDataMetadata } from '../types/job';
import { SideSheet } from './SideSheet';
import { DetalhesVagaSideSheet } from './DetalhesVagaSideSheet';
import { RequisicaoSideSheet, REQUISICOES_MOCK } from './RequisicaoSideSheet';
import { PosicoesSideSheet } from './PosicoesSideSheet';
import { CamposPersonalizadosSideSheet, CAMPOS_CONFIG } from './CamposPersonalizadosSideSheet';
import { OrcamentoSideSheet } from './OrcamentoSideSheet';
import { LocalizacaoSideSheet } from './LocalizacaoSideSheet';
import { EtapasSideSheet } from './EtapasSideSheet';
import { DivulgacaoSideSheet } from './DivulgacaoSideSheet';
import { FormularioPersonalizadoSideSheet } from './FormularioPersonalizadoSideSheet';
import { CriteriosSideSheet } from './CriteriosSideSheet';
import { AgenteTriagemSideSheet } from './AgenteTriagemSideSheet';
import { ConfirmacaoInscricaoSideSheet } from './ConfirmacaoInscricaoSideSheet';
import { KitEntrevistaScorecardSideSheet } from './KitEntrevistaScorecardSideSheet';
import {
  ETAPAS_PADRAO, QUESTOES_PADRAO, CRITERIOS_PADRAO, AGENTE_TRIAGEM_PADRAO,
  SCORECARD_CATEGORIAS_PADRAO, KITS_ENTREVISTA_PADRAO,
} from '../types/job';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { CandidateView } from './CandidateView';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getRequisicaoLabel(id: string) {
  const found = REQUISICOES_MOCK.find(r => r.value === id);
  return found?.label ?? id;
}

function getQualityColors(progress: number) {
  if (progress < 50) return { text: '#E24B4A', bar: 'bg-red-500' };
  if (progress < 80) return { text: '#BA7517', bar: 'bg-amber-500' };
  return { text: '#1D9E75', bar: 'bg-emerald-500' };
}

// ── DraftCard ────────────────────────────────────────────────────────────────

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
}

function DraftCard({
  icon, title, children, isCompleted, onClick,
  hasAutomation, automationActive, onAutomationClick,
  hasInferredData, isHighlighted,
}: DraftCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<'edit' | 'check' | 'alert' | null>(null);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md relative overflow-hidden flex flex-col min-h-[140px]"
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
      transition={isHighlighted ? { duration: 2, ease: 'easeInOut' } : {}}
    >
      {/* Amber left border strip for pending */}
      {!isCompleted && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400 rounded-l-lg" />
      )}

      <div className="flex-1 flex flex-col p-4 min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-purple-600 flex-shrink-0">{icon}</div>
            <h3 className="font-semibold text-gray-900 text-[14px] truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setHoveredIcon('edit')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </div>
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
                className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                onMouseEnter={() => setHoveredIcon('alert')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-hidden flex-1 min-h-0">{children}</div>

        {/* Chip "Gerado pela IA" */}
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

      {/* Automation footer */}
      {hasAutomation && (
        <>
          <div className="border-t border-gray-200 flex-shrink-0" />
          <button
            onClick={(e) => { e.stopPropagation(); onAutomationClick?.(); }}
            className={`px-5 py-3 flex-shrink-0 w-full flex items-center justify-center gap-1.5 text-[12px] font-medium transition-all cursor-pointer ${
              automationActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-500 hover:bg-gray-50'
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
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
        </div>
      )}
      {hoveredIcon === 'check' && (
        <div className="absolute top-12 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          Informações preenchidas
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
        </div>
      )}
      {hoveredIcon === 'alert' && (
        <div className="absolute top-12 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          Nenhuma informação cadastrada
          <div className="absolute right-3 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
        </div>
      )}
    </motion.div>
  );
}

// ── FieldRow ─────────────────────────────────────────────────────────────────

function FieldRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start gap-2 py-0.5">
      <span className="text-gray-500 text-[13px] flex-shrink-0">{label}:</span>
      <span className="text-gray-900 font-medium text-[13px] truncate flex-1">{value || '-'}</span>
    </div>
  );
}

// ── CompactChat ───────────────────────────────────────────────────────────────

type CompactMsg = { id: string; role: 'agent' | 'user'; text: string };

interface CompactChatProps {
  messages: CompactMsg[];
  isTyping: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
}

function CompactChat({ messages, isTyping, onClose, onSend }: CompactChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    const t = input.trim();
    if (!t) return;
    setInput('');
    onSend(t);
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden max-h-[420px]">
      {/* Close button */}
      <div className="flex justify-end px-3 pt-2.5 flex-shrink-0">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-3 space-y-3 min-h-0">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-purple-600 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl rounded-bl-sm px-3 py-2">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 px-3 py-2.5 flex items-center gap-2 flex-shrink-0">
        <input
          className="flex-1 text-sm bg-gray-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-200 border border-gray-200"
          placeholder="Peça um ajuste..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white disabled:opacity-40 hover:bg-purple-700 transition-colors flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── DraftView ─────────────────────────────────────────────────────────────────

interface DraftViewProps {
  jobData: JobData;
  jobDataMetadata: JobDataMetadata;
  highlightedCard?: string | null;
  onSavingChange?: (saving: boolean) => void;
}

export function DraftView({ jobData, jobDataMetadata, highlightedCard, onSavingChange }: DraftViewProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [localJobData, setLocalJobData] = useState<JobData>(jobData);
  const [currentView, setCurrentView] = useState<'creation' | 'candidate'>('creation');

  // Compact chat
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<CompactMsg[]>([]);
  const [chatTyping, setChatTyping] = useState(false);
  const [glowCardId, setGlowCardId] = useState<string | null>(null);
  const chatInitialized = useRef(false);

  // Notify parent on isSaving changes (simulated auto-save)
  useEffect(() => {
    const interval = setInterval(() => {
      onSavingChange?.(true);
      setTimeout(() => onSavingChange?.(false), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, [onSavingChange]);

  // Auto-open chat once per component mount (800ms delay)
  useEffect(() => {
    const t = setTimeout(() => setChatOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  // ── Quality calculation ───────────────────────────────────────────────────

  const hasJobDetails = !!(localJobData.titulo || localJobData.senioridade);
  const hasRequisition = !!(localJobData.requisicoes?.length) || !!localJobData.requisicao;
  const hasPositions = !!(localJobData.posicoes?.length);
  const requiredCampoIds = CAMPOS_CONFIG.filter(c => c.obrigatorio).map(c => c.id);
  const hasCustomFields = requiredCampoIds.length === 0
    ? !!(localJobData.camposPersonalizados?.some(c => c.valor))
    : requiredCampoIds.every(id =>
        !!(localJobData.camposPersonalizados?.find(c => c.id === id)?.valor?.trim())
      );
  const hasBudget = !!(localJobData.salarioVaga || localJobData.salarioMinimo || localJobData.tiposContratacao?.length);
  const hasLocation = !!(localJobData.localizacao || localJobData.modeloTrabalho || localJobData.cidade);
  const hasStages = !!(localJobData.etapasVaga?.length || localJobData.etapas);
  const hasForm = !!(localJobData.usarFormulario !== undefined || localJobData.questoesFormulario?.length);
  const hasCriterios = !!(localJobData.criteriosAnaliseList?.length || localJobData.criteriosAnalise);

  // IDs that are optional (show as pending in quality bar but never block "Criar vaga")
  const OPTIONAL_CARD_IDS = new Set(['requisicao']);

  const qualityCards = [
    { id: 'detalhes', isCompleted: hasJobDetails },
    { id: 'requisicao', isCompleted: hasRequisition },
    { id: 'posicoes', isCompleted: hasPositions },
    { id: 'camposPersonalizados', isCompleted: hasCustomFields },
    { id: 'orcamento', isCompleted: hasBudget },
    { id: 'localizacao', isCompleted: hasLocation },
    { id: 'etapas', isCompleted: hasStages },
    { id: 'formulario', isCompleted: !!(hasForm || true) },
    { id: 'criterios', isCompleted: !!(hasCriterios || true) },
    { id: 'agente', isCompleted: true },
  ];

  const completedCards = qualityCards.filter(c => c.isCompleted).length;
  const qualityProgress = (completedCards / qualityCards.length) * 100;
  const pendingCount = qualityCards.filter(c => !c.isCompleted).length;
  // Only non-optional pending cards block the "Criar vaga" button
  const blockingPendingCount = qualityCards.filter(c => !c.isCompleted && !OPTIONAL_CARD_IDS.has(c.id)).length;
  const qualityColors = getQualityColors(qualityProgress);

  const CARD_NAMES: Record<string, string> = {
    detalhes: 'Detalhes da vaga', requisicao: 'Requisições',
    posicoes: 'Posições', camposPersonalizados: 'Campos personalizados',
    orcamento: 'Orçamento', localizacao: 'Localização',
    etapas: 'Etapas', formulario: 'Formulário personalizado',
    criterios: 'Critérios para analisar currículos',
  };
  const firstBlockingPending = qualityCards.find(c => !c.isCompleted && !OPTIONAL_CARD_IDS.has(c.id));
  const pendingCardName = firstBlockingPending ? (CARD_NAMES[firstBlockingPending.id] ?? firstBlockingPending.id) : '';

  const isCardCompleted = (id: string) => qualityCards.find(c => c.id === id)?.isCompleted ?? true;

  const effectiveHighlight = highlightedCard ?? glowCardId;

  // ── Chat: init messages when first opened ─────────────────────────────────

  useEffect(() => {
    if (!chatOpen || chatInitialized.current) return;
    chatInitialized.current = true;

    setChatMessages([{
      id: '1', role: 'agent',
      text: 'A gente forma uma bela dupla, ein?! 🎉 Olha o que a gente construiu juntos.',
    }]);
    setChatTyping(true);
    const pct = Math.round(qualityProgress);
    setTimeout(() => {
      setChatTyping(false);
      const msg2 = pendingCount > 0
        ? `Sua vaga está em ${pct}%. O único campo pendente é Campos personalizados — clique no card para ver o que falta preencher.`
        : `Sua vaga está ${pct}% completa! Revise os cards e clique em Criar vaga quando estiver pronto.`;
      setChatMessages(prev => [...prev, { id: '2', role: 'agent', text: msg2 }]);
    }, 1800);
  }, [chatOpen]);

  // ── Chat send ─────────────────────────────────────────────────────────────

  const handleChatSend = (text: string) => {
    setChatMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    setChatTyping(true);
    setTimeout(() => {
      setChatTyping(false);
      const lower = text.toLowerCase();
      let cardId = 'detalhes';
      let cardName = 'Detalhes da vaga';
      if (lower.includes('salário') || lower.includes('salario') || lower.includes('orçamento')) {
        cardId = 'orcamento'; cardName = 'Orçamento';
      } else if (lower.includes('localiz') || lower.includes('modelo')) {
        cardId = 'localizacao'; cardName = 'Localização';
      } else if (lower.includes('etapa') || lower.includes('processo')) {
        cardId = 'etapas'; cardName = 'Etapas';
      } else if (lower.includes('formulário') || lower.includes('formulario') || lower.includes('pergunt')) {
        cardId = 'formulario'; cardName = 'Formulário personalizado';
      } else if (lower.includes('critério') || lower.includes('criterio') || lower.includes('currículo')) {
        cardId = 'criterios'; cardName = 'Critérios para analisar currículos';
      }
      setGlowCardId(cardId);
      setTimeout(() => setGlowCardId(null), 2000);
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'agent',
        text: `Feito! ${cardName} atualizado. ✓`,
      }]);
    }, 1500);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSave = (updatedData: Partial<JobData>) => {
    setLocalJobData(prev => ({ ...prev, ...updatedData }));
    onSavingChange?.(true);
    setTimeout(() => onSavingChange?.(false), 1000);
  };

  const handleCloseSideSheet = () => setSelectedCard(null);

  // Mock data for cards that use static values
  const mockEnviarEmail = 'Sim';
  const mockAssuntoEmail = 'Confirmação de inscrição - {{titulo}}';
  const mockCorpoMensagem = 'Olá! Recebemos sua inscrição para a vaga de {{titulo}}. Em breve entraremos em contato.';
  const mockDivulgarVaga = 'Sim';
  const mockVisibilidade = 'Pública';
  const mockPagina = 'Padrão';
  const mockPlataformas = 'LinkedIn, Indeed, NetVagas';

  // cardFieldConfigs needed only for the generic SideSheet fallback
  const cardFieldConfigs: Record<string, { title: string; icon: React.ReactNode; fields: any[] }> = {
    divulgacao: {
      title: 'Divulgação',
      icon: <Globe className="w-5 h-5" />,
      fields: [
        { key: 'divulgarVaga', label: 'Divulgar a vaga', type: 'select', options: ['Sim', 'Não'] },
        { key: 'quemPodeVerVaga', label: 'Quem pode ver a vaga', type: 'select', options: ['Pública', 'Privada', 'Apenas recrutadores'] },
      ],
    },
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col relative">
      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
        <div className="max-w-6xl mx-auto px-8 py-6 pb-28">

          {/* Quality bar */}
          <div className="bg-white rounded-lg p-5 mb-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Qualidade da vaga
              </span>
              <span className="text-2xl font-bold" style={{ color: qualityColors.text }}>
                {Math.round(qualityProgress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full rounded-full ${qualityColors.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${qualityProgress}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[13px] text-gray-500">
              {pendingCount > 0
                ? 'Vagas acima de 80% contratam 2× mais rápido. Preencha os campos pendentes para chegar lá.'
                : 'Perfeita! Sua vaga está completa e pronta para atrair os melhores talentos.'}
            </p>
            {blockingPendingCount > 0 && (
              <div className="mt-2 flex items-center gap-1.5 text-amber-600 text-[12px]">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{blockingPendingCount} pendência{blockingPendingCount !== 1 ? 's' : ''} — <span className="font-medium">{pendingCardName}</span> possui campos obrigatórios incompletos</span>
              </div>
            )}
          </div>

          {/* Tabs — button group */}
          <div className="inline-flex items-center bg-gray-200 rounded-lg p-0.5 mb-6">
            {(['creation', 'candidate'] as const).map(view => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentView === view
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {view === 'creation' ? 'Rascunho' : 'Visão do candidato'}
              </button>
            ))}
          </div>

          {currentView === 'candidate' ? (
            <CandidateView />
          ) : (
            <>
              {/* ── SOBRE A VAGA ── */}
              <section className="mb-8">
                <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
                  Sobre a vaga
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Detalhes da vaga */}
                  <DraftCard
                    icon={<FileText className="w-5 h-5" />}
                    title="Detalhes da vaga"
                    isCompleted={isCardCompleted('detalhes')}
                    onClick={() => setSelectedCard('detalhes')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'detalhes'}
                  >
                    {hasJobDetails ? (
                      <>
                        {localJobData.titulo && <FieldRow label="Título" value={localJobData.titulo} />}
                        {localJobData.area && <FieldRow label="Área" value={localJobData.area} />}
                        {localJobData.gestor && <FieldRow label="Gestor" value={localJobData.gestor} />}
                        <p className="text-gray-400 italic text-[12px] mt-1">+ 4 campos</p>
                      </>
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhum campo preenchido</p>
                    )}
                  </DraftCard>

                  {/* Campos personalizados */}
                  <DraftCard
                    icon={<Sliders className="w-5 h-5" />}
                    title="Campos personalizados"
                    isCompleted={isCardCompleted('camposPersonalizados')}
                    onClick={() => setSelectedCard('camposPersonalizados')}
                    isHighlighted={effectiveHighlight === 'camposPersonalizados'}
                  >
                    {localJobData.camposPersonalizados?.filter(c => c.valor).length ? (
                      <>
                        {localJobData.camposPersonalizados.filter(c => c.valor).slice(0, 3).map(c => (
                          <FieldRow key={c.id} label={c.nome} value={c.valor} />
                        ))}
                        {localJobData.camposPersonalizados.filter(c => c.valor).length > 3 && (
                          <p className="text-gray-400 italic text-[12px] mt-1">
                            + {localJobData.camposPersonalizados.filter(c => c.valor).length - 3} campos
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhum campo preenchido</p>
                    )}
                  </DraftCard>

                  {/* Posições */}
                  <DraftCard
                    icon={<Users className="w-5 h-5" />}
                    title="Posições"
                    isCompleted={isCardCompleted('posicoes')}
                    onClick={() => setSelectedCard('posicoes')}
                    isHighlighted={effectiveHighlight === 'posicoes'}
                  >
                    {localJobData.posicoes?.length ? (
                      <>
                        {localJobData.posicoes.slice(0, 3).map((p, i) => (
                          <FieldRow
                            key={i}
                            label={p.motivo || `Posição ${i + 1}`}
                            value={`${p.quantidade} vaga${p.quantidade !== 1 ? 's' : ''}`}
                          />
                        ))}
                        <p className="text-gray-500 italic text-[12px] mt-1">
                          Total: {localJobData.posicoes.reduce((s, p) => s + p.quantidade, 0)} posições
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhuma posição cadastrada</p>
                    )}
                  </DraftCard>

                  {/* Orçamento */}
                  <DraftCard
                    icon={<DollarSign className="w-5 h-5" />}
                    title="Orçamento"
                    isCompleted={isCardCompleted('orcamento')}
                    onClick={() => setSelectedCard('orcamento')}
                    hasAutomation
                    automationActive
                    onAutomationClick={() => setSelectedCard('orcamentoAutomacao')}
                    hasInferredData={jobDataMetadata?.salario?.source === 'inferred'}
                    isHighlighted={effectiveHighlight === 'orcamento'}
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
                      </>
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhum campo preenchido</p>
                    )}
                  </DraftCard>

                  {/* Localização */}
                  <DraftCard
                    icon={<MapPin className="w-5 h-5" />}
                    title="Localização"
                    isCompleted={isCardCompleted('localizacao')}
                    onClick={() => setSelectedCard('localizacao')}
                    hasAutomation
                    automationActive
                    onAutomationClick={() => setSelectedCard('localizacaoAutomacao')}
                    hasInferredData={jobDataMetadata?.localizacao?.source === 'inferred'}
                    isHighlighted={effectiveHighlight === 'localizacao'}
                  >
                    {hasLocation ? (
                      <>
                        {localJobData.modeloTrabalho && <FieldRow label="Modelo" value={localJobData.modeloTrabalho} />}
                        {localJobData.localizacao && <FieldRow label="Localização" value={localJobData.localizacao} />}
                        {localJobData.cidade && <FieldRow label="Cidade" value={localJobData.cidade} />}
                      </>
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhum campo preenchido</p>
                    )}
                  </DraftCard>

                  {/* Requisições */}
                  <DraftCard
                    icon={<Clipboard className="w-5 h-5" />}
                    title="Requisições"
                    isCompleted={isCardCompleted('requisicao')}
                    onClick={() => setSelectedCard('requisicao')}
                    isHighlighted={effectiveHighlight === 'requisicao'}
                  >
                    {localJobData.requisicoes?.length ? (
                      localJobData.requisicoes.slice(0, 3).map((r, i) => (
                        <FieldRow key={i} label={`Req. ${i + 1}`} value={getRequisicaoLabel(r)} />
                      ))
                    ) : localJobData.requisicao ? (
                      <FieldRow label="Requisição" value={localJobData.requisicao} />
                    ) : (
                      <p className="text-gray-400 italic text-[12px]">Nenhuma requisição vinculada</p>
                    )}
                  </DraftCard>

                </div>
              </section>

              {/* ── SELEÇÃO E TRIAGEM ── */}
              <section>
                <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
                  Seleção e triagem
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Etapas */}
                  <DraftCard
                    icon={<GitBranch className="w-5 h-5" />}
                    title="Etapas"
                    isCompleted={isCardCompleted('etapas')}
                    onClick={() => setSelectedCard('etapas')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'etapas'}
                  >
                    {(() => {
                      const lista = localJobData.etapasVaga?.length ? localJobData.etapasVaga : ETAPAS_PADRAO;
                      return (
                        <div className="space-y-0.5">
                          {lista.slice(0, 3).map(etapa => (
                            <div key={etapa.id} className="flex items-center gap-2">
                              <span className="text-gray-400 text-[12px]">{etapa.ordem}.</span>
                              <span className="text-gray-900 text-[12px] truncate">{etapa.nome}</span>
                            </div>
                          ))}
                          {lista.length > 3 && (
                            <p className="text-gray-400 italic text-[12px] mt-1">+ {lista.length - 3} etapas</p>
                          )}
                        </div>
                      );
                    })()}
                  </DraftCard>

                  {/* Formulário personalizado */}
                  <DraftCard
                    icon={<FileInput className="w-5 h-5" />}
                    title="Formulário personalizado"
                    isCompleted={isCardCompleted('formulario')}
                    onClick={() => setSelectedCard('formulario')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'formulario'}
                  >
                    {(() => {
                      const lista = localJobData.questoesFormulario?.length ? localJobData.questoesFormulario : QUESTOES_PADRAO;
                      return (
                        <div className="space-y-1">
                          {lista.slice(0, 3).map((q, i) => (
                            <div key={q.id} className="flex items-start gap-1.5">
                              <span className="text-[11px] text-gray-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                              <p className="text-[12px] text-gray-700 line-clamp-1 leading-snug">{q.texto}</p>
                            </div>
                          ))}
                          {lista.length > 3 && (
                            <p className="text-[12px] text-gray-400 italic">+ {lista.length - 3} perguntas</p>
                          )}
                        </div>
                      );
                    })()}
                  </DraftCard>

                  {/* Critérios para analisar currículos */}
                  <DraftCard
                    icon={<Target className="w-5 h-5" />}
                    title="Critérios para analisar currículos"
                    isCompleted={isCardCompleted('criterios')}
                    onClick={() => setSelectedCard('criterios')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'criterios'}
                  >
                    {(() => {
                      const lista = localJobData.criteriosAnaliseList?.length ? localJobData.criteriosAnaliseList : CRITERIOS_PADRAO;
                      return (
                        <div className="space-y-1">
                          {lista.slice(0, 3).map(c => (
                            <div key={c.id} className="flex items-start gap-1.5">
                              <span className="text-gray-400 text-[11px] mt-0.5 flex-shrink-0">•</span>
                              <p className="text-[12px] text-gray-700 line-clamp-1 leading-snug">{c.texto}</p>
                            </div>
                          ))}
                          {lista.length > 3 && (
                            <p className="text-[12px] text-gray-400 italic">+ {lista.length - 3} critérios</p>
                          )}
                        </div>
                      );
                    })()}
                  </DraftCard>

                  {/* Agente na triagem */}
                  <DraftCard
                    icon={<Bot className="w-5 h-5" />}
                    title="Agente na triagem"
                    isCompleted
                    onClick={() => setSelectedCard('agenteTriagem')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'agente'}
                  >
                    {(() => {
                      const cfg = localJobData.agenteTriagemConfig ?? AGENTE_TRIAGEM_PADRAO;
                      return (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Análise salarial</span>
                            <span className={`text-[11px] font-medium ${cfg.limiteSalarial.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
                              {cfg.limiteSalarial.usarNoAgente ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Critérios de currículo</span>
                            <span className={`text-[11px] font-medium ${cfg.criterios.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
                              {cfg.criterios.usarNoAgente ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Formulário</span>
                            <span className={`text-[11px] font-medium ${cfg.formulario.usarNoAgente ? 'text-green-600' : 'text-gray-400'}`}>
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
                        isCompleted
                        onClick={() => setSelectedCard('kitEntrevista')}
                        hasInferredData
                        isHighlighted={effectiveHighlight === 'kitEntrevista'}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Categorias</span>
                            <span className="text-[11px] font-medium text-gray-800">{cats.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Critérios</span>
                            <span className="text-[11px] font-medium text-gray-800">{totalCrits}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-gray-500">Kits de entrevista</span>
                            <span className="text-[11px] font-medium text-gray-800">{kits.length}</span>
                          </div>
                        </div>
                      </DraftCard>
                    );
                  })()}

                  {/* Divulgação */}
                  <DraftCard
                    icon={<Globe className="w-5 h-5" />}
                    title="Divulgação"
                    isCompleted
                    onClick={() => setSelectedCard('divulgacao')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'divulgacao'}
                  >
                    <FieldRow label="Divulgar" value={localJobData.divulgarVaga !== undefined ? (localJobData.divulgarVaga ? 'Sim' : 'Não') : mockDivulgarVaga} />
                    <FieldRow label="Visibilidade" value={localJobData.quemPodeVerVaga ?? mockVisibilidade} />
                    <FieldRow label="Plataformas" value={localJobData.plataformasDivulgacaoList?.filter(p => p.ativa).map(p => p.nome).join(', ') || mockPlataformas} />
                    <p className="text-[12px] text-gray-400 italic mt-1">+ 8 campos</p>
                  </DraftCard>

                  {/* Confirmação de inscrição */}
                  <DraftCard
                    icon={<CheckCircle className="w-5 h-5" />}
                    title="Confirmação de inscrição"
                    isCompleted
                    onClick={() => setSelectedCard('confirmacao')}
                    hasInferredData
                    isHighlighted={effectiveHighlight === 'confirmacao'}
                  >
                    <FieldRow label="Enviar email" value={mockEnviarEmail} />
                    <FieldRow label="Assunto" value={mockAssuntoEmail} />
                    <p className="text-[12px] text-gray-400 italic mt-1">+ 1 campo</p>
                  </DraftCard>

                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* ── Fixed footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 h-16 flex items-center z-10">
        {/* Cancelar — esquerda */}
        <Button variant="ghost" className="text-gray-600 mr-auto">Cancelar</Button>

        {/* Criar vaga — direita */}
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          disabled={blockingPendingCount > 0}
          style={{ opacity: blockingPendingCount > 0 ? 0.4 : 1 }}
        >
          Criar vaga
        </Button>
      </div>

      {/* ── Floating robot button ── */}
      <motion.div
        onClick={() => setChatOpen(v => !v)}
        className="absolute bottom-20 left-8 z-20 cursor-pointer"
        style={{ width: 48, height: 48 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Falar com o Agente InHire"
      >
        <Robot1 />
      </motion.div>

      {/* ── Compact chat panel ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-36 left-8 z-30"
          >
            <CompactChat
              messages={chatMessages}
              isTyping={chatTyping}
              onClose={() => setChatOpen(false)}
              onSend={handleChatSend}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SideSheets ── */}
      {selectedCard === 'requisicao' && (
        <RequisicaoSideSheet
          data={localJobData}
          extraOption={localJobData.requisicao ? { id: localJobData.requisicao, label: localJobData.requisicao } : undefined}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
        />
      )}
      {selectedCard === 'posicoes' && (
        <PosicoesSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'detalhes' && (
        <DetalhesVagaSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'camposPersonalizados' && (
        <CamposPersonalizadosSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {(selectedCard === 'orcamento' || selectedCard === 'orcamentoAutomacao') && (
        <OrcamentoSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} openAutomationDirectly={selectedCard === 'orcamentoAutomacao'} />
      )}
      {(selectedCard === 'localizacao' || selectedCard === 'localizacaoAutomacao') && (
        <LocalizacaoSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} openAutomationDirectly={selectedCard === 'localizacaoAutomacao'} />
      )}
      {selectedCard === 'etapas' && (
        <EtapasSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'divulgacao' && (
        <DivulgacaoSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'formulario' && (
        <FormularioPersonalizadoSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'criterios' && (
        <CriteriosSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'agenteTriagem' && (
        <AgenteTriagemSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'confirmacao' && (
        <ConfirmacaoInscricaoSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard === 'kitEntrevista' && (
        <KitEntrevistaScorecardSideSheet data={localJobData} onClose={handleCloseSideSheet} onSave={handleSave} />
      )}
      {selectedCard && !['detalhes','requisicao','posicoes','camposPersonalizados','orcamento','localizacao','etapas','divulgacao','formulario','criterios','agenteTriagem','confirmacao','kitEntrevista'].includes(selectedCard) && cardFieldConfigs[selectedCard] && (
        <SideSheet
          title={cardFieldConfigs[selectedCard].title}
          icon={cardFieldConfigs[selectedCard].icon}
          onClose={handleCloseSideSheet}
          onSave={handleSave}
          fields={cardFieldConfigs[selectedCard].fields}
          data={localJobData}
          isSaving={false}
        />
      )}
    </div>
  );
}
