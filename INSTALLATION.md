# Guia de Instalação e Deploy

## 📋 Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **pnpm** (recomendado)
- Git instalado

## 🚀 Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/denysrocha/job-creation-agent.git
cd job-creation-agent
```

### 2. Instale as dependências

Com pnpm (recomendado):
```bash
pnpm install
```

Com npm:
```bash
npm install
```

### 3. Execute o projeto

Modo de desenvolvimento:
```bash
pnpm dev
# ou
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### 4. Build para produção

```bash
pnpm build
# ou
npm run build
```

Os arquivos de produção serão gerados na pasta `/dist`.

## 📦 Deploy

### Vercel (Recomendado)

1. Faça login no [Vercel](https://vercel.com)
2. Importe o repositório do GitHub
3. As configurações serão detectadas automaticamente
4. Click em "Deploy"

### Netlify

1. Faça login no [Netlify](https://netlify.com)
2. Importe o repositório do GitHub
3. Configure o build:
   - **Build command**: `npm run build` ou `pnpm build`
   - **Publish directory**: `dist`
4. Click em "Deploy site"

### GitHub Pages

1. No package.json, adicione a base URL:
```json
{
  "homepage": "https://seu-usuario.github.io/job-creation-agent"
}
```

2. Configure o vite.config.ts para adicionar a base:
```ts
export default defineConfig({
  base: '/job-creation-agent/',
  // ... resto da configuração
})
```

3. Build e deploy:
```bash
pnpm build
# Use gh-pages ou outra ferramenta para deploy
```

## 🔧 Variáveis de Ambiente

Este projeto não requer variáveis de ambiente para funcionar em modo de desenvolvimento, pois utiliza dados mock.

Para integração com APIs reais, você pode criar um arquivo `.env.local`:

```env
VITE_API_URL=https://sua-api.com
VITE_API_KEY=sua-chave-aqui
```

## 🧪 Testes

Atualmente o projeto não possui testes configurados. Para adicionar testes:

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria a build de produção
- `pnpm preview` - Preview da build de produção localmente

## 🐛 Resolução de Problemas

### Erro de dependências

Se encontrar erros de dependências, tente:
```bash
rm -rf node_modules
rm pnpm-lock.yaml # ou package-lock.json
pnpm install
```

### Erro de porta em uso

Se a porta 5173 estiver em uso, você pode especificar outra:
```bash
pnpm dev -- --port 3000
```

### Problemas com Tailwind CSS

Certifique-se de que os arquivos CSS estão sendo importados corretamente no `src/styles/index.css`:
```css
@import './fonts.css';
@import './tailwind.css';
@import './theme.css';
```

## 📚 Recursos Adicionais

- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do React](https://react.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)
- [Documentação do React Router](https://reactrouter.com/)

## 🤝 Suporte

Para problemas ou dúvidas, abra uma issue no repositório do GitHub.