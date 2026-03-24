import {
  X, Bold, Italic, Underline, Strikethrough, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Maximize2, Minimize2, Eye, MoreHorizontal,
  ChevronDown, Info, Type,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { JobData } from '../types/job';

/* ── Conteúdos dos templates ── */
const TEMPLATE_CONTENTS: Record<string, string> = {
  confirmacao_1:
    '<p>Olá, {{Primeiro Nome do Talento}}! Recebemos sua candidatura para a vaga de {{Nome da Vaga}}.</p><p>Nossa equipe irá analisar o seu perfil e entraremos em contato em breve.</p><p>Atenciosamente,<br>Equipe {{Empresa}}</p>',
  confirmacao_2:
    '<p>Olá, {{Primeiro Nome do Talento}}! Sua jornada no processo seletivo da vaga de {{Nome da Vaga}} começou!</p><p>Agradecemos muito a sua inscrição e o seu interesse pela nossa vaga! Aguarde as próximas comunicações.</p><p>Qualquer dúvida, basta entrar em contato conosco.</p><p>Até mais e boa sorte no processo!</p>',
  confirmacao_3:
    '<p>Prezado(a) {{Primeiro Nome do Talento}},</p><p>Confirmamos o recebimento da sua inscrição para a posição de {{Nome da Vaga}} na {{Empresa}}.</p><p>Iremos analisar as candidaturas e entrar em contato com os selecionados para as próximas etapas.</p><p>Obrigado pelo seu interesse!</p>',
};

const TEMPLATE_OPTIONS = [
  { value: 'confirmacao_1', label: '[InHire] Confirmação de Inscrição 1' },
  { value: 'confirmacao_2', label: '[InHire] Confirmação de Inscrição 2' },
  { value: 'confirmacao_3', label: '[InHire] Confirmação de Inscrição 3' },
];

const VARIABLES = [
  '{{Nome da Vaga}}',
  '{{Primeiro Nome do Talento}}',
  '{{Nome Completo do Talento}}',
  '{{Empresa}}',
  '{{Link da Vaga}}',
  '{{Data de Inscrição}}',
];

const STYLE_OPTIONS = [
  { value: 'p',  label: 'Normal' },
  { value: 'h1', label: 'Título 1' },
  { value: 'h2', label: 'Título 2' },
  { value: 'h3', label: 'Título 3' },
  { value: 'pre', label: 'Pré-formatado' },
];

const FONT_OPTIONS = ['Monospace', 'Arial', 'Georgia', 'Times New Roman', 'Courier New'];

/* ── helpers ── */
function countWords(html: string) {
  const text = html.replace(/<[^>]+>/g, ' ').trim();
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/* ── Botão da toolbar ── */
function TBtn({
  onMouseDown,
  title,
  active,
  children,
  className = '',
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  title?: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onMouseDown(e); }}
      className={`p-1 rounded transition-colors text-gray-600 hover:bg-gray-200 hover:text-gray-900 ${active ? 'bg-gray-200 text-gray-900' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

/* ── Separador da toolbar ── */
function TSep() {
  return <div className="w-px h-4 bg-gray-300 mx-0.5 self-center flex-shrink-0" />;
}

/* ── Dropdown genérico da toolbar ── */
function TDropdown({
  label,
  options,
  onSelect,
  open,
  onToggle,
}: {
  label: React.ReactNode;
  options: { value: string; label: string }[];
  onSelect: (v: string) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onToggle(); }}
        className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[12px] text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap"
      >
        {label}
        <ChevronDown className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden"
          >
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); onSelect(o.value); }}
                className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Select customizado do template ── */
function TemplateSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = TEMPLATE_OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setOpen((v) => !v)}
        className="flex items-center px-4 py-2.5 border-2 border-purple-400 rounded-lg cursor-pointer bg-white gap-2"
      >
        <span className={`flex-1 text-[13px] ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
          {selected?.label ?? 'Selecione um template...'}
        </span>
        {value && (
          <button
            type="button"
            onMouseDown={(e) => { e.stopPropagation(); onChange(''); }}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {TEMPLATE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-purple-50 transition-colors ${value === opt.value ? 'text-purple-700 bg-purple-50' : 'text-gray-700'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════ PROPS ════ */
interface ConfirmacaoInscricaoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function ConfirmacaoInscricaoSideSheet({
  data,
  onClose,
  onSave,
}: ConfirmacaoInscricaoSideSheetProps) {
  const [enviarEmail, setEnviarEmail] = useState<boolean>(data.enviarEmailConfirmacao ?? true);
  const [template, setTemplate] = useState(data.templateEmailConfirmacao ?? 'confirmacao_2');
  const [assunto, setAssunto] = useState(
    data.assuntoEmailConfirmacao ?? 'Confirmação de Inscrição - {{Nome da Vaga}}'
  );
  const [modoEnvio, setModoEnvio] = useState<'proprio' | 'sistema'>(
    data.modoEnvioEmail ?? 'sistema'
  );
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /* toolbar dropdowns */
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const toggleDrop = (name: string) => setOpenDrop((v) => (v === name ? null : name));

  const editorRef = useRef<HTMLDivElement>(null);
  const savedSel = useRef<Range | null>(null);

  /* ── inicializa editor ── */
  useEffect(() => {
    const initial = data.corpoEmailConfirmacao ?? TEMPLATE_CONTENTS['confirmacao_2'];
    if (editorRef.current) {
      editorRef.current.innerHTML = initial;
      setWordCount(countWords(initial));
    }
  }, []);

  /* ── fecha dropdowns ao clicar fora ── */
  useEffect(() => {
    const handler = () => setOpenDrop(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  /* ── troca de template ── */
  const handleTemplateChange = (val: string) => {
    setTemplate(val);
    if (val && editorRef.current) {
      editorRef.current.innerHTML = TEMPLATE_CONTENTS[val] ?? '';
      setWordCount(countWords(editorRef.current.innerHTML));
    }
  };

  /* ── atualiza word count ── */
  const handleEditorInput = () => {
    if (editorRef.current) setWordCount(countWords(editorRef.current.innerHTML));
  };

  /* ── formata texto ── */
  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
  };

  /* ── salva seleção antes de abrir dropdown de variáveis ── */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedSel.current = sel.getRangeAt(0);
    }
  };

  const insertVariable = (v: string) => {
    editorRef.current?.focus();
    if (savedSel.current) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(savedSel.current);
    }
    document.execCommand('insertText', false, v);
    setOpenDrop(null);
    handleEditorInput();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      enviarEmailConfirmacao: enviarEmail,
      templateEmailConfirmacao: template,
      assuntoEmailConfirmacao: assunto,
      corpoEmailConfirmacao: editorRef.current?.innerHTML ?? '',
      modoEnvioEmail: modoEnvio,
    });
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
          className="fixed top-0 right-0 h-full w-[780px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[17px] font-semibold text-gray-900">Confirmação de Inscrição</h2>
              <p className="text-[12px] text-gray-500 mt-1">
                O talento receberá esse e-mail após se inscrever na vaga através da página da vaga.
              </p>
            </div>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* ── Corpo ── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

              {/* Sim / Não */}
              <div>
                <p className="text-[13px] font-semibold text-gray-800 mb-3">
                  Deseja configurar um e-mail de confirmação de inscrição?
                </p>
                <div className="flex items-center gap-2">
                  {(['Sim', 'Não'] as const).map((opt) => {
                    const active = opt === 'Sim' ? enviarEmail : !enviarEmail;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setEnviarEmail(opt === 'Sim')}
                        className={`px-6 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          active
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formulário (apenas quando Sim) */}
              <AnimatePresence>
                {enviarEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-5"
                  >
                    {/* Templates de E-mail */}
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                        Templates de E-mail
                      </label>
                      <TemplateSelect value={template} onChange={handleTemplateChange} />
                    </div>

                    {/* Assunto do E-mail */}
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                        Assunto do E-mail{' '}
                        <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-purple-400 rounded-lg text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Corpo da Mensagem */}
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                        Corpo da Mensagem{' '}
                        <span className="text-purple-500">*</span>
                      </label>

                      {/* Editor container */}
                      <div className={`border border-gray-300 rounded-lg overflow-hidden transition-all ${isFullscreen ? 'fixed inset-4 z-[100] flex flex-col' : ''}`}>

                        {/* Toolbar */}
                        <div
                          className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-gray-50 border-b border-gray-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* B I U S */}
                          <TBtn onMouseDown={() => exec('bold')} title="Negrito"><span className="text-[13px] font-bold px-0.5">B</span></TBtn>
                          <TBtn onMouseDown={() => exec('italic')} title="Itálico"><span className="text-[13px] italic px-0.5">I</span></TBtn>
                          <TBtn onMouseDown={() => exec('underline')} title="Sublinhado"><span className="text-[13px] underline px-0.5">U</span></TBtn>
                          <TBtn onMouseDown={() => exec('strikeThrough')} title="Tachado"><span className="text-[13px] line-through px-0.5">S</span></TBtn>

                          <TSep />

                          {/* Imagem */}
                          <TBtn
                            onMouseDown={() => {
                              const url = window.prompt('URL da imagem:');
                              if (url) exec('insertImage', url);
                            }}
                            title="Inserir imagem"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                          </TBtn>

                          <TSep />

                          {/* Variáveis */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); saveSelection(); toggleDrop('vars'); }}
                              className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[12px] text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap"
                            >
                              Variáveis <ChevronDown className="w-3 h-3" />
                            </button>
                            <AnimatePresence>
                              {openDrop === 'vars' && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[220px] overflow-hidden"
                                >
                                  {VARIABLES.map((v) => (
                                    <button
                                      key={v}
                                      type="button"
                                      onMouseDown={(e) => { e.preventDefault(); insertVariable(v); }}
                                      className="w-full text-left px-4 py-2 text-[12px] text-purple-700 font-mono hover:bg-purple-50 transition-colors"
                                    >
                                      {v}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Estilo / Simples */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <TDropdown
                              label="Simples"
                              options={STYLE_OPTIONS}
                              onSelect={(v) => exec('formatBlock', v)}
                              open={openDrop === 'style'}
                              onToggle={() => toggleDrop('style')}
                            />
                          </div>

                          {/* Limpar formatação */}
                          <TBtn onMouseDown={() => exec('removeFormat')} title="Limpar formatação">
                            <Type className="w-3.5 h-3.5" />
                          </TBtn>

                          <TSep />

                          {/* Alinhamento */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); toggleDrop('align'); }}
                              className="flex items-center gap-0.5 p-1 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                            >
                              <AlignLeft className="w-3.5 h-3.5" />
                              <ChevronDown className="w-3 h-3" />
                            </button>
                            <AnimatePresence>
                              {openDrop === 'align' && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                                >
                                  {[
                                    { cmd: 'justifyLeft',   icon: AlignLeft,    label: 'Esquerda' },
                                    { cmd: 'justifyCenter', icon: AlignCenter,  label: 'Centro' },
                                    { cmd: 'justifyRight',  icon: AlignRight,   label: 'Direita' },
                                    { cmd: 'justifyFull',   icon: AlignJustify, label: 'Justificado' },
                                  ].map(({ cmd, icon: Icon, label }) => (
                                    <button
                                      key={cmd}
                                      type="button"
                                      onMouseDown={(e) => { e.preventDefault(); exec(cmd); setOpenDrop(null); }}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors"
                                    >
                                      <Icon className="w-4 h-4" /> {label}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Listas */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); toggleDrop('list'); }}
                              className="flex items-center gap-0.5 p-1 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                            >
                              <List className="w-3.5 h-3.5" />
                              <ChevronDown className="w-3 h-3" />
                            </button>
                            <AnimatePresence>
                              {openDrop === 'list' && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                                >
                                  {[
                                    { cmd: 'insertUnorderedList', icon: List,        label: 'Lista com marcadores' },
                                    { cmd: 'insertOrderedList',   icon: ListOrdered, label: 'Lista numerada' },
                                  ].map(({ cmd, icon: Icon, label }) => (
                                    <button
                                      key={cmd}
                                      type="button"
                                      onMouseDown={(e) => { e.preventDefault(); exec(cmd); setOpenDrop(null); }}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors whitespace-nowrap"
                                    >
                                      <Icon className="w-4 h-4" /> {label}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Indentação dropdown */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); toggleDrop('indent'); }}
                              className="flex items-center gap-0.5 p-1 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                            >
                              <ListOrdered className="w-3.5 h-3.5" />
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>

                          <TSep />

                          {/* Fullscreen */}
                          <TBtn
                            onMouseDown={() => setIsFullscreen((v) => !v)}
                            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                          >
                            {isFullscreen
                              ? <Minimize2 className="w-3.5 h-3.5" />
                              : <Maximize2 className="w-3.5 h-3.5" />
                            }
                          </TBtn>

                          {/* Preview */}
                          <TBtn
                            onMouseDown={() => setShowPreview((v) => !v)}
                            title="Pré-visualização"
                            active={showPreview}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </TBtn>

                          <TSep />

                          {/* Outdent / Indent */}
                          <TBtn onMouseDown={() => exec('outdent')} title="Diminuir recuo">
                            <span className="text-[12px] px-0.5">⇤</span>
                          </TBtn>
                          <TBtn onMouseDown={() => exec('indent')} title="Aumentar recuo">
                            <span className="text-[12px] px-0.5">⇥</span>
                          </TBtn>

                          <TSep />

                          {/* Fonte */}
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); toggleDrop('font'); }}
                              className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[12px] text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap"
                            >
                              monospace <ChevronDown className="w-3 h-3" />
                            </button>
                            <AnimatePresence>
                              {openDrop === 'font' && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                                >
                                  {FONT_OPTIONS.map((f) => (
                                    <button
                                      key={f}
                                      type="button"
                                      onMouseDown={(e) => { e.preventDefault(); exec('fontName', f); setOpenDrop(null); }}
                                      className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-purple-50 transition-colors whitespace-nowrap"
                                      style={{ fontFamily: f }}
                                    >
                                      {f}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Mais */}
                          <TBtn onMouseDown={() => {}} title="Mais opções">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </TBtn>
                        </div>

                        {/* Área de conteúdo */}
                        {showPreview ? (
                          <div
                            className="p-5 min-h-[220px] text-[13px] text-gray-800 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML ?? '' }}
                          />
                        ) : (
                          <div
                            ref={editorRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleEditorInput}
                            className={`px-5 py-4 outline-none text-[13px] text-gray-800 leading-relaxed min-h-[220px] ${isFullscreen ? 'flex-1 overflow-y-auto' : ''}`}
                            style={{ wordBreak: 'break-word' }}
                          />
                        )}

                        {/* Bottom bar do editor: word count + modo de envio */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 bg-gray-50">
                          {/* Modo de envio */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                              <Info className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>Modo de envio:</span>
                            </div>
                            {(
                              [
                                { value: 'proprio', label: 'E-mail Próprio (Vinculado)' },
                                { value: 'sistema', label: 'E-mail do Sistema (InHire)' },
                              ] as { value: 'proprio' | 'sistema'; label: string }[]
                            ).map((opt) => (
                              <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer select-none">
                                <div
                                  onClick={() => setModoEnvio(opt.value)}
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    modoEnvio === opt.value ? 'border-purple-600' : 'border-gray-400'
                                  }`}
                                >
                                  {modoEnvio === opt.value && (
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                  )}
                                </div>
                                <span className="text-[12px] text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>

                          {/* Word count + branding */}
                          <div className="flex items-center gap-2 text-[11px] text-gray-400">
                            <span>{wordCount} palavras</span>
                            <span className="text-gray-300">·</span>
                            <span className="flex items-center gap-1 italic">
                              <span className="w-3 h-3 rounded-full bg-gray-400 text-white flex items-center justify-center text-[8px] font-bold">t</span>
                              tiny
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
