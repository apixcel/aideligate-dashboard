"use client";

import { LanguageFilter } from "@/components";
import Loader from "@/components/shared/Loader";
import MobSideBar from "@/components/shared/MobSidebard";
import Sidebar from "@/components/shared/Sidebar";
import UserDropdown from "@/components/ui/UserDropdown";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { ChevronLeft, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const SIDEBAR_OPEN = 256; // 16rem
const SIDEBAR_CLOSED = 64; // 4rem

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { isLoading } = useAuth();

  const { t } = useTranslation();
  if (isLoading) return <Loader className="h-screen" />;

  return (
    <div className="flex h-dvh overflow-hidden" key={i18n.language}>
      {/* desktop sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />
      <MobSideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {/* layout container (animate padding-left so main shifts smoothly) */}
      <motion.div
        initial={false}
        // animate={{ paddingLeft: sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_CLOSED }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full w-full overflow-auto"
      >
        {/* desktop topbar */}
        <div className="sticky top-0 z-[5] border-b border-darker bg-gradient-to-b from-darkest to-black-tertiary px-4 py-3">
          <div className="flex items-center justify-between">
            {/* sidebar toggle button & wifi status */}
            <div className="flex items-center gap-3">
              <button
                className="flex-center h-[36px] w-[36px] rounded-md transition duration-100 hover:bg-white hover:text-black-secondary"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <ChevronLeft
                  className={cn("h-5 w-5 transition", sidebarOpen ? "rotate-0" : "rotate-180")}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <Wifi className="h-[16px] w-[16px] text-success" />
                <span className="inline-block rounded-md border border-success-dark px-[6px] py-[2px] text-xs text-success">
                  {t("live")}
                </span>
              </div>
            </div>

            {/* language selector & user profile */}
            <div className="flex items-center gap-3">
              <LanguageFilter variant="header" />

              <UserDropdown />
            </div>
          </div>
        </div>

        {/* main content */}
        <main className="flex flex-col gap-6 p-6">{children}</main>
      </motion.div>
    </div>
  );
};

export default PageLayout;
