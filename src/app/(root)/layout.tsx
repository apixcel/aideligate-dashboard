"use client";

import { signOutAction } from "@/actions/auth.action";
import { LanguageFilter } from "@/components";
import Loader from "@/components/shared/Loader";
import { sidebarLinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { AlignJustify, ChevronLeft, Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SIDEBAR_OPEN = 256; // 16rem
const SIDEBAR_CLOSED = 64; // 4rem

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const { isLoading } = useAuth();

  const parentVariants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.01 },
    },
    closed: {
      transition: { staggerChildren: 0.02 },
    },
  } as const;

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -10 },
  } as const;

  if (isLoading) return <Loader className="h-screen" />;

  return (
    <div className="min-h-screen">
      {/* desktop sidebar */}
      <motion.aside
        aria-label="Primary"
        initial={false}
        animate={{ width: sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_CLOSED }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden overflow-hidden border-r border-darker bg-gradient-to-b from-darkest to-black-tertiary md:fixed md:inset-y-0 md:flex md:flex-col"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="pb-12">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="mb-4 flex h-[40px] items-center justify-center">
                  <AnimatePresence initial={false} mode="wait">
                    {sidebarOpen ? (
                      <motion.div
                        key="logo-full"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="text-center"
                      >
                        <Image
                          src="/images/logo.svg"
                          alt="AIDeligate"
                          width={150}
                          height={40}
                          priority
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="logo-short"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="text-center"
                      >
                        <Image
                          src="/images/logo-short.svg"
                          alt="AIDeligate"
                          width={80}
                          height={80}
                          className="!h-[38px] !w-[40px]"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* sidebar links */}
                <motion.ul
                  variants={parentVariants}
                  animate={sidebarOpen ? "open" : "closed"}
                  initial={false}
                  className="flex flex-col gap-2"
                >
                  {sidebarLinks.map((link) => (
                    <motion.li key={link.route}>
                      <Link
                        href={link.route}
                        aria-label={link.label}
                        title={link.label}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-lighter transition duration-100 hover:bg-dark-gray hover:text-white",
                          pathname === link.route && "bg-gradient-to-b from-dark-gray to-black-gray"
                        )}
                      >
                        <link.icon className="h-5 w-5 shrink-0" />
                        <motion.span
                          variants={itemVariants}
                          className={cn(
                            "overflow-hidden text-sm whitespace-nowrap transition-all duration-200",
                            sidebarOpen ? "ml-2 w-auto opacity-100" : "ml-0 w-0 opacity-0"
                          )}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* mobile topbar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between border-b bg-gray-50 p-4">
          {/* menu button */}
          <button>
            <AlignJustify />
          </button>

          {/* logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/logo.svg" alt="AIDeligate" width={100} height={100} />
            </Link>
          </div>

          {/* user profile */}
          <div className="w-8"></div>
        </div>
      </div>

      {/* layout container (animate padding-left so main shifts smoothly) */}
      <motion.div
        initial={false}
        animate={{ paddingLeft: sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_CLOSED }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pl-0 md:pl-16"
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
                  Live
                </span>
              </div>
            </div>

            {/* language selector & user profile */}
            <div className="flex items-center gap-3">
              <LanguageFilter variant="header" />

              <button
                type="button"
                onClick={async () => await signOutAction()}
                className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:ring-ring/50 relative flex h-8 items-center justify-center overflow-hidden rounded-full px-0 py-0 transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-medium">
                  Logout
                </span>
              </button>
              <button
                type="button"
                className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:ring-ring/50 relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full px-0 py-0 transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-medium">
                  JD
                </span>
              </button>
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
