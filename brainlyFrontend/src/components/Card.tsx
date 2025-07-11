import { CrossIcon } from "./icons/crossIcon";
import { Logo } from "./icons/logo";
import { ShareIcon } from "./icons/shareIcon";

interface CardPrpos {
  title: string;
  link: string;
  type: "twitter" | "youtube";
   id: string;
  onDelete: (id: string) => void;
}

export const Card = (props: CardPrpos) => {
  // Extract video ID correctly and form embed link
  const getYouTubeEmbedLink = (url: string) => {
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

    const handleDelete = () => {
    props.onDelete(props.id);
  };


    return (
  <div className="m-3">
    <div className="bg-white rounded-xl border border-gray-200 shadow-md max-w-72 min-w-72 min-h-42 px-5 py-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-base font-semibold text-slate-800">
          <div className="pr-2 text-slate-400">
            <Logo />
          </div>
          {props.title}
        </div>
        <div className="flex items-center space-x-3 text-gray-500">
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition">
            <ShareIcon />
          </a>
          <button onClick={handleDelete} className="hover:text-red-500 cursor-pointer transition">
            <CrossIcon />
          </button>
        </div>
      </div>

      <div className="pt-2">
        {/* YouTube Embed */}
        {props.type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md border border-gray-100"
            src={getYouTubeEmbedLink(props.link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {/* Twitter Embed */}
        {props.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  </div>
);

};
