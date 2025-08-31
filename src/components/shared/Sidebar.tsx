import { sidebarLinks } from "@/constants";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const SIDEBAR_OPEN = 256; // 16rem
const SIDEBAR_CLOSED = 64; // 4rem

interface IProps {
  sidebarOpen: boolean;
  onLinkClick?: () => void;
  className?: string;
}
const Sidebar: React.FC<IProps> = ({ sidebarOpen, onLinkClick, className }) => {
  const pathname = usePathname();

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

  const { t } = useTranslation();
  return (
    <motion.aside
      aria-label="Primary"
      initial={false}
      animate={{ width: sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_CLOSED }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "hidden overflow-hidden border-r border-darker bg-gradient-to-b from-darkest to-black-tertiary md:inset-y-0 md:flex md:flex-col",
        className
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
                      onClick={onLinkClick}
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
                        {t(link.label)}
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
  );
};

export default Sidebar;
