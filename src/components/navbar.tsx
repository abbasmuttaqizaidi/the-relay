import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { SignInButton } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  Menu,
  ChevronRight,
  LayoutGrid,
  Briefcase,
  Handshake,
  Bookmark,
  Home,
  X,
  LogIn,
  HelpCircle,
  Building2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ReciprocityBadge } from "@/components/reciprocity-badge";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

interface NavbarProps {
  incomingCount?: number;
}

export function Navbar({ incomingCount = 0 }: NavbarProps) {
  const { isSignedIn } = useAuth();
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    companyName: string;
    email: string;
    verificationLevel: string;
  } | null>(null);

  const handleNavbarTourClick = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.includes("/opportunities/my")) {
        window.dispatchEvent(new Event("relay:start-tour:my-opportunities"));
      } else if (path.includes("/opportunities")) {
        window.dispatchEvent(new Event("relay:start-tour:opportunities"));
      } else if (path.includes("/business-profile")) {
        window.dispatchEvent(new Event("relay:start-tour:business-profile"));
      } else if (path.includes("/requests")) {
        window.dispatchEvent(new Event("relay:start-tour:requests"));
      } else if (path.includes("/saved-opportunities")) {
        window.dispatchEvent(new Event("relay:start-tour:saved-opportunities"));
      } else if (path.includes("/home")) {
        window.dispatchEvent(new Event("relay:start-tour:home"));
      } else if (path.includes("/onboarding")) {
        window.dispatchEvent(new Event("relay:start-tour:onboarding"));
      } else if (path.includes("/connections")) {
        window.dispatchEvent(new Event("relay:start-tour:connection"));
      } else if (path.includes("/query-relay")) {
        window.dispatchEvent(new Event("relay:start-tour:query-relay"));
      } else {
        // Fallback: navigate to opportunities board and launch the feed tour
        navigate({ to: "/opportunities" }).then(() => {
          setTimeout(() => {
            window.dispatchEvent(new Event("relay:start-tour:opportunities"));
          }, 650);
        });
      }
    }
  };

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem("relay.profile.v1");
        if (stored) {
          setProfile(JSON.parse(stored));
        } else {
          setProfile(null);
        }
      } catch (_) {
        setProfile(null);
      }
    };
    load();
    window.addEventListener("relay:profile", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("relay:profile", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  // Route matching for active states
  const isHome = !!matchRoute({ to: "/home", fuzzy: true });
  const isOpportunities = !!matchRoute({ to: "/opportunities", fuzzy: true });
  const isMyOpportunities = !!matchRoute({ to: "/opportunities/my", fuzzy: true });
  const isNetwork = !!matchRoute({ to: "/network", fuzzy: true });
  const isRequests =
    !!matchRoute({ to: "/requests/incoming", fuzzy: true }) ||
    !!matchRoute({ to: "/requests/sent", fuzzy: true });
  const isSaved = !!matchRoute({ to: "/saved-opportunities", fuzzy: true });

  // Check if the Opportunities feed (not my) is active
  const isOpportunitiesFeed = isOpportunities && !isMyOpportunities;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP TOP NAVBAR (hidden on mobile)
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Link to="/home" className="flex items-center gap-2 group shrink-0">
              <img
                src={logoUrl}
                alt="The Relay Logo"
                className="h-10 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
              <Link
                to="/opportunities"
                className={`hover:text-slate-800 pb-1 transition-colors ${
                  isOpportunitiesFeed ? "text-slate-900 border-b-2 border-slate-900" : ""
                }`}
              >
                Opportunities
              </Link>
              {isSignedIn && (
                <>
                  <Link
                    to="/opportunities/my"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      isMyOpportunities ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    My Opportunities
                  </Link>
                  <Link
                    to="/requests/incoming"
                    className={`hover:text-slate-800 pb-1 transition-colors flex items-center gap-1.5 ${
                      isRequests ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Requests
                    {incomingCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full text-[9px] px-1.5 py-0.5 font-sans font-bold leading-none animate-pulse">
                        {incomingCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Reciprocity Score Badge - disabled for now
            <div id="reciprocity-badge-nav">
              <ReciprocityBadge className="flex" />
            </div>
            */}
            {(!isSignedIn || !profile) && (
              <div className="flex items-center gap-3">
                {!isSignedIn && (
                  <Link
                    to="/login"
                    className="inline-flex border border-slate-300 hover:border-slate-800 text-slate-700 px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:-translate-y-0.5 transition-all rounded-[2px] shadow-sm hover:shadow"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to={isSignedIn ? "/onboarding" : "/signup"}
                  className="inline-flex bg-slate-900 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow"
                >
                  Apply
                </Link>
              </div>
            )}
            {isSignedIn && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleNavbarTourClick}
                  className="h-9 w-9 flex items-center justify-center border border-slate-200/60 rounded-full bg-white hover:bg-slate-50/50 hover:border-slate-300 transition-colors cursor-pointer active:scale-95"
                  title="Take a Product Tour"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500 hover:text-slate-800 transition-colors" />
                </button>
                <div id="notifications-nav-btn">
                  <NotificationsDropdown />
                </div>
                <div id="user-avatar-nav-btn">
                  <UserAvatarDropdown />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE TOP BAR (visible only on mobile)
          Compact: logo left, actions right
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md md:hidden">
        <div className="px-4 h-14 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/home" className="flex items-center">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-8 w-auto object-contain mix-blend-multiply"
            />
          </Link>

          {/* Right: Notifications + Tour + Hamburger */}
          <div className="flex items-center gap-2">
            {isSignedIn && (
              <>
                <button
                  onClick={handleNavbarTourClick}
                  className="h-9 w-9 flex items-center justify-center border border-slate-200/80 rounded-full bg-white hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                  title="Take a Product Tour"
                >
                  <HelpCircle className="w-4.5 h-4.5 text-slate-600 hover:text-slate-900 transition-colors" />
                </button>
                <NotificationsDropdown />
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center border border-slate-200/80 rounded-full bg-white hover:bg-slate-50 transition-colors cursor-pointer active:scale-95">
                  <Menu className="w-4 h-4 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white p-0 w-[300px] flex flex-col border-l border-slate-200 shadow-2xl"
              >
                {/* Sheet Header */}
                <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="h-8 w-auto object-contain mix-blend-multiply"
                    />
                  </div>
                </div>

                {/* Sheet Navigation Links */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                  <div className="flex flex-col gap-1">
                    <SheetClose asChild>
                      <Link
                        to="/home"
                        className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                          isHome
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Home className="w-4 h-4" />
                          <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                            Home
                          </span>
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isHome ? "text-white/50" : "text-slate-300"}`} />
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        to="/opportunities"
                        className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                          isOpportunitiesFeed
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <LayoutGrid className="w-4 h-4" />
                          <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                            Opportunities
                          </span>
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isOpportunitiesFeed ? "text-white/50" : "text-slate-300"}`} />
                      </Link>
                    </SheetClose>

                    {isSignedIn && (
                      <>
                        <SheetClose asChild>
                          <Link
                            to="/opportunities/my"
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isMyOpportunities
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Briefcase className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                My Opportunities
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isMyOpportunities ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/requests/incoming"
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isRequests
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Handshake className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Requests
                              </span>
                              {incomingCount > 0 && (
                                <span className={`rounded-full text-[9px] px-1.5 py-0.5 font-sans font-bold leading-none ${
                                  isRequests ? "bg-red-500 text-white" : "bg-red-500 text-white"
                                }`}>
                                  {incomingCount}
                                </span>
                              )}
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isRequests ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/saved-opportunities"
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isSaved
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Saved
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isSaved ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>
                      </>
                    )}

                  </div>
                </div>

                {/* Sheet Footer */}
                <div className="border-t border-slate-100 px-5 py-5">
                  {isSignedIn ? (
                    <div className="space-y-3">
                      {/* Reciprocity Score Badge - disabled for now
                      <ReciprocityBadge className="flex w-full justify-between" />
                      */}
                      <div className="space-y-2">
                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-widest font-extrabold block px-1">
                          Account
                        </span>
                        <UserAvatarDropdown isMobile={true} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <SheetClose asChild>
                        <Link
                          to="/signup"
                          className="w-full text-center bg-slate-900 hover:bg-orange-600 text-white py-3 text-[11px] font-mono uppercase tracking-widest transition-all rounded-lg shadow-sm font-bold flex items-center justify-center"
                        >
                          Apply Now
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/login"
                          className="w-full text-center border border-slate-200 text-slate-600 py-3 text-[11px] font-mono uppercase tracking-widest hover:bg-slate-50 transition-all rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <LogIn className="w-3.5 h-3.5" /> Sign In
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
