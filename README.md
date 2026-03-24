# Job Creation Agent 🤖

Agente inteligente para criação de vagas com interface de chat estilo Claude, painéis laterais interativos, gravação de áudio e tour guiado.

## 📋 Descrição

Sistema completo de criação e gerenciamento de vagas de emprego com interface conversacional inteligente. O agente auxilia na criação de vagas através de chat, processamento de JD (Job Description), e configuração completa de recursos de recrutamento.

## ✨ Funcionalidades Principais

### 🎨 Interface de Chat Estilo Claude
- Layout adaptativo com painéis laterais
- Chat central com robô animado (RobotPresence)
- Mensagens automáticas pós-rascunho com ícones de status
- Botões clicáveis dinâmicos no chat para campos faltantes

### 📊 Painéis Interativos
- **InfoPanel** (esquerda): Lista de campos obrigatórios
  - Título
  - Descrição
  - Recrutador responsável
  - Avaliadores responsáveis
  - Gestor responsável
  - Faixa salarial
  - Localização
  - Modelo de trabalho
  - Campos personalizados
  - Requisição

- **RecursosPanel** (direita): Recursos configurados da vaga
  - Divulgação
  - Formulário personalizado
  - Critérios de análise
  - Agente de triagem
  - Kit de entrevista e Scorecard
  - Etapas do processo
  - Posições
  - Orçamento
  - Detalhes da vaga

### 🎙️ Gravação de Áudio
- Fluxo "Criar do zero" com gravação de áudio completa
- Processamento em duas rodadas
- Campos "já informado" com ícone de lápis para edição inline

### 🤖 RobotPresence Animado
- Robô único e persistente (40×40px)
- Estados: digitando e idle flutuante
- Animação de inclinação ao hover no botão "Criar rascunho"
- Interação no CelebrationModal com bounce, olhos de coração e confetes

### 🎉 CelebrationModal
- Aparece apenas na primeira criação de rascunho por sessão
- Robô em idle com mão levantada
- Interação de toque com animações
- Botão "Ver rascunho →"

### 🧭 Navegação e Tour
- React Router com navegação entre:
  - **Início**: Criação de vagas
  - **Requisições**: Barra de pesquisa, filtros, abas e tabela funcional
- Tour guiado de 4 etapas na primeira visita

### 📝 Formulários em SideSheets
- Edição completa de todos os campos da vaga
- Múltiplos SideSheets especializados:
  - Divulgação
  - Formulário personalizado
  - Critérios de análise
  - Agente de triagem
  - Kit de entrevista e Scorecard
  - Etapas do processo
  - Posições
  - Localização
  - Orçamento
  - Detalhes da vaga
  - Campos personalizados
  - Confirmação de inscrição

## 🛠️ Tecnologias

- **React 18.3.1** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router 7.13.0** - Navegação
- **Tailwind CSS 4.1.12** - Estilização
- **Vite 6.3.5** - Build tool
- **Radix UI** - Componentes acessíveis
- **Motion (Framer Motion)** - Animações
- **Lucide React** - Ícones
- **Recharts** - Gráficos
- **React Hook Form** - Formulários
- **Sonner** - Notificações toast

## 📦 Pacotes Principais

```json
{
  "@radix-ui/react-*": "Componentes UI acessíveis",
  "motion": "12.23.24",
  "lucide-react": "0.487.0",
  "react-router": "7.13.0",
  "recharts": "2.15.2",
  "react-hook-form": "7.55.0",
  "sonner": "2.0.3"
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação

```bash
# Instalar dependências
npm install
# ou
pnpm install

# Executar em modo de desenvolvimento
npm run dev
# ou
pnpm dev

# Build para produção
npm run build
# ou
pnpm build
```

## 📁 Estrutura do Projeto

```
/src
├── /app
│   ├── App.tsx                    # Componente principal
│   ├── routes.ts                  # Configuração de rotas
│   ├── /components
│   │   ├── Layout.tsx            # Layout principal com sidebar
│   │   ├── JobCreation.tsx       # Página de criação de vagas
│   │   ├── Requisitions.tsx      # Página de requisições
│   │   ├── ChatArea.tsx          # Área central do chat
│   │   ├── InfoPanel.tsx         # Painel de campos obrigatórios
│   │   ├── RecursosPanel.tsx     # Painel de recursos configurados
│   │   ├── RobotPresence.tsx     # Robô animado
│   │   ├── CelebrationModal.tsx  # Modal de celebração
│   │   ├── TourGuide.tsx         # Tour guiado
│   │   ├── /ui                   # Componentes UI (shadcn/ui)
│   │   └── ...                   # Outros componentes
│   ├── /data
│   │   ├── mockData.ts           # Dados de exemplo
│   │   └── jdSimulation.ts       # Simulação de análise JD
│   └── /types
│       ├── job.ts                # Tipos relacionados a vagas
│       └── jdAnalysis.ts         # Tipos de análise JD
├── /imports
│   ├── Robot.tsx                 # Componente do robô
│   └── ...                       # Outros imports
└── /styles
    ├── index.css                 # CSS principal
    ├── theme.css                 # Tema e tokens
    ├── tailwind.css              # Config Tailwind
    └── fonts.css                 # Fontes customizadas
```

## 🎯 Modelo de Dados

### JobData
Interface principal que representa todos os dados de uma vaga:
- Campos básicos (título, descrição, senioridade)
- Divulgação e plataformas
- Formulário de inscrição
- Critérios de análise
- Agente de triagem
- Etapas do processo
- Kit de entrevista e Scorecard
- Orçamento e localização
- Campos personalizados

### ChatMessage
Mensagens do chat com suporte a:
- Formulários especializados
- Opções clicáveis
- Painéis de distribuição
- Mensagens de áudio
- Indicadores de processamento

## 🎨 Design System

O projeto utiliza Tailwind CSS 4 com tokens customizados definidos em `/src/styles/theme.css`. Componentes baseados em shadcn/ui para consistência e acessibilidade.

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

Este projeto inclui componentes de [shadcn/ui](https://ui.shadcn.com/) sob [licença MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md) e fotos do [Unsplash](https://unsplash.com) sob sua [licença](https://unsplash.com/license).

## 🔧 Configuração

### Vite
Configurado com React e Tailwind CSS plugins. Alias `@` para o diretório `/src`.

### PostCSS
Configuração vazia - o Tailwind CSS v4 gerencia automaticamente todos os plugins PostCSS necessários.

---

**Desenvolvido com ❤️ usando React e Tailwind CSS**