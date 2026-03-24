import { Button } from "./ui/button";
import { JobData, JobDataMetadata, Posicao } from "../types/job";
import { JDAnalysisResult } from "../types/jdAnalysis";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Usuário logado (mock)
const CURRENT_USER = "Augusto";

interface InfoPanelProps {
  jobData: JobData;
  metadata?: JobDataMetadata;
  jdAnalysis?: JDAnalysisResult | null;
  onCreateDraft?: () => void;
  processingStep?: string | null;
  completedSteps?: string[];
  hasProcessingCompleted?: boolean;
  onDraftButtonHover?: (hovering: boolean) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  onOpenRecursos?: () => void;
}

// ── Derived value helpers ─────────────────────────────────────────────────────

const deriveFaixaSalarial = (jobData: JobData): string => {
  const { salarioMinimo, salarioMaximo, tipoContrato } = jobData;
  if (!salarioMinimo && !salarioMaximo) return "";
  const range = [salarioMinimo, salarioMaximo].filter(Boolean).join(" – ");
  return tipoContrato ? `${range} (${tipoContrato})` : range;
};

const deriveCamposPersonalizados = (jobData: JobData): string => {
  const fromArray = jobData.camposPersonalizados?.filter(c => c.valor);
  if (fromArray && fromArray.length > 0) {
    return fromArray.map(c => `${c.nome}: ${c.valor}`).join(' · ');
  }
  const parts: string[] = [];
  if (jobData.projeto)     parts.push(`Projeto: ${jobData.projeto}`);
  if (jobData.time)        parts.push(`Time: ${jobData.time}`);
  if (jobData.squad)       parts.push(`Squad: ${jobData.squad}`);
  if (jobData.centroCusto) parts.push(`CC: ${jobData.centroCusto}`);
  if (jobData.bu)          parts.push(`BU: ${jobData.bu}`);
  return parts.join(' · ');
};

const formatPosicoes = (posicoes: Posicao[]): string => {
  if (!posicoes || posicoes.length === 0) return "";
  const total = posicoes.reduce((sum, p) => sum + (p.quantidade || 1), 0);
  const label = total === 1 ? "1 posição" : `${total} posições`;
  const motivos = posicoes.map((p) => `${p.quantidade}x ${p.motivo}`).join(", ");
  return `${label} — ${motivos}`;
};

const truncate = (str: string, max = 80) =>
  str.length > max ? str.slice(0, max).trimEnd() + "…" : str;

// ── Field descriptor ──────────────────────────────────────────────────────────

interface FieldDescriptor {
  key: string;
  label: string;
  getValue: (d: JobData) => string;
  alwaysFilled?: boolean;
}

// ── Quality color helper ──────────────────────────────────────────────────────

function qualityColor(score: number): string {
  if (score >= 80) return '#1D9E75';
  if (score >= 50) return '#BA7517';
  return '#E24B4A';
}

function qualityBg(score: number): string {
  if (score >= 80) return '#DCFCE7';
  if (score >= 50) return '#FEF3C7';
  return '#FEE2E2';
}

// ── Component ─────────────────────────────────────────────────────────────────

export function InfoPanel({
  jobData,
  metadata,
  jdAnalysis,
  onCreateDraft,
  processingStep,
  completedSteps = [],
  hasProcessingCompleted = false,
  onDraftButtonHover,
  collapsed = false,
  onToggleCollapsed,
  onOpenRecursos,
}: InfoPanelProps) {

  const bumHappened = !!jdAnalysis;

  const stepToFieldMap: Record<string, string[]> = {
    "Extraindo título":                         ["titulo"],
    "Extraindo informações básicas da vaga":    ["area", "senioridade", "avaliadores", "gestor", "sla", "posicoes", "notasInternas"],
    "Extraindo descrição":                      ["descricao"],
    "Identificando recrutador responsável":     ["recrutador"],
    "Sugerindo faixa salarial":                 ["faixaSalarial"],
  };

  const fields: FieldDescriptor[] = [
    { key: "titulo", label: "Título", getValue: (d) => d.titulo ?? "" },
    {
      key: "descricao",
      label: "Descrição",
      getValue: (d) =>
        d.descricao
          ? truncate(d.descricao.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
          : "",
    },
    {
      key: "recrutador",
      label: "Recrutador responsável",
      getValue: (d) => d.recrutador ?? CURRENT_USER,
      alwaysFilled: true,
    },
    {
      key: "avaliadores",
      label: "Avaliadores responsáveis",
      getValue: (d) =>
        Array.isArray(d.avaliadores) && d.avaliadores.length > 0
          ? d.avaliadores.join(", ")
          : "",
    },
    { key: "gestor", label: "Gestor responsável", getValue: (d) => d.gestor ?? "" },
    { key: "faixaSalarial", label: "Faixa salarial", getValue: (d) => deriveFaixaSalarial(d) },
    { key: "localizacao", label: "Localização", getValue: (d) => d.localizacao ?? "" },
    { key: "modeloTrabalho", label: "Modelo de trabalho", getValue: (d) => d.modeloTrabalho ?? "" },
    { key: "camposPersonalizados", label: "Campos personalizados", getValue: (d) => deriveCamposPersonalizados(d) },
    {
      key: "requisicao",
      label: "Requisição",
      getValue: (d) => {
        if (d.requisicoes && d.requisicoes.length > 0) return d.requisicoes.join(', ');
        return d.requisicao ?? '';
      },
    },
  ];

  const filledCount = fields.filter(
    (f) => f.alwaysFilled || f.getValue(jobData) !== ""
  ).length;

  // Quality score: 70% fields + 30% BUM bonus
  const qualityScore = Math.round((filledCount / fields.length) * 70 + (bumHappened ? 30 : 0));
  const qColor = qualityColor(qualityScore);
  const qBg = qualityBg(qualityScore);

  // Resource count
  const resourceCount = bumHappened ? 4 : 0;

  // ── Collapsed state ───────────────────────────────────────────────────────

  if (collapsed) {
    return (
      <motion.div
        initial={{ opacity: 1, width: 56 }}
        animate={{ opacity: 1, width: 56 }}
        exit={{ opacity: 0, width: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-r border-gray-200 flex flex-col items-center overflow-hidden h-full flex-shrink-0"
        style={{ minWidth: 56 }}
      >
        {/* Quality % */}
        {bumHappened && (
          <div className="mt-6 flex flex-col items-center gap-1">
            <span
              className="text-sm leading-none"
              style={{ fontWeight: 800, color: qColor }}
            >
              {qualityScore}%
            </span>
          </div>
        )}

        {/* Resources icon */}
        {bumHappened && (
          <button
            onClick={onOpenRecursos}
            title="Recursos configurados"
            className="mt-4 w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#EEEDFE' }}
          >
            <span className="text-purple-500 text-base leading-none">✦</span>
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Expand button — chevron points RIGHT (expand toward center) */}
        <button
          onClick={onToggleCollapsed}
          className="mb-6 w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Expandir painel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // ── Expanded state ────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 1, width: 320 }}
      animate={{ opacity: 1, width: 320 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-r border-gray-200 flex flex-col overflow-hidden h-full flex-shrink-0"
      style={{ minWidth: 0 }}
    >
      <div className="p-5 flex-1 overflow-y-auto">

        {/* ── AFTER BUM: quality + resources button ── */}
        {bumHappened && (
          <div className="mb-5">
            {/* Quality row */}
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-gray-500">Qualidade da vaga</span>
              <span
                className="text-sm"
                style={{ fontWeight: 800, color: qColor }}
              >
                {qualityScore}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ backgroundColor: '#F3F4F6' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${qualityScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ backgroundColor: qColor }}
              />
            </div>

            {/* Hint */}
            <p className="text-[11px] leading-snug mb-4" style={{ color: qColor }}>
              Vagas acima de 80% contratam 2× mais rápido.
            </p>

            {/* Resources button */}
            <button
              onClick={onOpenRecursos}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-colors hover:bg-purple-50 text-left"
              style={{ backgroundColor: '#EEEDFE', borderColor: '#DDD8F8' }}
            >
              <span className="text-purple-500 text-base leading-none flex-shrink-0">✦</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-purple-800" style={{ fontWeight: 600 }}>
                  Recursos configurados
                </p>
                <p className="text-[11px] text-purple-500 truncate">
                  {resourceCount} recursos prontos →
                </p>
              </div>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 mt-5 mb-4" />
          </div>
        )}

        {/* Fields header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase tracking-wide text-gray-500" style={{ fontWeight: 600 }}>
            Informações obrigatórias
          </h2>
          <span className="text-xs text-gray-400">
            {filledCount}/{fields.length}
          </span>
        </div>

        {/* Fields list */}
        <div className="space-y-3">
          {fields.map((field) => {
            const displayValue = field.getValue(jobData);
            const isFilled = displayValue !== "";
            const alwaysFilled = !!field.alwaysFilled;

            const isProcessingField = !!(
              processingStep &&
              stepToFieldMap[processingStep]?.includes(field.key)
            );

            const showCheck = (isFilled || alwaysFilled) && !isProcessingField;

            return (
              <div key={field.key} className="flex items-start gap-2.5">
                {/* Status indicator */}
                <div className="mt-[3px] flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {showCheck ? (
                    <motion.svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 15 }}
                    >
                      <circle cx="7.5" cy="7.5" r="7" fill="#DCFCE7" />
                      <path
                        d="M4.5 7.5L6.5 9.5L10.5 5.5"
                        stroke="#16A34A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : isProcessingField ? (
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full border-2 border-purple-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        borderColor: ["#a855f7", "#d8b4fe", "#a855f7"],
                      }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs leading-snug ${
                    showCheck
                      ? 'text-gray-800'
                      : isProcessingField
                      ? 'text-purple-600'
                      : 'text-gray-400'
                  }`}>
                    <span style={showCheck ? { fontWeight: 500 } : {}}>
                      {field.label}
                    </span>
                    {showCheck && displayValue && (
                      <span className="text-gray-500" style={{ fontWeight: 400 }}>
                        {': '}
                        <span className="text-gray-700">{displayValue}</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pt-3 pb-4 border-t border-gray-100 flex items-center gap-2">
        <Button
          className={`flex-1 text-white text-[13px] ${
            hasProcessingCompleted
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          size="lg"
          onClick={onCreateDraft}
          disabled={false}
          onMouseEnter={() => onDraftButtonHover?.(true)}
          onMouseLeave={() => onDraftButtonHover?.(false)}
        >
          Criar rascunho
        </Button>

        {/* Collapse button — chevron points LEFT (collapse away from center) */}
        <button
          onClick={onToggleCollapsed}
          className="w-9 h-9 flex-shrink-0 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Recolher painel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}