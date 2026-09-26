import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * HIGH-DENSITY DEAL TABLE & ROW (Specification 04)
 * Zero Chromatic Glare Coexistence Specimen Table
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface DealTableRowData {
  id: string;
  reference: string;
  title: string;
  counterparty: string;
  location?: string;
  commercialTerm: string;
  statusBadge: React.ReactNode;
  action: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary";
  };
}

export interface ExecutiveDealTableProps {
  deals: DealTableRowData[];
  className?: string;
}

export function ExecutiveDealTable({ deals, className }: ExecutiveDealTableProps) {
  return (
    <div
      className={cn(
        "border border-[#E2E8F0] rounded-xl overflow-hidden bg-white text-xs shadow-xs",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-400 uppercase text-[10px] font-mono tracking-wider">
              <th className="py-3 px-4 font-semibold">Deal Reference</th>
              <th className="py-3 px-4 font-semibold">Framework / Counterparty</th>
              <th className="py-3 px-4 font-semibold">Commercial Term</th>
              <th className="py-3 px-4 font-semibold">Status &amp; Next Action</th>
              <th className="py-3 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50/70 transition">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 shrink-0">
                  {deal.reference}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-[#171F2C] block text-xs">{deal.title}</span>
                  <span className="text-slate-400 text-[11px]">
                    {deal.counterparty}
                    {deal.location ? ` • ${deal.location}` : ""}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                  {deal.commercialTerm}
                </td>
                <td className="py-3.5 px-4">
                  {deal.statusBadge}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {deal.action.href ? (
                    <a
                      href={deal.action.href}
                      className={cn(
                        "px-3 py-1.5 font-semibold rounded-lg text-xs transition inline-flex items-center gap-1",
                        deal.action.variant === "secondary"
                          ? "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          : "bg-black text-white hover:bg-slate-800"
                      )}
                    >
                      <span>{deal.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={deal.action.onClick}
                      className={cn(
                        "px-3 py-1.5 font-semibold rounded-lg text-xs transition inline-flex items-center gap-1 cursor-pointer",
                        deal.action.variant === "secondary"
                          ? "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          : "bg-black text-white hover:bg-slate-800"
                      )}
                    >
                      <span>{deal.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
