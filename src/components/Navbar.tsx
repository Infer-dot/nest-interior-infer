"use client";

import { FC, RefObject, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NavbarProps {
  scrollToSection: (id: string) => void;
  navRef: RefObject<HTMLDivElement>;
}

const Navbar: FC<NavbarProps> = ({ scrollToSection, navRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["portfolio", "services", "about"];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((section, index) => (
        <motion.div
          key={section}
          initial={mobile ? { x: 50, opacity: 0 } : { y: -20, opacity: 0 }}
          animate={mobile ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: mobile ? index * 0.1 : 0 }}
        >
          <Button
            variant="ghost"
            className={`font-thin text-xl hover:bg-white hover:text-black ${
              mobile ? "w-1/2 justify-start bg-white text-black mt-5" : ""
            }`}
            onClick={() => {
              scrollToSection(section);
              if (mobile) setIsOpen(false);
            }}
          >
            {section}
          </Button>
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-black/50 backdrop-blur-md fixed top-3 left-0 right-0 mx-auto w-[95%] rounded-xl text-white h-[70px] flex flex-row justify-between items-center z-10 transition-colors duration-300 hover:bg-black/70"
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="font-semibold text-[32px] mx-[30px]"
      >
        <Link href="/" className="flex flex-row gap-2">
          <Image src="/nest_logo.png" alt="logo" height={40} width={50} />
          <p className="hidden md:block">Nest</p>
        </Link>
      </motion.span>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden md:flex flex-row gap-4 text-xl mx-[30px]"
      >
        <NavItems />
      </motion.div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden mx-[30px]">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-black/30 backdrop-blur-sm text-white"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex flex-col justify-evenly h-[50%]"
              >
                <div className="flex flex-col  gap-4 mt-8">
                  <NavItems mobile />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};

export default Navbar;
