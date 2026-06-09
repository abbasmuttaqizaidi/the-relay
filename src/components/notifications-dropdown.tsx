import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { Bell, Check, Loader2, Info } from "lucide-react";
import { getNotifications } from "../functions/getNotifications";
import { markNotificationRead } from "../functions/markNotificationRead";
import { toast } from "@/components/ui/sonner";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseClientConfig } from "../functions/getSupabaseClientConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationData {
  id: string;
  title: string;
  description: string | null;
  is_read: boolean;
  created_at: string;
}

export function NotificationsDropdown() {
  const { isSignedIn } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbUserId, setDbUserId] = useState<string>("");
  const [markingIds, setMarkingIds] = useState<Set<string>>(new Set());
  const hoverTimeouts = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    return () => {
      // Cleanup all hover timeouts on unmount
      Object.values(hoverTimeouts.current).forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const loadNotifications = async () => {
    if (!isSignedIn) return;
    try {
      const res = await getNotifications();
      if (res) {
        setDbUserId(res.userId);
        setNotifications((res.notifications as any[]) || []);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 30000); // 30s polling fallback

    return () => clearInterval(interval);
  }, [isSignedIn]);

  useEffect(() => {
    if (!isSignedIn) return;

    let activeChannel: any = null;

    const setupRealtime = async () => {
      try {
        const config = await getSupabaseClientConfig();
        console.log("[Supabase Realtime] Loaded configuration:", {
          supabaseUrl: config.supabaseUrl,
          hasAnonKey: !!config.supabaseAnonKey,
        });

        if (!config.supabaseUrl || !config.supabaseAnonKey) {
          console.warn("[Supabase Realtime] Supabase configuration missing on client.");
          return;
        }

        const res = await getNotifications();
        if (!res || !res.userId) {
          console.warn("[Supabase Realtime] No user ID available for notifications subscription.");
          return;
        }

        const currentUserId = res.userId;
        setDbUserId(currentUserId);
        setNotifications((res.notifications as any[]) || []);

        const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

        console.log(`[Supabase Realtime] Subscribing to INSERTs on public.notifications with user_id=eq.${currentUserId}`);

        // Subscribe to real-time Postgres changes for this user's notifications
        activeChannel = supabase
          .channel(`public:notifications:user_id=eq.${currentUserId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `user_id=eq.${currentUserId}`,
            },
            (payload: any) => {
              console.log("[Supabase Realtime] Received new notification insert event:", payload);
              const newNotif = payload.new;
              if (newNotif) {
                setNotifications((prev) => {
                  // Avoid duplicate items in list
                  if (prev.some((n) => n.id === newNotif.id)) return prev;
                  return [
                    {
                      id: newNotif.id,
                      title: newNotif.title,
                      description: newNotif.description,
                      is_read: newNotif.is_read,
                      created_at: newNotif.created_at,
                    },
                    ...prev,
                  ];
                });
                toast.success(`Alert: ${newNotif.title}`);
              }
            }
          )
          .subscribe((status: string, err?: any) => {
            console.log(`[Supabase Realtime] Subscription status for user_id=${currentUserId}:`, status, err || "");
          });
      } catch (err) {
        console.error("[Supabase Realtime] Failed to setup Supabase Realtime:", err);
      }
    };

    setupRealtime();

    return () => {
      if (activeChannel) {
        console.log("[Supabase Realtime] Unsubscribing from notifications channel.");
        activeChannel.unsubscribe();
      }
    };
  }, [isSignedIn]);

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead || markingIds.has(id)) return;
    try {
      setMarkingIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setLoading(true);
      await markNotificationRead({ data: { notification_id: id } });
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
      );
      toast.success("Notification marked as read");
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
      toast.error(err.message || "Failed to mark as read");
    } finally {
      setLoading(false);
      setMarkingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (!isSignedIn) return null;

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <DropdownMenu onOpenChange={(open) => open && loadNotifications()}>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none cursor-pointer group relative w-9 h-9 flex items-center justify-center border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 rounded-full transition-all bg-white hover:shadow-sm">
          <Bell className="w-4.5 h-4.5 text-slate-500 group-hover:text-slate-900 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 text-white font-sans text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-80 mt-2 bg-white border border-[#1f25301f] rounded-[4px] shadow-lg font-sans p-1" align="end">
        <DropdownMenuLabel className="px-3 py-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
            Alerts & Handshakes
          </span>
          {unreadCount > 0 && (
            <span className="font-mono text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-[2px] font-bold uppercase tracking-wider">
              {unreadCount} new
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
          {notifications.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-2 text-slate-400">
              <Info className="w-6 h-6 text-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                No alerts found
              </span>
            </div>
          ) : (
            notifications.map(n => (
              <DropdownMenuItem
                key={n.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleMarkAsRead(n.id, n.is_read);
                }}
                onMouseEnter={() => {
                  if (n.is_read || markingIds.has(n.id)) return;
                  hoverTimeouts.current[n.id] = window.setTimeout(() => {
                    handleMarkAsRead(n.id, n.is_read);
                  }, 100);
                }}
                onMouseLeave={() => {
                  if (hoverTimeouts.current[n.id]) {
                    window.clearTimeout(hoverTimeouts.current[n.id]);
                    delete hoverTimeouts.current[n.id];
                  }
                }}
                className={`py-2.5 flex flex-col items-start gap-1 cursor-pointer focus:bg-slate-50 rounded-sm transition-all relative ${
                  !n.is_read ? "bg-orange-50/50 border-l-2 border-orange-500 pr-3 pl-2.5" : "pl-3 pr-3"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <span className={`text-[11px] font-bold leading-tight font-sans ${
                    !n.is_read ? "text-slate-900" : "text-slate-600"
                  }`}>
                    {n.title}
                  </span>
                  {!n.is_read && (
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  )}
                </div>
                {n.description && (
                  <p className="text-[10px] text-slate-500 leading-normal font-sans text-left">
                    {n.description}
                  </p>
                )}
                <span className="font-mono text-[8px] text-slate-400 mt-1 uppercase font-bold">
                  {new Date(n.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
