import {
  X, ChevronDown, ExternalLink, Info, Bold, Italic,
  Underline, Strikethrough, Image, AlignLeft, AlignCenter,
  AlignRight, List, ListOrdered, Maximize2, Eye, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData, PlataformaDivulgacao, PLATAFORMAS_PADRAO } from '../types/job';

/* ── logos inline das plataformas ── */
function PlatformLogo({ id, color }: { id: string; color: string }) {
  if (id === 'linkedin') return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color}>
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
  if (id === 'indeed') return (
    <span className="text-[13px] font-bold italic" style={{ color }}>indeed</span>
  );
  if (id === 'netvagas') return (
    <span className="w-7 h-7 rounded flex items-center justify-center text-white text-[11px] font-bold" style={{ background: color }}>TN</span>
  );
  if (id === 'talentcom') return (
    <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold" style={{ background: color }}>t</span>
  );
  if (id === 'pacotejobboards') return (
    <div className="flex items-center -space-x-1">
      {['#0077B5', '#003A9B', '#00A859', '#E03D3D'].map((c, i) => (
        <span key={i} className="w-5 h-5 rounded-full border-2 border-white text-[9px] text-white font-bold flex items-center justify-center" style={{ background: c, zIndex: 4 - i }}>
          {['in', 'i', 'N', 't'][i]}
        </span>
      ))}
      <span className="ml-2 text-[12px] text-gray-500 font-medium">+7</span>
    </div>
  );
  if (id === 'ondetrabalhar') return (
    <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: color }}>OT</span>
  );
  return <span className="w-6 h-6 rounded bg-gray-300" />;
}

/* ── toggle reutilizável ── */
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none flex-shrink-0 ${value ? 'bg-purple-600' : 'bg-gray-300'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

/* ── checkbox com borda tracejada ── */
function DashedCheckbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      onClick={onChange}
      className="flex items-center gap-2 cursor-pointer mt-2 px-3 py-2 rounded border border-dashed border-gray-300 hover:border-purple-400 select-none"
    >
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-[12px] text-gray-600">{label}</span>
    </label>
  );
}

/* ── card de item do formulário de inscrição ── */
interface FormItemProps {
  label: string;
  active: boolean;
  onToggle: () => void;
  obrigatorio?: boolean;
  onObrigatorio?: () => void;
  extra?: React.ReactNode;
}
function FormItem({ label, active, onToggle, obrigatorio, onObrigatorio, extra }: FormItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-1 min-h-[88px]">
      <div className="flex items-center gap-3">
        <Toggle value={active} onChange={onToggle} />
        <span className="text-[13px] text-gray-800 leading-snug">{label}</span>
      </div>
      {active && onObrigatorio !== undefined && (
        <DashedCheckbox
          checked={obrigatorio ?? false}
          onChange={onObrigatorio}
          label="Tornar obrigatório"
        />
      )}
      {extra}
    </div>
  );
}

interface DivulgacaoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function DivulgacaoSideSheet({ data, onClose, onSave }: DivulgacaoSideSheetProps) {
  /* ── estado local ── */
  const [divulgar, setDivulgar] = useState(data.divulgarVaga ?? true);
  const [quemVe, setQuemVe] = useState(data.quemPodeVerVaga ?? 'Pública');
  const [pagina, setPagina] = useState(data.paginaVagas ?? 'Padrão');
  const [plataformas, setPlataformas] = useState<PlataformaDivulgacao[]>(
    data.plataformasDivulgacaoList ?? PLATAFORMAS_PADRAO.map(p => ({ ...p }))
  );

  // Formulário de inscrição
  const [linkedin, setLinkedin] = useState(data.pedirLinkedIn ?? true);
  const [linkedinOb, setLinkedinOb] = useState(data.linkedInObrigatorio ?? true);
  const [pretensao, setPretensao] = useState(data.pedirPretensaoSalarial ?? true);
  const [pretensaoOb, setPretensaoOb] = useState(data.pretensaoSalarialObrigatoria ?? true);
  const [curriculo, setCurriculo] = useState(data.pedirCurriculo ?? true);
  const [curriculoOb, setCurriculoOb] = useState(data.curriculoObrigatorio ?? true);
  const [localizacao, setLocalizacao] = useState(data.pedirLocalizacaoCandidato ?? true);
  const [localizacaoOb, setLocalizacaoOb] = useState(data.localizacaoCandidatoObrigatoria ?? true);
  const [disponibilidade, setDisponibilidade] = useState(data.perguntarDisponibilidade ?? true);
  const [disponibilidadeOb, setDisponibilidadeOb] = useState(data.disponibilidadeObrigatoria ?? true);
  const [indicacao, setIndicacao] = useState(data.pedirIndicacao ?? false);

  // Publicação
  const [nomeVaga, setNomeVaga] = useState(data.nomeVagaDivulgacao ?? data.titulo ?? '');
  const [template, setTemplate] = useState(data.templateDescricao ?? '');
  const [infoVaga, setInfoVaga] = useState(
    data.informacoesVaga ??
    '<strong>Principais atividades e responsabilidades</strong>\n\n- Gerenciar projetos prezando pelo cumprimento dos prazos e garantindo que estejam dentro dos custos preestabelecidos.\n\n- Conduzir ações estratégicas e analisar seus impactos para a empresa.\n\n- Planejar e supervisionar atividades de atualização tecnológica dos sistemas.'
  );

  const togglePlataforma = (id: string) => {
    setPlataformas(prev =>
      prev.map(p => (p.id === id ? { ...p, ativa: !p.ativa } : p))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      divulgarVaga: divulgar,
      quemPodeVerVaga: quemVe,
      paginaVagas: pagina,
      plataformasDivulgacaoList: plataformas,
      pedirLinkedIn: linkedin,
      linkedInObrigatorio: linkedinOb,
      pedirPretensaoSalarial: pretensao,
      pretensaoSalarialObrigatoria: pretensaoOb,
      pedirCurriculo: curriculo,
      curriculoObrigatorio: curriculoOb,
      pedirLocalizacaoCandidato: localizacao,
      localizacaoCandidatoObrigatoria: localizacaoOb,
      perguntarDisponibilidade: disponibilidade,
      disponibilidadeObrigatoria: disponibilidadeOb,
      pedirIndicacao: indicacao,
      nomeVagaDivulgacao: nomeVaga,
      templateDescricao: template,
      informacoesVaga: infoVaga,
    });
    onClose();
  };

  const quemVeDescricoes: Record<string, string> = {
    'Pública': 'Pública: visível a todos na página de vagas.',
    'Privada': 'Privada: visível apenas para quem tiver o link.',
    'Somente internos': 'Somente internos: visível apenas para colaboradores.',
  };
  const paginaDescricoes: Record<string, string> = {
    'Padrão': 'Qualquer pessoa pode ver e encontrar esta página.',
    'Personalizada': 'Página personalizada para sua empresa.',
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[900px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-[18px] font-semibold text-gray-900">Divulgação da vaga</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-7 space-y-7">

              {/* Sim / Não */}
              <div>
                <p className="text-[14px] font-semibold text-gray-800 mb-3">Você quer divulgar a vaga?</p>
                <div className="flex gap-0">
                  {(['Sim', 'Não'] as const).map((opt, i) => (
                    <button
                      key={opt} type="button"
                      onClick={() => setDivulgar(opt === 'Sim')}
                      className={`px-6 py-2 text-[13px] font-medium border transition-colors
                        ${i === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}
                        ${(divulgar && opt === 'Sim') || (!divulgar && opt === 'Não')
                          ? 'bg-white border-purple-500 text-purple-700 ring-1 ring-purple-500 z-10 relative'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibilidade + Página */}
              {divulgar && (
                <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-5">
                    {/* Quem pode ver */}
                    <div>
                      <label className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 mb-2">
                        Quem pode ver essa vaga? <span className="text-purple-500">*</span>
                        <span title="Define a visibilidade da vaga para candidatos">
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          value={quemVe}
                          onChange={e => setQuemVe(e.target.value)}
                          className="w-full appearance-none px-4 py-2.5 border border-purple-400 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                        >
                          {['Pública', 'Privada', 'Somente internos'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      <p className="flex items-center gap-1.5 mt-2 text-[12px] text-gray-500">
                        <span className="text-gray-400">🌐</span>
                        {quemVeDescricoes[quemVe] ?? ''}
                      </p>
                    </div>

                    {/* Página de vagas */}
                    <div>
                      <label className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 mb-2">
                        A qual Página de Vagas você quer vincular a vaga? <span className="text-purple-500">*</span>
                        <span title="Escolha a página onde esta vaga será exibida">
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <select
                            value={pagina}
                            onChange={e => setPagina(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 border border-purple-400 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                          >
                            {['Padrão', 'Personalizada', 'Outra'].map(o => <option key={o}>{o}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-4 py-2.5 border border-purple-500 text-purple-600 rounded-lg text-[13px] font-medium hover:bg-purple-50 transition-colors whitespace-nowrap"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver página
                        </button>
                      </div>
                      <p className="flex items-center gap-1.5 mt-2 text-[12px] text-gray-500">
                        <span className="text-gray-400">🌐</span>
                        {paginaDescricoes[pagina] ?? ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Plataformas */}
              {divulgar && (
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="flex items-center gap-2 text-[14px] font-semibold text-gray-800 mb-4">
                    Plataforma online de divulgação
                    <span title="Plataformas onde a vaga será publicada automaticamente">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {plataformas.map((plat) => (
                      <div key={plat.id} className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-b-0">
                        {/* Logo + nome */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex-shrink-0 flex items-center justify-center w-8">
                            <PlatformLogo id={plat.id} color={plat.logoColor} />
                          </div>
                          <span className="text-[13px] text-gray-800 truncate">{plat.nome}</span>
                          {plat.ativa && !plat.comRestricoes && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[11px] rounded-full font-medium flex-shrink-0">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              Ativado
                            </span>
                          )}
                          {plat.comRestricoes && (
                            <>
                              <span className="w-5 h-5 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-gray-300" />
                              </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-[11px] rounded-full font-medium flex-shrink-0">
                                Ver restrições
                              </span>
                            </>
                          )}
                          {plat.ativa && !plat.comRestricoes && (
                            <span className="w-5 h-5 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-gray-300" />
                            </span>
                          )}
                        </div>

                        {/* Ação */}
                        {plat.comRestricoes ? (
                          <button
                            type="button"
                            className="flex-shrink-0 px-4 py-1.5 border border-purple-500 text-purple-600 rounded-lg text-[12px] font-medium hover:bg-purple-50 transition-colors"
                          >
                            Configurar
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => togglePlataforma(plat.id)}
                            className="flex-shrink-0 px-4 py-1.5 border border-purple-500 text-purple-600 rounded-lg text-[12px] font-medium hover:bg-purple-50 transition-colors"
                          >
                            {plat.ativa ? 'Desativar' : 'Ativar'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Configurações do formulário de inscrição */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-[14px] font-semibold text-gray-800 mb-4">
                  Configurações do formulário de inscrição
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <FormItem
                    label="Pedir perfil do LinkedIn"
                    active={linkedin}
                    onToggle={() => { setLinkedin(v => !v); if (linkedin) setLinkedinOb(false); }}
                    obrigatorio={linkedinOb}
                    onObrigatorio={() => setLinkedinOb(v => !v)}
                  />
                  <FormItem
                    label="Pedir pretensão salarial"
                    active={pretensao}
                    onToggle={() => { setPretensao(v => !v); if (pretensao) setPretensaoOb(false); }}
                    obrigatorio={pretensaoOb}
                    onObrigatorio={() => setPretensaoOb(v => !v)}
                  />
                  <FormItem
                    label="Pedir anexo de currículo"
                    active={curriculo}
                    onToggle={() => { setCurriculo(v => !v); if (curriculo) setCurriculoOb(false); }}
                    obrigatorio={curriculoOb}
                    onObrigatorio={() => setCurriculoOb(v => !v)}
                  />
                  <FormItem
                    label="Pedir localização"
                    active={localizacao}
                    onToggle={() => { setLocalizacao(v => !v); if (localizacao) setLocalizacaoOb(false); }}
                    obrigatorio={localizacaoOb}
                    onObrigatorio={() => setLocalizacaoOb(v => !v)}
                  />
                  <FormItem
                    label="Perguntar ao talento sobre disponibilidade para modelo presencial."
                    active={disponibilidade}
                    onToggle={() => { setDisponibilidade(v => !v); if (disponibilidade) setDisponibilidadeOb(false); }}
                    obrigatorio={disponibilidadeOb}
                    onObrigatorio={() => setDisponibilidadeOb(v => !v)}
                    extra={
                      disponibilidade ? (
                        <button
                          type="button"
                          className="flex items-center gap-1 mt-1 text-[12px] text-purple-600 hover:underline self-end"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                          Ver pergunta
                        </button>
                      ) : null
                    }
                  />
                  <FormItem
                    label="Pedir indicação"
                    active={indicacao}
                    onToggle={() => setIndicacao(v => !v)}
                  />
                </div>
              </div>

              {/* Nome da vaga */}
              <div>
                <label className="flex items-center gap-1 text-[14px] font-semibold text-gray-800 mb-2">
                  Nome da vaga para divulgação <span className="text-purple-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nomeVaga}
                    onChange={e => setNomeVaga(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  />
                  {nomeVaga && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Template */}
              <div>
                <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                  Template de descrição da vaga
                </label>
                <div className="relative">
                  <select
                    value={template}
                    onChange={e => setTemplate(e.target.value)}
                    className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg text-[13px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                  >
                    <option value="">Selecione um template</option>
                    {['Gerente de Projetos', 'Desenvolvedor Frontend', 'Analista de Dados', 'Designer UX/UI', 'Analista de RH'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Informações da vaga — mock rich text */}
              <div>
                <label className="flex items-center gap-1 text-[14px] font-semibold text-gray-800 mb-2">
                  Informações da vaga <span className="text-purple-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap">
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Bold className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Italic className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Underline className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Strikethrough className="w-3.5 h-3.5" /></button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Image className="w-3.5 h-3.5" /></button>
                    <select className="text-[11px] border border-gray-300 rounded px-1.5 py-1 bg-white text-gray-600 focus:outline-none">
                      <option>Simples</option>
                      <option>Título 1</option>
                      <option>Título 2</option>
                    </select>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><AlignLeft className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><AlignCenter className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><AlignRight className="w-3.5 h-3.5" /></button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><ListOrdered className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><List className="w-3.5 h-3.5" /></button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Maximize2 className="w-3.5 h-3.5" /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"><Eye className="w-3.5 h-3.5" /></button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <select className="text-[11px] border border-gray-300 rounded px-1.5 py-1 bg-white text-gray-600 focus:outline-none">
                      <option>Helvetica</option>
                      <option>Arial</option>
                      <option>Georgia</option>
                    </select>
                    <select className="text-[11px] border border-gray-300 rounded px-1.5 py-1 bg-white text-gray-600 focus:outline-none w-14">
                      <option>14px</option>
                      <option>12px</option>
                      <option>16px</option>
                      <option>18px</option>
                    </select>
                    <span className="ml-auto text-gray-400 text-[18px] leading-none">···</span>
                  </div>
                  {/* Área de texto */}
                  <textarea
                    rows={10}
                    value={infoVaga}
                    onChange={e => setInfoVaga(e.target.value)}
                    className="w-full px-5 py-4 text-[13px] text-gray-800 resize-none focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
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
