import { X, Plus, Trash2, GripVertical, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { SalaryAutomationEditor } from './SalaryAutomationEditor';
import { LocationAutomationEditor } from './LocationAutomationEditor';

interface SideSheetProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  fields: FieldConfig[];
  data: any;
  onSave: (updatedData: any) => void;
}

interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number' | 'array' | 'toggle' | 'custom';
  customType?: 'questions' | 'criteria' | 'agentConfig' | 'salaryAutomation' | 'locationAutomation';
  options?: string[];
  placeholder?: string;
}

export function SideSheet({ isOpen = true, onClose, title, icon, fields, data, onSave }: SideSheetProps) {
  const [localData, setLocalData] = useState<any>(data);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localData);
    onClose();
  };

  const renderField = (field: FieldConfig) => {
    const value = localData[field.key];
    const displayValue = Array.isArray(value) ? value.join(', ') : (value || '');

    switch (field.type) {
      case 'toggle':
        return (
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setLocalData({ ...localData, [field.key]: !value })}
              className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : ''}`} />
            </button>
            <span className="ml-3 text-sm text-gray-700">{value ? 'Ativo' : 'Inativo'}</span>
          </div>
        );
      
      case 'custom':
        if (field.customType === 'questions') {
          return <QuestionEditor questions={value || []} onChange={(questions) => setLocalData({ ...localData, [field.key]: questions })} />;
        }
        if (field.customType === 'criteria') {
          return <CriteriaEditor criteria={value || []} onChange={(criteria) => setLocalData({ ...localData, [field.key]: criteria })} />;
        }
        if (field.customType === 'agentConfig') {
          return <AgentConfigEditor config={value || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />;
        }
        if (field.customType === 'salaryAutomation') {
          return <SalaryAutomationEditor config={value || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />;
        }
        if (field.customType === 'locationAutomation') {
          return <LocationAutomationEditor config={value || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />;
        }
        return null;
      
      case 'textarea':
        return (
          <textarea
            value={displayValue}
            onChange={(e) => setLocalData({ ...localData, [field.key]: e.target.value })}
            placeholder={field.placeholder || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            value={displayValue}
            onChange={(e) => setLocalData({ ...localData, [field.key]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="">Selecione...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'array':
        return (
          <input
            type="text"
            value={displayValue}
            onChange={(e) => setLocalData({ ...localData, [field.key]: e.target.value })}
            placeholder={field.placeholder || 'Separar por vírgula'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        );
      
      default:
        return (
          <input
            type={field.type || 'text'}
            value={displayValue}
            onChange={(e) => setLocalData({ ...localData, [field.key]: e.target.value })}
            placeholder={field.placeholder || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="text-purple-600">
                  {icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content - Scrollable */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {/* Check if this is a custom form (questions, criteria, or agentConfig) - render in single column */}
                {fields.some(f => f.type === 'custom' && (f.customType === 'questions' || f.customType === 'criteria' || f.customType === 'agentConfig' || f.customType === 'salaryAutomation' || f.customType === 'locationAutomation')) ? (
                  <div className="space-y-6">
                    {fields.map((field) => {
                      if (field.type === 'custom' && field.customType === 'questions') {
                        // Render questions section
                        return (
                          <div key={field.key}>
                            <QuestionEditor questions={localData[field.key] || []} onChange={(questions) => setLocalData({ ...localData, [field.key]: questions })} />
                          </div>
                        );
                      } else if (field.type === 'custom' && field.customType === 'criteria') {
                        // Render criteria section
                        return (
                          <div key={field.key}>
                            <CriteriaEditor criteria={localData[field.key] || []} onChange={(criteria) => setLocalData({ ...localData, [field.key]: criteria })} />
                          </div>
                        );
                      } else if (field.type === 'custom' && field.customType === 'agentConfig') {
                        // Render agent config section
                        return (
                          <div key={field.key}>
                            <AgentConfigEditor config={localData[field.key] || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />
                          </div>
                        );
                      } else if (field.type === 'custom' && field.customType === 'salaryAutomation') {
                        // Render salary automation section
                        return (
                          <div key={field.key}>
                            <SalaryAutomationEditor config={localData[field.key] || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />
                          </div>
                        );
                      } else if (field.type === 'custom' && field.customType === 'locationAutomation') {
                        // Render location automation section
                        return (
                          <div key={field.key}>
                            <LocationAutomationEditor config={localData[field.key] || {}} onChange={(config) => setLocalData({ ...localData, [field.key]: config })} />
                          </div>
                        );
                      } else if (field.type === 'toggle') {
                        // Render toggle
                        return (
                          <div key={field.key} className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">{field.label}</label>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setLocalData({ ...localData, [field.key]: !localData[field.key] })}
                                className={`relative w-11 h-6 rounded-full transition-colors ${localData[field.key] ? 'bg-purple-600' : 'bg-gray-300'}`}
                              >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${localData[field.key] ? 'translate-x-5' : ''}`} />
                              </button>
                              <span className="text-sm text-gray-700">{localData[field.key] ? 'Ativo' : 'Inativo'}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  // Original 3-column grid for other forms
                  <div className="grid grid-cols-3 gap-6">
                    {fields.map((field, index) => {
                      // Verificar se é o grupo de localização (país, estado, cidade)
                      const isLocationGroup = field.key === 'pais' && 
                        fields[index + 1]?.key === 'estado' && 
                        fields[index + 2]?.key === 'cidade';
                      
                      // Pular estado e cidade se já foram renderizados no grupo
                      if (field.key === 'estado' && fields[index - 1]?.key === 'pais') return null;
                      if (field.key === 'cidade' && fields[index - 2]?.key === 'pais') return null;
                      
                      // Renderizar grupo de localização em uma linha
                      if (isLocationGroup) {
                        return (
                          <div key="location-group" className="col-span-3 grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="pais" className="text-sm font-medium text-gray-700">
                                País
                              </label>
                              {renderField(fields[index])}
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Estado
                              </label>
                              {renderField(fields[index + 1])}
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="cidade" className="text-sm font-medium text-gray-700">
                                Cidade
                              </label>
                              {renderField(fields[index + 2])}
                            </div>
                          </div>
                        );
                      }
                      
                      // Renderizar campo normal
                      return (
                        <div key={field.key} className="flex flex-col gap-2">
                          <label
                            htmlFor={field.key}
                            className="text-sm font-medium text-gray-700"
                          >
                            {field.label}
                          </label>
                          {renderField(field)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Componente para editar perguntas do formulário
function QuestionEditor({ questions, onChange }: { questions: any[]; onChange: (questions: any[]) => void }) {
  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onChange(newQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      texto: 'Nova pergunta',
      tipo: 'multipla_escolha',
      opcoes: ['Opção 1', 'Opção 2'],
      respostasCorretas: [],
      obrigatoria: false,
      eliminatoria: false
    };
    onChange([...questions, newQuestion]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Perguntas</h3>
      
      <div className="space-y-2">
        {questions.map((pergunta, index) => (
          <div 
            key={pergunta.id} 
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded font-medium flex-shrink-0">#{pergunta.id}</span>
            <span className="flex-1 text-sm text-gray-900 truncate">{pergunta.texto}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {pergunta.obrigatoria && (
                <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded font-medium">Obrigatória</span>
              )}
              {pergunta.eliminatoria && (
                <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded font-medium">Eliminatória</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        Adicionar pergunta
      </button>
    </div>
  );
}

// Componente para editar critérios do formulário
function CriteriaEditor({ criteria, onChange }: { criteria: any[]; onChange: (criteria: any[]) => void }) {
  const removeCriterion = (index: number) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    onChange(newCriteria);
  };

  const addCriterion = () => {
    const newCriterion = {
      id: criteria.length + 1,
      texto: 'Novo critério',
      peso: 1,
      obrigatoria: false
    };
    onChange([...criteria, newCriterion]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Critérios</h3>
      
      <div className="space-y-2">
        {criteria.map((criterio, index) => (
          <div 
            key={criterio.id} 
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded font-medium flex-shrink-0">#{criterio.id}</span>
            <span className="flex-1 text-sm text-gray-900 truncate">{criterio.texto}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {criterio.obrigatoria && (
                <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded font-medium">Obrigatório</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeCriterion(index)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Criterion Button */}
      <button
        type="button"
        onClick={addCriterion}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        Adicionar critério
      </button>
    </div>
  );
}

// Componente para editar configurações do agente
function AgentConfigEditor({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Limites de análise salarial */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Limites de análise salarial</h4>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <Check className="w-3.5 h-3.5" />
              Ativo no Agente
            </span>
            <button
              type="button"
              onClick={() => updateConfig('limitesAnalise', !config.limitesAnalise)}
              className={`relative w-11 h-6 rounded-full transition-colors ${config.limitesAnalise ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.limitesAnalise ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-700">Usar no Agente</span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-purple-600 mb-2 block">
                Perde ponto se Salário MENOR que: <span className="text-purple-600">↓↓</span>
              </label>
              <input
                type="text"
                value={config.salarioMinimo || ''}
                onChange={(e) => updateConfig('salarioMinimo', e.target.value)}
                placeholder="R$ 0,00"
                className="w-full px-3 py-2 border border-purple-200 rounded-md bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-purple-600 mb-2 block">
                Perde ponto se Salário MAIOR que: <span className="text-purple-600">↑↑</span>
              </label>
              <input
                type="text"
                value={config.salarioMaximo || ''}
                onChange={(e) => updateConfig('salarioMaximo', e.target.value)}
                placeholder="R$ 0,00"
                className="w-full px-3 py-2 border border-purple-200 rounded-md bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <span className="text-blue-600 text-sm">️</span>
            <p className="text-xs text-blue-900">
              Se <span className="font-medium">não houver limites definidos</span>, o Agente usará <span className="font-medium">±20% do salário da vaga</span> como faixa de cálculo.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Salário da vaga:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">R$ 10.000</span>
            </div>
            <div>
              <span className="text-gray-600">Pedir pretensão salarial:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Sim</span>
            </div>
            <div>
              <span className="text-gray-600">Tornar pretensão salarial obrigatória:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Sim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critérios para analisar os currículos */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Critérios para analisar os currículos</h4>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <Check className="w-3.5 h-3.5" />
              Ativo no Agente
            </span>
            <button
              type="button"
              onClick={() => updateConfig('usarCriteriosAgente', !config.usarCriteriosAgente)}
              className={`relative w-11 h-6 rounded-full transition-colors ${config.usarCriteriosAgente ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.usarCriteriosAgente ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-700">Usar no Agente</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Critérios:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">7</span>
            </div>
            <div>
              <span className="text-gray-600">Pedir currículo:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Sim</span>
            </div>
            <div>
              <span className="text-gray-600">Tornar currículo obrigatório:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Sim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário personalizado */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Formulário personalizado</h4>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <Check className="w-3.5 h-3.5" />
              Ativo no Agente
            </span>
            <button
              type="button"
              onClick={() => updateConfig('usarFormularioAgente', !config.usarFormularioAgente)}
              className={`relative w-11 h-6 rounded-full transition-colors ${config.usarFormularioAgente ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.usarFormularioAgente ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-700">Usar no Agente</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Mostrar formulário para o talento:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Ativa</span>
            </div>
            <div>
              <span className="text-gray-600">Questões:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">5</span>
            </div>
            <div>
              <span className="text-gray-600">Correção automática:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">Ativa</span>
            </div>
            <div>
              <span className="text-gray-600">Questões com resposta certa:</span> <span className="text-purple-600 hover:underline cursor-pointer font-medium">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}