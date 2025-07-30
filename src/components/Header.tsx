import { Search, Menu } from 'lucide-react';

export default function Header() {
  const profileAvatar =
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face';

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b-4 border-accent px-10 py-4 bg-surface-variant" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
      <div className="flex items-center gap-4 text-primary">
        <div className="size-6 text-accent">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-accent text-xl font-black leading-tight tracking-wider">
          PORTFOLIO
        </h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          <a
            className="text-primary text-sm font-bold leading-normal hover:text-accent transition-colors duration-300 tracking-wider hover:skew-x-12 transform transition-transform"
            href="#about"
          >
            ABOUT
          </a>
          <a
            className="text-primary text-sm font-bold leading-normal hover:text-accent transition-colors duration-300 tracking-wider hover:skew-x-12 transform transition-transform"
            href="#projects"
          >
            PROJECTS
          </a>
          <a
            className="text-primary text-sm font-bold leading-normal hover:text-accent transition-colors duration-300 tracking-wider hover:skew-x-12 transform transition-transform"
            href="#contact"
          >
            CONTACT
          </a>
        </nav>

        <div className="flex gap-2">
          <button className="flex cursor-pointer items-center justify-center h-10 bg-surface-elevated text-accent border-2 border-accent gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 hover:bg-accent hover:text-surface transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <Search size={20} />
          </button>
          <button className="flex cursor-pointer items-center justify-center h-10 bg-surface-elevated text-accent border-2 border-accent gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 hover:bg-accent hover:text-surface transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <Menu size={20} />
          </button>
        </div>

        <div
          className="bg-center bg-no-repeat aspect-square bg-cover size-10 cursor-pointer border-2 border-accent hover:border-neon-yellow transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          style={{ backgroundImage: `url("${profileAvatar}")` }}
        />
      </div>
    </header>
  );
}
