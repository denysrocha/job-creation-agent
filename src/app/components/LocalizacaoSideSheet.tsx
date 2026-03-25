import { X, ChevronDown, ChevronUp, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData } from '../types/job';
import { LocationAutomationEditor } from './LocationAutomationEditor';

type Modelo = 'Presencial' | 'Remoto' | 'Híbrido';

const PAISES = ['Brasil', 'Portugal', 'Estados Unidos', 'Argentina', 'México', 'Outro'];

const ESTADOS_BR: Record<string, string[]> = {
  'AC': ['Rio Branco'],
  'AL': ['Maceió'],
  'AM': ['Manaus'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
  'DF': ['Brasília'],
  'ES': ['Vitória', 'Vila Velha', 'Cariacica'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
  'MA': ['São Luís', 'Imperatriz'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
  'MS': ['Campo Grande', 'Dourados'],
  'MT': ['Cuiabá', 'Várzea Grande'],
  'PA': ['Belém', 'Ananindeua', 'Santarém'],
  'PB': ['João Pessoa', 'Campina Grande'],
  'PE': ['Recife', 'Caruaru', 'Olinda', 'Petrolina'],
  'PI': ['Teresina'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
  'RJ': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias', 'Campos dos Goytacazes'],
  'RN': ['Natal', 'Mossoró'],
  'RO': ['Porto Velho'],
  'RR': ['Boa Vista'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José'],
  'SE': ['Aracaju'],
  'SP': ['São Paulo', 'Campinas', 'São Bernardo do Campo', 'Guarulhos', 'Santo André', 'Ribeirão Preto', 'Sorocaba', 'São José dos Campos', 'Santos'],
  'TO': ['Palmas'],
};

const ESTADOS_LIST = Object.keys(ESTADOS_BR).sort();

function perguntaDisponibilidade(modelo: Modelo, cidade: string, estado: string, pais: string, complemento: string): string {
  const loc = [cidade, estado, pais].filter(Boolean).join(', ');
  const comp = complemento.trim() ? ` ${complemento.trim()}` : '';
  const modeloLabel = modelo === 'Presencial' ? 'presencial' : modelo === 'Híbrido' ? 'híbrido' : 'remoto';
  return `Você tem disponibilidade para trabalhar no modelo ${modeloLabel}${loc ? ` em ${loc}` : ''}${comp} por semana?`;
}

// Componente de preview do candidato
function CandidatoPreview({
  modelo,
  cidade,
  estado,
  pais,
  complemento,
  obrigatorio,
}: {
  modelo: Modelo;
  cidade: string;
  estado: string;
  pais: string;
  complemento: string;
  obrigatorio: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pergunta = perguntaDisponibilidade(modelo, cidade, estado, pais, complemento);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header do preview */}
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white text-left"
      >
        <span className="text-[14px] font-semibold text-gray-800">
          Visualização do candidato na Inscrição
        </span>
        {collapsed ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* Abas */}
          <div className="flex gap-6 border-b border-gray-200">
            <button
              type="button"
              className="pb-2 text-[13px] text-purple-600 border-b-2 border-purple-600 font-medium"
            >
              1. Informações
            </button>
            <button
              type="button"
              className="pb-2 text-[13px] text-gray-400"
            >
              2. Diversidade
            </button>
          </div>

          {/* Campo cidade (simulado/blurred) */}
          <div>
            <p className="text-[12px] text-gray-500 mb-1.5">Cidade</p>
            <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 text-[13px] blur-[2px] select-none">
              Informe sua cidade
            </div>
          </div>

          {/* Pergunta de disponibilidade */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-[14px] text-gray-800 leading-relaxed">
              {pergunta}
              {obrigatorio && <span className="text-purple-600 ml-1">*</span>}
            </p>
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                <span className="text-[13px] text-gray-700">Sim</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                <span className="text-[13px] text-gray-700">Não</span>
              </label>
            </div>
          </div>

          {/* Botão avançar desabilitado */}
          <button
            type="button"
            disabled
            className="w-full py-3 bg-gray-200 text-gray-400 rounded-lg text-[13px] font-medium cursor-not-allowed blur-[1px]"
          >
            Avançar
          </button>
        </div>
      )}
    </div>
  );
}

interface LocalizacaoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
  openAutomationDirectly?: boolean;
}

export function LocalizacaoSideSheet({ data, onClose, onSave, openAutomationDirectly }: LocalizacaoSideSheetProps) {
  const [modelo, setModelo] = useState<Modelo>(
    (data.modeloTrabalho as Modelo) ?? 'Presencial'
  );
  const [pais, setPais] = useState(data.pais ?? 'Brasil');
  const [estado, setEstado] = useState(data.estado ?? '');
  const [cidade, setCidade] = useState(data.cidade ?? '');
  const [perguntarDisp, setPerguntarDisp] = useState(data.perguntarDisponibilidade ?? true);
  const [dispObrigatoria, setDispObrigatoria] = useState(data.disponibilidadeObrigatoria ?? true);
  const [complemento, setComplemento] = useState(data.complementoDisponibilidade ?? '');

  // Automação
  const [isAutomacaoOpen, setIsAutomacaoOpen] = useState(openAutomationDirectly ?? false);
  const [automacaoConfig, setAutomacaoConfig] = useState<any>({});

  const cidadesDoEstado = ESTADOS_BR[estado] ?? [];

  const handleEstado = (v: string) => {
    setEstado(v);
    setCidade(''); // reset cidade ao trocar estado
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = [cidade, estado, pais].filter(Boolean).join(', ');
    onSave({
      modeloTrabalho: modelo,
      pais,
      estado,
      cidade,
      localizacao: loc,
      perguntarDisponibilidade: perguntarDisp,
      disponibilidadeObrigatoria: dispObrigatoria,
      complementoDisponibilidade: complemento,
    });
    onClose();
  };

  const modeloLabel = modelo.toLowerCase();

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
          onClick={!isAutomacaoOpen ? onClose : undefined}
        />

        {/* Sidesheet — expande quando automação abre */}
        <motion.div
          initial={{ x: '100%', width: 1060 }}
          animate={{ x: 0, width: isAutomacaoOpen ? '100vw' : 1060 }}
          exit={{ x: '100%', width: 1060 }}
          transition={{
            x: { type: 'spring', damping: 30, stiffness: 300 },
            width: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex"
        >
          {/* ── PAINEL ESQUERDO: Formulário ── */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 min-w-0 border-r border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-[18px] font-semibold text-gray-900">Localização</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

              {/* Modelo de trabalho */}
              <div>
                <p className="text-[14px] text-gray-700 mb-4">
                  Essa vaga é presencial, remota ou híbrida?
                </p>
                <div className="flex gap-0">
                  {(['Presencial', 'Remoto', 'Híbrido'] as Modelo[]).map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModelo(m)}
                      className={`px-6 py-2.5 text-[13px] font-medium border transition-colors
                        ${i === 0 ? 'rounded-l-lg' : i === 2 ? 'rounded-r-lg' : ''}
                        ${modelo === m
                          ? 'bg-white border-purple-500 text-purple-600 z-10 relative ring-1 ring-purple-500'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* País / Estado / Cidade */}
              <div className="grid grid-cols-3 gap-5">
                {/* País */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    País <span className="text-purple-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 border-2 border-purple-400 rounded-lg text-[13px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                    >
                      {PAISES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Estado <span className="text-purple-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={estado}
                      onChange={(e) => handleEstado(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg text-[13px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                    >
                      <option value="">Selecione o Estado</option>
                      {ESTADOS_LIST.map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Cidade <span className="text-purple-500">*</span>
                  </label>
                  <div className="relative">
                    {cidadesDoEstado.length > 0 ? (
                      <select
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg text-[13px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                      >
                        <option value="">Selecione a cidade</option>
                        {cidadesDoEstado.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Selecione a cidade"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                    {cidadesDoEstado.length > 0 && (
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>

              {/* Seção condicional de disponibilidade */}
              <div className="space-y-5">
                <p className="text-[13px] text-gray-700">
                  Já que você marcou <span className="font-semibold capitalize">{modelo}</span>, gostaria de:
                </p>

                {/* Toggle + checkbox */}
                <div className="flex items-center gap-5 flex-wrap">
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setPerguntarDisp((v) => {
                        if (v) setDispObrigatoria(false);
                        return !v;
                      });
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none flex-shrink-0 ${
                      perguntarDisp ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        perguntarDisp ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <span className="text-[13px] text-gray-700">
                    Perguntar ao talento sobre disponibilidade para modelo {modeloLabel}.
                  </span>

                  {/* Checkbox tornar obrigatório */}
                  <label
                    className={`flex items-center gap-2 select-none ${perguntarDisp ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                  >
                    <span
                      onClick={() => perguntarDisp && setDispObrigatoria((v) => !v)}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                        dispObrigatoria && perguntarDisp
                          ? 'bg-purple-600 border-purple-600'
                          : 'bg-white border-gray-300'
                      } ${perguntarDisp ? 'hover:border-purple-400' : ''}`}
                    >
                      {dispObrigatoria && perguntarDisp && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[13px] text-gray-700">Tornar obrigatório</span>
                  </label>
                </div>

                {/* Complementar pergunta */}
                {perguntarDisp && (
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                      Complementar pergunta
                    </label>
                    <textarea
                      rows={2}
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      placeholder="Digite o complemento e veja ao lado: Ex: 2x"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[13px] text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* ── Botão Automação — no final do body do form ── */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[13px] text-gray-500 mb-3">Automação vinculada</p>
                <button
                  type="button"
                  onClick={() => setIsAutomacaoOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-green-400 text-green-600 text-[13px] font-medium hover:bg-green-50 hover:border-green-500 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  <span>Automação ativa</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
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

          {/* ── PAINEL DIREITO: Candidato Preview ── */}
          <CandidatoPreview
            modelo={modelo}
            cidade={cidade}
            estado={estado}
            pais={pais}
            complemento={complemento}
            obrigatorio={dispObrigatoria && perguntarDisp}
          />
        </motion.div>

        {/* Painel de Automação — desliza por cima */}
        <AnimatePresence>
          {isAutomacaoOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 bg-black/20 z-[52]"
                onClick={() => setIsAutomacaoOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 right-0 h-full w-[700px] bg-white shadow-2xl z-[55] flex flex-col border-l border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-7 py-5 border-b border-gray-200 flex-shrink-0">
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900">Automação — Localização</h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">Reprova candidatos por modelo/localização automaticamente</p>
                  </div>
                  <button type="button" onClick={() => setIsAutomacaoOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-7 py-6">
                  <LocationAutomationEditor
                    config={automacaoConfig}
                    onChange={setAutomacaoConfig}
                  />
                </div>
                <div className="flex items-center justify-between px-7 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                  <button type="button" onClick={() => setIsAutomacaoOpen(false)}
                    className="px-5 py-2 border border-gray-300 rounded-md text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                    Cancelar
                  </button>
                  <button type="button" onClick={() => setIsAutomacaoOpen(false)}
                    className="px-5 py-2 bg-purple-600 text-white rounded-md text-[13px] hover:bg-purple-700 font-medium">
                    Salvar automação
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </>
    </AnimatePresence>
  );
}