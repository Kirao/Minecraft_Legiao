import CreatorCard from '@/components/CreatorCard';

/**
 * Design Philosophy: Minimalismo Moderno com Foco em Conteúdo
 * - Grid responsivo que se adapta a diferentes tamanhos de tela
 * - Espaçamento generoso entre cards
 * - Tipografia clara com Poppins Bold para título
 * - Foco no conteúdo (fotos dos criadores)
 */

interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  youtubeUrl?: string;
  kickUrl?: string;
  twitchUrl?: string;
}

// Dados de exemplo - substitua com seus criadores
const CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Criador 1',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    youtubeUrl: 'https://youtube.com',
    twitchUrl: 'https://twitch.tv',
  },
  {
    id: '2',
    name: 'Criador 2',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    youtubeUrl: 'https://youtube.com',
    kickUrl: 'https://kick.com',
  },
  {
    id: '3',
    name: 'Criador 3',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    youtubeUrl: 'https://youtube.com',
    twitchUrl: 'https://twitch.tv',
    kickUrl: 'https://kick.com',
  },
  {
    id: '4',
    name: 'Criador 4',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    twitchUrl: 'https://twitch.tv',
  },
  {
    id: '5',
    name: 'Criador 5',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    youtubeUrl: 'https://youtube.com',
    kickUrl: 'https://kick.com',
  },
  {
    id: '6',
    name: 'Criador 6',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    youtubeUrl: 'https://youtube.com',
    twitchUrl: 'https://twitch.tv',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Creator Grid
          </h1>
          <p className="text-gray-600 mt-2">
            Descubra seus criadores favoritos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Grid de Criadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CREATORS.map((creator) => (
            <CreatorCard
              key={creator.id}
              name={creator.name}
              imageUrl={creator.imageUrl}
              youtubeUrl={creator.youtubeUrl}
              kickUrl={creator.kickUrl}
              twitchUrl={creator.twitchUrl}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="container py-8 text-center text-gray-600 text-sm">
          <p>© 2024 Creator Grid. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
