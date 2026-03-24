import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  MessageSquare,
  BookOpen,
  Bot,
  ChevronDown,
  ChevronUp,
  X,
  DollarSign,
  ClipboardCheck,
  GitBranch,
  Globe,
  MailCheck,
  CheckCircle,
} from 'lucide-react';
import {
  JDAnalysisResult,
  CriterioCurriculo,
  PerguntaFormulario,
  HabilidadeScorecard,
  KitEntrevistaEtapa,
} from '../types/jdAnalysis';
import { PLATAFORMAS_PADRAO, ETAPAS_PADRAO, FASES_PADRAO } from '../types/job';

interface DistribuicaoPainelProps {
  analysis: JDAnalysisResult;
  titulo?: string;
}

type PainelAberto = 'curriculo' | 'formulario' | 'kit' | 'agente' | 'etapas' | 'divulgacao' | 'confirmacao' | null;

// ── Badge maps ────────────────────────────────────────────────────────────────

const pesoBadge: Record<string, { label: string; className: string }> = {
  eliminatorio: { label: 'Eliminatório', className: 'bg-red-100 text-red-700' },
  alto:         { label: 'Alto',         className: 'bg-orange-100 text-orange-700' },
  medio:        { label: 'Médio',        className: 'bg-yellow-100 text-yellow-700' },
  baixo:        { label: 'Baixo',        className: 'bg-gray-100 text-gray-600' },
};

const tipoBadge: Record<string, { label: string; className: string }> = {
  sim_nao:          { label: 'Sim/Não',          className: 'bg-blue-100 text-blue-700' },
  multipla_escolha: { label: 'Múltipla escolha', className: 'bg-purple-100 text-purple-700' },
  dissertativa:     { label: 'Dissertativa',     className: 'bg-gray-100 text-gray-600' },
};

// ── Critérios de currículo ────────────────────────────────────────────────────

export function CurriculoDetalhe({ items }: { items: CriterioCurriculo[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const badge = pesoBadge[item.peso];
        return (
          <div key={item.id} className="bg-white border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm text-gray-800">{item.criterio}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.className}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 italic">"{item.justificativa}"</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Formulário personalizado ──────────────────────────────────────────────────

export function FormularioDetalhe({ items }: { items: PerguntaFormulario[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const badge = tipoBadge[item.tipo];
        return (
          <div key={item.id} className="bg-white border border-gray-100 rounded-lg p-3">
            <div className="flex items-start gap-2 mb-1.5">
              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.className}`}>
                {badge.label}
              </span>
              {item.tem_gabarito && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 whitespace-nowrap flex-shrink-0">
                  Com gabarito
                </span>
              )}
            </div>
            <p className="text-sm text-gray-800 mb-1">{item.pergunta}</p>
            {item.opcoes && (
              <div className="flex flex-wrap gap-1 mb-1">
                {item.opcoes.map((op) => (
                  <span
                    key={op}
                    className={`text-xs px-2 py-0.5 rounded border ${
                      item.gabarito && item.gabarito.includes(op)
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {op}{item.gabarito && item.gabarito.includes(op) && ' ✓'}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 italic">"{item.justificativa}"</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Kit de entrevista e scorecards ────────────────────────────────────────────

export function KitDetalhe({
  kitEtapas,
  scorecards,
}: {
  kitEtapas: KitEntrevistaEtapa[];
  scorecards: HabilidadeScorecard[];
}) {
  const scorecardMap = Object.fromEntries(scorecards.map(s => [s.id, s]));

  return (
    <div className="space-y-5">
      {kitEtapas.map((etapa) => {
        const etapaScores = etapa.scorecards_vinculados
          .map(id => scorecardMap[id])
          .filter(Boolean);
        const justificativaNota = etapaScores[0]?.justificativa ?? '';

        return (
          <div key={etapa.etapa} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap px-2">
                Etapa: {etapa.etapa}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Roteiro da entrevista
              </p>
              <ol className="space-y-2">
                {etapa.perguntas_sugeridas.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 font-medium mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                    <p className="text-sm text-gray-700 leading-snug">{p}</p>
                  </li>
                ))}
              </ol>
            </div>
            {etapaScores.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Scorecards
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {etapaScores.map(sc => (
                    <span
                      key={sc.id}
                      className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800"
                    >
                      {sc.habilidade}
                    </span>
                  ))}
                </div>
                {justificativaNota && (
                  <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-2">
                    "{justificativaNota}"
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Agente na triagem ─────────────────────────────────────────────────────────

export function AgenteTriagemDetalhe({
  criteriosCurriculo,
  formulario,
  analise_salarial,
}: {
  criteriosCurriculo: CriterioCurriculo[];
  formulario: PerguntaFormulario[];
  analise_salarial: boolean;
}) {
  const comGabarito = formulario.filter(f => f.tem_gabarito);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          <p className="font-semibold text-gray-700 text-[12px]">Análise de currículo</p>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {criteriosCurriculo.length} critérios
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
              Ativo
            </span>
          </div>
        </div>
        <div className="space-y-1">
          {criteriosCurriculo.map(c => {
            const badge = pesoBadge[c.peso];
            return (
              <div key={c.id} className="flex items-start justify-between gap-2 py-1 border-b border-gray-50 last:border-0">
                <p className="text-xs text-gray-700 leading-snug flex-1">{c.criterio}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.className}`}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-700">Análise salarial</p>
          {analise_salarial ? (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium ml-auto">
              Ativo
            </span>
          ) : (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 ml-auto">
              Aguardando faixa salarial
            </span>
          )}
        </div>
        <p className="text-xs text-gray-600 leading-snug">
          Compara a pretensão salarial declarada pelo candidato com a faixa definida para a vaga.
          Candidatos fora da faixa não avançam para a triagem de currículo.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardCheck className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-700">Formulário personalizado</p>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
              {comGabarito.length} com gabarito
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
              Ativo
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {comGabarito.map(q => (
            <div key={q.id} className="py-1 border-b border-gray-50 last:border-0">
              <p className="text-xs text-gray-700 leading-snug">{q.pergunta}</p>
              {q.gabarito && (
                <p className="text-xs text-green-700 mt-0.5">
                  Resposta esperada: <span className="font-medium">{q.gabarito}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 italic">
          Respostas com gabarito contribuem para o fit score do candidato na triagem automática.
        </p>
      </div>
    </div>
  );
}

// ── Etapas do processo ────────────────────────────────────────────────────────

function EtapasDetalhe() {
  // Group ETAPAS_PADRAO by fase, preserving FASES_PADRAO order
  const etapasPorFase = FASES_PADRAO.map(fase => ({
    fase,
    etapas: ETAPAS_PADRAO.filter(e => e.fase === fase),
  })).filter(g => g.etapas.length > 0);

  return (
    <div className="space-y-3">
      {etapasPorFase.map(({ fase, etapas }) => (
        <div key={fase}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 px-0.5">
            {fase}
          </p>
          <div className="flex flex-wrap gap-2">
            {etapas.map(etapa => (
              <div
                key={etapa.id}
                className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2"
              >
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {etapa.ordem}
                </span>
                <span className="text-sm text-gray-800">{etapa.nome}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400 italic pt-1">
        Etapas padrão do funil. Você pode adicionar, renomear ou remover antes de publicar.
      </p>
    </div>
  );
}

// ── Divulgação da vaga ────────────────────────────────────────────────────────

function DivulgacaoDetalhe({ titulo, descricao }: { titulo?: string; descricao?: string }) {
  const plataformas = PLATAFORMAS_PADRAO;
  const descricaoDesc: Record<string, string> = {
    linkedin:        'Divulgação automática no perfil da empresa no LinkedIn.',
    netvagas:        'Publicação na plataforma NetVagas / Trampos.',
    talentcom:       'Distribuição automática para parceiros Talent.com.',
    pacotejobboards: 'Distribuição para +7 job boards parceiros simultaneamente.',
    ondetrabalhar:   'Publicação no portal OndeTrabalhar.com.',
    indeed:          'Publicação no Indeed (requer configuração).',
  };

  const truncatedDesc = descricao
    ? descricao.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240) + (descricao.length > 240 ? '…' : '')
    : null;

  return (
    <div className="space-y-3">
      {/* Visibilidade */}
      <div className="bg-white border border-gray-100 rounded-lg px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-gray-700">Visibilidade</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
            Pública
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-snug mt-0.5 pl-[22px]">
          Visível a todos na página de vagas da empresa.
        </p>
      </div>

      {/* Título da vaga */}
      {titulo && (
        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">Título da vaga</p>
          <p className="text-sm font-medium text-gray-800">{titulo}</p>
        </div>
      )}

      {/* Job description preview */}
      {truncatedDesc && (
        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Descrição da vaga</p>
          <p className="text-xs text-gray-600 leading-relaxed">{truncatedDesc}</p>
        </div>
      )}

      {/* Job boards — compact rows */}
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
        {plataformas.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-3 py-2 ${i < plataformas.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <span className="text-sm text-gray-700">{p.nome}</span>
            {p.comRestricoes ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium flex-shrink-0">
                Ver restrições
              </span>
            ) : p.ativa ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex-shrink-0">
                Ativo
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
                Inativo
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 italic">
        Você pode adicionar ou remover canais nas configurações de divulgação da vaga.
      </p>
    </div>
  );
}

// ── Confirmação de inscrição ──────────────────────────────────────────────────

function ConfirmacaoDetalhe({ titulo }: { titulo?: string }) {
  const nomeVaga = titulo || '{nome da vaga}';

  const emailBody = `Olá, {nome do candidato}!

Confirmamos sua inscrição para a vaga de ${nomeVaga}. 🎉

Seus dados foram recebidos com sucesso e nossa equipe de Talent Acquisition irá analisar o seu perfil com cuidado.

Próximos passos:
• Análise do seu perfil (até 5 dias úteis)
• Se selecionado, entraremos em contato para agendar uma conversa
• Fique de olho no seu e-mail!

Qualquer dúvida, estamos à disposição.

Até breve!
Equipe de Recrutamento`;

  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2.5">
          <MailCheck className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-700">E-mail de confirmação</p>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium ml-auto">
            Configurado
          </span>
        </div>
        <div className="space-y-1.5 mb-3">
          <div className="flex items-start gap-1.5">
            <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-700">Assunto:</span>{' '}
              Recebemos sua inscrição — {nomeVaga}
            </p>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-700">Envio:</span>{' '}
              Automático após submissão do formulário
            </p>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-700">Modo:</span>{' '}
              Via sistema (e-mail padrão da plataforma)
            </p>
          </div>
        </div>

        {/* Email body preview */}
        <div className="border-t border-gray-100 pt-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Corpo do e-mail
          </p>
          <div className="bg-gray-50 rounded-lg px-3 py-2.5 border border-dashed border-gray-200">
            <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">
              {emailBody}
            </pre>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 italic">
        Você pode personalizar o template nas configurações de confirmação de inscrição.
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DistribuicaoPainel({ analysis, titulo }: DistribuicaoPainelProps) {
  const [painelAberto, setPainelAberto] = useState<PainelAberto>(null);
  const { distribuicao_resumo } = analysis;

  const togglePainel = (painel: PainelAberto) => {
    setPainelAberto(prev => prev === painel ? null : painel);
  };

  const activePlatforms = PLATAFORMAS_PADRAO.filter(p => p.ativa && !p.comRestricoes).length;

  const stats: {
    key: PainelAberto;
    icon: React.ReactNode;
    count: number | string;
    label: string;
    impactLine: string;
    color: string;
    bgColor: string;
    activeBorderColor: string;
  }[] = [
    {
      key: 'curriculo',
      icon: <FileText className="w-4 h-4" />,
      count: distribuicao_resumo.criterios_curriculo,
      label: 'Critérios de currículo',
      impactLine: 'Análise automática de CVs assim que chegarem.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      activeBorderColor: 'border-blue-300 bg-blue-50',
    },
    {
      key: 'formulario',
      icon: <MessageSquare className="w-4 h-4" />,
      count: distribuicao_resumo.perguntas_formulario,
      label: 'Formulário personalizado',
      impactLine: 'Triagem de candidatos na inscrição.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      activeBorderColor: 'border-purple-300 bg-purple-50',
    },
    {
      key: 'kit',
      icon: <BookOpen className="w-4 h-4" />,
      count: distribuicao_resumo.habilidades_scorecard,
      label: 'Kits e scorecards',
      impactLine: 'Roteiro e critérios por etapa.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      activeBorderColor: 'border-amber-300 bg-amber-50',
    },
    {
      key: 'agente',
      icon: <Bot className="w-4 h-4" />,
      count: (distribuicao_resumo.criterios_curriculo > 0 ? 1 : 0)
        + (distribuicao_resumo.agente_triagem.formulario_com_gabarito > 0 ? 1 : 0)
        + (distribuicao_resumo.agente_triagem.analise_salarial ? 1 : 0),
      label: 'Agente na triagem',
      impactLine: 'Classificação automática por fit.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      activeBorderColor: 'border-teal-300 bg-teal-50',
    },
    {
      key: 'etapas',
      icon: <GitBranch className="w-4 h-4" />,
      count: ETAPAS_PADRAO.length,
      label: 'Etapas do processo',
      impactLine: 'Sequência sugerida para a vaga.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      activeBorderColor: 'border-green-300 bg-green-50',
    },
    {
      key: 'divulgacao',
      icon: <Globe className="w-4 h-4" />,
      count: activePlatforms,
      label: 'Divulgação da vaga',
      impactLine: 'Canais ativos para candidaturas.',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      activeBorderColor: 'border-sky-300 bg-sky-50',
    },
    {
      key: 'confirmacao',
      icon: <MailCheck className="w-4 h-4" />,
      count: 1,
      label: 'Confirmação de inscrição',
      impactLine: 'E-mail automático ao candidato.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      activeBorderColor: 'border-indigo-300 bg-indigo-50',
    },
  ];

  const tituloPainel: Record<string, string> = {
    curriculo: 'Critérios de análise de currículo',
    formulario: 'Formulário personalizado de inscrição',
    kit: 'Kits de entrevista e scorecards',
    agente: 'Agente na triagem — como classifica os candidatos',
    etapas: 'Etapas do processo seletivo',
    divulgacao: 'Divulgação da vaga',
    confirmacao: 'Confirmação de inscrição',
  };

  const jdDescricao = analysis.job_description?.texto;

  const detalheMap: Record<string, React.ReactNode> = {
    curriculo: <CurriculoDetalhe items={analysis.criterios_curriculo} />,
    formulario: <FormularioDetalhe items={analysis.formulario} />,
    kit: <KitDetalhe kitEtapas={analysis.kit_entrevista} scorecards={analysis.scorecard} />,
    agente: (
      <AgenteTriagemDetalhe
        criteriosCurriculo={analysis.criterios_curriculo}
        formulario={analysis.formulario}
        analise_salarial={distribuicao_resumo.agente_triagem.analise_salarial}
      />
    ),
    etapas: <EtapasDetalhe />,
    divulgacao: <DivulgacaoDetalhe titulo={titulo} descricao={jdDescricao} />,
    confirmacao: <ConfirmacaoDetalhe titulo={titulo} />,
  };

  // Split into rows of 3
  const COLS = 3;
  const rows: typeof stats[] = [];
  for (let i = 0; i < stats.length; i += COLS) {
    rows.push(stats.slice(i, i + COLS));
  }

  return (
    <div className="mt-3 space-y-2">
      {rows.map((row, rowIndex) => {
        const activeKeyInRow = row.find(s => s.key === painelAberto)?.key ?? null;
        const hasActiveInRow = activeKeyInRow !== null;

        return (
          <div key={rowIndex}>
            {/* Cards row — 3 columns */}
            <div className="grid grid-cols-3 gap-2">
              {row.map((stat) => {
                const isActive = painelAberto === stat.key;
                return (
                  <button
                    key={stat.key}
                    onClick={() => togglePainel(stat.key)}
                    className={`flex flex-col gap-2 p-4 rounded-xl border transition-all text-left ${
                      isActive
                        ? `${stat.activeBorderColor}`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.bgColor} ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div className={`flex-shrink-0 ${stat.color}`}>
                        {isActive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <div>
                      <p className={`text-2xl leading-none mb-1 ${stat.color}`} style={{ fontWeight: 800 }}>
                        {stat.count}
                      </p>
                      <p className="text-gray-800 leading-snug mb-0.5 text-[13px]">{stat.label}</p>
                      <p className="text-[11px] text-gray-400 leading-snug">{stat.impactLine}</p>
                    </div>
                  </button>
                );
              })}
              {/* Pad last row if not full */}
              {row.length < COLS && Array.from({ length: COLS - row.length }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
            </div>

            {/* Inline detail panel — appears below this row */}
            <AnimatePresence>
              {hasActiveInRow && (
                <motion.div
                  key={activeKeyInRow}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-700">
                        {tituloPainel[activeKeyInRow!]}
                      </p>
                      <button
                        onClick={() => setPainelAberto(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {detalheMap[activeKeyInRow!]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Ambiguous resolved */}
      {distribuicao_resumo.ambiguos_resolvidos > 0 && (
        <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          <span className="text-indigo-400 text-base leading-none mt-0.5 flex-shrink-0">✦</span>
          <p className="text-xs text-indigo-700 leading-snug">
            <span className="font-semibold">
              {distribuicao_resumo.ambiguos_resolvidos} requisito{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} ambíguo{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''}
            </span>{' '}
            identificado{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} e distribuído{distribuicao_resumo.ambiguos_resolvidos > 1 ? 's' : ''} em múltiplas ferramentas para maior confiabilidade do fit.
          </p>
        </div>
      )}
    </div>
  );
}