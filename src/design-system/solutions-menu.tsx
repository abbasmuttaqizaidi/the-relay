import React, { useState, useRef, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface SolutionItem {
  title: string;
  href: string;
}

export interface SolutionCategory {
  category: string;
  items: SolutionItem[];
}

export const SOLUTIONS_DATA: SolutionCategory[] = [
  {
    category: 'Exchange',
    items: [
      { title: 'B2B Opportunity Exchange', href: '/b2b-opportunity-exchange' },
      { title: 'B2B Lead Exchange', href: '/b2b-lead-exchange' },
    ],
  },
  {
    category: 'Partnerships',
    items: [
      { title: 'B2B Referral Network', href: '/b2b-referral-network' },
      { title: 'B2B Partnership Network', href: '/b2b-partnership-network' },
      { title: 'Referral Partnerships', href: '/referral-partnerships' },
      { title: 'Channel Partnerships', href: '/channel-partnerships' },
      { title: 'Distribution Partners', href: '/distribution-partners' },
    ],
  },
  {
    category: 'For Businesses',
    items: [
      { title: 'Agency Lead Exchange', href: '/agency-lead-exchange' },
    ],
  },
  {
    category: 'Resources',
    items: [
      { title: 'What To Do With Unqualified Leads', href: '/what-to-do-with-unqualified-leads' },
      { title: 'How to Monetize Unqualified Leads', href: '/how-to-monetize-unqualified-leads' },
      { title: 'How to Find B2B Referral Partners', href: '/how-to-find-b2b-referral-partners' },
      { title: 'How to Find Distribution Partners', href: '/how-to-find-distribution-partners' },
      { title: 'How to Exchange Business Leads', href: '/how-to-exchange-business-leads' },
    ],
  },
];

/**
 * Nested Flyout Solutions Dropdown Menu
 * Uses exact typography from the Opportunity Board (font-mono headers + font-display items)
 */
export function SolutionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isSolutionsActive = SOLUTIONS_DATA.some((cat) =>
    cat.items.some((item) => currentPath === item.href)
  ) || currentPath === '/solutions';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHoveredCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoveredCategory(null);
  }, [currentPath]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  return (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Navbar Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1 pb-1 text-[11px] font-mono uppercase tracking-[0.15em] font-bold transition-colors cursor-pointer select-none ${
          isSolutionsActive || isOpen
            ? 'text-slate-900 border-b-2 border-slate-900'
            : 'text-slate-400 hover:text-slate-800'
        }`}
        aria-expanded={isOpen}
      >
        <span>Solutions</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Level 1: Main Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="w-56 bg-white border border-slate-200/90 rounded-[4px] shadow-sm p-1.5 animate-in fade-in duration-100">
            {SOLUTIONS_DATA.map((cat) => {
              const isHovered = hoveredCategory === cat.category;
              const hasActiveChild = cat.items.some((i) => i.href === currentPath);

              return (
                <div
                  key={cat.category}
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(cat.category)}
                >
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] transition-colors text-left cursor-pointer ${
                      isHovered
                        ? 'bg-slate-100/70 text-[#171F2C]'
                        : hasActiveChild
                        ? 'bg-slate-50 text-[#171F2C]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#171F2C]'
                    }`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                      {cat.category}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 ${
                        isHovered ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Level 2: Nested Submenu Flyout (opens to the right) */}
                  {isHovered && (
                    <div
                      className="absolute left-full top-0 pl-1.5 z-50"
                      onMouseEnter={() => setHoveredCategory(cat.category)}
                    >
                      <div className="w-72 bg-white border border-slate-200/90 rounded-[4px] shadow-sm p-1.5 animate-in fade-in duration-100 space-y-0.5">
                        {cat.items.map((item) => {
                          const isActive = currentPath === item.href;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => {
                                setIsOpen(false);
                                setHoveredCategory(null);
                              }}
                              className={`block px-3 py-2 rounded-[4px] transition-colors text-left font-display text-[13px] font-medium tracking-tight ${
                                isActive
                                  ? 'bg-[#171F2C] text-white font-semibold'
                                  : 'text-[#171F2C] hover:bg-slate-100/70 hover:text-black'
                              }`}
                            >
                              {item.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Mobile Drawer Solutions Accordion Section
 */
export function SolutionsMobileSection({ onNavigate }: { onNavigate?: () => void }) {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const toggleCategory = (catName: string) => {
    setOpenCat((prev) => (prev === catName ? null : catName));
  };

  return (
    <div className="space-y-1">
      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
        Solutions
      </div>

      {SOLUTIONS_DATA.map((cat) => {
        const isOpen = openCat === cat.category;
        const hasActiveItem = cat.items.some((i) => i.href === currentPath);

        return (
          <div key={cat.category} className="border-b border-slate-100 last:border-0">
            <button
              type="button"
              onClick={() => toggleCategory(cat.category)}
              className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                hasActiveItem ? 'text-[#171F2C]' : 'text-slate-600 hover:text-[#171F2C]'
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                {cat.category}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform ${
                  isOpen ? 'rotate-180 text-slate-900' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-2 pb-2 space-y-0.5">
                {cat.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onNavigate}
                      className={`block px-3 py-1.5 rounded-[4px] text-left font-display text-[13px] font-medium tracking-tight transition-colors ${
                        isActive
                          ? 'bg-[#171F2C] text-white font-semibold'
                          : 'text-[#171F2C] hover:bg-slate-100/70 hover:text-black'
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
