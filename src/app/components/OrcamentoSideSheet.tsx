import { X, Info, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { JobData } from '../types/job';
import { SalaryAutomationEditor } from './SalaryAutomationEditor';

const TIPOS_CONTRATACAO = [
  'CLT',
  'PJ',
  'Contrato temporário',
  'Associado',
  'Autônomo',
  'Cooperado',
  'Estágio',
  'Menor aprendiz',
];

// Formata número para moeda BRL enquanto digita
function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const value = parseInt(digits, 10) / 100;
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseCurrency(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

interface OrcamentoSideSheetProps {
  data: JobData;
  onClose: () => void;
  onSave: (updatedData: Partial<JobData>) => void;
}

export function OrcamentoSideSheet({ data, onClose, onSave }: OrcamentoSideSheetProps) {
  const [tipos, setTipos] = useState<string[]>(
    data.tiposContratacao ?? (data.tipoContrato ? [data.tipoContrato] : ['CLT'])
  );
  const [salarioVaga, setSalarioVaga] = useState(
    data.salarioVaga ? formatCurrency(parseCurrency(data.salarioVaga)) : ''
  );
  const [salarioMaximo, setSalarioMaximo] = useState(
    data.salarioMaximo ? formatCurrency(parseCurrency(data.salarioMaximo)) : ''
  );
  const [pedirPretensao, setPedirPretensao] = useState<boolean>(
    data.pedirPretensaoSalarial ?? true
  );
  const [tornarObrigatorio, setTornarObrigatorio] = useState<boolean>(
    data.pretensaoSalarialObrigatoria ?? true
  );

  // Automação
  const [isAutomacaoOpen, setIsAutomacaoOpen] = useState(false);
  const [automacaoConfig, setAutomacaoConfig] = useState<any>({});

  const toggleTipo = (tipo: string) => {
    setTipos((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const handleSalarioVaga = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalarioVaga(formatCurrency(e.target.value));
  };

  const handleSalarioMaximo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalarioMaximo(formatCurrency(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      tiposContratacao: tipos,
      tipoContrato: tipos[0] ?? undefined, // legado
      salarioVaga: salarioVaga ? `R$ ${salarioVaga}` : undefined,
      salarioMaximo: salarioMaximo ? `R$ ${salarioMaximo}` : undefined,
      // manter compatibilidade com campo antigo
      salarioMinimo: salarioVaga ? `R$ ${salarioVaga}` : undefined,
      pedirPretensaoSalarial: pedirPretensao,
      pretensaoSalarialObrigatoria: tornarObrigatorio,
    });
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
          onClick={!isAutomacaoOpen ? onClose : undefined}
        />

        {/* Panel principal — expande quando automação abre */}
        <motion.div
          initial={{ x: '100%', width: 760 }}
          animate={{ x: 0, width: isAutomacaoOpen ? '100vw' : 760 }}
          exit={{ x: '100%', width: 760 }}
          transition={{
            x: { type: 'spring', damping: 30, stiffness: 300 },
            width: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-[18px] font-semibold text-gray-900">Orçamento da vaga</h2>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Agente de triagem
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

              {/* Tipo de contratação */}
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-[14px] text-gray-700">Tipo de contratação</span>
                  <span title="Define como o profissional será contratado">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {TIPOS_CONTRATACAO.map((tipo) => {
                    const checked = tipos.includes(tipo);
                    return (
                      <label key={tipo} className="flex items-center gap-2 cursor-pointer select-none">
                        {/* Checkbox estilo da imagem */}
                        <span
                          onClick={() => toggleTipo(tipo)}
                          className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                            checked
                              ? 'bg-purple-600 border-purple-600'
                              : 'bg-white border-gray-300 hover:border-purple-400'
                          }`}
                        >
                          {checked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[13px] text-gray-700">{tipo}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Salários */}
              <div className="grid grid-cols-2 gap-6">
                {/* Salário da vaga */}
                <div>
                  <label className="block text-[13px] font-medium text-purple-600 mb-2">
                    Salário da vaga
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[13px] pointer-events-none">
                      R$
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={salarioVaga}
                      onChange={handleSalarioVaga}
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-3 border-2 border-purple-400 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Salário máximo */}
                <div>
                  <label className="block text-[13px] font-medium text-purple-600 mb-2">
                    Salário máximo
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[13px] pointer-events-none">
                      R$
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={salarioMaximo}
                      onChange={handleSalarioMaximo}
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-3 border-2 border-purple-400 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle pretensão salarial */}
              <div className="flex items-center gap-6">
                {/* Toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => {
                      setPedirPretensao((v) => {
                        if (v) setTornarObrigatorio(false); // desativa obrigatório ao desligar
                        return !v;
                      });
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${
                      pedirPretensao ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        pedirPretensao ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[13px] text-gray-700">Pedir pretensão salarial</span>
                </label>

                {/* Checkbox tornar obrigatório */}
                <label
                  className={`flex items-center gap-2 select-none ${pedirPretensao ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                >
                  <span
                    onClick={() => pedirPretensao && setTornarObrigatorio((v) => !v)}
                    className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                      tornarObrigatorio && pedirPretensao
                        ? 'bg-purple-600 border-purple-600'
                        : 'bg-white border-gray-300'
                    } ${pedirPretensao ? 'hover:border-purple-400' : ''}`}
                  >
                    {tornarObrigatorio && pedirPretensao && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[13px] text-gray-700">Tornar obrigatório</span>
                </label>
              </div>

              {/* ── Botão Automação ── */}
              <div className="pt-2 border-t border-gray-100">
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
        </motion.div>

        {/* Painel de Automação — desliza por cima quando aberto */}
        <AnimatePresence>
          {isAutomacaoOpen && (
            <>
              {/* Overlay entre os dois painéis */}
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
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-gray-200 flex-shrink-0">
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900">Automação — Faixa salarial</h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">Reprova candidatos fora da faixa automaticamente</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAutomacaoOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-7 py-6">
                  <SalaryAutomationEditor
                    config={automacaoConfig}
                    onChange={setAutomacaoConfig}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-7 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAutomacaoOpen(false)}
                    className="px-5 py-2 border border-gray-300 rounded-md text-[13px] text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAutomacaoOpen(false)}
                    className="px-5 py-2 bg-purple-600 text-white rounded-md text-[13px] hover:bg-purple-700 font-medium"
                  >
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