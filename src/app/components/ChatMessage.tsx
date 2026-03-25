import { Button } from "./ui/button";
import { ProcessingSteps, ProcessingSummary } from "./ProcessingSteps";
import { DoubleFieldsInput } from "./DoubleFieldsInput";
import { PosicoesInput } from "./PosicoesInput";
import { FaixaSalarialForm } from "./FaixaSalarialForm";
import { LocalizacaoForm } from "./LocalizacaoForm";
import { AvaliadoresForm } from "./AvaliadoresForm";
import { CamposPersonalizadosForm } from "./CamposPersonalizadosForm";
import { QuestoesEstruturaisForm } from "./QuestoesEstruturaisForm";
import { CamposFaltantesForm } from "./CamposFaltantesForm";
import { RobotPresence } from "./RobotPresence";
import type { RobotState } from "./RobotPresence";
import { ChatMessage as ChatMessageType } from "../types/job";
import { Check, AlertCircle, Settings2, Search, ChevronDown, Play, ArrowRight, FileText, MessageSquare, BookOpen, Bot, Zap, GitBranch } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionClick?: (value: string) => void;
  onToggleProcessing?: (messageId: string) => void;
  onStepChange?: (step: string) => void;
  showRobot?: boolean;
  robotState?: RobotState;
  onOpenRecursos?: (key?: string) => void;
}

// Função para renderizar texto com markdown básico (negrito + bullet points)
function renderBoldParts(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-b${i}`} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderMessageContent(content: string): React.ReactNode[] {
  const processedContent = content.replace(':hand:', '👋');
  const lines = processedContent.split('\n');
  const result: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (i > 0) result.push('\n');
    if (line.startsWith('* ')) {
      result.push('• ');
      result.push(...renderBoldParts(line.slice(2), `bullet-${i}`));
    } else {
      result.push(...renderBoldParts(line, `line-${i}`));
    }
  });

  return result;
}

// ─── JD processing steps ──────────────────────────────────────────────────────
export const JD_PROCESSING_STEPS = [
  "Identificando requisitos técnicos e comportamentais...",
  "Classificando o que é verificável no currículo...",
  "Identificando o que o currículo raramente detalha...",
  "Montando perguntas para o formulário de inscrição...",
  "Definindo habilidades para avaliação nas entrevistas...",
  "Gerando roteiro de entrevista por etapa...",
  "Ajustando critérios para evitar redundâncias...",
  "Distribuição concluída.",
];

export const FIRST_ROUND_STEPS = [
  "Lendo mensagem...",
  "Extraindo título e descrição...",
  "Identificando senioridade...",
];

export const REQUISITION_ROUND2_STEPS = [
  "Preenchendo modelo de contratação",
  "Preenchendo localização",
  "Preenchendo modelo de trabalho",
];

// Static waveform bars (used in audio bubble)
const WAVEFORM_BARS = [3,7,13,20,28,34,24,18,30,40,34,22,14,8,20,32,40,26,14,10,22,34,38,28,18,24,36,30,18,12];

function AudioWaveformBars({ color = 'rgba(255,255,255,0.7)' }: { color?: string }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height: 24 }}>
      {WAVEFORM_BARS.map((h, i) => (
        <div
          key={i}
          style={{ width: 2, height: `${(h / 42) * 24}px`, backgroundColor: color, borderRadius: 1, flexShrink: 0 }}
        />
      ))}
    </div>
  );
}

// ── Confirmação de extração round 2 ──────────────────────────────────────────

export function ConfirmacaoRound2Form({
  initial,
  onSubmit,
}: {
  initial: {
    tipoContrato: string;
    pais: string;
    estado: string;
    cidade: string;
    modeloTrabalho: string;
    salarioMinimo?: string;
    salarioMaximo?: string;
  };
  onSubmit?: (data: {
    tipoContrato: string;
    localizacao: string;
    modeloTrabalho: string;
    salarioMinimo?: string;
    salarioMaximo?: string;
  }) => void;
}) {
  const [tipoContrato, setTipoContrato] = useState(initial.tipoContrato);
  const [pais, setPais] = useState(initial.pais);
  const [estado, setEstado] = useState(initial.estado);
  const [cidade, setCidade] = useState(initial.cidade);
  const [modeloTrabalho, setModeloTrabalho] = useState(initial.modeloTrabalho);
  const [salarioMinimo, setSalarioMinimo] = useState(initial.salarioMinimo ?? '');
  const [salarioMaximo, setSalarioMaximo] = useState(initial.salarioMaximo ?? '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    const localizacao = [cidade, estado, pais].filter(Boolean).join(', ');
    onSubmit?.({ tipoContrato, localizacao, modeloTrabalho, salarioMinimo, salarioMaximo });
  };

  const modeloOpcoes = ['Presencial', 'Híbrido', 'Remoto'];
  const inputCls = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500";

  return (
    <div className="space-y-3">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Confirme os dados</p>

        {/* Salário */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Salário da vaga</label>
            <input type="text" value={salarioMinimo} onChange={e => setSalarioMinimo(e.target.value)} disabled={saved} placeholder="R$ 10.000" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Salário máximo</label>
            <input type="text" value={salarioMaximo} onChange={e => setSalarioMaximo(e.target.value)} disabled={saved} placeholder="R$ 15.000" className={inputCls} />
          </div>
        </div>

        {/* Modelo de contratação */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Modelo de contratação</label>
          <input type="text" value={tipoContrato} onChange={e => setTipoContrato(e.target.value)} disabled={saved} className={inputCls} />
        </div>

        {/* Localização */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">País</label>
            <input type="text" value={pais} onChange={e => setPais(e.target.value)} disabled={saved} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Estado</label>
            <input type="text" value={estado} onChange={e => setEstado(e.target.value)} disabled={saved} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Cidade</label>
            <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} disabled={saved} className={inputCls} />
          </div>
        </div>

        {/* Modelo de trabalho */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Modelo de trabalho</label>
          <div className="flex gap-0 rounded-lg overflow-hidden border border-gray-300">
            {modeloOpcoes.map(opt => (
              <button
                key={opt}
                type="button"
                disabled={saved}
                onClick={() => setModeloTrabalho(opt)}
                className={`flex-1 py-2 text-sm transition-colors ${
                  modeloTrabalho === opt
                    ? 'bg-purple-600 text-white font-medium'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } ${saved ? 'cursor-default' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {!saved ? (
          <button type="button" onClick={handleSave} className="w-full py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium">
            Confirmar
          </button>
        ) : (
          <p className="text-xs text-green-600 font-medium text-center">✓ Dados confirmados</p>
        )}
    </div>
  );
}

export function ChatMessage({ message, onOptionClick, onToggleProcessing, onStepChange, showRobot, robotState, onOpenRecursos }: ChatMessageProps) {
  const isAgent = message.type === 'agent';
  const [locationData, setLocationData] = useState({ pais: '', estado: '', cidade: '' });
  const [questoesExpanded, setQuestoesExpanded] = useState(false);
  const [camposFaltantesExpanded, setCamposFaltantesExpanded] = useState(message.camposFaltantesAutoExpand ?? false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Audio user message — render separately ─────────────────────────────────
  if (message.isAudioMessage) {
    return (
      <div className="flex justify-end mb-6">
        <div className="ml-auto max-w-sm">
          {/* Dark audio bubble */}
          <div className="px-4 py-3 bg-gray-900 rounded-2xl">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Play className="w-3.5 h-3.5 text-white" fill="white" />
              </button>
              <div className="flex-1">
                <AudioWaveformBars />
              </div>
              <span className="text-xs text-white/50 tabular-nums flex-shrink-0">{message.audioDuration}</span>
            </div>
          </div>
          {/* Transcription */}
          {message.transcription && (
            <p className="mt-2 text-xs text-gray-400 italic leading-relaxed px-1">
              Transcrição: {message.transcription}
            </p>
          )}
        </div>
      </div>
    );
  }

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.onLocationSubmit && (locationData.pais || locationData.estado || locationData.cidade)) {
      const locationString = [locationData.cidade, locationData.estado, locationData.pais]
        .filter(Boolean)
        .join(', ');
      message.onLocationSubmit(locationData.pais, locationData.estado, locationData.cidade);
      if (message.onSubmit) {
        message.onSubmit(locationString);
      }
    }
  };

  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-6 overflow-visible`}>
      <div className={`max-w-3xl ${isAgent ? '' : 'ml-auto'} overflow-visible`}>
        <div className="flex items-start gap-3 overflow-visible">
          {/* Robot beside agent message when processing */}
          {isAgent && showRobot && (
            <div className="flex-shrink-0 mt-1">
              <RobotPresence state="idle" size={40} />
            </div>
          )}

          <div className={isAgent ? 'pt-[3px]' : 'px-6 py-3 bg-gray-100 rounded-2xl'}>
            {message.iconExplanation ? (
              <div className="space-y-3">
                {message.iconExplanation.completedIcon && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="whitespace-pre-wrap flex-1">
                      {message.content.split('\n')[0]}
                    </p>
                  </div>
                )}
                {message.iconExplanation.pendingIcon && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="whitespace-pre-wrap flex-1">
                      {message.content.split('\n')[1]}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              message.content && <p className="whitespace-pre-wrap">{renderMessageContent(message.content)}</p>
            )}

            {/* Template link (secundário) */}
            {message.hasTemplateLink && (
              <div className="mt-3">
                <button
                  onClick={() => onOptionClick?.('use_template')}
                  className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors italic"
                >
                  Prefiro usar um template de descrição
                </button>
              </div>
            )}

            {message.isProcessing && message.onProcessingComplete && (
              <ProcessingSteps
                onComplete={message.onProcessingComplete}
                onStepChange={onStepChange}
                customSteps={(message as any).customProcessingSteps}
                duration={(message as any).customProcessingDuration}
              />
            )}

            {message.processingSummary && (
              <ProcessingSummary
                steps={message.processingSummary.steps}
                isExpanded={message.processingSummary.isExpanded}
                onToggle={() => onToggleProcessing?.(message.id)}
              />
            )}

            {/* Painel de distribuição JD — replaced by resource chips */}
            {message.distribuicaoPainel && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Critérios de currículo', icon: <FileText className="w-3.5 h-3.5" />, key: 'curriculo' },
                    { label: 'Formulário', icon: <MessageSquare className="w-3.5 h-3.5" />, key: 'formulario' },
                    { label: 'Kits e scorecards', icon: <BookOpen className="w-3.5 h-3.5" />, key: 'kit' },
                    { label: 'Agente na triagem', icon: <Bot className="w-3.5 h-3.5" />, key: 'agente' },
                    { label: 'Automações de reprovação', icon: <Zap className="w-3.5 h-3.5" />, key: 'automacoes' },
                    { label: 'Etapas do processo', icon: <GitBranch className="w-3.5 h-3.5" />, key: 'etapas' },
                  ].map(chip => (
                    <button
                      key={chip.label}
                      onClick={() => onOpenRecursos?.(chip.key)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-purple-200 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 hover:border-purple-300 transition-colors"
                    >
                      {chip.icon}
                      {chip.label}
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Questões estruturais pós-JD */}
            {message.questoesEstruturaisForm && message.onQuestoesEstruturaisSubmit && (
              questoesExpanded ? (
                <div className="mt-3">
                  <QuestoesEstruturaisForm
                    onSubmit={message.onQuestoesEstruturaisSubmit}
                    initialSalMin={message.questoesEstruturaisInitial?.salMin}
                    initialSalMax={message.questoesEstruturaisInitial?.salMax}
                    initialTipoContrato={message.questoesEstruturaisInitial?.tipoContrato}
                    initialModeloTrabalho={message.questoesEstruturaisInitial?.modeloTrabalho}
                    initialLocalizacao={message.questoesEstruturaisInitial?.localizacao}
                    jaInformado={message.questoesEstruturaisInitial?.jaInformado}
                  />
                </div>
              ) : (
                <div className="mt-3">
                  <button
                    onClick={() => setQuestoesExpanded(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Settings2 className="w-4 h-4" />
                    Completar dados da vaga →
                  </button>
                </div>
              )
            )}

            {/* Draft button inline */}
            {message.hasDraftButton && (
              <div className="mt-4">
                <button
                  onClick={() => onOptionClick?.('go_to_draft')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  Criar rascunho da vaga →
                </button>
              </div>
            )}

            {/* Generic inline action button */}
            {message.inlineActionButton && (
              <div className="mt-4">
                <button
                  onClick={message.inlineActionButton.onClick}
                  className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  {message.inlineActionButton.label}
                </button>
              </div>
            )}

            {message.options && message.options.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {message.options.map((option, index) => (
                  option.secondary ? (
                    <button
                      key={index}
                      onClick={() => onOptionClick?.(option.value)}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-1 py-1"
                    >
                      {option.label}
                    </button>
                  ) : (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
                      onClick={() => onOptionClick?.(option.value)}
                    >
                      {option.label}
                    </Button>
                  )
                ))}
              </div>
            )}

            {message.selectOptions && message.selectOptions.length > 0 && (
              message.searchableSelect ? (
                /* ── Searchable select ── */
                <div className="mt-4" ref={searchRef}>
                  {selectedLabel ? (
                    <div className="flex items-center gap-2 px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-sm text-purple-800">{selectedLabel}</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(v => !v)}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-purple-400 transition-colors text-left"
                      >
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="flex-1 text-sm text-gray-500">
                          {searchQuery || 'Buscar ou selecionar...'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSearchOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isSearchOpen && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                          <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                              <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Pesquisar..."
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div className="max-h-52 overflow-y-auto">
                            {message.selectOptions
                              .filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
                              .map(option => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setSelectedLabel(option.label);
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                    message.onSubmit?.(option.value);
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors border-b border-gray-50 last:border-0"
                                >
                                  {option.label}
                                </button>
                              ))}
                            {message.selectOptions.filter(o =>
                              o.label.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length === 0 && (
                              <p className="px-4 py-3 text-sm text-gray-400 italic">Nenhum resultado encontrado</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* ── List of buttons ── */
                <div className="mt-4 space-y-2">
                  {message.selectOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => message.onSubmit?.(option.value)}
                      className="w-full text-left px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )
            )}

            {message.locationFields && (
              <form onSubmit={handleLocationSubmit} className="mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                    <select
                      value={locationData.pais}
                      onChange={(e) => setLocationData({ ...locationData, pais: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      value={locationData.estado}
                      onChange={(e) => setLocationData({ ...locationData, estado: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                      <option value="RS">RS</option>
                      <option value="SC">SC</option>
                      <option value="PR">PR</option>
                      <option value="BA">BA</option>
                      <option value="PE">PE</option>
                      <option value="CE">CE</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={locationData.cidade}
                      onChange={(e) => setLocationData({ ...locationData, cidade: e.target.value })}
                      placeholder="Ex: São Paulo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                >
                  Confirmar localização
                </button>
              </form>
            )}

            {message.doubleFields && message.onDoubleSubmit && (
              <DoubleFieldsInput
                field1={message.doubleFields.field1}
                field2={message.doubleFields.field2}
                onSubmit={message.onDoubleSubmit}
              />
            )}

            {message.posicoesForm && message.onPosicoesSubmit && (
              <PosicoesInput onSubmit={message.onPosicoesSubmit} />
            )}

            {message.faixaSalarialForm && message.onFaixaSalarialSubmit && (
              <FaixaSalarialForm onSubmit={message.onFaixaSalarialSubmit} />
            )}

            {message.localizacaoForm && message.onLocalizacaoSubmit && (
              <LocalizacaoForm onSubmit={message.onLocalizacaoSubmit} />
            )}

            {message.avaliadoresForm && message.onAvaliadoresSubmit && (
              <AvaliadoresForm onSubmit={message.onAvaliadoresSubmit} />
            )}

            {message.camposPersonalizadosForm && message.onCamposPersonalizadosSubmit && (
              <CamposPersonalizadosForm onSubmit={message.onCamposPersonalizadosSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}