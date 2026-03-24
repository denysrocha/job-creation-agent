import { X, Trash2, Plus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData, Posicao } from '../types/job';

const MOTIVOS = [
  'Aumento de quadro',
  'Expansão de time',
  'Substituição',
  'Novo projeto',
  'Outro',
];

interface PosicoesSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function PosicoesSideSheet({ data, onClose, onSave }: PosicoesSideSheetProps) {
  const [posicoes, setPosicoes] = useState<Posicao[]>(
    data.posicoes && data.posicoes.length > 0
      ? data.posicoes.map((p) => ({ ...p }))
      : [{ quantidade: 1, motivo: 'Expansão de time' }]
  );

  const total = posicoes.reduce((sum, p) => sum + (Number(p.quantidade) || 0), 0);

  const handleChange = (index: number, field: keyof Posicao, value: string | number) => {
    const updated = posicoes.map((p, i) =>
      i === index ? { ...p, [field]: field === 'quantidade' ? Number(value) : value } : p
    );
    setPosicoes(updated);
  };

  const handleAdd = () => {
    setPosicoes([...posicoes, { quantidade: 1, motivo: 'Expansão de time' }]);
  };

  const handleRemove = (index: number) => {
    const updated = posicoes.filter((_, i) => i !== index);
    setPosicoes(updated.length > 0 ? updated : [{ quantidade: 1, motivo: 'Expansão de time' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ posicoes });
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
          className="fixed top-0 right-0 h-full w-[780px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[18px] font-semibold text-gray-900">Posições</h2>
              <p className="text-[12px] text-gray-500 mt-0.5">
                Total de posições: <span className="font-semibold text-gray-700">{total}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Adicionar posições */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-600 text-[13px] font-medium hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar posições
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6">

              {/* Seção: Posições sem requisições */}
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-[14px] font-semibold text-gray-800">Posições sem requisições</span>
                <span title="Posições que não estão vinculadas a nenhuma requisição">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </span>
              </div>

              <div className="space-y-3">
                {posicoes.map((posicao, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white"
                  >
                    {/* Quantidade */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <label className="text-[13px] text-gray-600 whitespace-nowrap flex-shrink-0">
                        Quantidade de posições:
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={posicao.quantidade}
                        onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                        className="w-[120px] flex-shrink-0 px-3 py-2 border-2 border-purple-400 rounded-md text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Motivo */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <label className="text-[13px] text-gray-600 whitespace-nowrap flex-shrink-0">
                        Motivo das posições:
                      </label>
                      <div className="relative flex-1 min-w-0">
                        <select
                          value={posicao.motivo}
                          onChange={(e) => handleChange(index, 'motivo', e.target.value)}
                          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md text-[13px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                        >
                          {MOTIVOS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Botão remover */}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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
