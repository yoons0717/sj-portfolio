import React from 'react';
import {
  Mail,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Heart,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-surface-variant border-t-4 border-accent mt-20" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
      {/* Gaming Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-neon-purple border-2 border-neon-yellow flex items-center justify-center">
                <div className="w-6 h-6 text-surface">
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
              </div>
              <h3 className="text-accent text-2xl font-black tracking-wider">SOPHIA CARTER</h3>
            </div>
            <p className="text-secondary text-base leading-relaxed mb-6 max-w-md">
              Creative technologist passionate about merging art and technology
              to create immersive experiences. Let&apos;s build something amazing
              together.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:sophia.carter@email.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-neon-purple text-surface px-6 py-3 font-bold tracking-wider hover:from-neon-yellow hover:to-accent transition-all duration-300 shadow-lg hover:shadow-accent/20 transform hover:skew-x-12"
              >
                <Mail size={18} />
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-accent text-lg font-black mb-6 tracking-wider">CONNECT</h4>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 text-primary hover:text-accent transition-colors duration-300 group"
              >
                <div className="p-2 bg-surface-elevated border-2 border-accent group-hover:bg-accent group-hover:text-surface transition-all duration-300">
                  <Github size={18} />
                </div>
                <span className="font-bold tracking-wider">GITHUB</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-primary hover:text-accent transition-colors duration-300 group"
              >
                <div className="p-2 bg-surface-elevated border-2 border-accent group-hover:bg-accent group-hover:text-surface transition-all duration-300">
                  <Linkedin size={18} />
                </div>
                <span className="font-bold tracking-wider">LINKEDIN</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-primary hover:text-accent transition-colors duration-300 group"
              >
                <div className="p-2 bg-surface-elevated border-2 border-accent group-hover:bg-accent group-hover:text-surface transition-all duration-300">
                  <Twitter size={18} />
                </div>
                <span className="font-bold tracking-wider">TWITTER</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-gradient-to-r from-accent via-neon-purple to-accent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-secondary text-sm font-bold tracking-wider">
            <span>© 2024 SOPHIA CARTER. MADE WITH</span>
            <Heart size={16} className="text-accent fill-current" />
            <span>AND CREATIVITY</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-secondary font-bold tracking-wider">
            <a
              href="#privacy"
              className="hover:text-accent transition-colors duration-300"
            >
              PRIVACY POLICY
            </a>
            <a href="#terms" className="hover:text-accent transition-colors duration-300">
              TERMS OF SERVICE
            </a>
            <span className="text-accent bg-surface-elevated px-2 py-1 border border-accent">V2.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
