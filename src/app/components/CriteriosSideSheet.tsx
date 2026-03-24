import { X, Sparkles, AlertTriangle, Star, Info, Copy, Trash2, Plus, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData, CriterioAnalise, PesoCriterio, CRITERIOS_PADRAO } from '../types/job';

/* ── mapa de peso ── */
const PESO_CONFIG: Record<PesoCriterio, { label: string; icon: React.FC<any>; descricao: string; iconColor: string }> = {
  essencial: {
    label: 'Essencial',
    icon: AlertTriangle,
    descricao: 'Peso alto - Essencial e obrigatório',
    iconColor: 'text-amber-500',
  },
  importante: {
    label: 'Importante',
    icon: Star,
    descricao: 'Peso médio - Dá vantagem, mas não é essencial',
    iconColor: 'text-gray-400',
  },
  diferencial: {
    label: 'Diferencial',
    icon: Info,
    descricao: 'Peso baixo - Diferencial positivo',
    iconColor: 'text-blue-400',
  },
};

const TEMPLATES = [
  'Template de critérios de análise',
  'Desenvolvedor Fullstack',
  'Gerente de Projetos',
  'Analista de Dados',
  'Designer UX/UI',
  'Analista de RH',
  'Engenheiro de Software',
];

/* ── item individual de critério ── */
function CriterioItem({
  criterio,
  onChange,
  onDuplicate,
  onDelete,
}: {
  criterio: CriterioAnalise;
  onChange: (patch: Partial<CriterioAnalise>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const pesoConfig = PESO_CONFIG[criterio.peso];
  const PesoIcon = pesoConfig.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      transition={{ duration: 0.18 }}
      className="space-y-2"
    >
      {/* Textarea do critério */}
      <textarea
        rows={2}
        value={criterio.texto}
        onChange={(e) => onChange({ texto: e.target.value })}
        placeholder="Descreva o critério de análise..."
        className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg text-[13px] text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent leading-relaxed"
      />

      {/* Linha inferior: peso select + descrição + ações */}
      <div className="flex items-center gap-3">
        {/* Select de peso */}
        <div className="relative">
          <select
            value={criterio.peso}
            onChange={(e) => onChange({ peso: e.target.value as PesoCriterio })}
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[150px]"
          >
            {(Object.keys(PESO_CONFIG) as PesoCriterio[]).map((p) => (
              <option key={p} value={p}>{PESO_CONFIG[p].label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Badge de descrição do peso */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 rounded-lg flex-1">
          <PesoIcon className={`w-4 h-4 flex-shrink-0 ${pesoConfig.iconColor}`} />
          <span className="text-[12px] text-gray-600">{pesoConfig.descricao}</span>
        </div>

        {/* Ações */}
        <button
          type="button"
          onClick={onDuplicate}
          title="Duplicar critério"
          className="p-2 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Excluir critério"
          className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── props ── */
interface CriteriosSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function CriteriosSideSheet({ data, onClose, onSave }: CriteriosSideSheetProps) {
  const [criterios, setCriterios] = useState<CriterioAnalise[]>(
    data.criteriosAnaliseList?.length ? data.criteriosAnaliseList : CRITERIOS_PADRAO.map((c) => ({ ...c }))
  );
  const [template, setTemplate] = useState(data.templateCriterios ?? '');

  /* ── operações ── */
  const updateCriterio = (id: string, patch: Partial<CriterioAnalise>) => {
    setCriterios((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const duplicateCriterio = (id: string) => {
    const idx = criterios.findIndex((c) => c.id === id);
    const original = criterios[idx];
    const copy: CriterioAnalise = { ...original, id: `c-${Date.now()}` };
    setCriterios((prev) => {
      const arr = [...prev];
      arr.splice(idx + 1, 0, copy);
      return arr;
    });
  };

  const deleteCriterio = (id: string) => {
    setCriterios((prev) => prev.filter((c) => c.id !== id));
  };

  const addCriterio = () => {
    setCriterios((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, texto: '', peso: 'importante' },
    ]);
  };

  const recriarCriterios = () => {
    setCriterios(CRITERIOS_PADRAO.map((c) => ({ ...c })));
  };

  const criarMaisCriterios = () => {
    const extras: CriterioAnalise[] = [
      { id: `c-${Date.now()}-1`, texto: 'Experiência com liderança de equipes multidisciplinares', peso: 'importante' },
      { id: `c-${Date.now()}-2`, texto: 'Conhecimento em metodologias de gestão de qualidade', peso: 'diferencial' },
    ];
    setCriterios((prev) => [...prev, ...extras]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ criteriosAnaliseList: criterios, templateCriterios: template });
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
                  Critérios para analisar os currículos
                </h2>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Agente de triagem
                </span>
              </div>
              <p className="text-[12px] text-gray-500 mt-1">
                Configure os critérios de compatibilidade que o{' '}
                <span className="font-semibold text-gray-700">Agente</span>{' '}
                usará para avaliar os currículos.
              </p>
            </div>
            <button
              type="button" onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* ── Corpo ── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6">

              {/* Seção: Critérios de análise */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Cabeçalho da seção */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Critérios de análise</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5">
                        Tenha resultados ainda melhores:{' '}
                        <button type="button" className="text-purple-600 hover:underline inline-flex items-center gap-1">
                          veja como otimizar sua triagem com IA
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </p>
                    </div>
                    {/* Botões de ação de IA */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={recriarCriterios}
                        className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-[12px] text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                        Recriar critérios
                      </button>
                      <button
                        type="button"
                        onClick={criarMaisCriterios}
                        className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-[12px] text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                        Criar mais critérios
                      </button>
                    </div>
                  </div>

                  {/* Template select */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium text-purple-600 mb-1.5">
                      Template de critérios de triagem
                    </label>
                    <div className="relative w-[280px]">
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full appearance-none pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg text-[13px] text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {TEMPLATES.map((t) => (
                          <option key={t} value={t === 'Template de critérios de análise' ? '' : t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Lista de critérios */}
                <div className="px-6 py-5 space-y-5">
                  <AnimatePresence mode="popLayout">
                    {criterios.map((criterio) => (
                      <CriterioItem
                        key={criterio.id}
                        criterio={criterio}
                        onChange={(patch) => updateCriterio(criterio.id, patch)}
                        onDuplicate={() => duplicateCriterio(criterio.id)}
                        onDelete={() => deleteCriterio(criterio.id)}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Botão adicionar critério */}
                  <button
                    type="button"
                    onClick={addCriterio}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-100 text-purple-700 rounded-lg text-[13px] font-medium hover:bg-purple-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar critério
                  </button>
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
