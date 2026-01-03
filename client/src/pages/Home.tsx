import CreatorCard from '@/components/CreatorCard';

/**
 * Design Philosophy: Minimalismo Moderno com Foco em Conteúdo
 */

interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  youtubeUrl?: string;
  kickUrl?: string;
  twitchUrl?: string;
}

/**
 * Gera automaticamente a foto do canal do YouTube
 * usando o @handle
 */
const youtubeAvatar = (handle: string) =>
  `https://unavatar.io/youtube/${handle}`;

// Dados dos criadores
const CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Anibut',
    imageUrl: youtubeAvatar('anibut'),
    youtubeUrl: 'https://www.youtube.com/@anibut',
  },
  {
    id: '2',
    name: 'Banfzk',
    imageUrl: youtubeAvatar('Banfzk'),
    youtubeUrl: 'https://www.youtube.com/@Banfzk',
    twitchUrl: 'https://www.twitch.tv/banfzk',
  },
  {
    id: '3',
    name: 'BielSwift',
    imageUrl: youtubeAvatar('bielswiftz'),
    youtubeUrl: 'https://www.youtube.com/@bielswiftz',
  },
  {
    id: '4',
    name: 'Bioxs',
    imageUrl: youtubeAvatar('eubioxs'),
    youtubeUrl: 'https://www.youtube.com/@eubioxs',
    twitchUrl: 'https://www.twitch.tv/bioxs',
  },
  {
    id: '5',
    name: 'BrunimNeets',
    imageUrl: youtubeAvatar('brunimneets'),
    youtubeUrl: 'https://www.youtube.com/@brunimneets',
    twitchUrl: 'https://www.youtube.com/@brunimneets',
  },
  {
    id: '6',
    name: 'CarlinDoPlay',
    imageUrl: youtubeAvatar('CarlinDoPlay'),
    youtubeUrl: 'https://www.youtube.com/c/CarlinDoPlay',
    twitchUrl: 'https://www.twitch.tv/carlindoplay',
  },
  {
    id: '7',
    name: 'Danrique',
    imageUrl: youtubeAvatar('Danrique'),
    youtubeUrl: 'https://www.youtube.com/@Danrique',
    twitchUrl: 'https://www.twitch.tv/danriquetw',
    kickUrl: 'https://kick.com/danrique',
  },
  {
    id: '8',
    name: 'Dansuri',
    imageUrl: youtubeAvatar('DansuriOFF'),
    youtubeUrl: 'https://www.youtube.com/@DansuriOFF',
    twitchUrl: 'https://www.twitch.tv/DansuriOFF',
  },
  {
    id: '9',
    name: 'Diorito',
    imageUrl: youtubeAvatar('diorito'),
    youtubeUrl: 'https://www.youtube.com/@diorito',
  },
  {
    id: '10',
    name: 'Donelios',
    imageUrl: youtubeAvatar('Donelios'),
    youtubeUrl: 'https://www.youtube.com/@Donelios',
  },
  {
    id: '11',
    name: 'Esponja',
    imageUrl: youtubeAvatar('EsponjaPerdida0'),
    youtubeUrl: 'https://www.youtube.com/@EsponjaPerdida0',
  },
  {
    id: '12',
    name: 'Fada',
    imageUrl: youtubeAvatar('FadaCraft'),
    youtubeUrl: 'https://www.youtube.com/@FadaCraft',
    twitchUrl: 'https://www.twitch.tv/fadalives',
  },
  {
    id: '13',
    name: 'Farizaku',
    imageUrl: youtubeAvatar('Farizaku'),
    youtubeUrl: 'https://www.youtube.com/@Farizaku',
    twitchUrl: 'https://www.twitch.tv/farizaku',
  },
  {
    id: '14',
    name: 'Glittertai',
    imageUrl: youtubeAvatar('GlitterTai'),
    youtubeUrl: 'https://www.youtube.com/@GlitterTai',
    twitchUrl: 'https://www.twitch.tv/glittertai',
  },
  {
    id: '15',
    name: 'Jazaragamer',
    imageUrl: youtubeAvatar('jazaragamer'),
    youtubeUrl: 'https://youtube.com/@jazaragamer',
    twitchUrl: 'https://www.twitch.tv/jazaragamer',
  },
  {
    id: '16',
    name: 'Jenni',
    imageUrl: youtubeAvatar('souajenni'),
    youtubeUrl: 'https://www.youtube.com/@souajenni',
    twitchUrl: 'https://www.twitch.tv/souajenni',
  },
  {
    id: '17',
    name: 'joenriq',
    imageUrl: youtubeAvatar('joenriq'),
    youtubeUrl: 'https://youtube.com/@joenriq',
    twitchUrl: 'https://www.twitch.tv/joenriq',
  },
  {
    id: '18',
    name: 'Judy',
    imageUrl: youtubeAvatar('JudyGaming'),
    youtubeUrl: 'https://www.youtube.com/@JudyGaming',
    twitchUrl: 'https://www.twitch.tv/judygaming',
  },
  {
    id: '19',
    name: 'KronosPlaying',
    imageUrl: youtubeAvatar('KronosPlaying'),
    youtubeUrl: 'https://www.youtube.com/@KronosPlaying',
  },
  {
    id: '20',
    name: 'Loonely',
    imageUrl: youtubeAvatar('lonely21'),
    youtubeUrl: 'https://www.youtube.com/@lonely21',
    twitchUrl: 'https://www.twitch.tv/loonely21',
  },
  {
    id: '21',
    name: 'Mamao',
    imageUrl: youtubeAvatar('MamaoOficial'),
    youtubeUrl: 'https://www.youtube.com/@MamaoOficial',
    twitchUrl: 'https://www.twitch.tv/mamao170',
    kickUrl: 'https://kick.com/mamao170',
  },
  {
    id: '22',
    name: 'MeioElfo',
    imageUrl: youtubeAvatar('meioelfo'),
    youtubeUrl: 'https://www.youtube.com/meioelfo',
    twitchUrl: 'https://www.twitch.tv/elfolives',
  },
  {
    id: '23',
    name: 'Mitinho',
    imageUrl: youtubeAvatar('mitinhoplayer'),
    youtubeUrl: 'https://youtube.com/@mitinhoplayer',
    twitchUrl: 'https://www.twitch.tv/mitinhoplayer',
  },
  {
    id: '24',
    name: 'Niicksz',
    imageUrl: youtubeAvatar('niicksz'),
    youtubeUrl: 'https://www.youtube.com/@niicksz',
    twitchUrl: 'https://www.twitch.tv/aniicksz',
  },
  {
    id: '25',
    name: 'Noozy',
    imageUrl: youtubeAvatar('noozyoficial'),
    youtubeUrl: 'https://www.youtube.com/@noozyoficial',
    twitchUrl: 'https://www.twitch.tv/noozyoficial',
  },
  {
    id: '26',
    name: 'Panda',
    imageUrl: youtubeAvatar('pandacolore'),
    youtubeUrl: 'https://www.youtube.com/@pandacolore',
    twitchUrl: 'https://www.twitch.tv/pandacolore',
  },
  {
    id: '27',
    name: 'Sanziitos',
    imageUrl: youtubeAvatar('Sanziitos'),
    youtubeUrl: 'https://www.youtube.com/@Sanziitos',
    twitchUrl: 'https://www.twitch.tv/sanziitos',
  },
  {
    id: '28',
    name: 'Starzinn',
    imageUrl: youtubeAvatar('starzinnn'),
    youtubeUrl: 'https://www.youtube.com/@starzinnn',
    twitchUrl: 'https://www.twitch.tv/starzinnnkk',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Minecraft Legião
          </h1>
          <p className="text-gray-600 mt-2">
            Canais de todos os participantes da Serie Minecraft Legião em um só lugar!
          </p>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CREATORS.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="container py-8 text-center text-gray-600 text-sm">
          <p>© 2024 Minecraft Legião.</p>
        </div>
      </footer>
    </div>
  );
}
