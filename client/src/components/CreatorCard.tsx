import { Youtube, Twitch } from 'lucide-react';
import { FC } from 'react';

/**
 * Design Philosophy: Minimalismo Moderno com Foco em Conteúdo
 * - Foto em destaque (foco principal)
 * - Tipografia clara (Poppins Bold para nome)
 * - Ícones com hover suave (elevação e mudança de cor)
 * - Sombra sutil para profundidade
 */

interface CreatorCardProps {
  /** URL da foto do criador */
  imageUrl: string;
  /** Nome do criador */
  name: string;
  /** URL do canal YouTube (opcional) */
  youtubeUrl?: string;
  /** URL do canal Kick (opcional) */
  kickUrl?: string;
  /** URL do canal Twitch (opcional) */
  twitchUrl?: string;
}

// Ícone customizado para Kick (já que não existe em lucide-react)
const KickIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 2H2v12h6V2zm10 0h-6v12h6V2zm6 0h-6v12h6V2zM2 16h20v6H2v-6z" />
  </svg>
);

export default function CreatorCard({
  imageUrl,
  name,
  youtubeUrl,
  kickUrl,
  twitchUrl,
}: CreatorCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Imagem do Criador */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Informações do Criador */}
      <div className="flex flex-col items-center justify-center gap-3 p-4">
        {/* Nome */}
        <h3 className="text-center text-lg font-bold text-gray-900 line-clamp-2">
          {name}
        </h3>

        {/* Ícones de Redes Sociais */}
        <div className="flex gap-3">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Canal YouTube"
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
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Canal Kick"
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
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Canal Twitch"
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
