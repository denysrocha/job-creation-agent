import {
  X, GripVertical, Plus, Copy, Trash2, Sparkles, Clock,
  CheckCircle, Circle, CheckSquare, AlignLeft, AlignJustify,
  ToggleLeft, ChevronDown, Settings, RotateCcw, FileText,
  Check, ClipboardList, ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import {
  JobData, QuestaoFormulario, OpcaoFormulario,
  TipoQuestao, QUESTOES_PADRAO,
} from '../types/job';

/* ── helpers ── */
type StatusQuestao = 'revisando' | 'aguardando' | 'concluida';

interface QuestaoLocal extends QuestaoFormulario {
  status: StatusQuestao;
}

function calcStatus(q: QuestaoFormulario, selectedId: string | null): StatusQuestao {
  if (q.id === selectedId) return 'revisando';
  const temTexto = q.texto.trim().length > 0;
  const temOpcoes =
    q.tipo === 'texto_curto' ||
    q.tipo === 'texto_longo' ||
    q.tipo === 'sim_nao' ||
    q.opcoes.some((o) => o.texto.trim());
  if (temTexto && temOpcoes) return 'concluida';
  return 'aguardando';
}

const TIPO_OPTIONS: { value: TipoQuestao; label: string; Icon: React.FC<any> }[] = [
  { value: 'escolha_unica',    label: 'Escolha única',    Icon: Circle },
  { value: 'multipla_escolha', label: 'Múltipla escolha', Icon: CheckSquare },
  { value: 'texto_curto',      label: 'Texto curto',      Icon: AlignLeft },
  { value: 'texto_longo',      label: 'Texto longo',      Icon: AlignJustify },
  { value: 'sim_nao',          label: 'Sim/Não',          Icon: ToggleLeft },
];

/* ── TypeSelect customizado com ícones ── */
function TypeSelect({
  value,
  onChange,
}: {
  value: TipoQuestao;
  onChange: (v: TipoQuestao) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = TIPO_OPTIONS.find((o) => o.value === value) ?? TIPO_OPTIONS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2.5 border-2 border-purple-400 rounded-lg bg-white text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <selected.Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
        <span className="flex-1 text-left">{selected.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            {TIPO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] hover:bg-purple-50 transition-colors ${value === opt.value ? 'text-purple-700 bg-purple-50' : 'text-gray-700'}`}
              >
                <opt.Icon className="w-4 h-4 flex-shrink-0" />
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Toggle reutilizável ── */
function Toggle({ value, onChange, label }: { value: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none flex-shrink-0 ${value ? 'bg-purple-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
      <span className="text-[13px] text-gray-700">{label}</span>
    </label>
  );
}

/* ── Linha de opção ── */
function OpcaoRow({
  opcao,
  onChange,
  onDelete,
  onToggleCorreta,
  autoFocus,
}: {
  opcao: OpcaoFormulario;
  onChange: (texto: string) => void;
  onDelete: () => void;
  onToggleCorreta: () => void;
  autoFocus?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
        opcao.correta
          ? 'border-emerald-300 bg-emerald-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      {/* Drag handle */}
      <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 cursor-grab" />

      {/* Input da opção */}
      <input
        autoFocus={autoFocus}
        type="text"
        value={opcao.texto}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite uma opção"
        className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none placeholder-gray-400"
      />

      {/* Botão correta */}
      <button
        type="button"
        onClick={onToggleCorreta}
        title={opcao.correta ? 'Desmarcar como correta' : 'Marcar como correta'}
        className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
          opcao.correta
            ? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200'
            : 'text-gray-300 hover:text-emerald-500 hover:bg-emerald-50'
        }`}
      >
        <Check className="w-3.5 h-3.5" />
      </button>

      {/* Botão deletar */}
      <button
        type="button"
        onClick={onDelete}
        className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

/* ── PROPS ── */
interface FormularioPersonalizadoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function FormularioPersonalizadoSideSheet({
  data,
  onClose,
  onSave,
}: FormularioPersonalizadoSideSheetProps) {
  const initialQuestoes: QuestaoLocal[] = (
    data.questoesFormulario?.length ? data.questoesFormulario : QUESTOES_PADRAO
  ).map((q) => ({ ...q, status: 'aguardando' as StatusQuestao }));

  const [usarFormulario, setUsarFormulario] = useState(data.usarFormulario ?? true);
  const [questoes, setQuestoes] = useState<QuestaoLocal[]>(initialQuestoes);
  const [selectedId, setSelectedId] = useState<string | null>(initialQuestoes[0]?.id ?? null);
  const [hoverInsertIndex, setHoverInsertIndex] = useState<number | null>(null);
  const [newOpcaoId, setNewOpcaoId] = useState<string | null>(null);

  const selectedQ = questoes.find((q) => q.id === selectedId) ?? null;
  const selectedIndex = questoes.findIndex((q) => q.id === selectedId);

  /* ── atualiza questão no array ── */
  const updateQuestao = (id: string, patch: Partial<QuestaoLocal>) => {
    setQuestoes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
    );
  };

  /* ── gerenciar opções ── */
  const addOpcao = () => {
    if (!selectedQ) return;
    const id = `o-${Date.now()}`;
    setNewOpcaoId(id);
    updateQuestao(selectedQ.id, {
      opcoes: [
        ...selectedQ.opcoes,
        { id, texto: '', correta: false },
      ],
    });
  };

  const updateOpcao = (qId: string, oId: string, texto: string) => {
    setQuestoes((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, opcoes: q.opcoes.map((o) => (o.id === oId ? { ...o, texto } : o)) }
          : q
      )
    );
  };

  const deleteOpcao = (qId: string, oId: string) => {
    setQuestoes((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, opcoes: q.opcoes.filter((o) => o.id !== oId) } : q
      )
    );
  };

  const toggleCorreta = (qId: string, oId: string) => {
    setQuestoes((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, opcoes: q.opcoes.map((o) => (o.id === oId ? { ...o, correta: !o.correta } : o)) }
          : q
      )
    );
  };

  /* ── adicionar questão ── */
  const addQuestao = (afterIndex?: number) => {
    const id = `q-${Date.now()}`;
    const newQ: QuestaoLocal = {
      id,
      texto: '',
      tipo: 'escolha_unica',
      opcoes: [],
      obrigatorio: true,
      preEliminatoria: false,
      status: 'aguardando',
    };
    setQuestoes((prev) => {
      const copy = [...prev];
      const insertAt = afterIndex !== undefined ? afterIndex + 1 : copy.length;
      copy.splice(insertAt, 0, newQ);
      return copy;
    });
    setSelectedId(id);
  };

  /* ── duplicar questão ── */
  const duplicateQuestao = () => {
    if (!selectedQ) return;
    const id = `q-${Date.now()}`;
    const copy: QuestaoLocal = {
      ...selectedQ,
      id,
      opcoes: selectedQ.opcoes.map((o) => ({ ...o, id: `o-${Date.now()}-${Math.random()}` })),
      status: 'aguardando',
    };
    setQuestoes((prev) => {
      const arr = [...prev];
      arr.splice(selectedIndex + 1, 0, copy);
      return arr;
    });
    setSelectedId(id);
  };

  /* ── deletar questão ── */
  const deleteQuestao = () => {
    if (!selectedQ) return;
    const remaining = questoes.filter((q) => q.id !== selectedQ.id);
    setQuestoes(remaining);
    setSelectedId(remaining[Math.max(0, selectedIndex - 1)]?.id ?? null);
  };

  /* ── marcar todas respostas corretas / desmarcar ── */
  const marcarRespostasCorretas = () => {
    if (!selectedQ) return;
    const todasCorretas = selectedQ.opcoes.every((o) => o.correta);
    updateQuestao(selectedQ.id, {
      opcoes: selectedQ.opcoes.map((o) => ({ ...o, correta: !todasCorretas })),
    });
  };

  /* ── proxima questao ── */
  const nextQuestao = () => {
    if (selectedIndex < questoes.length - 1) {
      setSelectedId(questoes[selectedIndex + 1].id);
    }
  };

  /* ── salvar ── */
  const handleSave = () => {
    onSave({
      usarFormulario,
      questoesFormulario: questoes.map(({ status: _s, ...q }) => q),
    });
    onClose();
  };

  const hasChoiceType =
    selectedQ?.tipo === 'escolha_unica' || selectedQ?.tipo === 'multipla_escolha';

  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />

        {/* Painel full-screen */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          className="fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* ════ HEADER ════ */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 flex-shrink-0">
            {/* Esquerda */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[17px] font-semibold text-gray-900">Formulário personalizado</h2>
                {/* Badge Agente de triagem */}
                <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Agente de triagem
                </span>
              </div>
              <p className="text-[12px] text-gray-500 mt-0.5">
                Use o formulário para filtrar respostas, criar automações e triar melhor.
              </p>
            </div>

            {/* Direita */}
            <div className="flex items-center gap-2">
              {/* Toggle Usar formulário */}
              <label className="flex items-center gap-2 cursor-pointer select-none mr-2">
                <button
                  type="button"
                  onClick={() => setUsarFormulario((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${usarFormulario ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${usarFormulario ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-[13px] text-gray-700">Usar formulário</span>
              </label>

              {/* Reset */}
              <button
                type="button"
                title="Resetar formulário"
                onClick={() => setQuestoes(QUESTOES_PADRAO.map((q) => ({ ...q, status: 'aguardando' as StatusQuestao })))}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Descrição da vaga */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[13px] text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                Descrição da vaga
              </button>

              {/* Settings */}
              <button
                type="button"
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Salvar */}
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg text-[13px] font-medium hover:bg-purple-700 transition-colors"
              >
                Salvar
              </button>

              {/* Fechar */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ════ CONTEÚDO (left + right) ════ */}
          <div className="flex flex-1 min-h-0">

            {/* ── PAINEL ESQUERDO — lista de questões ── */}
            <div className="w-[230px] flex-shrink-0 border-r border-gray-200 flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto py-2">
                {questoes.map((q, i) => {
                  const status = calcStatus(q, selectedId);
                  const isSelected = q.id === selectedId;

                  return (
                    <div key={q.id}>
                      {/* Zona hover para inserir antes */}
                      <div
                        className="relative h-2 group"
                        onMouseEnter={() => setHoverInsertIndex(i)}
                        onMouseLeave={() => setHoverInsertIndex(null)}
                      >
                        {hoverInsertIndex === i && (
                          <button
                            type="button"
                            onClick={() => addQuestao(i - 1)}
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 flex items-center gap-1 px-2.5 py-0.5 bg-purple-600 text-white text-[11px] rounded-full whitespace-nowrap shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                            Adicionar questão aqui
                          </button>
                        )}
                      </div>

                      {/* Item da questão */}
                      <button
                        type="button"
                        onClick={() => setSelectedId(q.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors group/item ${
                          isSelected
                            ? 'bg-purple-50 border-l-2 border-purple-600'
                            : 'hover:bg-gray-50 border-l-2 border-transparent'
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 cursor-grab" />
                        <span className={`flex-1 text-[12px] truncate leading-snug ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                          {i + 1}. {q.texto || 'Nova questão...'}
                        </span>
                        {/* Ícone de status */}
                        <span className="flex-shrink-0">
                          {status === 'revisando' && (
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          )}
                          {status === 'concluida' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {status === 'aguardando' && (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </span>
                      </button>
                    </div>
                  );
                })}

                {/* Zona hover para inserir no final */}
                <div
                  className="relative h-6 group"
                  onMouseEnter={() => setHoverInsertIndex(questoes.length)}
                  onMouseLeave={() => setHoverInsertIndex(null)}
                >
                  {hoverInsertIndex === questoes.length && questoes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => addQuestao(questoes.length - 1)}
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 flex items-center gap-1 px-2.5 py-0.5 bg-purple-600 text-white text-[11px] rounded-full whitespace-nowrap shadow-sm"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar questão aqui
                    </button>
                  )}
                </div>
              </div>

              {/* ── Botões de ação (bottom) ── */}
              <div className="border-t border-gray-200 px-3 py-3 flex items-center gap-2">
                <button
                  type="button"
                  title="Adicionar questão com IA"
                  onClick={() => addQuestao()}
                  className="flex-1 flex items-center justify-center p-2 rounded-lg border border-gray-300 text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Nova questão em branco"
                  onClick={() => addQuestao()}
                  className="flex-1 flex items-center justify-center p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Duplicar questão"
                  onClick={duplicateQuestao}
                  disabled={!selectedQ}
                  className="flex-1 flex items-center justify-center p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  <ClipboardList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Excluir questão"
                  onClick={deleteQuestao}
                  disabled={!selectedQ}
                  className="flex-1 flex items-center justify-center p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── PAINEL DIREITO — editor da questão ── */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {selectedQ ? (
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

                    {/* Status de revisão IA (centered) */}
                    <div className="flex items-center justify-center gap-8">
                      {/* Ícone esquerdo */}
                      <div className="w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      </div>
                      {/* Status badge */}
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="text-[13px] text-gray-600">Revisando questão</span>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="grid grid-cols-[1fr_220px] gap-4">
                      <label className="text-[13px] font-semibold text-purple-600">
                        Questão {selectedIndex + 1} <span className="text-purple-500">*</span>
                      </label>
                      <label className="text-[13px] font-semibold text-purple-600">
                        Tipo <span className="text-purple-500">*</span>
                      </label>
                    </div>

                    {/* Pergunta + Tipo */}
                    <div className="grid grid-cols-[1fr_220px] gap-4">
                      <input
                        type="text"
                        value={selectedQ.texto}
                        onChange={(e) => updateQuestao(selectedQ.id, { texto: e.target.value })}
                        placeholder="Escreva a pergunta aqui..."
                        className="w-full px-4 py-2.5 border-2 border-purple-400 rounded-lg text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <TypeSelect
                        value={selectedQ.tipo}
                        onChange={(tipo) => updateQuestao(selectedQ.id, { tipo, opcoes: [] })}
                      />
                    </div>

                    {/* Opções (para tipos de escolha) */}
                    {hasChoiceType && (
                      <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                          {selectedQ.opcoes.map((opcao) => (
                            <OpcaoRow
                              key={opcao.id}
                              opcao={opcao}
                              autoFocus={opcao.id === newOpcaoId}
                              onChange={(texto) => updateOpcao(selectedQ.id, opcao.id, texto)}
                              onDelete={() => deleteOpcao(selectedQ.id, opcao.id)}
                              onToggleCorreta={() => toggleCorreta(selectedQ.id, opcao.id)}
                            />
                          ))}
                        </AnimatePresence>

                        {/* + Adicionar opção */}
                        <button
                          type="button"
                          onClick={() => { setNewOpcaoId(null); addOpcao(); }}
                          className="flex items-center gap-1.5 px-1 py-1 text-purple-600 text-[13px] font-medium hover:underline"
                        >
                          <Plus className="w-4 h-4" />
                          Adicionar opção
                        </button>
                      </div>
                    )}

                    {/* Preview para texto_curto */}
                    {selectedQ.tipo === 'texto_curto' && (
                      <div className="px-4 py-3 border border-dashed border-gray-300 rounded-lg text-[13px] text-gray-400 bg-gray-50">
                        Resposta curta do candidato...
                      </div>
                    )}

                    {/* Preview para texto_longo */}
                    {selectedQ.tipo === 'texto_longo' && (
                      <div className="px-4 py-6 border border-dashed border-gray-300 rounded-lg text-[13px] text-gray-400 bg-gray-50">
                        Resposta longa do candidato...
                      </div>
                    )}

                    {/* Preview para sim_nao */}
                    {selectedQ.tipo === 'sim_nao' && (
                      <div className="flex gap-4">
                        {['Sim', 'Não'].map((opt) => (
                          <div key={opt} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 bg-gray-50">
                            <span className="w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0" />
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── BARRA INFERIOR ── */}
                  <div className="border-t border-gray-200 px-8 py-3 bg-white flex items-center gap-4 flex-shrink-0">
                    {/* Marcar respostas corretas */}
                    {hasChoiceType && (
                      <button
                        type="button"
                        onClick={marcarRespostasCorretas}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[13px] text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        <CheckSquare className="w-4 h-4 text-gray-500" />
                        Marcar respostas corretas
                      </button>
                    )}

                    <div className="flex items-center gap-4 ml-auto">
                      {/* Toggle Obrigatório */}
                      <Toggle
                        value={selectedQ.obrigatorio}
                        onChange={() => updateQuestao(selectedQ.id, { obrigatorio: !selectedQ.obrigatorio })}
                        label="Obrigatório"
                      />

                      {/* Toggle Pré-eliminatória */}
                      <Toggle
                        value={selectedQ.preEliminatoria}
                        onChange={() => updateQuestao(selectedQ.id, { preEliminatoria: !selectedQ.preEliminatoria })}
                        label="Pré-eliminatória"
                      />

                      {/* Duplicar */}
                      <button
                        type="button"
                        onClick={duplicateQuestao}
                        title="Duplicar questão"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* Deletar */}
                      <button
                        type="button"
                        onClick={deleteQuestao}
                        title="Excluir questão"
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Próxima questão */}
                      <button
                        type="button"
                        onClick={nextQuestao}
                        disabled={selectedIndex >= questoes.length - 1}
                        className="flex items-center gap-1.5 px-5 py-2 border border-gray-300 rounded-lg text-[13px] text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-40"
                      >
                        <ChevronDown className="w-4 h-4" />
                        Próxima questão
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Estado vazio */
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                  <FileText className="w-10 h-10" />
                  <p className="text-[14px]">Selecione ou crie uma questão</p>
                  <button
                    type="button"
                    onClick={() => addQuestao()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg text-[13px] font-medium hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nova questão
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
