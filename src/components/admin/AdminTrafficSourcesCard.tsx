import React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Share2, Compass, BarChart3, TrendingUp, Info } from "lucide-react";

export type TrafficSourceBreakdown = {
  totalTrackedViews: number;
  sourcesBreakdown: {
    google: number;
    linkedin: number;
    twitter: number;
    instagram: number;
    direct: number;
  };
  sourcesPercentage: {
    google: number;
    linkedin: number;
    twitter: number;
    instagram: number;
    direct: number;
  };
};

interface AdminTrafficSourcesCardProps {
  data: TrafficSourceBreakdown | null;
}

export function AdminTrafficSourcesCard({ data }: AdminTrafficSourcesCardProps) {
  if (!data) return null;

  const { totalTrackedViews, sourcesBreakdown, sourcesPercentage } = data;

  const channels = [
    {
      key: "google" as const,
      label: "Google",
      description: "Search & Discover",
      count: sourcesBreakdown.google || 0,
      pct: sourcesPercentage.google || 0,
      bgColor: "bg-blue-500",
      pillBg: "bg-blue-50 text-blue-700 border-blue-200",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      ),
    },
    {
      key: "linkedin" as const,
      label: "LinkedIn",
      description: "Feed & Messages",
      count: sourcesBreakdown.linkedin || 0,
      pct: sourcesPercentage.linkedin || 0,
      bgColor: "bg-[#0a66c2]",
      pillBg: "bg-sky-50 text-[#0a66c2] border-sky-200",
      icon: (
        <svg className="w-4 h-4 fill-[#0a66c2]" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      ),
    },
    {
      key: "twitter" as const,
      label: "Twitter / X",
      description: "Posts & Links (t.co)",
      count: sourcesBreakdown.twitter || 0,
      pct: sourcesPercentage.twitter || 0,
      bgColor: "bg-slate-900",
      pillBg: "bg-slate-100 text-slate-900 border-slate-200",
      icon: (
        <svg className="w-3.5 h-3.5 fill-slate-900" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      key: "instagram" as const,
      label: "Instagram",
      description: "Bio & In-App (l.instagram.com)",
      count: sourcesBreakdown.instagram || 0,
      pct: sourcesPercentage.instagram || 0,
      bgColor: "bg-pink-600",
      pillBg: "bg-pink-50 text-pink-700 border-pink-200",
      icon: (
        <svg className="w-4 h-4 fill-pink-600" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      key: "direct" as const,
      label: "Direct / Other",
      description: "Direct URL / Bookmarks",
      count: sourcesBreakdown.direct || 0,
      pct: sourcesPercentage.direct || 0,
      bgColor: "bg-slate-400",
      pillBg: "bg-slate-50 text-slate-600 border-slate-200",
      icon: <Compass className="w-4 h-4 text-slate-500" />,
    },
  ];

  return (
    <div className="border border-[#1f25301f] bg-white rounded-[2px] p-5 sm:p-6 space-y-5 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f25300d]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-display font-bold uppercase tracking-tight text-slate-900">
              Traffic Source Attribution
            </h3>
            <Badge className="bg-orange-50 text-orange-700 text-[9px] font-mono uppercase tracking-wider border-orange-200">
              Admin Only
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-sans">
            Strictly deduplicated visitor channels across Google, LinkedIn, Twitter/X, Instagram, and Direct navigation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="text-slate-400">Total Tracked:</span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {totalTrackedViews.toLocaleString()} views
          </span>
        </div>
      </div>

      {/* Proportional Segment Bar */}
      {totalTrackedViews > 0 && (
        <div className="space-y-1.5">
          <div className="h-2.5 w-full bg-slate-100 rounded-[2px] overflow-hidden flex">
            {channels.map((ch) => {
              if (ch.count <= 0) return null;
              const widthPct = Math.max(1, (ch.count / totalTrackedViews) * 100);
              return (
                <div
                  key={ch.key}
                  className={`${ch.bgColor} transition-all`}
                  style={{ width: `${widthPct}%` }}
                  title={`${ch.label}: ${ch.count} (${ch.pct}%)`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 5 Channel Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {channels.map((ch) => (
          <div
            key={ch.key}
            className="p-3 bg-slate-50/70 border border-[#1f253012] rounded-[2px] space-y-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {ch.icon}
                <span className="font-mono text-xs font-bold text-slate-800">
                  {ch.label}
                </span>
              </div>
              <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border ${ch.pillBg}`}>
                {ch.pct}%
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-mono text-lg font-bold text-slate-900">
                {ch.count.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {ch.count === 1 ? "view" : "views"}
              </span>
            </div>

            <div className="text-[10px] font-sans text-slate-400 truncate">
              {ch.description}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info / SEO Safety Notice */}
      <div className="pt-2 flex items-center gap-1.5 text-[10.5px] font-sans text-slate-500 bg-slate-50/50 p-2.5 rounded-[2px] border border-slate-100">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          <strong>Zero URL Manipulation:</strong> Canonical SEO URLs remain 100% clean without query strings. Attribution uses HTTP referrers & link shims (<code>l.instagram.com</code>, <code>t.co</code>, <code>lnkd.in</code>).
        </span>
      </div>
    </div>
  );
}
