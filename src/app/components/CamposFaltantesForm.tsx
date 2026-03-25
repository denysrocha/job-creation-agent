import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CamposFaltantesData } from '../types/jdAnalysis';
import { CampoPersonalizadoVaga } from '../types/job';
import { CAMPOS_CONFIG } from './CamposPersonalizadosSideSheet';
import { REQUISICOES_MOCK } from './RequisicaoSideSheet';

interface CamposFaltantesFormProps {
  onSubmit: (data: CamposFaltantesData) => void;
  initialRequisicao?: { id: string; label: string };
  initialPosicoes?: { quantidade: number; motivo: string }[];
  hidePosicoes?: boolean;
  onlyCamposPersonalizados?: boolean;
}

// ── Select options ─────────────────────────────────────────────────────────────

const AREAS_OPCOES = [
  'Tecnologia', 'Produto', 'Dados & Analytics', 'Design', 'Marketing',
  'Comercial / Vendas', 'Recursos Humanos', 'Financeiro', 'Operações',
  'Jurídico', 'Customer Success', 'DevOps / Infra',
];

const CLIENTES_OPCOES = [
  'InHire', 'Banco Inter', 'Nubank', 'iFood', 'Stone', 'Mercado Livre',
  'Ambev', 'Itaú', 'Bradesco', 'Totvs', 'Embraer',
];

// ── Small helpers ──────────────────────────────────────────────────────────────

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span style={{ fontSize: '12px' }} className="font-medium text-gray-700">{children}</span>
      {optional && <span style={{ fontSize: '12px' }} className="text-gray-400">(opcional)</span>}
    </div>
  );
}

function SelectField({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700 pr-8"
      >
        <option value="">{placeholder || 'Selecione...'}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ── Avaliadores chip-autocomplete ─────────────────────────────────────���────────

const avaliadoresDisponiveis = [
  'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Paula',
  'Carlos Eduardo', 'Juliana Oliveira', 'Roberto Alves', 'Fernanda Lima',
];

function AvaliadoresInput({
  avaliadores,
  onChange,
}: {
  avaliadores: string[];
  onChange: (v: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = inputValue.trim()
    ? avaliadoresDisponiveis.filter(
        a => a.toLowerCase().includes(inputValue.toLowerCase()) && !avaliadores.includes(a)
      )
    : [];

  useEffect(() => {
    setShowSuggestions(filtered.length > 0);
  }, [inputValue, avaliadores]);

  const add = (a: string) => {
    if (a.trim() && !avaliadores.includes(a)) {
      onChange([...avaliadores, a]);
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const remove = (a: string) => onChange(avaliadores.filter(x => x !== a));

  return (
    <div className="relative">
      <div className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent flex flex-wrap gap-1.5 items-center">
        {avaliadores.map(a => (
          <span key={a} className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-xs">
            {a}
            <button type="button" onClick={() => remove(a)} className="hover:text-purple-900 ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (inputValue.trim()) add(inputValue); } }}
          onFocus={() => inputValue && setShowSuggestions(filtered.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="flex-1 min-w-[160px] outline-none bg-transparent text-sm"
          placeholder={avaliadores.length === 0 ? 'Buscar avaliadores...' : ''}
        />
      </div>
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-44 overflow-y-auto"
          >
            {filtered.map(s => (
              <button
                key={s}
                type="button"
                onMouseDown={() => add(s)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-purple-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {avaliadores.length === 0 && (
        <p className="text-xs text-gray-400 mt-1">Pressione Enter ou selecione uma sugestão</p>
      )}
    </div>
  );
}

// ── Requisições multi-select (mesmo modelo do RequisicaoSideSheet) ────────────

const motivosReabertura = [
  'Substituição', 'Expansão de time', 'Promoção interna', 'Nova área', 'Aumento de quadro',
];

function RequisicoesInput({
  requisicoes,
  onChange,
  extraOption,
}: {
  requisicoes: string[];
  onChange: (v: string[]) => void;
  extraOption?: { id: string; label: string };
}) {
  const handleChange = (index: number, value: string) => {
    const updated = [...requisicoes];
    updated[index] = value;
    onChange(updated);
  };

  const handleAdd = () => onChange([...requisicoes, '']);

  const handleRemove = (index: number) => {
    const updated = requisicoes.filter((_, i) => i !== index);
    onChange(updated.length > 0 ? updated : []);
  };

  // Merge extra option into the list if not already in REQUISICOES_MOCK
  const allOptions = [
    ...(extraOption && !REQUISICOES_MOCK.some(r => r.id === extraOption.id)
      ? [{ id: extraOption.id, label: extraOption.label }]
      : []),
    ...REQUISICOES_MOCK,
  ];

  return (
    <div className="space-y-2">
      {requisicoes.map((req, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={req}
              onChange={e => handleChange(index, e.target.value)}
              className="w-full appearance-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700 pr-8"
            >
              <option value="">Selecione uma requisição</option>
              {allOptions.filter(r => r.id === req || !requisicoes.includes(r.id)).map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 underline"
      >
        <Plus className="w-3 h-3" />
        Adicionar requisição
      </button>
    </div>
  );
}

// ── Campos personalizados (mesmo modelo do CamposPersonalizadosSideSheet) ──────

function CamposPersonalizadosInput({
  campos,
  onChange,
}: {
  campos: CampoPersonalizadoVaga[];
  onChange: (v: CampoPersonalizadoVaga[]) => void;
}) {
  const setValue = (id: string, valor: string) => {
    onChange(campos.map(c => c.id === id ? { ...c, valor } : c));
  };

  return (
    <div className="space-y-3">
      {campos.map(campo => (
        <div key={campo.id}>
          <label style={{ fontSize: '12px' }} className="block text-gray-600 mb-1">
            {campo.nome}
            {campo.obrigatorio && <span className="text-purple-500 ml-1">*</span>}
          </label>
          {campo.tipo === 'select' ? (
            <div className="relative">
              <select
                value={campo.valor}
                onChange={e => setValue(campo.id, e.target.value)}
                className="w-full appearance-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700 pr-8"
              >
                <option value="">Selecione uma opção</option>
                {campo.opcoes?.map(op => <option key={op} value={op}>{op}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          ) : (
            <input
              type="text"
              value={campo.valor}
              onChange={e => setValue(campo.id, e.target.value)}
              placeholder="Informe um valor"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export function CamposFaltantesForm({ onSubmit, initialRequisicao, initialPosicoes, hidePosicoes, onlyCamposPersonalizados }: CamposFaltantesFormProps) {
  const [gestor, setGestor] = useState('');
  const [avaliadores, setAvaliadores] = useState<string[]>([]);
  const [requisicoes, setRequisicoes] = useState<string[]>(() =>
    initialRequisicao ? [initialRequisicao.id] : []
  );
  const [camposPersonalizados, setCamposPersonalizados] = useState<CampoPersonalizadoVaga[]>(
    () => CAMPOS_CONFIG.map(cfg => ({ ...cfg, valor: '' }))
  );

  const handleSubmit = () => {
    const resolvedRequisicoes = requisicoes.map(id => {
      if (REQUISICOES_MOCK.some(r => r.id === id)) return id;
      if (initialRequisicao && initialRequisicao.id === id) return initialRequisicao.label;
      return id;
    });

    onSubmit({
      sla: '',
      gestorResponsavel: gestor,
      avaliadores,
      requisicoes: resolvedRequisicoes,
      posicoes: [],
      camposPersonalizados,
      area: '',
      cliente: '',
    });
  };

  return (
    <div className="space-y-4">

      {/* ── Grupo 1: Avaliadores + Gestor ──────────────────────────────────── */}
      {!onlyCamposPersonalizados && (
        <>
          <div>
            <FieldLabel optional>Avaliadores responsáveis</FieldLabel>
            <AvaliadoresInput avaliadores={avaliadores} onChange={setAvaliadores} />
          </div>
          <div>
            <FieldLabel optional>Gestor responsável</FieldLabel>
            <input
              type="text"
              value={gestor}
              onChange={e => setGestor(e.target.value)}
              placeholder="Nome do gestor da área"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </>
      )}

      {/* ── Grupo 2: Requisição ─────────────────────────────────────────────── */}
      {!onlyCamposPersonalizados && (
        <div>
          <FieldLabel optional>Requisição</FieldLabel>
          <RequisicoesInput
            requisicoes={requisicoes}
            onChange={setRequisicoes}
            extraOption={initialRequisicao}
          />
        </div>
      )}

      {/* ── Campos personalizados ───────────────────────────────────────────── */}
      <div>
        <FieldLabel optional>Campos personalizados</FieldLabel>
        <CamposPersonalizadosInput
          campos={camposPersonalizados}
          onChange={setCamposPersonalizados}
        />
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-2.5 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium"
      >
        Confirmar
      </button>
    </div>
  );
}