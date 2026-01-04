import { Youtube, Twitch } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

interface CreatorCardProps {
  imageUrl: string;
  name: string;
  youtubeUrl?: string;
  kickUrl?: string;
  twitchUrl?: string;
  onLiveStatusChange?: (isLive: boolean) => void;
}

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
  onLiveStatusChange,
}: CreatorCardProps) {
  const [isTwitchLive, setIsTwitchLive] = useState(false);
  const [isYoutubeLive, setIsYoutubeLive] = useState(false);

  const isLive = isTwitchLive || isYoutubeLive;

  useEffect(() => {
    onLiveStatusChange?.(isLive);
  }, [isLive, onLiveStatusChange]);

  useEffect(() => {
    // Lógica Twitch
    let twitchInterval: NodeJS.Timeout;
    if (twitchUrl) {
      const username = twitchUrl.split('twitch.tv/')[1]?.split('/')[0]?.split('?')[0];
      if (username) {
        const checkTwitch = () => {
          fetch(`/api/twitch-status?username=${username}`)
            .then((res) => res.json())
            .then((data) => setIsTwitchLive(Boolean(data.online)))
            .catch(() => setIsTwitchLive(false));
        };
        checkTwitch();
        twitchInterval = setInterval(checkTwitch, 60000);
      }
    }

    // Lógica YouTube
    let youtubeInterval: NodeJS.Timeout;
    if (youtubeUrl) {
      let handle = youtubeUrl.split('@')[1]?.split('/')[0]?.split('?')[0];
      if (!handle) {
        const parts = youtubeUrl.replace(/\/$/, '').split('/');
        handle = parts[parts.length - 1];
      }

      if (handle) {
        const checkYoutube = () => {
          fetch(`/api/youtube-status?handle=${handle}`)
            .then((res) => res.json())
            .then((data) => setIsYoutubeLive(Boolean(data.online)))
            .catch(() => setIsYoutubeLive(false));
        };
        checkYoutube();
        youtubeInterval = setInterval(checkYoutube, 60000);
      }
    }

    return () => {
      if (twitchInterval) clearInterval(twitchInterval);
      if (youtubeInterval) clearInterval(youtubeInterval);
    };
  }, [twitchUrl, youtubeUrl]);

  return (
    <div className={`group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${isLive ? 'ring-2 ring-red-500' : ''}`}>
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isTwitchLive && (
            <span className="flex items-center gap-1 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-md">
              <Twitch size={10} /> TWITCH AO VIVO
            </span>
          )}
          {isYoutubeLive && (
            <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-md">
              <Youtube size={10} /> YT AO VIVO
            </span>
          )}
        </div>

        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

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
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${isYoutubeLive ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white'}`}
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
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${isTwitchLive ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white'}`}
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
