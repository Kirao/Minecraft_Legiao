# Creator Grid

Um site moderno e responsivo para exibir um grid de criadores de conteúdo com links para YouTube, Kick e Twitch.

## 🎨 Design

**Filosofia:** Minimalismo Moderno com Foco em Conteúdo

- **Cores:** Branco limpo, cinza escuro para texto, laranja vibrante (#FF6B35) para acentos
- **Tipografia:** Poppins Bold para títulos, Inter Regular para corpo
- **Layout:** Grid responsivo (1-4 colunas dependendo do tamanho da tela)
- **Interações:** Hover suave com elevação e mudança de cor nos ícones

## 📋 Componentes

### CreatorCard

Componente que exibe um criador com foto, nome e links para redes sociais.

**Props:**
```typescript
interface CreatorCardProps {
  imageUrl: string;      // URL da foto do criador
  name: string;          // Nome do criador
  youtubeUrl?: string;   // URL do canal YouTube
  kickUrl?: string;      // URL do canal Kick
  twitchUrl?: string;    // URL do canal Twitch
}
```

**Exemplo de uso:**
```tsx
<CreatorCard
  name="Seu Nome"
  imageUrl="https://exemplo.com/foto.jpg"
  youtubeUrl="https://youtube.com/@seucanal"
  twitchUrl="https://twitch.tv/seucanal"
  kickUrl="https://kick.com/seucanal"
/>
```

## 🚀 Como Usar

### 1. Adicionar Criadores

Edite o arquivo `client/src/pages/Home.tsx` e adicione seus criadores no array `CREATORS`:

```tsx
const CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Seu Nome',
    imageUrl: 'https://exemplo.com/foto.jpg',
    youtubeUrl: 'https://youtube.com/@seucanal',
    twitchUrl: 'https://twitch.tv/seucanal',
    kickUrl: 'https://kick.com/seucanal',
  },
  // ... mais criadores
];
```

### 2. Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Acessar em http://localhost:3000
```

### 3. Build para Produção

```bash
# Fazer build
pnpm build

# Testar build localmente
pnpm preview
```

## 🌐 Deploy na Vercel

### Opção 1: Via CLI da Vercel

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Deploy
vercel
```

### Opção 2: Conectar repositório GitHub

1. Faça push do seu código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione seu repositório
5. Clique em "Deploy"

### Opção 3: Drag and Drop

1. Execute `pnpm build`
2. Acesse [vercel.com](https://vercel.com)
3. Arraste a pasta `dist` para a página

## 📁 Estrutura do Projeto

```
creator-grid/
├── client/
│   ├── public/           # Arquivos estáticos
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   │   └── CreatorCard.tsx
│   │   ├── pages/        # Páginas da aplicação
│   │   │   └── Home.tsx
│   │   ├── App.tsx       # Componente raiz
│   │   ├── main.tsx      # Entrada da aplicação
│   │   └── index.css     # Estilos globais
│   └── index.html        # HTML principal
├── vercel.json           # Configuração da Vercel
└── package.json          # Dependências do projeto
```

## 🎯 Próximos Passos

- [ ] Adicionar seus criadores ao array `CREATORS`
- [ ] Customizar cores em `client/src/index.css` se desejar
- [ ] Adicionar favicon em `client/public/`
- [ ] Fazer deploy na Vercel
- [ ] Adicionar domínio customizado (opcional)

## 📝 Notas

- As imagens devem ser URLs públicas (hospedadas em um servidor)
- Os links das redes sociais devem ser URLs completas (incluindo `https://`)
- O componente `CreatorCard` é flexível - você pode omitir qualquer rede social

## 📧 Suporte

Para dúvidas ou problemas, consulte a documentação oficial:
- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com/docs)
