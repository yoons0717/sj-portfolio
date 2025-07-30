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
    <footer className="relative bg-gradient-to-t from-surface-variant to-surface border-t border-border mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center">
                <div className="w-4 h-4">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6_319)">
                      <path
                        d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                        fill="white"
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
              <h3 className="text-primary text-xl font-bold">Sophia Carter</h3>
            </div>
            <p className="text-secondary text-base leading-relaxed mb-6 max-w-md">
              Creative technologist passionate about merging art and technology
              to create immersive experiences. Lets build something amazing
              together.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:sophia.carter@email.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-primary px-6 py-3 rounded-full font-medium hover:from-accent-light hover:to-accent transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                <Mail size={18} />
                Get In Touch
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-primary text-lg font-semibold mb-6">Connect</h4>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 text-secondary hover:text-accent transition-colors duration-500 group"
              >
                <div className="p-2 bg-input rounded-lg group-hover:bg-accent-dark transition-colors">
                  <Github size={18} />
                </div>
                <span>GitHub</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-secondary hover:text-accent transition-colors duration-500 group"
              >
                <div className="p-2 bg-input rounded-lg group-hover:bg-accent-dark transition-colors">
                  <Linkedin size={18} />
                </div>
                <span>LinkedIn</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-secondary hover:text-accent transition-colors duration-500 group"
              >
                <div className="p-2 bg-input rounded-lg group-hover:bg-accent-dark transition-colors">
                  <Twitter size={18} />
                </div>
                <span>Twitter</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted text-sm">
            <span>© 2024 Sophia Carter. Made with</span>
            <Heart size={16} className="text-accent fill-current" />
            <span>and creativity</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted">
            <a
              href="#privacy"
              className="hover:text-accent transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-accent transition-colors duration-300">
              Terms of Service
            </a>
            <span className="text-accent">v2.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
