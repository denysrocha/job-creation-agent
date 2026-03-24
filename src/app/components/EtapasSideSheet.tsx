import { X, Plus, Pencil, Trash2, Info, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData, Etapa, FASES_PADRAO, ETAPAS_PADRAO } from '../types/job';

interface EtapasSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

// Renumera todas as etapas em ordem global
function reordenar(etapas: Etapa[]): Etapa[] {
  let ordem = 1;
  return FASES_PADRAO.flatMap((fase) =>
    etapas
      .filter((e) => e.fase === fase)
      .map((e) => ({ ...e, ordem: ordem++ }))
  );
}

export function EtapasSideSheet({ data, onClose, onSave }: EtapasSideSheetProps) {
  const [etapas, setEtapas] = useState<Etapa[]>(
    reordenar(data.etapasVaga?.length ? data.etapasVaga : ETAPAS_PADRAO)
  );

  // Estado de edição inline: { id, nome temporário }
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNome, setEditingNome] = useState('');

  // Fase que está recebendo nova etapa
  const [addingFase, setAddingFase] = useState<string | null>(null);
  const [newNome, setNewNome] = useState('');

  /* ── helpers ── */
  const etapasPorFase = (fase: string) => etapas.filter((e) => e.fase === fase);

  const startEdit = (e: Etapa) => {
    setEditingId(e.id);
    setEditingNome(e.nome);
  };

  const commitEdit = () => {
    if (!editingId) return;
    const nome = editingNome.trim();
    if (nome) {
      setEtapas((prev) =>
        reordenar(prev.map((e) => (e.id === editingId ? { ...e, nome } : e)))
      );
    }
    setEditingId(null);
    setEditingNome('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingNome('');
  };

  const deleteEtapa = (id: string) => {
    setEtapas((prev) => reordenar(prev.filter((e) => e.id !== id)));
  };

  const startAdd = (fase: string) => {
    setAddingFase(fase);
    setNewNome('');
  };

  const commitAdd = (fase: string) => {
    const nome = newNome.trim();
    if (nome) {
      const newEtapa: Etapa = {
        id: `e-${Date.now()}`,
        nome,
        fase,
        ordem: 0, // será corrigido pelo reordenar
      };
      setEtapas((prev) => reordenar([...prev, newEtapa]));
    }
    setAddingFase(null);
    setNewNome('');
  };

  const cancelAdd = () => {
    setAddingFase(null);
    setNewNome('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ etapasVaga: etapas });
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
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-[18px] font-semibold text-gray-900">
                Gerencie as etapas da vaga
              </h2>
              <p className="text-[12px] text-gray-500 mt-1 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-purple-500" />
                Crie,
                <Pencil className="w-3.5 h-3.5 text-purple-500" />
                edite, e
                <Trash2 className="w-3.5 h-3.5 text-purple-500" />
                exclua as etapas da vaga.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Descrição */}
          <div className="px-8 py-4 border-b border-gray-100 flex-shrink-0">
            <p className="text-[13px] text-gray-600 leading-relaxed">
              No InHire apresentamos a lógica de "Fases" e "Etapas" para melhor estruturação dos
              dados da sua empresa. As fases são um conjunto de etapas e são fixas para todas as
              vagas. Já as etapas podem ser personalizadas para cada vaga criada.
            </p>
            <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">
              Para gerenciar as etapas da sua vaga, entenda qual fase a etapa que você gostaria de
              editar ou criar se encaixa e execute sua ação.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              {FASES_PADRAO.map((fase) => {
                const faseEtapas = etapasPorFase(fase);
                const isAdding = addingFase === fase;

                return (
                  <div key={fase} className="border-b border-gray-200 last:border-b-0">
                    {/* Fase header */}
                    <div className="px-8 pt-5 pb-2 flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-gray-700">{fase}</span>
                      <span title={`Fase "${fase}": agrupa as etapas desta fase do processo`}>
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      </span>
                    </div>

                    {/* Etapas inline */}
                    <div className="px-8 pb-5 flex flex-wrap items-center gap-3">
                      {faseEtapas.map((etapa) => (
                        <div
                          key={etapa.id}
                          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-0"
                        >
                          {/* Número */}
                          <span className="text-[13px] text-gray-400 flex-shrink-0 w-4 text-right">
                            {etapa.ordem}
                          </span>

                          {/* Nome ou input inline */}
                          {editingId === etapa.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                autoFocus
                                type="text"
                                value={editingNome}
                                onChange={(e) => setEditingNome(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') { e.preventDefault(); commitEdit(); }
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                                className="text-[13px] text-gray-800 border-b border-purple-500 outline-none bg-transparent w-36"
                              />
                              <button
                                type="button"
                                onClick={commitEdit}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-gray-400 hover:text-gray-600 text-[11px]"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[13px] text-gray-800">{etapa.nome}</span>
                          )}

                          {/* Ações */}
                          {editingId !== etapa.id && (
                            <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => startEdit(etapa)}
                                className="text-gray-400 hover:text-purple-600 transition-colors"
                                title="Editar etapa"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteEtapa(etapa.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Excluir etapa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Input inline para nova etapa */}
                      {isAdding ? (
                        <div className="flex items-center gap-2 bg-white border-2 border-purple-400 rounded-lg px-3 py-2">
                          <input
                            autoFocus
                            type="text"
                            value={newNome}
                            onChange={(e) => setNewNome(e.target.value)}
                            placeholder="Nome da etapa"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') { e.preventDefault(); commitAdd(fase); }
                              if (e.key === 'Escape') cancelAdd();
                            }}
                            className="text-[13px] text-gray-800 outline-none bg-transparent w-36 placeholder-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => commitAdd(fase)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={cancelAdd}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startAdd(fase)}
                          className="flex items-center gap-1.5 px-4 py-2 border border-purple-500 text-purple-600 rounded-lg text-[13px] font-medium hover:bg-purple-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Criar nova etapa
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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
