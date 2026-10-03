import { Link } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftRight,
  Building2,
  Users,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  Modal,
  ExecutiveAlertBanner,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from "@/design-system";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getMyAssociationStatus } from "@/functions/association";
import { openBusinessAssociationModal } from "@/lib/association-modal-store";
import { useSwitchProfileModalState } from "@/lib/switch-profile-modal-store";

export function SwitchProfileModal() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { isOpen, closeModal, setIsOpen } = useSwitchProfileModalState();

  // 1. Fetch onboarding / business status
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn && isOpen),
    staleTime: 1000 * 60,
  });

  // 2. Fetch association status
  const { data: associationData } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getMyAssociationStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn && isOpen),
    staleTime: 1000 * 30,
  });

  const business = onboardingData?.business;

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      maxWidth="max-w-xl"
      className="max-h-[92dvh] sm:max-h-[88vh]"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#010611] text-white flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
          <span className="font-bold text-[#010611] text-base font-display">Switch Profile</span>
        </div>
      }
      description="Choose how you want to operate on The Relay network."
    >
      <div className="space-y-4 pt-1 font-sans text-left">
        {/* Warning State Banner: Policy Transition Guarantee */}
        <ExecutiveAlertBanner
          variant="warning"
          title="Profile Transition Guarantee"
          badgeText="Zero Downtime"
          description={
            <span>
              If you switch to a Business Profile, your account will only convert after your verification is approved. Until then, your{" "}
              <strong className="underline decoration-amber-400 font-semibold underline-offset-2">
                Community Profile remains 100% active
              </strong>{" "}
              (zero downtime guarantee).
            </span>
          }
          className="p-3.5 rounded-xl border border-amber-200"
        />

        {/* 2 Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option 1: Switch to Business Profile */}
          <Card
            variant="hover"
            radius="lg"
            className="p-4 flex flex-col justify-between gap-3 group border-2 border-slate-200 hover:border-black transition-all bg-white"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] text-[#010611] flex items-center justify-center group-hover:bg-[#010611] group-hover:text-white transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <CardTitle className="text-xs font-bold text-[#010611]">
                Switch to Business Profile
              </CardTitle>
              <CardDescription className="text-[11px] text-[#505f76] leading-relaxed">
                Register your company as a primary verified business entity (KYB validation required).
              </CardDescription>
            </div>
            <CardFooter className="p-0 border-t-0 pt-1">
              <Button
                asChild
                variant="monochrome"
                size="sm"
                className="w-full h-8 text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <Link
                  to="/onboarding"
                  onClick={() => closeModal()}
                >
                  <span>{business ? "Manage Registration" : "Setup Business (KYB)"}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Option 2: Associate with a Verified Business */}
          <Card
            variant="hover"
            radius="lg"
            className="p-4 flex flex-col justify-between gap-3 group border-2 border-slate-200 hover:border-black transition-all bg-white"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] text-[#010611] flex items-center justify-center group-hover:bg-[#010611] group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <CardTitle className="text-xs font-bold text-[#010611]">
                Associate with a Business
              </CardTitle>
              <CardDescription className="text-[11px] text-[#505f76] leading-relaxed">
                Link your account with an existing verified company or join an organization team.
              </CardDescription>
            </div>
            <CardFooter className="p-0 border-t-0 pt-1">
              {associationData?.status === "pending" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    closeModal();
                    openBusinessAssociationModal();
                  }}
                  className="w-full h-8 text-xs font-semibold gap-1.5 cursor-pointer border-amber-300 bg-amber-50 text-amber-950 hover:bg-amber-100"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pending: {associationData.business.company_name} (Edit)</span>
                </Button>
              ) : associationData?.status === "approved" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-full h-8 text-xs font-semibold gap-1.5 border-emerald-300 bg-emerald-50 text-emerald-950 cursor-default"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Associated: {associationData.business.company_name}</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    closeModal();
                    openBusinessAssociationModal();
                  }}
                  className="w-full h-8 text-xs font-semibold gap-1.5 cursor-pointer border-slate-300 text-[#010611] hover:bg-slate-50"
                >
                  <span>Request Association</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Modal>
  );
}
