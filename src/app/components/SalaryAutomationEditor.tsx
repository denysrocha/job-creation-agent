import { X } from 'lucide-react';

interface SalaryAutomationEditorProps {
  config: any;
  onChange: (config: any) => void;
}

export function SalaryAutomationEditor({ config, onChange }: SalaryAutomationEditorProps) {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Nome da automação */}
      <div>
        <label className="text-sm font-medium text-purple-600 mb-2 block">
          Nome *
        </label>
        <div className="relative">
          <input
            type="text"
            value={config.nome || 'Reprova por expectativa salarial'}
            onChange={(e) => updateConfig('nome', e.target.value)}
            className="w-full px-3 py-2.5 border-2 border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gatilho */}
      <div>
        <p className="text-sm text-gray-700 mb-4">Quando você gostaria que esta automação fosse disparada?</p>
        <div>
          <label className="text-sm font-medium text-purple-600 mb-2 block">
            Gatilho *
          </label>
          <select
            value={config.gatilho || 'Talento informou pretensão salarial fora da faixa'}
            onChange={(e) => updateConfig('gatilho', e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="Talento informou pretensão salarial fora da faixa">Talento informou pretensão salarial fora da faixa</option>
            <option value="Outro gatilho">Outro gatilho</option>
          </select>
        </div>
      </div>

      {/* Pretensão salarial - dois campos lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pretensão abaixo */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => updateConfig('utilizarAbaixo', config.utilizarAbaixo === undefined ? true : !config.utilizarAbaixo)}
              className={`relative w-11 h-6 rounded-full transition-colors ${config.utilizarAbaixo !== false ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.utilizarAbaixo !== false ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-900">Utilizar pretensão abaixo</span>
          </div>
          <label className="text-sm font-medium text-purple-600 mb-2 block">
            Pretensão salarial abaixo de *
          </label>
          <input
            type="text"
            value={config.pretensaoAbaixo || 'R$ 10.000,00'}
            onChange={(e) => updateConfig('pretensaoAbaixo', e.target.value)}
            className="w-full px-3 py-2.5 border-2 border-purple-200 rounded-md bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Pretensão acima */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => updateConfig('utilizarAcima', config.utilizarAcima === undefined ? true : !config.utilizarAcima)}
              className={`relative w-11 h-6 rounded-full transition-colors ${config.utilizarAcima !== false ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.utilizarAcima !== false ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-900">Utilizar pretensão acima</span>
          </div>
          <label className="text-sm font-medium text-purple-600 mb-2 block">
            Pretensão salarial acima de *
          </label>
          <input
            type="text"
            value={config.pretensaoAcima || 'R$ 12.000,00'}
            onChange={(e) => updateConfig('pretensaoAcima', e.target.value)}
            className="w-full px-3 py-2.5 border-2 border-purple-200 rounded-md bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Info sobre pretensão salarial */}
      <div className="flex items-start gap-2 text-sm text-gray-600 italic">
        <span className="text-gray-400">ℹ</span>
        <p>Atenção! Os valores de pretensão salarial são independentes do modelo de contratação.</p>
      </div>

      {/* Ação da automação */}
      <div>
        <p className="text-sm text-gray-700 mb-4">O que essa automação deveria fazer?</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-purple-600 mb-2 block">
              Ação da Automação *
            </label>
            <select
              value={config.acao || 'Reprovar talento e enviar devolutiva'}
              onChange={(e) => updateConfig('acao', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="Reprovar talento e enviar devolutiva">Reprovar talento e enviar devolutiva</option>
              <option value="Apenas reprovar">Apenas reprovar</option>
              <option value="Enviar email">Enviar email</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-purple-600 mb-2 block">
              Atraso para executar a ação *
            </label>
            <select
              value={config.atraso || '0'}
              onChange={(e) => updateConfig('atraso', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="0">0 minutos (imediato)</option>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="1440">1 dia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Box de atenção */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-sm font-bold">!</span>
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-orange-900 mb-1">Atenção!</h5>
            <p className="text-sm text-orange-800">
              Caso o talento já esteja reprovado ou tenha desistido essa ação não será executada, logo o email também não será enviado
            </p>
          </div>
          <button type="button" className="text-orange-400 hover:text-orange-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Motivo e Comentário */}
      <div>
        <label className="text-sm font-medium text-purple-600 mb-2 block">
          Selecione um motivo:*
        </label>
        <select
          value={config.motivo || 'pretensao'}
          onChange={(e) => updateConfig('motivo', e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        >
          <option value="">Selecione um motivo</option>
          <option value="pretensao">Pretensão salarial incompatível</option>
          <option value="experiencia">Experiência insuficiente</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-purple-600 mb-2 block">
          Comentário
        </label>
        <textarea
          value={config.comentario || ''}
          onChange={(e) => updateConfig('comentario', e.target.value)}
          placeholder="Adicione um comentário sobre o talento..."
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      {/* Toggle enviar email */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => updateConfig('enviarEmail', config.enviarEmail === undefined ? true : !config.enviarEmail)}
          className={`relative w-11 h-6 rounded-full transition-colors ${config.enviarEmail !== false ? 'bg-purple-600' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.enviarEmail !== false ? 'translate-x-5' : ''}`} />
        </button>
        <span className="text-sm font-semibold text-gray-900">Enviar email para o talento</span>
      </div>

      {/* Quando enviar o email */}
      {config.enviarEmail !== false && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-purple-600 mb-3">Quando deseja enviar o email?</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={config.emailTiming !== 'delayed'}
                  onChange={() => updateConfig('emailTiming', 'immediate')}
                  className="w-4 h-4 text-purple-600 accent-purple-600"
                />
                <span className="text-sm text-gray-900">Assim que a automação for acionada</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={config.emailTiming === 'delayed'}
                  onChange={() => updateConfig('emailTiming', 'delayed')}
                  className="w-4 h-4 text-purple-600 accent-purple-600"
                />
                <span className="text-sm text-gray-900">Depois de um tempo da execução da automação</span>
              </label>
            </div>
          </div>

          {/* Tabs do email */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => updateConfig('emailTab', 'compose')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  config.emailTab !== 'review'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ✉️ Escreva o email
              </button>
              <button
                type="button"
                onClick={() => updateConfig('emailTab', 'review')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  config.emailTab === 'review'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📄 Resumo e conferência
              </button>
            </div>
          </div>

          {/* Conteúdo da tab */}
          {config.emailTab !== 'review' ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Selecione um template e escreva o e-mail<br />
                  Deixamos alguns templates prontos pra te ajudar
                </p>
                <label className="text-sm font-medium text-purple-600 mb-2 block">
                  Selecione um template
                </label>
                <select
                  value={config.template || ''}
                  onChange={(e) => updateConfig('template', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-500"
                >
                  <option value="">Escolha um template</option>
                  <option value="reprovacao">Template de reprovação</option>
                  <option value="feedback">Template de feedback</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-purple-600 mb-2 block">
                  Assunto:
                </label>
                <input
                  type="text"
                  value={config.assunto || 'Processo seletivo - Atualização sobre sua candidatura'}
                  onChange={(e) => updateConfig('assunto', e.target.value)}
                  placeholder="Escreva o assunto"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-purple-600 mb-2 block">
                  Corpo do email:
                </label>
                {/* Rich text editor toolbar */}
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <div className="bg-white border-b border-gray-200 p-2 flex items-center gap-2 flex-wrap">
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded" title="Negrito">
                      <span className="font-bold text-sm">B</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded" title="Itálico">
                      <span className="italic text-sm">I</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded" title="Sublinhado">
                      <span className="underline text-sm">U</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded" title="Tachado">
                      <span className="line-through text-sm">S</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300" />
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded" title="Imagem">
                      <span className="text-sm">🖼️</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300" />
                    <select className="text-sm border-0 bg-transparent">
                      <option>Variáveis</option>
                    </select>
                    <select className="text-sm border-0 bg-transparent">
                      <option>Simples</option>
                    </select>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                      <span className="text-sm">𝐀</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300" />
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded">☰</button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded">⋮</button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded">⋮⋮⋮</button>
                    <button type="button" className="p-1.5 hover:bg-gray-100 rounded">⋯</button>
                  </div>
                  <textarea
                    value={config.corpoEmail || 'Olá!\n\nAgradecemos seu interesse em fazer parte da nossa equipe.\n\nApós análise criteriosa de seu perfil, identificamos que a pretensão salarial informada não está alinhada com a faixa orçamentária aprovada para esta posição.\n\nInfelizmente, não poderemos dar continuidade ao processo neste momento. Entretanto, manteremos seu currículo em nosso banco de talentos para futuras oportunidades que possam estar mais alinhadas ao seu perfil.\n\nDesejamos sucesso em sua jornada profissional!\n\nAtenciosamente,\nEquipe de Recrutamento'}
                    onChange={(e) => updateConfig('corpoEmail', e.target.value)}
                    className="w-full p-3 border-0 focus:outline-none resize-none min-h-[200px]"
                    placeholder="Digite o conteúdo do email..."
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 p-4 bg-white rounded-md">
              <p>Resumo da automação...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
