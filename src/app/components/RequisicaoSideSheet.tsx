import { X, Trash2, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData } from '../types/job';

// Mock de requisições disponíveis para vincular
export const REQUISICOES_MOCK = [
  { id: 'REQ-2025-001', label: 'REQ-2025-001 — Engenheiro(a) de Software Sênior' },
  { id: 'REQ-2025-002', label: 'REQ-2025-002 — Product Manager' },
  { id: 'REQ-2025-003', label: 'REQ-2025-003 — Designer UX/UI' },
  { id: 'REQ-2025-004', label: 'REQ-2025-004 — Analista de Dados' },
  { id: 'REQ-2025-005', label: 'REQ-2025-005 — Tech Lead Backend' },
  { id: 'REQ-2025-006', label: 'REQ-2025-006 — Engenheiro(a) de Software Pleno' },
  { id: 'REQ-2025-007', label: 'REQ-2025-007 — DevOps Engineer' },
  { id: 'REQ-2025-008', label: 'REQ-2025-008 — QA Engineer' },
];

interface RequisicaoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
  extraOption?: { id: string; label: string };
}

export function RequisicaoSideSheet({ data, onClose, onSave, extraOption }: RequisicaoSideSheetProps) {
  // Initialise: prefer requisicoes[] array; if empty fall back to requisicao string (navigation origin)
  const initialList = (): string[] => {
    if (data.requisicoes && data.requisicoes.length > 0) return [...data.requisicoes];
    if (data.requisicao) return [data.requisicao];
    return [''];
  };
  const [requisicoes, setRequisicoes] = useState<string[]>(initialList);

  // Build combined options list: extraOption (if not already in mock) + REQUISICOES_MOCK
  const allOptions = [
    ...(extraOption && !REQUISICOES_MOCK.some(r => r.id === extraOption.id)
      ? [{ id: extraOption.id, label: extraOption.label }]
      : []),
    ...REQUISICOES_MOCK,
  ];

  const handleChange = (index: number, value: string) => {
    const updated = [...requisicoes];
    updated[index] = value;
    setRequisicoes(updated);
  };

  const handleAdd = () => {
    setRequisicoes([...requisicoes, '']);
  };

  const handleRemove = (index: number) => {
    const updated = requisicoes.filter((_, i) => i !== index);
    // Mantém ao menos uma linha vazia
    setRequisicoes(updated.length > 0 ? updated : ['']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filled = requisicoes.filter((r) => r.trim() !== '');
    onSave({ requisicoes: filled });
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
          className="fixed top-0 right-0 h-full w-[640px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[18px] font-semibold text-gray-900">Vincular requisição</h2>
              <p className="text-[12px] text-gray-500 mt-0.5">
                Vincule uma ou mais requisições a esta vaga. Caso não queira vincular é só excluir no botão da lixeira.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
              {requisicoes.map((req, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-purple-600">
                    Selecione uma requisição <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        value={req}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="w-full appearance-none px-3 py-2.5 border border-gray-300 rounded-md text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 text-gray-700"
                      >
                        <option value="">Selecione uma requisição</option>
                        {allOptions.filter(
                          (r) => r.id === req || !requisicoes.includes(r.id)
                        ).map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Botão remover */}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Botão adicionar */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-50 border border-purple-200 text-purple-600 text-[13px] font-medium hover:bg-purple-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar requisição
              </button>
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