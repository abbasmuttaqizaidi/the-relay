import { Link, useMatchRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { SignInButton } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  Menu,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Briefcase,
  Home,
  LogIn,
  HelpCircle,
  Lightbulb,
  Plus,
  Columns3,
  Milestone,
  FileText,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ReciprocityBadge } from "@/components/reciprocity-badge";
import { getIncomingRequestsCount } from "@/functions/getIncomingRequestsCount";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

interface NavbarProps {
  incomingCount?: number;
}

export function Navbar({ incomingCount: propCount = 0 }: NavbarProps) {
  const { isSignedIn } = useAuth();
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [incomingCount, setIncomingCount] = useState(propCount);
  const [profile, setProfile] = useState<{
    companyName: string;
    email: string;
    verificationLevel: string;
  } | null>(null);

  const [isWhatsThisOpen, setIsWhatsThisOpen] = useState(false);

  // Automatically close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const fetchIncomingCount = async () => {
    if (!isSignedIn) return;
    try {
      const res = await getIncomingRequestsCount();
      if (res && typeof res.count === "number") {
        setIncomingCount(res.count);
      }
    } catch {
      // Ignore background fetch error
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchIncomingCount();
      const interval = setInterval(fetchIncomingCount, 15000);
      window.addEventListener("relay:interest", fetchIncomingCount);
      window.addEventListener("storage", fetchIncomingCount);
      return () => {
        clearInterval(interval);
        window.removeEventListener("relay:interest", fetchIncomingCount);
        window.removeEventListener("storage", fetchIncomingCount);
      };
    }
  }, [isSignedIn]);

  const handleNavbarTourClick = () => {
    // Tour guide disabled
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
  const isHome = !!matchRoute({ to: "/", fuzzy: false });
  const isOpportunities = !!matchRoute({ to: "/opportunities", fuzzy: true });
  const isProposals = !!matchRoute({ to: "/proposals", fuzzy: true });
  const isMyRelay =
    !!matchRoute({ to: "/my-relay", fuzzy: true }) ||
    !!matchRoute({ to: "/opportunities/my", fuzzy: true }) ||
    !!matchRoute({ to: "/requests/incoming", fuzzy: true }) ||
    !!matchRoute({ to: "/requests/sent", fuzzy: true }) ||
    !!matchRoute({ to: "/saved-opportunities", fuzzy: true });
  const isNetwork = !!matchRoute({ to: "/network", fuzzy: true });
  const isInsights = !!matchRoute({ to: "/insights", fuzzy: true });
  const isCorePillars = !!matchRoute({ to: "/core-pillars", fuzzy: true });
  const is8StepJourney =
    !!matchRoute({ to: "/8-step-journey", fuzzy: true }) ||
    !!matchRoute({ to: "/eight-step-journey", fuzzy: true });
  const isPost = !!matchRoute({ to: "/post", fuzzy: true });

  // Check if the Opportunities feed (not my) is active
  const isOpportunitiesFeed = isOpportunities && !isMyRelay;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP TOP NAVBAR (hidden on mobile)
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8 shrink-0">
            <Link
              to={isSignedIn ? "/opportunities" : "/"}
              className="flex items-center gap-2 group shrink-0"
            >
              <img
                src={logoUrl}
                alt="The Relay Logo"
                className="h-10 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
              {isSignedIn ? (
                <>
                  <Link
                    to="/opportunities"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      isOpportunitiesFeed ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Opportunities
                  </Link>
                  <Link
                    to="/proposals"
                    className={`hover:text-slate-800 pb-1 transition-colors flex items-center gap-1.5 ${
                      isProposals ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Proposals
                    {incomingCount > 0 && (
                      <span className="bg-[#171F2C] text-white rounded-full text-[9px] px-1.5 py-0.5 font-sans font-bold leading-none">
                        {incomingCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/my-relay"
                    className={`hover:text-slate-800 pb-1 transition-colors flex items-center gap-1.5 ${
                      isMyRelay ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    My Relay
                  </Link>
                  <Link
                    to="/insights"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      isInsights ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Insights
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/core-pillars"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      isCorePillars ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Core Pillars
                  </Link>
                  <Link
                    to="/8-step-journey"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      is8StepJourney ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    8-Step Journey
                  </Link>
                  <Link
                    to="/insights"
                    className={`hover:text-slate-800 pb-1 transition-colors ${
                      isInsights ? "text-slate-900 border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Insights
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right: Actions + Animated "What's this?" Banner Button */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Interactive "What's this?" C-DOEs Banner Button */}
            <button
              type="button"
              onClick={() => setIsWhatsThisOpen(!isWhatsThisOpen)}
              className={`inline-flex items-center rounded-full bg-slate-950 text-white border border-slate-800/90 shadow-2xs relative overflow-hidden select-none cursor-pointer transition-all duration-500 ease-out active:scale-95 ${
                isWhatsThisOpen
                  ? "px-2.5 py-1"
                  : "px-2.5 py-1 hover:bg-slate-900 hover:border-slate-700"
              }`}
              title={isWhatsThisOpen ? "Click to collapse" : "Click to learn more about C-DOEs"}
            >
              {/* Ultra-Smooth Left-to-Right Shining Beam when expanded */}
              {isWhatsThisOpen && (
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="w-20 sm:w-28 h-full bg-gradient-to-r from-transparent via-white/10 via-white/35 to-transparent animate-shine-ltr" />
                </div>
              )}

              <div className="flex items-center gap-1.5 relative z-10">
                <ChevronLeft
                  className={`w-3 h-3 text-slate-400 transition-transform duration-300 shrink-0 ${
                    isWhatsThisOpen ? "rotate-180 text-white" : ""
                  }`}
                />

                {isWhatsThisOpen ? (
                  <span className="text-[9.5px] font-medium tracking-normal text-slate-200 whitespace-nowrap animate-in fade-in duration-300">
                    Worlds First <span className="font-bold text-white uppercase tracking-wider text-[9px]">C-DOEs</span> – <span className="text-slate-400 font-normal">Consent Driven Opportunity Exchange System</span>
                  </span>
                ) : (
                  <span className="text-[9.5px] font-mono tracking-wider font-semibold whitespace-nowrap text-slate-200">
                    What's this?
                  </span>
                )}
              </div>
            </button>

            {!isSignedIn && (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex border border-slate-300 hover:border-slate-800 text-slate-700 px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:-translate-y-0.5 transition-all rounded-[2px] shadow-sm hover:shadow"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex bg-slate-900 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:bg-slate-800 transition-all rounded-[2px] shadow-sm hover:shadow"
                >
                  Apply
                </Link>
              </div>
            )}
            {isSignedIn && (
              <div className="flex items-center gap-4">
                <Link
                  to="/post"
                  id="nav-post-btn"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest px-3.5 py-2 transition-all rounded-[2px] font-bold shadow-xs hover:shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post
                </Link>
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
          <Link to="/" className="flex items-center">
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
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                    <Link
                      to={isSignedIn ? "/opportunities" : "/"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center"
                    >
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-8 w-auto object-contain mix-blend-multiply"
                      />
                    </Link>
                  </div>
                </div>

                {/* Sheet Navigation Links */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                  <div className="flex flex-col gap-1">
                    {isSignedIn ? (
                      <>
                        <SheetClose asChild>
                          <Link
                            to="/opportunities"
                            onClick={() => setMobileMenuOpen(false)}
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

                        <SheetClose asChild>
                          <Link
                            to="/post"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isPost
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Plus className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Post
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isPost ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/proposals"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isProposals
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <FileText className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Proposals
                              </span>
                              {incomingCount > 0 && (
                                <span className="bg-[#171F2C] text-white rounded-full text-[9px] px-1.5 py-0.5 font-sans font-bold leading-none">
                                  {incomingCount}
                                </span>
                              )}
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isProposals ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/my-relay"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isMyRelay
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Briefcase className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                My Relay
                              </span>
                              {incomingCount > 0 && (
                                <span className="bg-red-500 text-white rounded-full text-[9px] px-1.5 py-0.5 font-sans font-bold leading-none animate-pulse">
                                  {incomingCount}
                                </span>
                              )}
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isMyRelay ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/insights"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isInsights
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Lightbulb className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Insights
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-950 text-white border border-slate-800 text-[8px] font-sans font-medium relative overflow-hidden select-none">
                                <span className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                                  <span className="block w-8 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-ltr" />
                                </span>
                                <span className="relative z-10 font-bold uppercase">C-DOEs</span>
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isInsights ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
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
                            to="/core-pillars"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isCorePillars
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Columns3 className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Core Pillars
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isCorePillars ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/8-step-journey"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              is8StepJourney
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Milestone className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                8-Step Journey
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${is8StepJourney ? "text-white/50" : "text-slate-300"}`} />
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            to="/insights"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                              isInsights
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Lightbulb className="w-4 h-4" />
                              <span className="text-[12px] font-mono uppercase tracking-wider font-bold">
                                Insights
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-950 text-white border border-slate-800 text-[8px] font-sans font-medium relative overflow-hidden select-none">
                                <span className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                                  <span className="block w-8 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-ltr" />
                                </span>
                                <span className="relative z-10 font-bold uppercase">C-DOEs</span>
                              </span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isInsights ? "text-white/50" : "text-slate-300"}`} />
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
                      <div className="space-y-2">
                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-widest font-extrabold block px-1">
                          Account
                        </span>
                        <UserAvatarDropdown isMobile={true} onNavigate={() => setMobileMenuOpen(false)} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <SheetClose asChild>
                        <Link
                          to="/signup"
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-3 text-[11px] font-mono uppercase tracking-widest transition-all rounded-lg shadow-sm font-bold flex items-center justify-center"
                        >
                          Apply Now
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
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
