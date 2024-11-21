"use client";

import About from "@/components/About";
import ContactForm from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

import { useEffect, useRef } from "react";

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollPadding = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--scroll-padding",
          `${navHeight}px`,
        );
      }
    };

    updateScrollPadding();
    window.addEventListener("resize", updateScrollPadding);

    return () => window.removeEventListener("resize", updateScrollPadding);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrollToSection={scrollToSection} navRef={navRef} />
      <main className="flex-grow pb-16">
        <HeroCarousel />
        <Projects />
        <Services />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
