import {
  X, Plus, Pencil, Trash2, ChevronDown,
  Bold, Italic, Underline, Strikethrough, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Maximize2, Minimize2, Eye, MoreHorizontal, Type,
  MessageCircle, Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import {
  JobData,
  ScorecardCategoria,
  ScorecardCriterio,
  KitEntrevista,
  SCORECARD_CATEGORIAS_PADRAO,
  KITS_ENTREVISTA_PADRAO,
  ETAPAS_PADRAO,
  Etapa,
} from '../types/job';

/* ── Stage color mapping ── */
const FASE_COLORS: Record<string, string> = {
  Listagem: 'text-sky-500',
  Abordagem: 'text-pink-500',
  Candidatura: 'text-violet-600',
  'Fit Cultural': 'text-orange-500',
  'Fit Técnico': 'text-slate-500',
  Oferta: 'text-emerald-600',
  Contratação: 'text-blue-600',
};

/* ── Word count ── */
function countWords(html: string) {
  const text = html.replace(/<[^>]+>/g, ' ').trim();
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/* ── Toolbar helpers ── */
function TBtn({ onMouseDown, title, children }: {
  onMouseDown: (e: React.MouseEvent) => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onMouseDown(e); }}
      className="p-1 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
    >
      {children}
    </button>
  );
}
function TSep() {
  return <div className="w-px h-4 bg-gray-300 mx-0.5 self-center flex-shrink-0" />;
}

/* ── Toggle switch ── */
function ToggleSwitch({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-10 h-[22px] rounded-full transition-colors flex-shrink-0 ${value ? 'bg-purple-600' : 'bg-gray-300'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${value ? 'translate-x-[18px]' : ''}`} />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CRIAR CRITÉRIO MODAL
════════════════════════════════════════════════════════════════════════════ */
function CriarCriterioModal({ categoriaNome, onClose, onCreate }: {
  categoriaNome: string;
  onClose: () => void;
  onCreate: (nome: string) => void;
}) {
  const [nome, setNome] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/20 z-[68]" onClick={onClose} />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15 }}
        className="fixed inset-0 flex items-center justify-center z-[69] pointer-events-none"
      >
        <div className="bg-white rounded-xl shadow-2xl p-6 w-[400px] pointer-events-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-gray-700" />
              <h3 className="text-[15px] font-semibold text-gray-900">Criar critério</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[13px] text-gray-500 mb-5">
            Adicionar novo critério em <strong className="text-gray-800">{categoriaNome}</strong>
          </p>
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              Nome do critério <span className="text-red-500">*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && nome.trim()) onCreate(nome.trim()); }}
              placeholder="Escreva o nome do critério"
              className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-[13px] text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => { if (nome.trim()) onCreate(nome.trim()); }}
              disabled={!nome.trim()}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-[13px] font-medium hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Criar
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITAR KIT PANEL (second sidesheet layer)
════════════════════════════════════════════════════════════════════════════ */
interface EditarKitPanelProps {
  kit: KitEntrevista;
  isNew: boolean;
  etapas: Etapa[];
  categorias: ScorecardCategoria[];
  onClose: () => void;
  onSave: (kit: KitEntrevista) => void;
  onDelete: (kitId: string) => void;
}

function EditarKitPanel({ kit, isNew, etapas, categorias, onClose, onSave, onDelete }: EditarKitPanelProps) {
  const [nome, setNome] = useState(kit.nome);
  const [etapaId, setEtapaId] = useState(kit.etapaId);
  const [criteriosFoco, setCriteriosFoco] = useState<string[]>(kit.criteriosFoco);
  const [activeTab, setActiveTab] = useState<'roteiro' | 'scorecard'>('roteiro');
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [etapaOpen, setEtapaOpen] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const savedSel = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = kit.roteiro || '';
      setWordCount(countWords(kit.roteiro || ''));
    }
  }, [kit.id]);

  useEffect(() => {
    const handler = () => { setOpenDrop(null); setEtapaOpen(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
  };

  const handleEditorInput = () => {
    if (editorRef.current) setWordCount(countWords(editorRef.current.innerHTML));
  };

  /* ── Scorecard helpers ── */
  const isCriterioFoco = (id: string) => criteriosFoco.includes(id);

  const toggleCriterio = (id: string) => {
    setCriteriosFoco((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const isCategoryAllMarked = (cat: ScorecardCategoria) =>
    cat.criterios.every((c) => criteriosFoco.includes(c.id));

  const toggleAllInCategory = (cat: ScorecardCategoria) => {
    const allIds = cat.criterios.map((c) => c.id);
    if (isCategoryAllMarked(cat)) {
      setCriteriosFoco((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setCriteriosFoco((prev) => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleSave = () => {
    onSave({
      ...kit,
      nome,
      etapaId,
      roteiro: editorRef.current?.innerHTML ?? '',
      criteriosFoco,
    });
  };

  const selectedEtapa = etapas.find((e) => e.id === etapaId);

  const VARS = [
    '{{Nome da Vaga}}', '{{Nome do Candidato}}', '{{Etapa}}', '{{Entrevistador}}', '{{Data}}',
  ];

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 right-0 h-full w-[700px] bg-white shadow-2xl z-[55] flex flex-col border-l border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-7 py-5 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-[16px] font-semibold text-gray-900">
          {isNew ? 'Criar kit de entrevista' : 'Editar kit de entrevista'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
        {/* Nome + Etapa */}
        <div className="flex gap-4">
          {/* Nome */}
          <div className="flex-1">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              Nome do kit de entrevista <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-purple-400 rounded-lg text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
              />
              {nome && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Check className="w-4 h-4 text-purple-500" />
                </div>
              )}
            </div>
          </div>

          {/* Etapa */}
          <div className="w-[200px]">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              Etapa <span className="text-purple-500">*</span>
            </label>
            <div className="relative" onClick={(e) => { e.stopPropagation(); setEtapaOpen((v) => !v); }}>
              <div className="flex items-center px-4 py-2.5 border-2 border-purple-400 rounded-lg cursor-pointer bg-white gap-2">
                <span className="flex-1 text-[13px] text-gray-800 truncate">
                  {selectedEtapa?.nome ?? 'Selecionar...'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${etapaOpen ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {etapaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden max-h-48 overflow-y-auto"
                  >
                    {etapas.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => { setEtapaId(e.id); setEtapaOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-[13px] hover:bg-purple-50 transition-colors ${etapaId === e.id ? 'text-purple-700 bg-purple-50' : 'text-gray-700'}`}
                      >
                        {e.nome}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Inner tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6">
            {(['roteiro', 'scorecard'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab === 'roteiro' ? 'Roteiro de entrevista' : 'Scorecard da entrevista'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Roteiro */}
        {activeTab === 'roteiro' && (
          <div>
            <p className="text-[12px] text-gray-500 mb-3">
              Escreva instruções e/ou perguntas para os avaliadores
            </p>
            <p className="text-[13px] font-medium text-gray-800 mb-2">Roteiro de entrevista</p>

            {/* Editor */}
            <div className={`border border-gray-300 rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-4 z-[66] flex flex-col bg-white' : ''}`}>
              {/* Toolbar */}
              <div
                className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-gray-50 border-b border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <TBtn onMouseDown={() => exec('bold')} title="Negrito"><span className="text-[13px] font-bold px-0.5">B</span></TBtn>
                <TBtn onMouseDown={() => exec('italic')} title="Itálico"><span className="text-[13px] italic px-0.5">I</span></TBtn>
                <TBtn onMouseDown={() => exec('underline')} title="Sublinhado"><span className="text-[13px] underline px-0.5">U</span></TBtn>
                <TBtn onMouseDown={() => exec('strikeThrough')} title="Tachado"><span className="text-[13px] line-through px-0.5">S</span></TBtn>
                <TSep />
                <TBtn onMouseDown={() => { const url = window.prompt('URL da imagem:'); if (url) exec('insertImage', url); }} title="Imagem">
                  <ImageIcon className="w-3.5 h-3.5" />
                </TBtn>
                <TSep />
                {/* Simples (formatBlock) */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setOpenDrop((v) => v === 'style' ? null : 'style'); }}
                    className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[12px] text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Simples <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {openDrop === 'style' && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1 }}
                        className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px] overflow-hidden"
                      >
                        {[['p','Normal'],['h1','Título 1'],['h2','Título 2'],['h3','Título 3']].map(([v,l]) => (
                          <button key={v} type="button" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', v); setOpenDrop(null); }}
                            className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors">{l}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clear formatting */}
                <TBtn onMouseDown={() => exec('removeFormat')} title="Limpar formatação"><Type className="w-3.5 h-3.5" /></TBtn>
                <TSep />

                {/* Align */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); setOpenDrop((v) => v === 'align' ? null : 'align'); }}
                    className="flex items-center gap-0.5 p-1 rounded text-gray-600 hover:bg-gray-200 transition-colors">
                    <AlignLeft className="w-3.5 h-3.5" /><ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {openDrop === 'align' && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1 }}
                        className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        {[['justifyLeft',AlignLeft,'Esquerda'],['justifyCenter',AlignCenter,'Centro'],['justifyRight',AlignRight,'Direita'],['justifyFull',AlignJustify,'Justificado']].map(([cmd, Icon, label]) => (
                          <button key={cmd as string} type="button" onMouseDown={(e) => { e.preventDefault(); exec(cmd as string); setOpenDrop(null); }}
                            className="flex items-center gap-3 w-full px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors whitespace-nowrap">
                            {/* @ts-ignore */}
                            <Icon className="w-4 h-4" /> {label as string}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Lists */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); setOpenDrop((v) => v === 'list' ? null : 'list'); }}
                    className="flex items-center gap-0.5 p-1 rounded text-gray-600 hover:bg-gray-200 transition-colors">
                    <List className="w-3.5 h-3.5" /><ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {openDrop === 'list' && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1 }}
                        className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        {[['insertUnorderedList', List,'Lista com marcadores'],['insertOrderedList', ListOrdered,'Lista numerada']].map(([cmd, Icon, label]) => (
                          <button key={cmd as string} type="button" onMouseDown={(e) => { e.preventDefault(); exec(cmd as string); setOpenDrop(null); }}
                            className="flex items-center gap-3 w-full px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors whitespace-nowrap">
                            {/* @ts-ignore */}
                            <Icon className="w-4 h-4" /> {label as string}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <TSep />
                <TBtn onMouseDown={() => setIsFullscreen((v) => !v)} title="Tela cheia">
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </TBtn>
                <TBtn onMouseDown={() => {}} title="Pré-visualização"><Eye className="w-3.5 h-3.5" /></TBtn>
                <TSep />
                <TBtn onMouseDown={() => exec('outdent')} title="Diminuir recuo"><span className="text-[12px] px-0.5">⇤</span></TBtn>
                <TBtn onMouseDown={() => exec('indent')} title="Aumentar recuo"><span className="text-[12px] px-0.5">⇥</span></TBtn>
                <TSep />
                <TBtn onMouseDown={() => {}} title="Mais"><MoreHorizontal className="w-3.5 h-3.5" /></TBtn>
              </div>

              {/* Content area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
                className={`px-5 py-4 outline-none text-[13px] text-gray-800 leading-relaxed min-h-[220px] ${isFullscreen ? 'flex-1 overflow-y-auto' : ''}`}
                style={{ wordBreak: 'break-word' }}
              />

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50">
                <span className="text-[11px] text-gray-400 font-mono">p › strong</span>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>{wordCount} palavras</span>
                  <span className="flex items-center gap-1 italic">
                    <span className="w-3 h-3 rounded-full bg-gray-400 text-white flex items-center justify-center text-[8px] font-bold">t</span>
                    tiny
                  </span>
                  <Pencil className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Scorecard da entrevista */}
        {activeTab === 'scorecard' && (
          <div>
            <p className="text-[13px] font-medium text-gray-800 mb-1">Scorecard da entrevista</p>
            <p className="text-[12px] text-gray-500 mb-5">
              Marque os <strong>critérios foco</strong> nessa entrevista. Isso significa que eles serão obrigatórios e mostrados com maior importância para os entrevistadores.
            </p>
            <div className="space-y-3">
              {categorias.map((cat) => {
                const allMarked = isCategoryAllMarked(cat);
                return (
                  <div key={cat.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[13px] font-medium text-gray-800">{cat.nome}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-500">Marcar todos</span>
                        <ToggleSwitch value={allMarked} onChange={() => toggleAllInCategory(cat)} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.criterios.map((c) => {
                        const selected = isCriterioFoco(c.id);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => toggleCriterio(c.id)}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                              selected
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-300 hover:border-purple-400'
                            }`}
                          >
                            {c.nome}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {categorias.length === 0 && (
                <p className="text-[13px] text-gray-400 italic text-center py-8">
                  Nenhuma categoria criada no scorecard da vaga ainda.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-7 py-4 border-t border-gray-200 flex-shrink-0 bg-white">
        <button type="button" onClick={onClose} className="text-[13px] text-gray-500 hover:text-gray-700 font-medium">
          Cancelar
        </button>
        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              type="button"
              onClick={() => onDelete(kit.id)}
              className="px-5 py-2 border border-red-300 text-red-500 rounded-lg text-[13px] font-medium hover:bg-red-50 transition-colors"
            >
              Excluir
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!nome.trim() || !etapaId}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg text-[13px] font-medium hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Salvar kit de entrevista
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════════════ */
interface Props {
  data: JobData;
  onClose: () => void;
  onSave: (updated: Partial<JobData>) => void;
}

export function KitEntrevistaScorecardSideSheet({ data, onClose, onSave }: Props) {
  const etapas = data.etapasVaga?.length ? data.etapasVaga : ETAPAS_PADRAO;
  const [activeTab, setActiveTab] = useState<'scorecard' | 'kits'>('scorecard');
  const [categorias, setCategorias] = useState<ScorecardCategoria[]>(
    data.scorecardCategorias?.length ? data.scorecardCategorias : SCORECARD_CATEGORIAS_PADRAO
  );
  const [kits, setKits] = useState<KitEntrevista[]>(
    data.kitsEntrevista?.length ? data.kitsEntrevista : KITS_ENTREVISTA_PADRAO
  );

  /* ── Scorecard editing state ── */
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatNome, setEditingCatNome] = useState('');
  const [editingCritKey, setEditingCritKey] = useState<string | null>(null);
  const [editingCritNome, setEditingCritNome] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatNome, setNewCatNome] = useState('');
  const [criarCriterioModal, setCriarCriterioModal] = useState<{ open: boolean; categoriaId: string | null }>({ open: false, categoriaId: null });

  /* ── Kit editing state ── */
  const [editingKit, setEditingKit] = useState<KitEntrevista | null>(null);
  const [isNewKit, setIsNewKit] = useState(false);

  /* ── Category CRUD ── */
  const startEditCat = (cat: ScorecardCategoria) => { setEditingCatId(cat.id); setEditingCatNome(cat.nome); };
  const finishEditCat = () => {
    if (editingCatId && editingCatNome.trim()) {
      setCategorias((prev) => prev.map((c) => c.id === editingCatId ? { ...c, nome: editingCatNome.trim() } : c));
    }
    setEditingCatId(null);
  };
  const deleteCat = (id: string) => setCategorias((prev) => prev.filter((c) => c.id !== id));
  const addCat = () => {
    if (!newCatNome.trim()) return;
    setCategorias((prev) => [...prev, { id: `sc-cat-${Date.now()}`, nome: newCatNome.trim(), criterios: [] }]);
    setNewCatNome(''); setShowNewCat(false);
  };

  /* ── Criterion CRUD ── */
  const startEditCrit = (catId: string, crit: { id: string; nome: string }) => {
    setEditingCritKey(`${catId}-${crit.id}`); setEditingCritNome(crit.nome);
  };
  const finishEditCrit = () => {
    if (!editingCritKey || !editingCritNome.trim()) { setEditingCritKey(null); return; }
    const [catId, critId] = editingCritKey.split('-').reduce<[string, string]>((acc, _, i, arr) => {
      if (i === 0) return [arr[0] + (arr.length > 2 ? '' : ''), ''];
      // catId can be sc-cat-XXX and critId sc-c-XXX, so handle multi-dash IDs
      return acc;
    }, ['', '']);
    // rebuild from full key
    const parts = editingCritKey.split('-');
    // format: sc-cat-NNN-sc-c-NNN → split at last occurrence of '-sc-c-'
    const sep = '-sc-c-';
    const sepIdx = editingCritKey.lastIndexOf(sep);
    if (sepIdx === -1) { setEditingCritKey(null); return; }
    const realCatId = editingCritKey.slice(0, sepIdx);
    const realCritId = 'sc-c-' + editingCritKey.slice(sepIdx + sep.length);
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === realCatId
          ? { ...c, criterios: c.criterios.map((cr) => cr.id === realCritId ? { ...cr, nome: editingCritNome.trim() } : cr) }
          : c
      )
    );
    setEditingCritKey(null);
  };
  const deleteCrit = (catId: string, critId: string) => {
    setCategorias((prev) =>
      prev.map((c) => c.id === catId ? { ...c, criterios: c.criterios.filter((cr) => cr.id !== critId) } : c)
    );
  };
  const addCriterio = (categoriaId: string, nome: string) => {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === categoriaId
          ? { ...c, criterios: [...c.criterios, { id: `sc-c-${Date.now()}`, nome }] }
          : c
      )
    );
    setCriarCriterioModal({ open: false, categoriaId: null });
  };

  /* ── Kit CRUD ── */
  const openEditKit = (kit: KitEntrevista | null, defaultEtapaId?: string) => {
    if (kit) {
      setEditingKit(kit); setIsNewKit(false);
    } else {
      setEditingKit({
        id: `kit-${Date.now()}`,
        nome: '',
        etapaId: defaultEtapaId ?? etapas[0]?.id ?? '',
        roteiro: '<p><strong>Introdução:</strong></p><p><br></p><p><strong>Pergunta 1:</strong></p><p><br></p><p><strong>Pergunta 2:</strong></p><p><br></p><p><strong>Pergunta 3:</strong></p>',
        criteriosFoco: [],
      });
      setIsNewKit(true);
    }
  };

  const saveKit = (kit: KitEntrevista) => {
    setKits((prev) => {
      const exists = prev.find((k) => k.id === kit.id);
      return exists ? prev.map((k) => k.id === kit.id ? kit : k) : [...prev, kit];
    });
    setEditingKit(null);
  };

  const deleteKit = (kitId: string) => {
    setKits((prev) => prev.filter((k) => k.id !== kitId));
    setEditingKit(null);
  };

  const handleMainSave = () => {
    onSave({ scorecardCategorias: categorias, kitsEntrevista: kits });
    onClose();
  };

  /* ── GTM-style push animation for main panel ── */
  const isPushed = editingKit !== null;

  return (
    <AnimatePresence>
      <>
        {/* Single overlay */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 bg-black/30 z-40"
          onClick={!isPushed ? onClose : undefined}
        />

        {/* Main sidesheet — expands to full width when kit editing */}
        <motion.div
          initial={{ x: '100%', width: 920 }}
          animate={{ x: 0, width: isPushed ? '100vw' : 920 }}
          exit={{ x: '100%', width: 920 }}
          transition={{
            x: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
            width: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[17px] font-semibold text-gray-900">Kit de entrevista e Scorecards</h2>
              <p className="text-[12px] text-gray-500 mt-0.5">Crie categorias e critérios de avaliação para esta vaga</p>
            </div>
            <div className="flex items-center gap-4">
              {!isPushed && (
                <button
                  type="button"
                  onClick={handleMainSave}
                  className="px-5 py-2 bg-white border border-gray-300 rounded-md text-[13px] text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Salvar
                </button>
              )}
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 px-8 border-b border-gray-200 flex-shrink-0">
            {[
              { key: 'scorecard', label: 'Scorecard da vaga' },
              { key: 'kits', label: 'Kits de entrevista por etapa' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key as 'scorecard' | 'kits')}
                className={`py-3.5 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === t.key
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-6 min-h-0">

            {/* ── TAB: Scorecard da vaga ── */}
            {activeTab === 'scorecard' && (
              <div>
                <h3 className="text-[13px] font-semibold text-gray-800 mb-1">
                  Categorias e critérios do Scorecard da vaga
                </h3>
                <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-5">
                  <span className="flex items-center gap-1"><Plus className="w-3 h-3" /> Crie,</span>
                  <span className="flex items-center gap-1"><Pencil className="w-3 h-3" /> edite, e</span>
                  <span className="flex items-center gap-1"><Trash2 className="w-3 h-3" /> exclua as categorias e critérios</span>
                </div>

                <div className="space-y-3">
                  {categorias.map((cat) => (
                    <div key={cat.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      {/* Category header */}
                      <div className="flex items-center gap-2 mb-3">
                        {editingCatId === cat.id ? (
                          <input
                            autoFocus
                            value={editingCatNome}
                            onChange={(e) => setEditingCatNome(e.target.value)}
                            onBlur={finishEditCat}
                            onKeyDown={(e) => { if (e.key === 'Enter') finishEditCat(); if (e.key === 'Escape') setEditingCatId(null); }}
                            className="text-[13px] font-medium text-gray-800 border border-purple-400 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                          />
                        ) : (
                          <span className="text-[13px] font-medium text-gray-800">{cat.nome}</span>
                        )}
                        <button onClick={() => startEditCat(cat)} className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteCat(cat.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Criteria chips */}
                      <div className="flex flex-wrap gap-2">
                        {cat.criterios.map((crit) => {
                          const key = `${cat.id}-${crit.id}`;
                          return (
                            <div key={crit.id} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5">
                              {editingCritKey === key ? (
                                <input
                                  autoFocus
                                  value={editingCritNome}
                                  onChange={(e) => setEditingCritNome(e.target.value)}
                                  onBlur={finishEditCrit}
                                  onKeyDown={(e) => { if (e.key === 'Enter') finishEditCrit(); if (e.key === 'Escape') setEditingCritKey(null); }}
                                  className="text-[13px] text-gray-700 border-b border-purple-400 outline-none bg-transparent w-24"
                                />
                              ) : (
                                <span className="text-[13px] text-gray-700">{crit.nome}</span>
                              )}
                              <button onClick={() => startEditCrit(cat.id, crit)} className="text-gray-400 hover:text-gray-600 transition-colors ml-1">
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button onClick={() => deleteCrit(cat.id, crit.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}

                        {/* + Criar novo critério */}
                        <button
                          type="button"
                          onClick={() => setCriarCriterioModal({ open: true, categoriaId: cat.id })}
                          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-purple-400 text-purple-600 rounded-full text-[13px] font-medium hover:bg-purple-50 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Criar novo critério
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nova categoria */}
                <div className="mt-4">
                  {showNewCat ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={newCatNome}
                        onChange={(e) => setNewCatNome(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') addCat(); if (e.key === 'Escape') { setShowNewCat(false); setNewCatNome(''); } }}
                        placeholder="Nome da categoria"
                        className="px-4 py-2 border-2 border-purple-400 rounded-lg text-[13px] outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button onClick={addCat} disabled={!newCatNome.trim()} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-[13px] font-medium hover:bg-purple-700 disabled:opacity-40">Criar</button>
                      <button onClick={() => { setShowNewCat(false); setNewCatNome(''); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-[13px] hover:bg-gray-50">Cancelar</button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowNewCat(true)}
                      className="flex items-center gap-1.5 px-4 py-2 border-2 border-purple-400 text-purple-600 rounded-full text-[13px] font-medium hover:bg-purple-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Criar nova categoria
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── TAB: Kits de entrevista por etapa ── */}
            {activeTab === 'kits' && (
              <div>
                <p className="text-[13px] text-gray-600 mb-6">
                  Use este espaço para configurar <strong>kits de entrevista</strong> para cada <strong>etapa</strong> da vaga
                </p>

                {/* Kanban columns */}
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {etapas.map((etapa) => {
                    const etapaKits = kits.filter((k) => k.etapaId === etapa.id);
                    const faseColor = FASE_COLORS[etapa.fase] ?? 'text-gray-600';
                    return (
                      <div key={etapa.id} className="flex-shrink-0 w-[200px]">
                        {/* Column header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[13px] font-medium ${faseColor}`}>{etapa.nome}</span>
                            {etapaKits.length > 0 && (
                              <span className="text-[11px] text-gray-500 bg-gray-100 rounded-full px-1.5 py-0.5">{etapaKits.length}</span>
                            )}
                            {etapaKits.length === 0 && (
                              <span className="text-[11px] text-gray-400">0</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => openEditKit(null, etapa.id)}
                            className="text-gray-400 hover:text-purple-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Kit cards */}
                        <div className="space-y-2">
                          {etapaKits.map((kit) => (
                            <button
                              key={kit.id}
                              type="button"
                              onClick={() => openEditKit(kit)}
                              className="w-full text-left bg-white border border-gray-200 rounded-xl p-3 hover:border-purple-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start gap-2">
                                <MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                  <p className="text-[13px] text-gray-800 font-medium truncate">{kit.nome}</p>
                                  {kit.criteriosFoco.length > 0 && (
                                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[11px]">
                                      {kit.criteriosFoco.length} critério{kit.criteriosFoco.length !== 1 ? 's' : ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}

                          {/* + Criar kit */}
                          <button
                            type="button"
                            onClick={() => openEditKit(null, etapa.id)}
                            className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-purple-600 transition-colors py-1 w-full"
                          >
                            <Plus className="w-3.5 h-3.5" /> Criar kit de entrevista
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Inner overlay (dims main when edit panel open) ── */}
        <AnimatePresence>
          {isPushed && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[52]"
              onClick={() => setEditingKit(null)}
            />
          )}
        </AnimatePresence>

        {/* ── Edit Kit panel (second sidesheet layer) ── */}
        <AnimatePresence>
          {editingKit && (
            <EditarKitPanel
              key={editingKit.id}
              kit={editingKit}
              isNew={isNewKit}
              etapas={etapas}
              categorias={categorias}
              onClose={() => setEditingKit(null)}
              onSave={saveKit}
              onDelete={deleteKit}
            />
          )}
        </AnimatePresence>

        {/* ── Criar critério modal ── */}
        <AnimatePresence>
          {criarCriterioModal.open && criarCriterioModal.categoriaId && (
            <CriarCriterioModal
              categoriaNome={categorias.find((c) => c.id === criarCriterioModal.categoriaId)?.nome ?? ''}
              onClose={() => setCriarCriterioModal({ open: false, categoriaId: null })}
              onCreate={(nome) => addCriterio(criarCriterioModal.categoriaId!, nome)}
            />
          )}
        </AnimatePresence>
      </>
    </AnimatePresence>
  );
}