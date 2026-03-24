import { RequisitionFullData } from '../types/job';

// ── Vagas existentes (para Duplicar) ─────────────────────────────────────────
export const mockJobs = [
  { label: 'Engenheiro de Software Sênior — Backend', value: 'job1' },
  { label: 'Engenheiro de Software Pleno — Full Stack', value: 'job2' },
  { label: 'Engenheiro de Software Júnior — Frontend', value: 'job3' },
  { label: 'Engenheiro de Software Staff — Infraestrutura', value: 'job4' },
  { label: 'Product Manager — Growth', value: 'job5' },
  { label: 'Designer UX/UI Pleno', value: 'job6' },
  { label: 'Analista de Dados Sênior', value: 'job7' },
  { label: 'Tech Lead Backend', value: 'job8' },
  { label: 'DevOps Engineer', value: 'job9' },
  { label: 'QA Engineer Pleno', value: 'job10' },
  { label: 'Data Scientist Sênior', value: 'job11' },
  { label: 'Scrum Master', value: 'job12' },
];

// ── Requisições disponíveis ───────────────────────────────────────────────────
export const mockRequisitions = [
  { label: 'REQ-2025-001 — Engenheiro(a) de Software Sênior', value: 'REQ-2025-001' },
  { label: 'REQ-2025-002 — Product Manager', value: 'REQ-2025-002' },
  { label: 'REQ-2025-003 — Designer UX/UI', value: 'REQ-2025-003' },
  { label: 'REQ-2025-004 — Analista de Dados', value: 'REQ-2025-004' },
  { label: 'REQ-2025-005 — Tech Lead Backend', value: 'REQ-2025-005' },
  { label: 'REQ-2025-006 — Engenheiro(a) de Software Pleno', value: 'REQ-2025-006' },
  { label: 'REQ-2025-007 — DevOps Engineer', value: 'REQ-2025-007' },
  { label: 'REQ-2025-008 — QA Engineer', value: 'REQ-2025-008' },
  { label: 'REQ-2025-009 — Data Scientist Sênior', value: 'REQ-2025-009' },
  { label: 'REQ-2025-010 — Scrum Master', value: 'REQ-2025-010' },
  { label: 'REQ-2025-011 — Designer UX Pleno', value: 'c3f2' },
  { label: 'REQ-2025-012 — Vaga Frontend Sênior', value: 'f086' },
  { label: 'REQ-2025-013 — Teste Camp. Pers. Multipl.', value: 'bd56' },
  { label: 'REQ-2025-014 — Analista de Dados Sênior', value: 'b34c' },
];

export const mockTemplates = [
  { label: 'Desenvolvedor Full Stack', value: 'template1' },
  { label: 'Analista de Marketing Digital', value: 'template2' },
  { label: 'Gerente de Produto', value: 'template3' },
  { label: 'Designer UX/UI', value: 'template4' },
  { label: 'Engenheiro de Dados', value: 'template5' },
];

// ── Detalhes completos de vagas para duplicar ─────────────────────────────────
export function jobDetailsFromId(jobId: string): JobData {
  const jobs: Record<string, JobData> = {
    job1: {
      titulo: 'Engenheiro de Software Sênior — Backend',
      senioridade: 'Senior',
      salario: 'R$ 12.000 - R$ 18.000',
      modeloTrabalho: 'Remoto',
      localizacao: 'São Paulo, SP',
      habilidades: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      contrato: 'CLT',
      beneficios: ['Vale refeição', 'Plano de saúde', 'Home office'],
      departamento: 'Engenharia',
      descricao: 'Buscamos um engenheiro backend experiente para liderar projetos técnicos e mentorear desenvolvedores.\n\nResponsabilidades:\n- Desenvolver e manter serviços backend escaláveis em Node.js\n- Realizar code reviews e garantir qualidade de código\n- Mentorear desenvolvedores júnior e pleno\n- Participar de decisões arquiteturais\n\nRequisitos:\n- 5+ anos de experiência com desenvolvimento backend\n- Domínio de Node.js e TypeScript\n- Experiência com bancos de dados relacionais e NoSQL\n- Inglês intermediário',
    },
    job2: {
      titulo: 'Engenheiro de Software Pleno — Full Stack',
      senioridade: 'Pleno',
      salario: 'R$ 8.000 - R$ 12.000',
      modeloTrabalho: 'Híbrido',
      localizacao: 'Rio de Janeiro, RJ',
      habilidades: ['React', 'Node.js', 'MongoDB', 'Docker'],
      contrato: 'CLT',
      beneficios: ['Vale refeição', 'Vale transporte', 'Gympass'],
      departamento: 'Produto',
      descricao: 'Procuramos desenvolvedor full stack para atuar em nosso produto principal e colaborar com times de design e produto.\n\nResponsabilidades:\n- Desenvolver features de ponta a ponta (frontend + backend)\n- Colaborar com designers na implementação do design system\n- Escrever testes automatizados\n\nRequisitos:\n- 3+ anos de experiência full stack\n- React e Node.js',
    },
    job3: {
      titulo: 'Engenheiro de Software Júnior — Frontend',
      senioridade: 'Junior',
      salario: 'R$ 4.000 - R$ 6.000',
      modeloTrabalho: 'Presencial',
      localizacao: 'Belo Horizonte, MG',
      habilidades: ['React', 'JavaScript', 'CSS', 'Git'],
      contrato: 'CLT',
      beneficios: ['Vale refeição', 'Plano de saúde'],
      departamento: 'Engenharia',
      descricao: 'Oportunidade para desenvolvedores frontend iniciantes crescerem em um ambiente colaborativo e de alta qualidade técnica.\n\nRequisitos:\n- 1+ ano de experiência com React\n- Vontade de aprender e crescer',
    },
    job4: {
      titulo: 'Engenheiro de Software Staff — Infraestrutura',
      senioridade: 'Staff',
      salario: 'R$ 18.000 - R$ 25.000',
      modeloTrabalho: 'Remoto',
      localizacao: 'Brasil',
      habilidades: ['Kubernetes', 'AWS', 'Terraform', 'Python'],
      contrato: 'PJ',
      beneficios: ['Auxílio home office', 'Plano de saúde premium'],
      departamento: 'Infraestrutura',
      descricao: 'Buscamos um engenheiro staff para liderar nossa infraestrutura cloud e definir estratégias de escalabilidade.\n\nRequisitos:\n- 8+ anos de experiência\n- Kubernetes, AWS e Terraform\n- Experiência liderando equipes de infra',
    },
    job5: {
      titulo: 'Product Manager — Growth',
      senioridade: 'Senior',
      salario: 'R$ 14.000 - R$ 20.000',
      modeloTrabalho: 'Remoto',
      localizacao: 'São Paulo, SP',
      habilidades: ['Product Strategy', 'OKRs', 'Data Analysis', 'A/B Testing'],
      contrato: 'CLT',
      beneficios: ['Vale refeição', 'Plano de saúde', 'Stock options'],
      departamento: 'Produto',
      descricao: 'Buscamos um PM sênior para liderar iniciativas de growth e expansão de produto.\n\nRequisitos:\n- 5+ anos como PM\n- Experiência com growth e métricas\n- Inglês avançado',
    },
  };
  return jobs[jobId] || { titulo: 'Vaga', senioridade: 'Pleno', salario: '', modeloTrabalho: 'Remoto', localizacao: 'Brasil', habilidades: [], contrato: 'CLT', beneficios: [], departamento: 'Tecnologia', descricao: '' };
}

// ── Detalhes completos de requisições (RequisitionFullData) ───────────────────
const REQUISITIONS_FULL: Record<string, RequisitionFullData> = {
  'REQ-2025-001': {
    id: 'REQ-2025-001',
    name: 'Engenheiro(a) de Software Sênior',
    recResponsavel: 'Ana Beatriz Santos',
    salarioIdeal: 'R$ 14.000',
    salarioMaximo: 'R$ 18.000',
    descricaoCargo: `Buscamos um(a) Engenheiro(a) de Software Sênior para integrar nosso time de plataforma.\n\nResponsabilidades:\n- Desenvolver e manter sistemas distribuídos de alta disponibilidade\n- Realizar code reviews e mentorear desenvolvedores\n- Contribuir com decisões arquiteturais\n- Garantir cobertura de testes e qualidade\n\nRequisitos:\n- 5+ anos de experiência com desenvolvimento backend\n- Domínio de Go, Python ou Kotlin\n- Experiência com sistemas distribuídos e microsserviços\n- Inglês avançado`,
    posicoes: [{ quantidade: 2, motivo: 'Expansão de time' }],
  },
  'REQ-2025-002': {
    id: 'REQ-2025-002',
    name: 'Product Manager',
    recResponsavel: 'Carlos Eduardo Lima',
    salarioIdeal: 'R$ 12.000',
    salarioMaximo: 'R$ 16.000',
    descricaoCargo: `Buscamos um Product Manager para liderar o roadmap de nossa plataforma B2B.\n\nResponsabilidades:\n- Definir e priorizar o roadmap de produto com base em dados e feedback de clientes\n- Colaborar com times de engenharia, design e marketing\n- Acompanhar métricas e KPIs do produto\n\nRequisitos:\n- 4+ anos de experiência como PM\n- Experiência com produtos B2B\n- Habilidades analíticas e inglês avançado`,
    posicoes: [{ quantidade: 1, motivo: 'Substituição' }],
  },
  'REQ-2025-003': {
    id: 'REQ-2025-003',
    name: 'Designer UX/UI',
    recResponsavel: 'Ana Beatriz Santos',
    salarioIdeal: 'R$ 8.000',
    salarioMaximo: 'R$ 11.000',
    descricaoCargo: `Buscamos um Designer UX/UI para criar experiências digitais excepcionais.\n\nResponsabilidades:\n- Conduzir pesquisas com usuários\n- Criar wireframes e protótipos de alta fidelidade\n- Colaborar com engenharia e produto\n\nRequisitos:\n- 3+ anos em UX/UI Design\n- Domínio de Figma\n- Portfólio com cases relevantes`,
    posicoes: [{ quantidade: 1, motivo: 'Nova área' }],
  },
  'REQ-2025-004': {
    id: 'REQ-2025-004',
    name: 'Analista de Dados',
    recResponsavel: 'Denys Rocha @inhire',
    salarioIdeal: 'R$ 9.000',
    salarioMaximo: 'R$ 13.000',
    descricaoCargo: `Buscamos um Analista de Dados para transformar dados em insights estratégicos.\n\nResponsabilidades:\n- Coletar, processar e analisar grandes volumes de dados\n- Construir dashboards em Looker ou Power BI\n- Desenvolver modelos preditivos\n\nRequisitos:\n- 3+ anos em análise de dados\n- SQL avançado e Python\n- Experiência com BigQuery ou Redshift`,
    posicoes: [{ quantidade: 2, motivo: 'Expansão de time' }],
  },
  'c3f2': {
    id: 'c3f2',
    name: 'Designer UX Pleno',
    recResponsavel: 'Ana Beatriz Santos',
    salarioIdeal: 'R$ 8.000',
    salarioMaximo: 'R$ 10.000',
    descricaoCargo: `Buscamos um Designer UX Pleno apaixonado por criar experiências digitais excepcionais.\n\nResponsabilidades:\n- Conduzir pesquisas com usuários e analisar dados para embasar decisões de design\n- Criar wireframes, protótipos de alta fidelidade e fluxos de navegação\n- Colaborar com equipes de produto e engenharia\n\nRequisitos:\n- 3+ anos de experiência em UX Design\n- Domínio de Figma e Maze\n- Portfólio com cases relevantes`,
    posicoes: [{ quantidade: 1, motivo: 'Substituição' }, { quantidade: 2, motivo: 'Expansão de time' }],
  },
  'f086': {
    id: 'f086',
    name: 'Vaga frontend senior',
    recResponsavel: 'Denys Rocha @inhire',
    salarioIdeal: 'R$ 12.000',
    salarioMaximo: 'R$ 16.000',
    descricaoCargo: `Buscamos um Desenvolvedor Frontend Sênior para integrar nosso time de engenharia.\n\nResponsabilidades:\n- Desenvolver interfaces de alta performance com React e TypeScript\n- Colaborar com designers na implementação e evolução do design system\n- Realizar code reviews e mentorar devs júnior e pleno\n\nRequisitos:\n- 5+ anos de experiência com desenvolvimento frontend\n- Domínio de React, TypeScript e CSS moderno\n- Experiência com testes automatizados`,
    posicoes: [{ quantidade: 3, motivo: 'Expansão de time' }],
  },
  'bd56': {
    id: 'bd56',
    name: 'Teste camp. pers. multipl...',
    recResponsavel: 'André Luiz Gartner',
    salarioIdeal: 'R$ 6.000',
    salarioMaximo: 'R$ 8.000',
    descricaoCargo: `Desenvolvedor Full Stack com experiência em Node.js e React para atuar em projetos de inovação.\n\nRequisitos:\n- 2+ anos de experiência com desenvolvimento full stack\n- Conhecimento em bancos de dados relacionais e NoSQL`,
    posicoes: [{ quantidade: 1, motivo: 'Nova área' }],
  },
  'b34c': {
    id: 'b34c',
    name: 'Analista de Dados Sênior',
    recResponsavel: 'Carlos Eduardo Lima',
    salarioIdeal: 'R$ 10.000',
    salarioMaximo: 'R$ 14.000',
    descricaoCargo: `Buscamos um Analista de Dados Sênior para transformar dados em insights estratégicos.\n\nResponsabilidades:\n- Coletar, processar e analisar grandes volumes de dados\n- Construir dashboards e relatórios em ferramentas de BI\n\nRequisitos:\n- 4+ anos em análise de dados\n- SQL avançado e Python`,
    posicoes: [{ quantidade: 2, motivo: 'Aumento de quadro' }],
  },
};

export function requisitionFullDataFromId(reqId: string): RequisitionFullData {
  return REQUISITIONS_FULL[reqId] ?? {
    id: reqId,
    name: mockRequisitions.find(r => r.value === reqId)?.label ?? reqId,
    recResponsavel: null,
    salarioIdeal: '',
    salarioMaximo: '',
    descricaoCargo: 'Descrição não disponível.',
    posicoes: [{ quantidade: 1, motivo: 'Expansão de time' }],
  };
}

/** Builds a JobData from a duplicated job for the JD analysis flow */
export function jobFullDataFromId(jobId: string): { titulo: string; descricao: string; salarioIdeal: string; salarioMaximo: string } {
  const d = jobDetailsFromId(jobId);
  return {
    titulo: d.titulo,
    descricao: d.descricao,
    salarioIdeal: d.salario?.split(' - ')[0] ?? '',
    salarioMaximo: d.salario?.split(' - ')[1] ?? '',
  };
}

export function templateDetailsFromId(templateId: string): TemplateData {
  const templates: Record<string, TemplateData> = {
    template1: {
      titulo: 'Desenvolvedor Full Stack',
      senioridade: 'Pleno',
      departamento: 'Produto',
      contrato: 'CLT',
    },
    template2: {
      titulo: 'Analista de Marketing Digital',
      senioridade: 'Pleno',
      departamento: 'Marketing',
      contrato: 'CLT',
    },
    template3: {
      titulo: 'Gerente de Produto',
      senioridade: 'Senior',
      departamento: 'Produto',
      contrato: 'CLT',
    },
    template4: {
      titulo: 'Designer UX/UI',
      senioridade: 'Pleno',
      departamento: 'Design',
      contrato: 'CLT',
    },
    template5: {
      titulo: 'Engenheiro de Dados',
      senioridade: 'Pleno',
      departamento: 'Dados',
      contrato: 'CLT',
    },
  };
  return templates[templateId] || {};
}

interface JobData {
  titulo: string;
  senioridade: string;
  salario: string;
  modeloTrabalho: string;
  localizacao: string;
  habilidades: string[];
  contrato: string;
  beneficios: string[];
  departamento: string;
  descricao: string;
}

interface TemplateData {
  titulo: string;
  senioridade: string;
  departamento: string;
  contrato: string;
}
