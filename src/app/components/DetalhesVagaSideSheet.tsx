import { X, Info, Search, ChevronDown, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { JobData } from '../types/job';

interface DetalhesVagaSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

const AREAS = [
  'Tecnologia', 'Produto', 'Design', 'Dados', 'Marketing', 'Comercial',
  'Financeiro', 'RH', 'Jurídico', 'Operações', 'Customer Success', 'Outro',
];

const CLIENTES = [
  'Interno', 'Cliente A', 'Cliente B', 'Cliente C', 'Cliente D',
];

const SENIORIDADES = [
  'Estágio', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Staff', 'Principal', 'Liderança',
];

const RECRUTADORES = [
  'Ana Paula Costa', 'Bruno Silva', 'Carla Mendes', 'Diego Ferreira',
  'Elisa Santos', 'Fernanda Oliveira',
];

const GESTORES = [
  'João Martins', 'Maria Souza', 'Pedro Alves', 'Luciana Pereira',
  'Rafael Costa', 'Tatiane Lima',
];

// Mock de usuários para busca de avaliadores
const USUARIOS = [
  { id: '1', nome: 'Ana Paula Costa', email: 'ana.paula@empresa.com' },
  { id: '2', nome: 'Bruno Silva', email: 'bruno.silva@empresa.com' },
  { id: '3', nome: 'Carla Mendes', email: 'carla.mendes@empresa.com' },
  { id: '4', nome: 'Diego Ferreira', email: 'diego.ferreira@empresa.com' },
  { id: '5', nome: 'Elisa Santos', email: 'elisa.santos@empresa.com' },
  { id: '6', nome: 'Fernanda Oliveira', email: 'fernanda@empresa.com' },
  { id: '7', nome: 'João Martins', email: 'joao.martins@empresa.com' },
  { id: '8', nome: 'Maria Souza', email: 'maria.souza@empresa.com' },
];

function AvaliadoresSearch({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = USUARIOS.filter(
    (u) =>
      !value.includes(u.nome) &&
      (u.nome.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()))
  );

  const add = (nome: string) => {
    onChange([...value, nome]);
    setQuery('');
    inputRef.current?.focus();
  };

  const remove = (nome: string) => {
    onChange(value.filter((v) => v !== nome));
  };

  return (
    <div className="relative">
      <div
        className="min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-md flex flex-wrap gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent"
        onClick={() => { inputRef.current?.focus(); setOpen(true); }}
      >
        {value.map((nome) => (
          <span
            key={nome}
            className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[12px]"
          >
            {nome}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(nome); }}
              className="hover:text-purple-900"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={value.length === 0 ? 'Pesquise por nome ou email' : ''}
          className="flex-1 min-w-[160px] outline-none text-[13px] text-gray-700 placeholder-gray-400 bg-transparent"
        />
        <Search className="w-4 h-4 text-gray-400 self-center ml-auto flex-shrink-0" />
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            {filtered.map((u) => (
              <button
                key={u.id}
                type="button"
                onMouseDown={() => add(u.nome)}
                className="w-full text-left px-3 py-2.5 hover:bg-purple-50 flex flex-col"
              >
                <span className="text-[13px] text-gray-900">{u.nome}</span>
                <span className="text-[11px] text-gray-500">{u.email}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DetalhesVagaSideSheet({ data, onClose, onSave }: DetalhesVagaSideSheetProps) {
  const [form, setForm] = useState<JobData>({ ...data });

  const set = (key: keyof JobData, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

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

        {/* SideSheet */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[800px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-[18px] font-semibold text-gray-900">Detalhes da vaga</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

              {/* Confidencial */}
              <div
                className="flex items-start gap-3 p-4 rounded-md border border-orange-200 bg-orange-50 cursor-pointer select-none"
                onClick={() => set('confidencial', !form.confidencial)}
              >
                <div
                  className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-colors ${
                    form.confidencial
                      ? 'bg-orange-500 border-orange-500'
                      : 'bg-white border-orange-400'
                  }`}
                >
                  {form.confidencial && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-orange-700">Esta vaga é confidencial?</p>
                  <p className="text-[12px] text-orange-600 mt-0.5 leading-snug">
                    Se marcada, esta vaga será visível apenas para o recrutador(a) responsável, gestor(a) responsável e avaliadores vinculados. Não poderá ser divulgada, ter requisições, nem aparecerá na seção de dados.
                  </p>
                </div>
              </div>

              {/* Nome + Senioridade | Área + Cliente */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.titulo || ''}
                    onChange={(e) => set('titulo', e.target.value)}
                    placeholder="Escreva um nome para a vaga"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">Senioridade</label>
                  <div className="relative">
                    <select
                      value={form.senioridade || ''}
                      onChange={(e) => set('senioridade', e.target.value)}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    >
                      <option value="">Selecione a senioridade</option>
                      {SENIORIDADES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">Área</label>
                  <div className="relative">
                    <select
                      value={form.area || ''}
                      onChange={(e) => set('area', e.target.value)}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    >
                      <option value="">Selecione a área</option>
                      {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">Cliente</label>
                  <div className="relative">
                    <select
                      value={form.cliente || ''}
                      onChange={(e) => set('cliente', e.target.value)}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    >
                      <option value="">Selecione o cliente</option>
                      {CLIENTES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Notas internas */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-gray-700">Notas internas</label>
                <textarea
                  value={form.notasInternas || ''}
                  onChange={(e) => set('notasInternas', e.target.value)}
                  placeholder="Escreva uma descrição interna da vaga (essa informação não será divulgada)"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                />
              </div>

              {/* Recrutador + Gestor + SLA */}
              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">Recrutador(a) Responsável</label>
                  <div className="relative">
                    <select
                      value={form.recrutador || ''}
                      onChange={(e) => set('recrutador', e.target.value)}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    >
                      <option value="">Selecione o(a) recrutador(a)</option>
                      {RECRUTADORES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700">Gestor(a) Responsável</label>
                  <div className="relative">
                    <select
                      value={form.gestor || ''}
                      onChange={(e) => set('gestor', e.target.value)}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    >
                      <option value="">Selecione o(a) gestor(a) responsável</option>
                      {GESTORES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-700 flex items-center gap-1">
                    SLA
                    <span title="Prazo em dias para conclusão do processo seletivo">
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.sla ?? '-1'}
                      onChange={(e) => set('sla', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-400 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Avaliador(a) Responsável */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-gray-700">Avaliador(a) Responsável</label>
                <AvaliadoresSearch
                  value={form.avaliadores || []}
                  onChange={(v) => set('avaliadores', v)}
                />
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
        </motion.div>
      </>
    </AnimatePresence>
  );
}