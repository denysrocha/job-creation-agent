import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ChevronDown, ExternalLink, MoreHorizontal, Plus, Bell, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { RequisitionFullData } from '../types/job';

interface Requisition {
  id: string;
  name: string;
  recResponsavel: string | null;
  requerente: string;
  vagaVinculada: string | null;
  dataCriacao: string;
  dataAprovacao: string;
}

// Rich detail data for each requisition (used when navigating to the agent)
const mockRequisitionDetails: Record<string, RequisitionFullData> = {
  'c3f2': {
    id: 'c3f2',
    name: 'Designer UX Pleno',
    recResponsavel: 'Ana Beatriz Santos',
    salarioIdeal: 'R$ 8.000',
    salarioMaximo: 'R$ 10.000',
    descricaoCargo: `Buscamos um Designer UX Pleno apaixonado por criar experiências digitais excepcionais para nossos usuários.\n\nResponsabilidades:\n- Conduzir pesquisas com usuários e analisar dados para embasar decisões de design\n- Criar wireframes, protótipos de alta fidelidade e fluxos de navegação\n- Colaborar com equipes de produto e engenharia para garantir entregas de qualidade\n- Realizar testes de usabilidade e iterar continuamente com base em feedbacks\n- Manter e evoluir o design system da empresa\n\nRequisitos:\n- 3+ anos de experiência em UX Design\n- Domínio de ferramentas como Figma e Maze\n- Portfólio com cases de projetos relevantes e resultados mensuráveis\n- Experiência com design systems e componentização\n- Inglês intermediário`,
    posicoes: [
      { quantidade: 1, motivo: 'Crescimento do time de produto' },
    ],
    camposPersonalizados: [
      { nome: 'Portfólio obrigatório', valor: 'Sim' },
      { nome: 'Nível de inglês', valor: 'Intermediário' },
    ],
  },
  'f086': {
    id: 'f086',
    name: 'Vaga frontend senior',
    recResponsavel: 'Denys Rocha @inhire',
    salarioIdeal: 'R$ 12.000',
    salarioMaximo: 'R$ 16.000',
    descricaoCargo: `Buscamos um Desenvolvedor Frontend Sênior para integrar nosso time de engenharia e liderar iniciativas de qualidade e performance.\n\nResponsabilidades:\n- Desenvolver interfaces de alta performance com React e TypeScript\n- Colaborar com designers na implementação e evolução do design system\n- Realizar code reviews e mentorar devs júnior e pleno\n- Contribuir com decisões arquiteturais e de boas práticas\n- Garantir cobertura de testes automatizados\n\nRequisitos:\n- 5+ anos de experiência com desenvolvimento frontend\n- Domínio de React, TypeScript e CSS moderno (Tailwind, CSS Modules)\n- Experiência com testes automatizados (Jest, Testing Library, Cypress)\n- Inglês intermediário ou avançado\n- Experiência com pipelines CI/CD`,
    posicoes: [
      { quantidade: 2, motivo: 'Expansão do time de produto' },
    ],
    camposPersonalizados: [
      { nome: 'Nível de inglês', valor: 'Intermediário' },
      { nome: 'Disponibilidade para viagens', valor: 'Não' },
    ],
  },
  'bd56': {
    id: 'bd56',
    name: 'Teste camp. pers. multipl...',
    recResponsavel: 'André Luiz Gartner',
    salarioIdeal: 'R$ 6.000',
    salarioMaximo: 'R$ 8.000',
    descricaoCargo: `Desenvolvedor Full Stack com experiência em Node.js e React para atuar em projetos de inovação.\n\nResponsabilidades:\n- Desenvolver e manter APIs RESTful em Node.js\n- Criar interfaces modernas com React\n- Participar de cerimônias ágeis e planejamentos de sprint\n\nRequisitos:\n- 2+ anos de experiência com desenvolvimento full stack\n- Conhecimento em bancos de dados relacionais e NoSQL\n- Familiaridade com Docker e ambientes cloud`,
    posicoes: [
      { quantidade: 1, motivo: 'Substituição de funcionário' },
    ],
    camposPersonalizados: [
      { nome: 'Tipo de contrato', valor: 'CLT' },
      { nome: 'Modalidade', valor: 'Híbrido' },
    ],
  },
  '872a': {
    id: '872a',
    name: 'teste de campo de data',
    recResponsavel: null,
    salarioIdeal: 'R$ 4.000',
    salarioMaximo: 'R$ 5.500',
    descricaoCargo: `Analista de Suporte Técnico para atendimento a clientes B2B.\n\nResponsabilidades:\n- Atender chamados de suporte via chat, e-mail e telefone\n- Diagnosticar e resolver problemas técnicos\n- Documentar soluções na base de conhecimento\n\nRequisitos:\n- Experiência em suporte técnico ou helpdesk\n- Conhecimentos básicos em redes e sistemas operacionais\n- Boa comunicação e foco no cliente`,
    posicoes: [
      { quantidade: 1, motivo: 'Nova posição' },
    ],
  },
  'b34c': {
    id: 'b34c',
    name: 'Analista de Dados Sênior',
    recResponsavel: 'Carlos Eduardo Lima',
    salarioIdeal: 'R$ 10.000',
    salarioMaximo: 'R$ 14.000',
    descricaoCargo: `Buscamos um Analista de Dados Sênior para transformar dados em insights estratégicos para o negócio.\n\nResponsabilidades:\n- Coletar, processar e analisar grandes volumes de dados\n- Construir dashboards e relatórios em ferramentas de BI (Looker, Power BI)\n- Desenvolver modelos preditivos e análises estatísticas\n- Trabalhar em conjunto com times de produto e marketing\n- Garantir a qualidade e governança dos dados\n\nRequisitos:\n- 4+ anos de experiência em análise de dados\n- Domínio de SQL avançado e Python (pandas, scikit-learn)\n- Experiência com data warehouses (BigQuery, Redshift)\n- Conhecimento em estatística e machine learning\n- Inglês avançado`,
    posicoes: [
      { quantidade: 1, motivo: 'Crescimento da área de dados' },
    ],
    camposPersonalizados: [
      { nome: 'Nível de inglês', valor: 'Avançado' },
      { nome: 'Certificação em dados', valor: 'Desejável' },
    ],
  },
};

type TabKey = 'pendentes' | 'aprovadas' | 'reprovadas' | 'canceladas';

const mockRequisitions: Record<TabKey, Requisition[]> = {
  pendentes: [
    {
      id: 'c3f2',
      name: 'Designer UX Pleno',
      recResponsavel: 'Ana Beatriz Santos',
      requerente: 'Ana Beatriz Santos',
      vagaVinculada: null,
      dataCriacao: '13/03/26',
      dataAprovacao: '—',
    },
  ],
  aprovadas: [
    {
      id: 'f086',
      name: 'Vaga frontend senior',
      recResponsavel: 'Denys Rocha @inhire',
      requerente: 'Denys Rocha @inhire',
      vagaVinculada: null,
      dataCriacao: '13/03/26',
      dataAprovacao: '13/03/26',
    },
    {
      id: 'bd56',
      name: 'Teste camp. pers. multipl...',
      recResponsavel: 'André Luiz Gartner',
      requerente: 'André Luiz Gartner',
      vagaVinculada: 'https://inhire.com.br/vaga/bd56',
      dataCriacao: '12/03/26',
      dataAprovacao: '12/03/26',
    },
    {
      id: '872a',
      name: 'teste de campo de data',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/872a',
      dataCriacao: '12/03/26',
      dataAprovacao: '12/03/26',
    },
    {
      id: '8de9',
      name: 'Teste de Campo Personal...',
      recResponsavel: null,
      requerente: 'Grayce Vieira de Lima Foli...',
      vagaVinculada: 'https://inhire.com.br/vaga/8de9',
      dataCriacao: '10/03/26',
      dataAprovacao: '10/03/26',
    },
    {
      id: 'a84e',
      name: 'req will 5',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/a84e',
      dataCriacao: '28/02/26',
      dataAprovacao: '28/02/26',
    },
    {
      id: '93cd',
      name: 'req will 4',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/93cd',
      dataCriacao: '28/02/26',
      dataAprovacao: '28/02/26',
    },
    {
      id: '1527',
      name: 'req will 3',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/1527',
      dataCriacao: '28/02/26',
      dataAprovacao: '28/02/26',
    },
    {
      id: 'ded7',
      name: 'req will 2',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/ded7',
      dataCriacao: '28/02/26',
      dataAprovacao: '28/02/26',
    },
    {
      id: 'a12f',
      name: 'req will 1',
      recResponsavel: null,
      requerente: 'Suporte InHire Teste',
      vagaVinculada: 'https://inhire.com.br/vaga/a12f',
      dataCriacao: '27/02/26',
      dataAprovacao: '27/02/26',
    },
    {
      id: 'b34c',
      name: 'Analista de Dados Sênior',
      recResponsavel: 'Carlos Eduardo Lima',
      requerente: 'Carlos Eduardo Lima',
      vagaVinculada: 'https://inhire.com.br/vaga/b34c',
      dataCriacao: '25/02/26',
      dataAprovacao: '26/02/26',
    },
  ],
  reprovadas: [
    {
      id: 'd9e1',
      name: 'Desenvolvedor Backend Java',
      recResponsavel: 'Fernanda Costa',
      requerente: 'Fernanda Costa',
      vagaVinculada: null,
      dataCriacao: '20/02/26',
      dataAprovacao: '22/02/26',
    },
    {
      id: 'e2f3',
      name: 'Gerente de Produto',
      recResponsavel: null,
      requerente: 'Ricardo Alves',
      vagaVinculada: null,
      dataCriacao: '18/02/26',
      dataAprovacao: '19/02/26',
    },
  ],
  canceladas: [
    {
      id: 'f4g5',
      name: 'Estagiário de Marketing',
      recResponsavel: 'Juliana Martins',
      requerente: 'Juliana Martins',
      vagaVinculada: null,
      dataCriacao: '15/02/26',
      dataAprovacao: '—',
    },
  ],
};

const tabCounts: Record<TabKey, number> = {
  pendentes: 1,
  aprovadas: 297,
  reprovadas: 32,
  canceladas: 72,
};

type SortKey = 'name' | 'recResponsavel' | 'requerente' | 'vagaVinculada' | 'dataCriacao' | 'dataAprovacao';
type SortDir = 'asc' | 'desc' | null;

export function Requisitions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('aprovadas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const rows = mockRequisitions[activeTab];

  const filteredRows = rows.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      (r.recResponsavel?.toLowerCase().includes(q) ?? false) ||
      r.requerente.toLowerCase().includes(q)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = (a[sortKey] ?? '').toString().toLowerCase();
    const bVal = (b[sortKey] ?? '').toString().toLowerCase();
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') { setSortKey(null); setSortDir(null); }
      else setSortDir('asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === sortedRows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedRows.map(r => r.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleMenuAction = (action: string, requisitionId: string) => {
    setOpenMenuId(null);
    if (action === 'abrir-nova-vaga') {
      // Get the full row to build the detail object
      const allRows = Object.values(mockRequisitions).flat();
      const row = allRows.find(r => r.id === requisitionId);
      const detail: RequisitionFullData = mockRequisitionDetails[requisitionId] ?? {
        id: requisitionId,
        name: row?.name ?? requisitionId,
        recResponsavel: row?.recResponsavel ?? null,
      };
      navigate('/', { state: { fromRequisition: detail } });
      return;
    }
    console.log(`Ação: ${action} para requisição ${requisitionId}`);
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400 ml-1 inline" />;
    if (sortDir === 'asc') return <ChevronUp className="w-3.5 h-3.5 text-gray-600 ml-1 inline" />;
    return <ChevronDown className="w-3.5 h-3.5 text-gray-600 ml-1 inline" />;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl text-gray-900">Requisições</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Criar requisição
          </Button>
          <div className="relative">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-800 rounded-full text-[10px] flex items-center justify-center text-white">1</span>
            </button>
          </div>
          <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center overflow-hidden">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="3" fill="white"/>
              <path d="M17 21C17 17.134 14.866 14 12 14C9.13401 14 7 17.134 7 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <FilterDropdown label="Rec. Responsável" />
          <FilterDropdown label="Requerente" />
          <FilterDropdown label="Aprovadores" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-4 pt-4">
            {(Object.keys(tabCounts) as TabKey[]).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedIds(new Set()); }}
                className={`flex items-center gap-2 px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="capitalize">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  activeTab === tab
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-white">
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === sortedRows.length && sortedRows.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 accent-purple-600"
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-gray-600 whitespace-nowrap">
                    ID
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('name')}
                  >
                    Nome da requisição
                    <SortIcon col="name" />
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('recResponsavel')}
                  >
                    Rec. Responsável
                    <SortIcon col="recResponsavel" />
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('requerente')}
                  >
                    Requerente
                    <SortIcon col="requerente" />
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('vagaVinculada')}
                  >
                    Vaga vinculada
                    <SortIcon col="vagaVinculada" />
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('dataCriacao')}
                  >
                    Data criação
                    <span className="ml-1 inline">↑</span>
                  </th>
                  <th
                    className="px-3 py-3 text-left text-gray-600 whitespace-nowrap cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('dataAprovacao')}
                  >
                    Data aprovação
                    <SortIcon col="dataAprovacao" />
                  </th>
                  <th className="w-12 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                      Nenhuma requisição encontrada.
                    </td>
                  </tr>
                ) : (
                  sortedRows.map(row => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={() => toggleSelectOne(row.id)}
                          className="rounded border-gray-300 accent-purple-600"
                        />
                      </td>
                      <td className="px-3 py-3 text-gray-500 font-mono text-xs">{row.id}</td>
                      <td className="px-3 py-3 text-gray-900 max-w-[220px] truncate">{row.name}</td>
                      <td className="px-3 py-3 text-gray-700">
                        {row.recResponsavel ?? <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-3 py-3 text-gray-700 max-w-[180px] truncate">{row.requerente}</td>
                      <td className="px-3 py-3">
                        {row.vagaVinculada ? (
                          <a
                            href={row.vagaVinculada}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Acessar</span>
                          </a>
                        ) : (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                            Sem vaga
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.dataCriacao}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.dataAprovacao}</td>
                      <td className="px-3 py-3 relative"> {/* Changed to relative positioning for dropdown */}
                        <button
                          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openMenuId === row.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                            <div className="absolute right-6 top-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-60 py-1.5">
                              <button
                                onClick={() => handleMenuAction('duplicar', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Duplicar requisição
                              </button>
                              <button
                                onClick={() => handleMenuAction('abrir-nova-vaga', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Abrir nova vaga
                              </button>
                              <button
                                onClick={() => handleMenuAction('abrir-duplicacao', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Abrir nova vaga a partir de uma duplicação
                              </button>
                              <button
                                onClick={() => handleMenuAction('vincular', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Vincular à vaga aberta
                              </button>
                              <button
                                onClick={() => handleMenuAction('editar-requisicao', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Editar requisição
                              </button>
                              <button
                                onClick={() => handleMenuAction('editar-recrutador', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Editar recrutador(a)
                              </button>
                              <button
                                onClick={() => handleMenuAction('cancelar', row.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Cancelar requisição
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {sortedRows.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                {selectedIds.size > 0
                  ? `${selectedIds.size} selecionado(s)`
                  : `${sortedRows.length} resultado(s)`}
              </span>
              <span>Mostrando {sortedRows.length} de {tabCounts[activeTab]} requisições</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors text-gray-700 whitespace-nowrap"
      >
        {label}
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48 py-1">
            <div className="px-3 py-2 text-xs text-gray-400">Filtrar por {label.toLowerCase()}</div>
            <div className="px-3 py-2 text-sm text-gray-500 text-center">Nenhum filtro disponível</div>
          </div>
        </>
      )}
    </div>
  );
}