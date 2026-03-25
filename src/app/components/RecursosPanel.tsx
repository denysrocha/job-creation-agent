import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, MessageSquare, BookOpen, Bot, Zap, GitBranch, X, ChevronDown, ChevronUp } from 'lucide-react';
import { JDAnalysisResult } from '../types/jdAnalysis';
import {
  CurriculoDetalhe,
  FormularioDetalhe,
  KitDetalhe,
  AgenteTriagemDetalhe,
  AutomacoesDetalhe,
  EtapasDetalhe,
} from './DistribuicaoPainel';
import { ETAPAS_PADRAO } from '../types/job';

interface RecursosPanelProps {
  analysis: JDAnalysisResult;
  titulo?: string;
  onClose: () => void;
  expandedKey?: string | null;
}

type ResourceKey = 'curriculo' | 'formulario' | 'kit' | 'agente' | 'automacoes' | 'etapas';

export function RecursosPanel({ analysis, titulo, onClose, expandedKey }: RecursosPanelProps) {
  const [expanded, setExpanded] = useState<ResourceKey | null>(null);
  const { distribuicao_resumo } = analysis;

  const toggle = (key: ResourceKey) => setExpanded(prev => prev === key ? null : key);

  useEffect(() => {
    if (expandedKey) setExpanded(expandedKey as ResourceKey);
  }, [expandedKey]);

  const agenteCount =
    (distribuicao_resumo.criterios_curriculo > 0 ? 1 : 0) +
    (distribuicao_resumo.agente_triagem.formulario_com_gabarito > 0 ? 1 : 0) +
    (distribuicao_resumo.agente_triagem.analise_salarial ? 1 : 0);

  const resources: {
    key: ResourceKey;
    icon: React.ReactNode;
    count: number;
    label: string;
    desc: string;
    color: string;
    bg: string;
    borderActive: string;
    detail: React.ReactNode;
  }[] = [
    {
      key: 'curriculo',
      icon: <FileText className="w-4 h-4" />,
      count: distribuicao_resumo.criterios_curriculo,
      label: 'Critérios de currículo',
      desc: 'Análise automática de currículos assim que chegarem.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderActive: 'border-blue-200 bg-blue-50/60',
      detail: <CurriculoDetalhe items={analysis.criterios_curriculo} />,
    },
    {
      key: 'formulario',
      icon: <MessageSquare className="w-4 h-4" />,
      count: distribuicao_resumo.perguntas_formulario,
      label: 'Perguntas no formulário',
      desc: 'Triagem de candidatos no momento da inscrição.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      borderActive: 'border-purple-200 bg-purple-50/60',
      detail: <FormularioDetalhe items={analysis.formulario} />,
    },
    {
      key: 'kit',
      icon: <BookOpen className="w-4 h-4" />,
      count: distribuicao_resumo.habilidades_scorecard,
      label: 'Kits e scorecards',
      desc: 'Roteiro e critérios de avaliação por etapa.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderActive: 'border-amber-200 bg-amber-50/60',
      detail: (
        <KitDetalhe
          kitEtapas={analysis.kit_entrevista}
          scorecards={analysis.scorecard}
        />
      ),
    },
    {
      key: 'agente',
      icon: <Bot className="w-4 h-4" />,
      count: agenteCount,
      label: 'Agente na triagem',
      desc: 'Classificação automática por fit técnico e cultural.',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      borderActive: 'border-teal-200 bg-teal-50/60',
      detail: (
        <AgenteTriagemDetalhe
          criteriosCurriculo={analysis.criterios_curriculo}
          formulario={analysis.formulario}
          analise_salarial={distribuicao_resumo.agente_triagem.analise_salarial}
        />
      ),
    },
    {
      key: 'automacoes',
      icon: <Zap className="w-4 h-4" />,
      count: analysis.automacoes.filter(a => a.tipo === 'salario' || a.tipo === 'modelo_trabalho').length,
      label: 'Automações de reprovação',
      desc: 'Reprovação automática por salário e modelo de trabalho.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      borderActive: 'border-rose-200 bg-rose-50/60',
      detail: <AutomacoesDetalhe automacoes={analysis.automacoes} />,
    },
    {
      key: 'etapas',
      icon: <GitBranch className="w-4 h-4" />,
      count: ETAPAS_PADRAO.length,
      label: 'Etapas do processo',
      desc: 'Sequência sugerida para o processo seletivo.',
      color: 'text-green-600',
      bg: 'bg-green-50',
      borderActive: 'border-green-200 bg-green-50/60',
      detail: <EtapasDetalhe />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 400 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white border-l border-gray-200 flex flex-col overflow-hidden h-full flex-shrink-0"
      style={{ minWidth: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-purple-500 text-lg leading-none">✦</span>
            <h2 className="text-base text-gray-800" style={{ fontWeight: 600 }}>
              Recursos configurados
            </h2>
          </div>
          <p className="text-sm text-gray-400 pl-6">Pré-visualização — editável na próxima etapa</p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Resource cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {resources.map(r => {
          const isOpen = expanded === r.key;
          return (
            <div
              key={r.key}
              className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? r.borderActive : 'border-gray-200 bg-white'}`}
            >
              {/* Card header — always visible */}
              <button
                onClick={() => toggle(r.key)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/60 transition-colors"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${r.bg} ${r.color}`}>
                  {r.icon}
                </div>

                {/* Count + label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xl leading-none ${r.color}`} style={{ fontWeight: 800 }}>
                      {r.count}
                    </span>
                    <span className="text-sm text-gray-800 truncate">{r.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{r.desc}</p>
                </div>

                {/* Chevron */}
                <div className={`flex-shrink-0 ${r.color}`}>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4" />
                    : <ChevronDown className="w-4 h-4" />
                  }
                </div>
              </button>

              {/* Expandable detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                      {r.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Ambiguous note */}
        {distribuicao_resumo.ambiguos_resolvidos > 0 && (
          <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mt-1">
            <span className="text-indigo-400 text-sm leading-none mt-0.5 flex-shrink-0">✦</span>
            <p className="text-xs text-indigo-700 leading-snug">
              <span style={{ fontWeight: 600 }}>
                {distribuicao_resumo.ambiguos_resolvidos} requisito{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} ambíguo{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''}
              </span>{' '}
              identificado{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} e distribuído{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} em múltiplas ferramentas para maior confiabilidade do fit.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}