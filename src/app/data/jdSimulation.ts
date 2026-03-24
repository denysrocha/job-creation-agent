import {
  JDAnalysisResult,
  Requisito,
  PerguntaFormulario,
  CriterioCurriculo,
  HabilidadeScorecard,
  KitEntrevistaEtapa,
  Automacao,
  DistribuicaoResumo,
} from '../types/jdAnalysis';

// ─── Keyword detection ───────────────────────────────────────────────────────

interface DetectedContext {
  primarySkill: string;
  secondarySkill: string;
  thirdSkill: string;
  isLeadership: boolean;
  hasMicroservices: boolean;
  hasCloud: boolean;
  seniority: 'Junior' | 'Pleno' | 'Sênior' | 'Staff';
  roleType: string;
}

function detectContext(jdText: string): DetectedContext {
  const lower = jdText.toLowerCase();

  // Primary skill detection
  const primarySkill =
    lower.includes('python') ? 'Python' :
    (lower.includes('java') && !lower.includes('javascript')) ? 'Java' :
    lower.includes('golang') || lower.includes(' go ') ? 'Go' :
    lower.includes('kotlin') ? 'Kotlin' :
    lower.includes('react') ? 'React' :
    lower.includes('node.js') || lower.includes('nodejs') ? 'Node.js' :
    lower.includes('typescript') ? 'TypeScript' :
    lower.includes('ruby') ? 'Ruby on Rails' :
    lower.includes('php') ? 'PHP' :
    lower.includes('swift') ? 'Swift' :
    'JavaScript';

  // Secondary skill
  const secondarySkill =
    lower.includes('postgresql') || lower.includes('postgres') ? 'PostgreSQL' :
    lower.includes('mysql') ? 'MySQL' :
    lower.includes('mongodb') ? 'MongoDB' :
    lower.includes('redis') ? 'Redis' :
    lower.includes('aws') ? 'AWS' :
    lower.includes('docker') ? 'Docker' :
    lower.includes('kubernetes') || lower.includes('k8s') ? 'Kubernetes' :
    lower.includes('graphql') ? 'GraphQL' :
    lower.includes('kafka') ? 'Kafka' :
    'SQL';

  // Third skill
  const thirdSkill =
    lower.includes('docker') && secondarySkill !== 'Docker' ? 'Docker' :
    lower.includes('aws') && secondarySkill !== 'AWS' ? 'AWS' :
    lower.includes('kubernetes') && secondarySkill !== 'Kubernetes' ? 'Kubernetes' :
    lower.includes('terraform') ? 'Terraform' :
    lower.includes('ci/cd') || lower.includes('cicd') ? 'CI/CD' :
    lower.includes('git') ? 'Git' :
    'APIs REST';

  const isLeadership =
    lower.includes('lideran') || lower.includes('team lead') ||
    lower.includes('tech lead') || lower.includes('gestão de time') ||
    lower.includes('mentori') || lower.includes('squad lead');

  const hasMicroservices =
    lower.includes('microservic') || lower.includes('microsservi') ||
    lower.includes('distributed') || lower.includes('distribuído');

  const hasCloud =
    lower.includes('aws') || lower.includes('azure') || lower.includes('gcp') ||
    lower.includes('cloud') || lower.includes('nuvem');

  const seniority: DetectedContext['seniority'] =
    lower.includes('staff') || lower.includes('principal') ? 'Staff' :
    lower.includes('sênior') || lower.includes('senior') || lower.includes('sr.') ? 'Sênior' :
    lower.includes('júnior') || lower.includes('junior') || lower.includes('jr.') ? 'Junior' :
    'Pleno';

  const roleType =
    lower.includes('frontend') || lower.includes('front-end') ? 'Frontend' :
    lower.includes('backend') || lower.includes('back-end') ? 'Backend' :
    lower.includes('full stack') || lower.includes('fullstack') ? 'Full Stack' :
    lower.includes('mobile') ? 'Mobile' :
    lower.includes('devops') ? 'DevOps' :
    lower.includes('data') || lower.includes('dados') ? 'Dados' :
    lower.includes('design') ? 'Design' :
    'Software';

  return { primarySkill, secondarySkill, thirdSkill, isLeadership, hasMicroservices, hasCloud, seniority, roleType };
}

// ─── Simulation engine ───────────────────────────────────────────────────────

export function simulateJDAnalysis(jdText: string): JDAnalysisResult {
  const ctx = detectContext(jdText);

  // ── Requisitos ──────────────────────────────────────────────────────────────
  const requisitos: Requisito[] = [
    {
      id: 'req_1',
      descricao: `Experiência sólida com ${ctx.primarySkill}`,
      tipo: 'tecnico',
      destinos: ['criterio_curriculo'],
      justificativa: 'Verificável no CV com alta confiabilidade — entra como critério de triagem automática.',
      ambiguo: false,
    },
    {
      id: 'req_2',
      descricao: `Conhecimento em ${ctx.secondarySkill}`,
      tipo: 'tecnico',
      destinos: ['criterio_curriculo', 'scorecard'],
      justificativa: `Pode aparecer no CV mas frequentemente sem profundidade suficiente — entra nos dois para cruzar sinais e validar na entrevista.`,
      ambiguo: true,
    },
    {
      id: 'req_3',
      descricao: ctx.hasMicroservices
        ? 'Experiência com arquitetura de microsserviços e sistemas distribuídos'
        : `Boas práticas de arquitetura de software e design de sistemas`,
      tipo: 'tecnico',
      destinos: ['scorecard'],
      justificativa: 'Competência avaliável apenas em conversa técnica profunda — entra no scorecard da etapa de entrevista técnica.',
      ambiguo: false,
    },
    {
      id: 'req_4',
      descricao: `Familiaridade com ${ctx.thirdSkill}`,
      tipo: 'tecnico',
      destinos: ['criterio_curriculo', 'formulario'],
      justificativa: 'Tecnologia relevante para o stack — aparece no CV às vezes, mas uma pergunta direta no formulário complementa a triagem.',
      ambiguo: true,
    },
    {
      id: 'req_5',
      descricao: `${ctx.seniority === 'Junior' ? '0–2 anos' : ctx.seniority === 'Pleno' ? '3–5 anos' : ctx.seniority === 'Sênior' ? '5+ anos' : '8+ anos'} de experiência em desenvolvimento de software`,
      tipo: 'fato_objetivo',
      destinos: ['criterio_curriculo', 'formulario'],
      justificativa: 'CVs raramente explicitam tempo de experiência com precisão — uma pergunta direta no formulário confirma antes da triagem avançar.',
      ambiguo: false,
    },
    {
      id: 'req_6',
      descricao: 'Inglês intermediário ou avançado',
      tipo: 'fato_objetivo',
      destinos: ['formulario'],
      justificativa: 'CVs raramente detalham nível de inglês com credibilidade — uma pergunta direta no formulário é mais confiável.',
      ambiguo: false,
    },
    {
      id: 'req_7',
      descricao: ctx.isLeadership
        ? 'Capacidade de liderança técnica, mentoria e tomada de decisões de impacto'
        : 'Capacidade de colaboração, comunicação técnica e trabalho em equipe',
      tipo: 'comportamental',
      destinos: ['scorecard'],
      justificativa: 'Competência comportamental avaliável apenas em conversa — entra no scorecard da etapa de entrevista cultural.',
      ambiguo: false,
    },
    {
      id: 'req_8',
      descricao: 'Capacidade de resolver problemas complexos e ambíguos sob pressão',
      tipo: 'situacional',
      destinos: ['scorecard'],
      justificativa: 'Avaliável apenas com perguntas situacionais em entrevista — scorecard é o lugar certo.',
      ambiguo: false,
    },
    {
      id: 'req_9',
      descricao: 'Experiência com metodologias ágeis (Scrum, Kanban ou similares)',
      tipo: 'tecnico',
      destinos: ['criterio_curriculo'],
      justificativa: 'Verificável no CV com razoável confiabilidade — entra como critério de triagem com peso médio, não eliminatório.',
      ambiguo: false,
    },
    {
      id: 'req_10',
      descricao: 'Pretensão salarial compatível com a faixa definida para o cargo',
      tipo: 'fato_objetivo',
      destinos: ['automacao'],
      justificativa: 'Requisito binário e eliminatório — entra como automação de reprovação por faixa salarial para não desperdiçar tempo do candidato nem do time.',
      ambiguo: false,
    },
    {
      id: 'req_11',
      descricao: 'Disponibilidade para o modelo de trabalho definido',
      tipo: 'fato_objetivo',
      destinos: ['automacao'],
      justificativa: 'Requisito binário e eliminatório — entra como automação de reprovação por modelo de trabalho.',
      ambiguo: false,
    },
    {
      id: 'req_12',
      descricao: 'Comunicação clara com stakeholders e liderança',
      tipo: 'comportamental',
      destinos: ['scorecard'],
      justificativa: 'Avaliável apenas em conversa com gestores — entra no scorecard da etapa de entrevista com gestor.',
      ambiguo: false,
    },
  ];

  // ── Critérios de currículo ──────────────────────────────────────────────────
  const criteriosCurriculo: CriterioCurriculo[] = [
    {
      id: 'cc_1',
      requisito_id: 'req_1',
      criterio: `Experiência comprovada com ${ctx.primarySkill} — projetos no CV, LinkedIn ou portfólio`,
      peso: 'alto',
      justificativa: 'Habilidade core para a função — peso alto na triagem automática. Candidatos sem isso raramente avançam.',
    },
    {
      id: 'cc_2',
      requisito_id: 'req_2',
      criterio: `Menção a ${ctx.secondarySkill} em ao menos um projeto ou experiência`,
      peso: 'medio',
      justificativa: 'Habilidade complementar — peso médio, não eliminatório. Será aprofundada no scorecard.',
    },
    {
      id: 'cc_3',
      requisito_id: 'req_4',
      criterio: `Familiaridade com ${ctx.thirdSkill} mencionada em experiências anteriores`,
      peso: 'medio',
      justificativa: 'Diferencial técnico — peso médio. Pergunta no formulário complementa a análise do CV.',
    },
    {
      id: 'cc_4',
      requisito_id: 'req_5',
      criterio: `Histórico de ${ctx.seniority === 'Junior' ? 'até 2 anos' : ctx.seniority === 'Pleno' ? '3 a 5 anos' : ctx.seniority === 'Sênior' ? 'mais de 5 anos' : 'mais de 8 anos'} de experiência em desenvolvimento`,
      peso: 'eliminatorio',
      justificativa: 'Critério de senioridade é eliminatório — candidatos fora do perfil de experiência não avançam para evitar frustração de ambos os lados.',
    },
    {
      id: 'cc_5',
      requisito_id: 'req_9',
      criterio: 'Experiência em ambiente ágil mencionada no CV (Scrum, Kanban, sprints)',
      peso: 'baixo',
      justificativa: 'Contexto de trabalho — peso baixo. É esperado mas não eliminatório, especialmente para perfis júnior.',
    },
  ];

  // ── Formulário ─────────────────────────────────────────────────────────────
  const formulario: PerguntaFormulario[] = [
    {
      id: 'form_1',
      requisito_id: 'req_5',
      pergunta: `Quantos anos de experiência você tem com desenvolvimento de software?`,
      tipo: 'multipla_escolha',
      opcoes: ['Menos de 1 ano', '1–2 anos', '3–5 anos', '5–8 anos', '8+ anos'],
      tem_gabarito: true,
      gabarito: ctx.seniority === 'Junior' ? '1–2 anos' : ctx.seniority === 'Pleno' ? '3–5 anos' : ctx.seniority === 'Sênior' ? '5–8 anos' : '8+ anos',
      justificativa: 'Pergunta objetiva para confirmar senioridade antes de avançar — rápida de responder e elimina desalinhamento de expectativas.',
    },
    {
      id: 'form_2',
      requisito_id: 'req_6',
      pergunta: 'Qual é o seu nível de inglês?',
      tipo: 'multipla_escolha',
      opcoes: ['Básico', 'Intermediário', 'Avançado', 'Fluente / Nativo'],
      tem_gabarito: true,
      gabarito: 'Intermediário',
      justificativa: 'CVs raramente detalham nível de idioma com precisão — pergunta direta é mais confiável e rápida.',
    },
    {
      id: 'form_3',
      requisito_id: 'req_4',
      pergunta: ctx.hasCloud
        ? 'Você já trabalhou com serviços de cloud (AWS, GCP ou Azure) em ambiente de produção?'
        : `Você tem experiência com ${ctx.thirdSkill} em projetos reais?`,
      tipo: 'sim_nao',
      opcoes: null,
      tem_gabarito: true,
      gabarito: 'Sim',
      justificativa: 'Pergunta binária para confirmar experiência real — complementa o critério de currículo e elimina candidatos sem vivência prática.',
    },
  ];

  // ── Scorecard ───────────────────────────────────────────────────────────────
  const scorecard: HabilidadeScorecard[] = [
    // ── Entrevista técnica ──────────────────────────────────────────────────
    {
      id: 'sc_1',
      requisito_id: 'req_3',
      habilidade: ctx.hasMicroservices ? 'Arquitetura de microsserviços' : 'Design e arquitetura de software',
      descricao: ctx.hasMicroservices
        ? `Avaliar profundidade de conhecimento em design de microsserviços. Verificar se o candidato operou em sistemas distribuídos em produção, quais padrões utilizou (CQRS, Event Sourcing, Saga) e como lida com falhas e consistência eventual.`
        : `Avaliar capacidade de design de sistemas. Verificar se o candidato consegue tomar decisões arquiteturais fundamentadas, discutir trade-offs e comunicá-las claramente para o time.`,
      etapa: 'Entrevista técnica',
      justificativa: 'Avaliável apenas em conversa técnica profunda — não verificável com fidelidade em CV.',
    },
    {
      id: 'sc_2',
      requisito_id: 'req_2',
      habilidade: `Profundidade técnica em ${ctx.secondarySkill}`,
      descricao: `Avaliar o nível real de conhecimento em ${ctx.secondarySkill}. Ir além do que está no CV: entender a profundidade prática, os problemas que já enfrentou e como tomou decisões de otimização.`,
      etapa: 'Entrevista técnica',
      justificativa: 'Complementa o critério de currículo — cruzamento de sinais para maior confiabilidade na avaliação.',
    },
    {
      id: 'sc_4',
      requisito_id: 'req_8',
      habilidade: 'Resolução de problemas e raciocínio sob pressão',
      descricao: 'Verificar como o candidato aborda problemas de alta complexidade ou ambiguidade. Avaliar raciocínio lógico, capacidade de priorização, estruturação do problema antes de propor soluções e resiliência em situações adversas.',
      etapa: 'Entrevista técnica',
      justificativa: 'Avaliável apenas com perguntas situacionais — scorecard é a ferramenta certa para isso.',
    },
    {
      id: 'sc_6',
      requisito_id: 'req_1',
      habilidade: `Qualidade e manutenibilidade de código em ${ctx.primarySkill}`,
      descricao: `Avaliar boas práticas de engenharia: testes automatizados, code review, padrões de clean code, SOLID. Verificar se o candidato pensa em legibilidade e manutenção a longo prazo, não apenas em funcionar agora.`,
      etapa: 'Entrevista técnica',
      justificativa: 'Difícil de inferir pelo CV — a qualidade do código só se revela em conversa técnica detalhada.',
    },
    {
      id: 'sc_7',
      requisito_id: 'req_4',
      habilidade: ctx.hasCloud ? 'Observabilidade e operação em produção' : `Integração e debugging com ${ctx.thirdSkill}`,
      descricao: ctx.hasCloud
        ? 'Avaliar experiência com métricas, logs, tracing e alertas em produção. Verificar como o candidato diagnostica incidentes, define SLIs/SLOs e toma decisões de escalabilidade.'
        : `Avaliar capacidade de integrar, depurar e diagnosticar problemas reais com ${ctx.thirdSkill} em ambiente de produção.`,
      etapa: 'Entrevista técnica',
      justificativa: 'Competência operacional que vai além do que CVs descrevem — avaliável apenas em discussão técnica aprofundada.',
    },

    // ── Entrevista cultural ─────────────────────────────────────────────────
    {
      id: 'sc_3',
      requisito_id: 'req_7',
      habilidade: ctx.isLeadership ? 'Liderança técnica e desenvolvimento de time' : 'Colaboração e comunicação técnica',
      descricao: ctx.isLeadership
        ? 'Avaliar experiência em liderar times técnicos, fazer code review construtivo, mentorar desenvolvedores e tomar decisões que impactam toda a engenharia. Verificar maturidade para lidar com conflitos técnicos.'
        : 'Avaliar como o candidato colabora com o time, defende suas decisões técnicas de forma respeitosa, recebe e dá feedback, e contribui para o ambiente de trabalho.',
      etapa: 'Entrevista cultural',
      justificativa: 'Competência comportamental avaliável apenas em conversa estruturada.',
    },
    {
      id: 'sc_8',
      requisito_id: 'req_8',
      habilidade: 'Proatividade e senso de ownership',
      descricao: 'Avaliar se o candidato age além do que foi pedido, antecipa riscos, sugere melhorias e se sente dono das entregas. Verificar histórico de iniciativas tomadas sem direção explícita da liderança.',
      etapa: 'Entrevista cultural',
      justificativa: 'Ownership é cultural e situacional — não se mede no CV, apenas em conversas com exemplos concretos.',
    },
    {
      id: 'sc_9',
      requisito_id: 'req_9',
      habilidade: 'Adaptabilidade a mudanças e ambiguidade',
      descricao: 'Avaliar como o candidato reage a pivots de produto, mudanças de prioridade e situações sem resposta clara. Verificar exemplos reais de como lidou com incerteza e ainda entregou valor.',
      etapa: 'Entrevista cultural',
      justificativa: 'Comportamento sob mudança é avaliável apenas com perguntas situacionais aprofundadas — não é possível inferir pelo histórico no CV.',
    },

    // ── Entrevista com gestor ───────────────────────────────────────────────
    {
      id: 'sc_5',
      requisito_id: 'req_12',
      habilidade: 'Comunicação com gestores e stakeholders',
      descricao: 'Avaliar capacidade de traduzir problemas técnicos para uma linguagem acessível a gestores e áreas de negócio. Verificar experiência em alinhamentos, clareza na comunicação de riscos e expectativas.',
      etapa: 'Entrevista com gestor',
      justificativa: 'Avaliável apenas em conversa com a liderança — entra no scorecard da entrevista final para validar fit cultural e comunicação.',
    },
    {
      id: 'sc_10',
      requisito_id: 'req_7',
      habilidade: 'Alinhamento com objetivos e metas da empresa',
      descricao: 'Avaliar se o candidato compreende o contexto de negócio, conecta seu trabalho a OKRs e resultados, e demonstra interesse genuíno pela missão da empresa — não apenas pelo cargo técnico.',
      etapa: 'Entrevista com gestor',
      justificativa: 'Alinhamento estratégico só é avaliável numa conversa direta com o gestor responsável pela área.',
    },
    {
      id: 'sc_11',
      requisito_id: 'req_8',
      habilidade: 'Autonomia e maturidade na tomada de decisão',
      descricao: 'Avaliar como o candidato age quando não tem todas as informações ou aprovações necessárias. Verificar histórico de decisões técnicas tomadas de forma autônoma, os critérios usados e os resultados obtidos.',
      etapa: 'Entrevista com gestor',
      justificativa: 'Maturidade decisória é validada com o gestor, que poderá avaliar se o candidato operaria bem com o nível de autonomia da vaga.',
    },
  ];

  // ── Kit de entrevista ───────────────────────────────────────────────────────
  const kitEntrevista: KitEntrevistaEtapa[] = [
    {
      etapa: 'Entrevista técnica',
      objetivo: `Avaliar profundidade técnica em ${ctx.primarySkill}, ${ctx.secondarySkill}, qualidade de código e capacidade de design de sistemas.`,
      perguntas_sugeridas: [
        ctx.hasMicroservices
          ? 'Fale sobre um projeto onde você foi responsável pela arquitetura de microsserviços. Quais foram as decisões técnicas mais difíceis e o que aprendeu?'
          : `Fale sobre um projeto relevante com ${ctx.primarySkill}. Quais decisões técnicas foram as mais difíceis e como você as tomou?`,
        `Como você garante qualidade de código em ${ctx.primarySkill} num ambiente com alta cadência de entregas? Fale sobre sua abordagem de testes e code review.`,
        'Descreva uma situação onde você identificou e resolveu um problema crítico de performance em produção. Qual foi o diagnóstico e como você priorizou a solução?',
        ctx.hasCloud
          ? 'Como você estrutura o deploy de uma aplicação na cloud? Quais são os principais riscos operacionais e como os mitiga?'
          : 'Como você aborda dívida técnica num ambiente com pressão constante por entregas? Dê um exemplo real.',
        `Conte sobre a última vez que você discordou de uma decisão técnica no time. Como conduziu a situação?`,
      ],
      scorecards_vinculados: ['sc_1', 'sc_2', 'sc_4', 'sc_6', 'sc_7'],
    },
    {
      etapa: 'Entrevista cultural',
      objetivo: 'Avaliar alinhamento com valores, proatividade, adaptabilidade e capacidade de colaboração com o time.',
      perguntas_sugeridas: [
        ctx.isLeadership
          ? 'Como você estrutura a comunicação do time técnico com a liderança em sprints de alta pressão?'
          : 'Como você lida com discordâncias técnicas com colegas de time? Dê um exemplo concreto.',
        'Descreva um erro significativo que você cometeu em um projeto. O que aconteceu, como você comunicou e o que mudou depois?',
        ctx.isLeadership
          ? 'Como você mentorou alguém que estava com dificuldades de performance? Qual foi a abordagem e o resultado?'
          : 'Como você se mantém atualizado técnica e profissionalmente? O que estudou nos últimos 3 meses?',
        'Conte sobre uma situação onde as prioridades mudaram radicalmente no meio do projeto. Como você se adaptou e manteve a qualidade das entregas?',
      ],
      scorecards_vinculados: ['sc_3', 'sc_8', 'sc_9'],
    },
    {
      etapa: 'Entrevista com gestor',
      objetivo: 'Avaliar fit com a equipe, expectativas de carreira, autonomia e capacidade de comunicação com a liderança.',
      perguntas_sugeridas: [
        'Quais são suas expectativas de crescimento técnico e de carreira nos próximos 2 anos? Como essa vaga se encaixa nesse plano?',
        'Como você prefere receber feedback? Dê um exemplo de feedback difícil que você recebeu e como agiu a partir dele.',
        'Como você prioriza seu trabalho quando há múltiplos projetos com urgência simultânea e pouco contexto disponível?',
        'Fale sobre uma decisão técnica importante que você tomou de forma autônoma. Quais foram os critérios, os riscos e o resultado?',
      ],
      scorecards_vinculados: ['sc_5', 'sc_10', 'sc_11'],
    },
  ];

  // ── Automações ──────────────────────────────────────────────────────────────
  const automacoes: Automacao[] = [
    {
      tipo: 'salario',
      ativo: false,
      parametro: 'Faixa salarial ainda não definida — será configurada nas próximas etapas',
      justificativa: 'Candidatos com pretensão fora da faixa salarial serão reprovados automaticamente, sem avançar no processo e sem desperdiçar tempo de nenhum lado.',
    },
    {
      tipo: 'modelo_trabalho',
      ativo: false,
      parametro: 'Modelo de trabalho ainda não definido — será configurado nas próximas etapas',
      justificativa: 'Candidatos que não têm disponibilidade para o modelo de trabalho definido serão reprovados automaticamente na etapa de inscrição.',
    },
  ];

  // ── Distribuição resumo ─────────────────────────────────────────────────────
  const distribuicaoResumo: DistribuicaoResumo = {
    total_requisitos: requisitos.length,
    criterios_curriculo: criteriosCurriculo.length,
    perguntas_formulario: formulario.length,
    habilidades_scorecard: scorecard.length,
    automacoes: automacoes.length,
    ambiguos_resolvidos: requisitos.filter(r => r.ambiguo).length,
    agente_triagem: {
      criterios_curriculo: criteriosCurriculo.length,
      analise_salarial: false,
      formulario_com_gabarito: formulario.filter(f => f.tem_gabarito).length,
    },
  };

  return {
    job_description: { texto: jdText },
    requisitos,
    formulario,
    criterios_curriculo: criteriosCurriculo,
    scorecard,
    kit_entrevista: kitEntrevista,
    automacoes,
    distribuicao_resumo: distribuicaoResumo,
  };
}