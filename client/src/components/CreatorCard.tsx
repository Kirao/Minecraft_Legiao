import { Youtube, Twitch } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

interface CreatorCardProps {
  imageUrl: string;
  name: string;
  youtubeUrl?: string;
  kickUrl?: string;
  twitchUrl?: string;
}

// Ícone customizado para Kick
const KickIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
    width="24"
    height="24"
  >
    <path
      d="M2.86957 1.5h6.84782v4.56522H12V3.78261h2.2826V1.5h6.8478v6.84783h-2.2826v2.28257h-2.2826v2.7392h2.2826v2.2826h2.2826V22.5h-6.8478v-2.2826H12v-2.2826H9.71739V22.5H2.86957v-21Z"
      strokeLinejoin="round"
      strokeWidth={1}
    />
  </svg>
);

export default function CreatorCard({
  imageUrl,
  name,
  youtubeUrl,
  kickUrl,
  twitchUrl,
}: CreatorCardProps) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!twitchUrl) return;

    // Extrai o username corretamente, lidando com barras extras ou queries
    const username = twitchUrl.split('twitch.tv/')[1]?.split('/')[0]?.split('?')[0];
    if (!username) return;

    const checkStatus = () => {
      fetch(`/api/twitch-status?username=${username}`)
        .then((res) => res.json())
        .then((data) => setIsLive(Boolean(data.online)))
        .catch(() => setIsLive(false));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, [twitchUrl]);

  return (
    <div className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Imagem */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {isLive && (
          <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            🔴 AO VIVO
          </span>
        )}

        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Infos */}
      <div className="flex flex-col items-center justify-center gap-3 p-4">
        <h3 className="text-center text-lg font-bold text-gray-900 line-clamp-2">
          {name}
        </h3>

        <div className="flex gap-3">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
          )}

          {kickUrl && (
            <a
              href={kickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-lime-500 hover:text-white transition-all duration-200 hover:scale-110"
              title="Kick"
            >
              <KickIcon className="w-5 h-5" />
            </a>
          )}

          {twitchUrl && (
            <a
              href={twitchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-110"
              title="Twitch"
            >
              <Twitch size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
