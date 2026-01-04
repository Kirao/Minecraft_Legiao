import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatorCard from '@/components/CreatorCard';
import { MessageSquare, User, X } from 'lucide-react';

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
        {/* Removemos o layout prop do container pai para evitar bugs de scroll */}
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

      <footer className="bg-white border-t border-gray-100 mt-24">
        <div className="container py-12 flex flex-col items-center gap-6">
          <button 
            onClick={() => setShowContact(true)}
            className="group flex items-center gap-3 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-100"
          >
            <span className="text-gray-600 font-bold group-hover:text-purple-600 transition-colors">By Kirao</span>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <User size={16} />
            </div>
          </button>

          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Minecraft Legião © 2026
          </p>
        </div>
      </footer>

      {/* Modal de Contato Flutuante (Overlay) */}
      <AnimatePresence>
        {showContact && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContact(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl z-[70] border border-purple-100 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src="https://github.com/Kirao.png" 
                    alt="Kirao" 
                    className="w-24 h-24 rounded-[2rem] object-cover shadow-xl border-4 border-white"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                <h4 className="text-2xl font-black text-gray-900">Kirao</h4>
                <p className="text-purple-600 font-bold text-sm uppercase tracking-widest">Desenvolvedor</p>
                
                <div className="w-full mt-8 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Discord</p>
                      <p className="text-gray-900 font-mono font-bold text-lg">kirao_</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100">
                    <p className="text-sm text-purple-900 font-semibold leading-relaxed">
                      Precisa de ajuda com o site ou tem alguma sugestão? Me chama no Discord! 🚀
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
