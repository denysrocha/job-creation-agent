import { useState } from 'react';
import { AlertCircle, Zap, Pencil, Check as CheckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestoesEstruturaisData } from '../types/jdAnalysis';

interface QuestoesEstruturaisFormProps {
  onSubmit: (data: QuestoesEstruturaisData) => void;
  initialSalMin?: string;
  initialSalMax?: string;
  initialTipoContrato?: string;
  initialModeloTrabalho?: string;
  initialLocalizacao?: string; // full string e.g. "São Paulo, SP"
  jaInformado?: {
    salario?: boolean;
    modeloTrabalho?: boolean;
    localizacao?: boolean;
  };
}

const modelosTrabalho = ['Remoto', 'Presencial', 'Híbrido'];
const tiposContrato = ['CLT', 'PJ', 'Contrato temporário', 'Associado', 'Autônomo', 'Cooperado', 'Estágio', 'Menor aprendiz'];
const needsLocation = (m: string) => m === 'Presencial' || m === 'Híbrido';

const estadosBR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
];

const formatCurrency = (v: string) => {
  const n = v.replace(/\D/g, '');
  return n ? 'R$ ' + parseInt(n).toLocaleString('pt-BR') : '';
};

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-xs font-medium text-gray-700">{children}</span>
      {required && <span className="text-xs text-red-500">*</span>}
    </div>
  );
}

function InlineAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2"
    >
      <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-snug">{message}</p>
    </motion.div>
  );
}

function YesNoQuestion({
  question, value, onChange,
}: { question: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-3 pt-3 border-t border-gray-100"
    >
      <p className="text-xs text-gray-700 mb-2 flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
        {question}
      </p>
      <div className="flex gap-2">
        {[{ label: 'Sim', v: true }, { label: 'Não', v: false }].map(({ label, v }) => (
          <button
            key={label}
            type="button"
            onClick={() => onChange(v)}
            className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
              value === v
                ? v ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-700 text-white border-gray-700'
                : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── AlreadyFilledRow: displays captured value + pencil to edit inline ─────────
function AlreadyFilledRow({
  label,
  displayValue,
  editing,
  onEdit,
  children,
}: {
  label: string;
  displayValue: string;
  editing: boolean;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        {!editing && (
          <>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              {displayValue}
            </span>
            <button
              type="button"
              onClick={onEdit}
              className="text-gray-400 hover:text-purple-600 transition-colors"
              title="Editar"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function QuestoesEstruturaisForm({
  onSubmit,
  initialSalMin = '',
  initialSalMax = '',
  initialTipoContrato = '',
  initialModeloTrabalho = '',
  initialLocalizacao = 'São Paulo, SP',
  jaInformado,
}: QuestoesEstruturaisFormProps) {
  const [salMin, setSalMin] = useState(() => initialSalMin);
  const [salMax, setSalMax] = useState(() => initialSalMax);
  const [tipoContrato, setTipoContrato] = useState(() => initialTipoContrato);
  const [modelo, setModelo] = useState(() => initialModeloTrabalho);
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [reprovarSalario, setReprovarSalario] = useState<boolean | null>(null);
  const [reprovarModelo, setReprovarModelo] = useState<boolean | null>(null);

  // Inline-edit state for jaInformado fields
  const [editingSalario, setEditingSalario] = useState(false);
  const [editingModelo, setEditingModelo] = useState(false);
  const [editingLocalizacao, setEditingLocalizacao] = useState(false);

  const salarioJaInformado = !!jaInformado?.salario;
  const modeloJaInformado = !!jaInformado?.modeloTrabalho;
  const localizacaoJaInformada = !!jaInformado?.localizacao;

  const salarioFilled = salarioJaInformado || !!(salMin && salMax && tipoContrato);
  const modeloFilled = modeloJaInformado || !!modelo;
  const locRequerida = !localizacaoJaInformada && needsLocation(modelo);
  const locFilled = !!(pais && estado && cidade);

  const salarioDisplayValue = salarioJaInformado
    ? `${initialSalMin || salMin} a ${initialSalMax || salMax}${initialTipoContrato || tipoContrato ? ` (${initialTipoContrato || tipoContrato})` : ''}`
    : '';

  const modeloDisplayValue = modeloJaInformado ? (initialModeloTrabalho || modelo) : '';
  const locDisplayValue = localizacaoJaInformada ? initialLocalizacao : '';

  const handleSubmit = () => {
    onSubmit({
      salarioMinimo: salMin || initialSalMin,
      salarioMaximo: salMax || initialSalMax,
      tipoContrato: tipoContrato || initialTipoContrato,
      modeloTrabalho: modelo || initialModeloTrabalho,
      pais,
      estado,
      cidade,
      reprovarPorSalario: reprovarSalario ?? false,
      reprovarPorModeloTrabalho: reprovarModelo ?? false,
    });
  };

  return (
    <div className="mt-3 space-y-3 max-w-xl">

      {/* ── Faixa salarial ─────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {salarioJaInformado && !editingSalario ? (
          <AlreadyFilledRow
            label="Faixa salarial"
            displayValue={salarioDisplayValue}
            editing={editingSalario}
            onEdit={() => setEditingSalario(true)}
          >
            <></>
          </AlreadyFilledRow>
        ) : (
          <>
            {salarioJaInformado && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Faixa salarial</span>
                <button
                  type="button"
                  onClick={() => setEditingSalario(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  ← Voltar
                </button>
              </div>
            )}
            {!salarioJaInformado && <FieldLabel>Faixa salarial</FieldLabel>}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Salário da vaga</label>
                <input
                  type="text"
                  value={salMin}
                  onChange={e => setSalMin(formatCurrency(e.target.value))}
                  placeholder="R$ 0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Salário máximo</label>
                <input
                  type="text"
                  value={salMax}
                  onChange={e => setSalMax(formatCurrency(e.target.value))}
                  placeholder="R$ 0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tiposContrato.map(t => (
                <button key={t} type="button" onClick={() => setTipoContrato(t)}
                  className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                    tipoContrato === t
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                  }`}>{t}</button>
              ))}
            </div>
          </>
        )}
        <AnimatePresence>
          {salarioFilled && (
            <YesNoQuestion
              question="Quer reprovar automaticamente candidatos fora da faixa salarial?"
              value={reprovarSalario}
              onChange={setReprovarSalario}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {reprovarSalario === true && (
            <InlineAlert message="Análise salarial removida dos critérios do Agente de Triagem — já será tratada pela automação." />
          )}
        </AnimatePresence>
      </div>

      {/* ── Modelo de trabalho ─────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {modeloJaInformado && !editingModelo ? (
          <AlreadyFilledRow
            label="Modelo de trabalho"
            displayValue={modeloDisplayValue}
            editing={editingModelo}
            onEdit={() => setEditingModelo(true)}
          >
            <></>
          </AlreadyFilledRow>
        ) : (
          <>
            {modeloJaInformado && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Modelo de trabalho</span>
                <button
                  type="button"
                  onClick={() => setEditingModelo(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  ← Voltar
                </button>
              </div>
            )}
            {!modeloJaInformado && <FieldLabel>Modelo de trabalho</FieldLabel>}
            <div className="flex gap-2">
              {modelosTrabalho.map(m => (
                <button key={m} type="button" onClick={() => { setModelo(m); if (!needsLocation(m)) { setPais(''); setEstado(''); setCidade(''); } }}
                  className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                    modelo === m
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                  }`}>{m}</button>
              ))}
            </div>
          </>
        )}
        <AnimatePresence>
          {modeloFilled && (
            <YesNoQuestion
              question="Quer reprovar automaticamente candidatos que não aceitam o modelo de trabalho?"
              value={reprovarModelo}
              onChange={setReprovarModelo}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {reprovarModelo === true && (
            <InlineAlert message="Modelo de trabalho removido do formulário de inscrição — já será verificado pela automação." />
          )}
        </AnimatePresence>
      </div>

      {/* ── Localização ─────────────────────────────────────────────────────── */}
      {/* Já informada: exibir valor completo + lápis */}
      {localizacaoJaInformada && !editingLocalizacao && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700">Localização</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              {locDisplayValue}
            </span>
            <button
              type="button"
              onClick={() => setEditingLocalizacao(true)}
              className="text-gray-400 hover:text-purple-600 transition-colors"
              title="Editar localização"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Presencial/Híbrido sem localização informada, ou em modo de edição */}
      <AnimatePresence>
        {(locRequerida || (localizacaoJaInformada && editingLocalizacao)) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <FieldLabel required={!localizacaoJaInformada}>Localização</FieldLabel>
                  {!localizacaoJaInformada && (
                    <p className="text-xs text-gray-400">Obrigatório para {modelo}</p>
                  )}
                </div>
                {localizacaoJaInformada && editingLocalizacao && (
                  <button
                    type="button"
                    onClick={() => setEditingLocalizacao(false)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    ← Voltar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">País</label>
                  <select
                    value={pais}
                    onChange={e => setPais(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="">Selecione</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Estado</label>
                  <select
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="">Selecione</option>
                    {estadosBR.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    placeholder="Ex: São Paulo"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              {locRequerida && !locFilled && (
                <p className="text-xs text-red-500 mt-2">Preencha o local para o modelo {modelo}.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit ─────────────────────────────────── */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-2.5 rounded-xl text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors"
      >
        Aplicar configurações
      </button>
      <p className="text-xs text-center text-gray-400 pb-1">
        Você pode preencher os demais dados no próximo passo.
      </p>
    </div>
  );
}