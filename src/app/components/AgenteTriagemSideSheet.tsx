import {
  X, Sparkles, CheckCircle, ChevronDown, ChevronUp,
  Info, AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  JobData, AgenteTriagemConfig, AGENTE_TRIAGEM_PADRAO,
  CRITERIOS_PADRAO, QUESTOES_PADRAO,
} from '../types/job';

/* ── Toggle reutilizável ── */
function Toggle({
  value,
  onChange,
  label,
  labelSide = 'right',
}: {
  value: boolean;
  onChange: () => void;
  label?: string;
  labelSide?: 'left' | 'right';
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {label && labelSide === 'left' && (
        <span className="text-[13px] text-gray-700">{label}</span>
      )}
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none flex-shrink-0 ${value ? 'bg-purple-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
      {label && labelSide === 'right' && (
        <span className="text-[13px] text-gray-700">{label}</span>
      )}
    </label>
  );
}

/* ── Badge "Ativo/Inativo no Agente" ── */
function AgenteBadge({ ativo }: { ativo: boolean }) {
  if (ativo) {
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-green-600 font-medium">
        <CheckCircle className="w-4 h-4" />
        Ativo no Agente
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-gray-400 font-medium">
      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
      Inativo no Agente
    </span>
  );
}

/* ── InfoLink: label + valor em roxo ── */
function InfoLink({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-gray-500">{label}</span>
      <button
        type="button"
        onClick={onClick}
        className="text-[13px] text-purple-600 font-medium text-left hover:underline"
      >
        {value}
      </button>
    </div>
  );
}

/* ── Cabeçalho de seção ── */
function SectionHeader({
  title,
  ativo,
  usarNoAgente,
  onToggle,
}: {
  title: string;
  ativo: boolean;
  usarNoAgente: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
      <div className="flex items-center gap-5">
        <AgenteBadge ativo={ativo && usarNoAgente} />
        <Toggle value={usarNoAgente} onChange={onToggle} label="Usar no Agente" />
      </div>
    </div>
  );
}

/* ── Caixa de limite salarial ── */
function SalaryBox({
  label,
  sublabel,
  direction,
  value,
  onChange,
}: {
  label: string;
  sublabel: string;
  direction: 'menor' | 'maior';
  value: string;
  onChange: (v: string) => void;
}) {
  const Icon = direction === 'menor' ? ChevronDown : ChevronUp;
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0 max-w-[200px]">
      {/* Label box */}
      <div className="bg-gray-100 rounded-lg px-4 py-3">
        <p className="text-[11px] text-gray-500">{label}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[13px] text-purple-600 font-medium">{sublabel}</span>
          <Icon className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
        </div>
      </div>
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="R$ 0,00"
        className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}

/* ════ PROPS ════ */
interface AgenteTriagemSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function AgenteTriagemSideSheet({ data, onClose, onSave }: AgenteTriagemSideSheetProps) {
  const [config, setConfig] = useState<AgenteTriagemConfig>(
    data.agenteTriagemConfig ?? { ...AGENTE_TRIAGEM_PADRAO }
  );
  const [bannerDismissed, setBannerDismissed] = useState(false);

  /* ── helpers de patch ── */
  const patchLimite = (patch: Partial<typeof config.limiteSalarial>) =>
    setConfig((c) => ({ ...c, limiteSalarial: { ...c.limiteSalarial, ...patch } }));

  const patchCriterios = (patch: Partial<typeof config.criterios>) =>
    setConfig((c) => ({ ...c, criterios: { ...c.criterios, ...patch } }));

  const patchFormulario = (patch: Partial<typeof config.formulario>) =>
    setConfig((c) => ({ ...c, formulario: { ...c.formulario, ...patch } }));

  /* ── dados computados de outros cards ── */
  const salarioVaga = data.salarioVaga ?? 'R$ 10.000';
  const pedirPretensao = data.pedirPretensaoSalarial !== false ? 'Sim' : 'Não';
  const tornarObrigatoria = data.pretensaoSalarialObrigatoria !== false ? 'Sim' : 'Não';

  const numCriterios = (data.criteriosAnaliseList?.length ?? CRITERIOS_PADRAO.length);
  const pedirCurriculo = config.criterios.pedirCurriculo ? 'Sim' : 'Não';
  const curriculoObrigatorio = config.criterios.curriculoObrigatorio ? 'Sim' : 'Não';

  const questoes = data.questoesFormulario?.length ? data.questoesFormulario : QUESTOES_PADRAO;
  const numQuestoes = questoes.length;
  const numQuestoesComResposta = questoes.filter((q) => q.opcoes.some((o) => o.correta)).length;
  const mostrarFormulario = data.usarFormulario !== false ? 'Ativa' : 'Inativa';
  const correcaoAutomatica = config.formulario.correcaoAutomatica ? 'Ativa' : 'Inativa';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ agenteTriagemConfig: config });
    onClose();
  };

  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />

        {/* Painel */}
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[900px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[17px] font-semibold text-gray-900">
                  Configurações do Agente de triagem
                </h2>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Agente de triagem
                </span>
              </div>
              <p className="text-[12px] text-gray-500 mt-1">
                Revise os itens que o Agente utiliza para calcular o fit do talento com a vaga
              </p>
            </div>

            {/* Toggle global + fechar */}
            <div className="flex items-center gap-4">
              <Toggle
                value={config.usarAgente}
                onChange={() => setConfig((c) => ({ ...c, usarAgente: !c.usarAgente }))}
                label="Usar Agente na triagem"
              />
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* ── Corpo ── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

              {/* Banner info (azul, dismissível) */}
              <AnimatePresence>
                {!bannerDismissed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 px-5 py-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-blue-800">
                          <strong>O agente classifica automaticamente os talentos na etapa Inscritos, considerando:</strong>{' '}
                          <span className="font-semibold">Salário + Currículo + Formulário = Fit do talento na vaga.</span>
                        </p>
                        <p className="text-[12px] text-blue-600 mt-1">
                          Ele avalia cada talento considerando: Salário + Currículo + Formulário = Fit do talento na vaga
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBannerDismissed(true)}
                        className="text-blue-400 hover:text-blue-600 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── SEÇÃO 1: Limites de análise salarial ── */}
              <div className={`border border-gray-200 rounded-xl px-6 pt-5 pb-6 transition-opacity ${!config.usarAgente ? 'opacity-50 pointer-events-none' : ''}`}>
                <SectionHeader
                  title="Limites de análise salarial"
                  ativo={config.usarAgente}
                  usarNoAgente={config.limiteSalarial.usarNoAgente}
                  onToggle={() => patchLimite({ usarNoAgente: !config.limiteSalarial.usarNoAgente })}
                />

                <div className="flex items-start gap-8">
                  {/* Caixas de salário min/max */}
                  <div className="flex gap-4">
                    <SalaryBox
                      label="Perde ponto se"
                      sublabel="Salário MENOR que:"
                      direction="menor"
                      value={config.limiteSalarial.salarioMinimo ?? ''}
                      onChange={(v) => patchLimite({ salarioMinimo: v })}
                    />
                    <SalaryBox
                      label="Perde ponto se"
                      sublabel="Salário MAIOR que:"
                      direction="maior"
                      value={config.limiteSalarial.salarioMaximo ?? ''}
                      onChange={(v) => patchLimite({ salarioMaximo: v })}
                    />
                  </div>

                  {/* Info links laterais */}
                  <div className="flex gap-8 pt-2 flex-wrap">
                    <InfoLink label="Salário da vaga:" value={salarioVaga} />
                    <InfoLink label="Pedir pretensão salarial:" value={pedirPretensao} />
                    <InfoLink label="Tornar pretensão salarial obrigatória:" value={tornarObrigatoria} />
                  </div>
                </div>

                {/* Nota de rodapé */}
                <div className="flex items-center gap-1.5 mt-4">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <p className="text-[11px] text-gray-500 italic">
                    Se não houver limites definidos, o Agente usará ±20% do salário da vaga como faixa de cálculo.
                  </p>
                </div>
              </div>

              {/* ── SEÇÃO 2: Critérios para analisar os currículos ── */}
              <div className={`border border-gray-200 rounded-xl px-6 pt-5 pb-6 transition-opacity ${!config.usarAgente ? 'opacity-50 pointer-events-none' : ''}`}>
                <SectionHeader
                  title="Critérios para analisar os currículos"
                  ativo={config.usarAgente}
                  usarNoAgente={config.criterios.usarNoAgente}
                  onToggle={() => patchCriterios({ usarNoAgente: !config.criterios.usarNoAgente })}
                />

                <div className="flex items-center gap-8 flex-wrap">
                  <InfoLink label="Critérios:" value={String(numCriterios)} />
                  <InfoLink
                    label="Pedir currículo:"
                    value={pedirCurriculo}
                    onClick={() => patchCriterios({ pedirCurriculo: !config.criterios.pedirCurriculo })}
                  />
                  <InfoLink
                    label="Tornar currículo obrigatório:"
                    value={curriculoObrigatorio}
                    onClick={() => patchCriterios({ curriculoObrigatorio: !config.criterios.curriculoObrigatorio })}
                  />
                </div>
              </div>

              {/* ── SEÇÃO 3: Formulário personalizado ── */}
              <div className={`border border-gray-200 rounded-xl px-6 pt-5 pb-6 transition-opacity ${!config.usarAgente ? 'opacity-50 pointer-events-none' : ''}`}>
                <SectionHeader
                  title="Formulário personalizado"
                  ativo={config.usarAgente}
                  usarNoAgente={config.formulario.usarNoAgente}
                  onToggle={() => patchFormulario({ usarNoAgente: !config.formulario.usarNoAgente })}
                />

                <div className="flex items-center gap-8 flex-wrap">
                  <InfoLink label="Mostrar formulário para o talento:" value={mostrarFormulario} />
                  <InfoLink label="Questões:" value={String(numQuestoes)} />
                  <InfoLink
                    label="Correção automática:"
                    value={correcaoAutomatica}
                    onClick={() => patchFormulario({ correcaoAutomatica: !config.formulario.correcaoAutomatica })}
                  />
                  <InfoLink label="Questões com resposta certa:" value={String(numQuestoesComResposta)} />
                </div>
              </div>

            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white flex-shrink-0">
              <button
                type="button" onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-[13px] text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md text-[13px] hover:bg-purple-700 transition-colors font-medium"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
