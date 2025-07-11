import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/youtubeIcon";
import { SidebarItems } from "./SidebarItems";
import { Logo } from "./icons/logo";

export const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white border-r border-slate-200 fixed top-0 left-0 px-6 py-6 shadow-sm">
      {/* Logo + Title */}
      <div className="flex items-center text-2xl font-semibold text-slate-800">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        Second-Brain
      </div>

      {/* Navigation Links */}
      <div className="mt-10 space-y-4 pl-2">
        <SidebarItems text="Twitter" icon={<TwitterIcon />} />
        <SidebarItems text="YouTube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};
