import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData, CampoPersonalizadoVaga } from '../types/job';

// Campos configurados pela organização (mock — viriam de uma API)
export const CAMPOS_CONFIG: Omit<CampoPersonalizadoVaga, 'valor'>[] = [
  { id: 'projeto',        nome: 'Projeto',          tipo: 'text', obrigatorio: true  },
  { id: 'centro-custo',   nome: 'Centro de custo',  tipo: 'text', obrigatorio: true  },
  { id: 'time',           nome: 'Time',             tipo: 'text', obrigatorio: false },
  { id: 'tempo-projeto',  nome: 'Tempo do projeto', tipo: 'text', obrigatorio: false },
  { id: 'area',           nome: 'Área',             tipo: 'text', obrigatorio: true  },
  { id: 'squad',          nome: 'Squad',            tipo: 'text', obrigatorio: false },
];

interface CamposPersonalizadosSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function CamposPersonalizadosSideSheet({ data, onClose, onSave }: CamposPersonalizadosSideSheetProps) {
  // Inicializa mergeando a config com os valores já salvos
  const [campos, setCampos] = useState<CampoPersonalizadoVaga[]>(() =>
    CAMPOS_CONFIG.map((cfg) => {
      const saved = data.camposPersonalizados?.find((c) => c.id === cfg.id);
      return { ...cfg, valor: saved?.valor ?? '' };
    })
  );

  const setValue = (id: string, valor: string) => {
    setCampos((prev) => prev.map((c) => (c.id === id ? { ...c, valor } : c)));
  };

  const missingRequired = campos.filter(c => c.obrigatorio && !c.valor.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missingRequired.length > 0) return;
    onSave({ camposPersonalizados: campos });
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
          className="fixed top-0 right-0 h-full w-[860px] bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[18px] font-semibold text-gray-900">Campos personalizados</h2>
              <p className="text-[12px] text-gray-500 mt-1 max-w-xl leading-relaxed">
                Existe alguma informação adicional que você gostaria de acrescentar na criação da vaga?
                Fique à vontade para adicionar quantas informações precisar. Ao editar a vaga você também
                pode adicionar informações extras.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4 flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-0 divide-y divide-gray-100">
                {campos.map((campo) => (
                  <div
                    key={campo.id}
                    className="grid grid-cols-[1fr_2fr] gap-8 items-center py-5"
                  >
                    {/* Label */}
                    <label className="text-[13px] text-gray-700">
                      {campo.nome}
                      {campo.obrigatorio && (
                        <span className="text-purple-500 ml-1">*</span>
                      )}
                    </label>

                    {/* Input ou Select */}
                    {(() => {
                      const isEmpty = campo.obrigatorio && !campo.valor.trim();
                      const borderCls = isEmpty
                        ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                        : 'border-gray-300 focus:ring-purple-500 focus:border-transparent';
                      return campo.tipo === 'select' ? (
                        <div className="relative">
                          <select
                            value={campo.valor}
                            onChange={(e) => setValue(campo.id, e.target.value)}
                            className={`w-full appearance-none px-4 py-2.5 border rounded-md text-[13px] bg-white text-gray-700 focus:outline-none focus:ring-2 pr-9 ${borderCls}`}
                          >
                            <option value="">Selecione uma opção</option>
                            {campo.opcoes?.map((op) => (
                              <option key={op} value={op}>{op}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={campo.valor}
                          onChange={(e) => setValue(campo.id, e.target.value)}
                          placeholder={campo.obrigatorio ? 'Obrigatório' : 'Informe um valor'}
                          className={`w-full px-4 py-2.5 border rounded-md text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${borderCls}`}
                        />
                      );
                    })()}
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
                disabled={missingRequired.length > 0}
                className="px-6 py-2 bg-purple-600 text-white rounded-md text-[13px] hover:bg-purple-700 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
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