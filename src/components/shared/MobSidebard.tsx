import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobSideBar: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const isInitialized = useRef(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // auto close when md+ screen
      }
    };

    // Initial check (only auto-close if md-screen)
    if (!isInitialized.current) {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
      isInitialized.current = true;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  // Close only when clicking on the overlay (not inside sidebar)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  if (!isInitialized.current || !isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 z-50 h-dvh w-full bg-black/40 md:hidden"
      onClick={handleOverlayClick}
    >
      <Sidebar
        setSidebarOpen={setIsOpen}
        sidebarOpen={isOpen}
        onLinkClick={() => setIsOpen(false)}
        className="flex h-full overflow-hidden"
      />
    </div>
  );
};

export default MobSideBar;
