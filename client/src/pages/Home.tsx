import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatorCard from '@/components/CreatorCard';
import { User, X } from 'lucide-react';

// Ícone customizado do Discord
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 127.14 96.36" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.24-16.14h0C130.46,50.45,121.47,26.78,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.4-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.4-12.67S96.08,46,95.93,53,90.76,65.69,84.69,65.69Z"/>
  </svg>
);

interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  youtubeUrl?: string;
  kickUrl?: string;
  twitchUrl?: string;
}

const youtubeAvatar = (handle: string) =>
  `https://unavatar.io/youtube/${handle}`;

const CREATORS_DATA: Creator[] = [
  { id: '1', name: 'Anibut', imageUrl: youtubeAvatar('anibut'), youtubeUrl: 'https://www.youtube.com/@anibut' },
  { id: '2', name: 'Banfzk', imageUrl: youtubeAvatar('Banfzk'), youtubeUrl: 'https://www.youtube.com/@Banfzk', twitchUrl: 'https://www.twitch.tv/banfzk' },
  { id: '3', name: 'BielSwift', imageUrl: youtubeAvatar('bielswiftz'), youtubeUrl: 'https://www.youtube.com/@bielswiftz' },
  { id: '4', name: 'Bioxs', imageUrl: youtubeAvatar('eubioxs'), youtubeUrl: 'https://www.youtube.com/@eubioxs', twitchUrl: 'https://www.twitch.tv/bioxs' },
  { id: '5', name: 'BrunimNeets', imageUrl: youtubeAvatar('brunimneets'), youtubeUrl: 'https://www.youtube.com/@brunimneets', twitchUrl: 'https://www.twitch.tv/brunimneets' },
  { id: '6', name: 'CarlinDoPlay', imageUrl: youtubeAvatar('CarlinDoPlay'), youtubeUrl: 'https://www.youtube.com/c/CarlinDoPlay', twitchUrl: 'https://www.twitch.tv/carlindoplay' },
  { id: '7', name: 'Danrique', imageUrl: youtubeAvatar('Danrique'), youtubeUrl: 'https://www.youtube.com/@Danrique', twitchUrl: 'https://www.twitch.tv/danriquetw', kickUrl: 'https://kick.com/danrique' },
  { id: '8', name: 'Dansuri', imageUrl: youtubeAvatar('DansuriOFF'), youtubeUrl: 'https://www.youtube.com/@DansuriOFF', twitchUrl: 'https://www.twitch.tv/DansuriOFF' },
  { id: '9', name: 'Diorito', imageUrl: youtubeAvatar('diorito'), youtubeUrl: 'https://www.youtube.com/@diorito' },
  { id: '10', name: 'Donelios', imageUrl: youtubeAvatar('Donelios'), youtubeUrl: 'https://www.youtube.com/@Donelios' },
  { id: '11', name: 'Esponja', imageUrl: youtubeAvatar('EsponjaPerdida0'), youtubeUrl: 'https://www.youtube.com/@EsponjaPerdida0' },
  { id: '12', name: 'Fada', imageUrl: youtubeAvatar('FadaCraft'), youtubeUrl: 'https://www.youtube.com/@FadaCraft', twitchUrl: 'https://www.twitch.tv/fadalives' },
  { id: '13', name: 'Farizaku', imageUrl: youtubeAvatar('Farizaku'), youtubeUrl: 'https://www.youtube.com/@Farizaku', twitchUrl: 'https://www.twitch.tv/farizaku' },
  { id: '14', name: 'Glittertai', imageUrl: youtubeAvatar('GlitterTai'), youtubeUrl: 'https://www.youtube.com/@GlitterTai', twitchUrl: 'https://www.twitch.tv/glittertai' },
  { id: '15', name: 'Jazaragamer', imageUrl: youtubeAvatar('jazaragamer'), youtubeUrl: 'https://youtube.com/@jazaragamer', twitchUrl: 'https://www.twitch.tv/jazaragamer' },
  { id: '16', name: 'Jenni', imageUrl: youtubeAvatar('souajenni'), youtubeUrl: 'https://www.youtube.com/@souajenni', twitchUrl: 'https://www.twitch.tv/souajenni' },
  { id: '17', name: 'joenriq', imageUrl: youtubeAvatar('joenriq'), youtubeUrl: 'https://youtube.com/@joenriq', twitchUrl: 'https://www.twitch.tv/joenriq' },
  { id: '18', name: 'Judy', imageUrl: youtubeAvatar('JudyGaming'), youtubeUrl: 'https://www.youtube.com/@JudyGaming', twitchUrl: 'https://www.twitch.tv/judygaming' },
  { id: '19', name: 'KronosPlaying', imageUrl: youtubeAvatar('KronosPlaying'), youtubeUrl: 'https://www.youtube.com/@KronosPlaying' },
  { id: '20', name: 'Loonely', imageUrl: youtubeAvatar('lonely21'), youtubeUrl: 'https://www.youtube.com/@lonely21', twitchUrl: 'https://www.twitch.tv/loonely21' },
  { id: '21', name: 'Mamao', imageUrl: youtubeAvatar('MamaoOficial'), youtubeUrl: 'https://www.youtube.com/@MamaoOficial', twitchUrl: 'https://www.twitch.tv/mamao170', kickUrl: 'https://kick.com/mamao170' },
  { id: '22', name: 'MeioElfo', imageUrl: youtubeAvatar('meioelfo'), youtubeUrl: 'https://www.youtube.com/meioelfo', twitchUrl: 'https://www.twitch.tv/elfolives' },
  { id: '23', name: 'Mitinho', imageUrl: youtubeAvatar('mitinhoplayer'), youtubeUrl: 'https://youtube.com/@mitinhoplayer', twitchUrl: 'https://www.twitch.tv/mitinhoplayer' },
  { id: '24', name: 'Niicksz', imageUrl: youtubeAvatar('niicksz'), youtubeUrl: 'https://www.youtube.com/@niicksz', twitchUrl: 'https://www.twitch.tv/aniicksz' },
  { id: '25', name: 'Noozy', imageUrl: youtubeAvatar('noozyoficial'), youtubeUrl: 'https://www.youtube.com/@noozyoficial', twitchUrl: 'https://www.twitch.tv/noozyoficial' },
  { id: '26', name: 'Panda', imageUrl: youtubeAvatar('pandacolore'), youtubeUrl: 'https://www.youtube.com/@pandacolore', twitchUrl: 'https://www.twitch.tv/pandacolore' },
  { id: '27', name: 'Sanziitos', imageUrl: youtubeAvatar('Sanziitos'), youtubeUrl: 'https://www.youtube.com/@Sanziitos', twitchUrl: 'https://www.twitch.tv/sanziitos' },
  { id: '28', name: 'Starzinn', imageUrl: youtubeAvatar('starzinnn'), youtubeUrl: 'https://www.youtube.com/@starzinnn', twitchUrl: 'https://www.twitch.tv/starzinnnkk' },
];

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'online'>('all');
  const [liveStatus, setLiveStatus] = useState<Record<string, boolean>>({});
  const [showContact, setShowContact] = useState(false);

  const handleLiveStatusChange = (id: string, isLive: boolean) => {
    setLiveStatus((prev) => ({ ...prev, [id]: isLive }));
  };

  const onlineCount = Object.values(liveStatus).filter(Boolean).length;

  const sortedAndFilteredCreators = useMemo(() => {
    let list = [...CREATORS_DATA];
    list.sort((a, b) => a.name.localeCompare(b.name));
    if (filter === 'online') {
      list = list.filter((c) => liveStatus[c.id]);
    }
    return list;
  }, [filter, liveStatus]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Minecraft Legião
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${onlineCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
              <p className="text-gray-500 text-sm font-medium">
                {onlineCount} {onlineCount === 1 ? 'pessoa' : 'pessoas'} online agora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-md scale-105'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('online')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                filter === 'online'
                  ? 'bg-white text-red-600 shadow-md scale-105'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full bg-red-600 ${onlineCount > 0 ? 'animate-ping' : ''}`}></span>
              Online
            </button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode='popLayout' initial={false}>
            {sortedAndFilteredCreators.map((creator) => (
              <motion.div
                key={creator.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.2, 
                  layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 } 
                }}
              >
                <CreatorCard 
                  {...creator} 
                  onLiveStatusChange={(isLive) => handleLiveStatusChange(creator.id, isLive)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sortedAndFilteredCreators.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm inline-block border border-gray-100">
              <p className="text-gray-400 text-xl font-medium">Ninguém está online no momento. 😴</p>
              <button 
                onClick={() => setFilter('all')}
                className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                Ver todos os participantes
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-24 relative">
        <div className="container py-12 flex flex-col items-center gap-6">
          <div className="relative">
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 z-[70]"
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-purple-100 rotate-45"></div>
                  
                  <button 
                    onClick={() => setShowContact(false)}
                    className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                  >
                    <X size={16} />
                  </button>

                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3">
                      <img 
                        src="https://github.com/Kirao.png" 
                        alt="Kirao" 
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <h4 className="text-lg font-black text-gray-900">Kirao</h4>
                    <p className="text-purple-600 font-bold text-[10px] uppercase tracking-widest">Contato</p>
                    
                    <div className="w-full mt-4 space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-left">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-100">
                          <DiscordIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">Discord</p>
                          <p className="text-gray-900 font-mono font-bold text-sm">.kirao</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setShowContact(!showContact)}
              className="group flex items-center gap-3 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-100"
            >
              <span className="text-gray-600 font-bold group-hover:text-purple-600 transition-colors">By Kirao</span>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <User size={16} />
              </div>
            </button>
          </div>

          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Minecraft Legião © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
