"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { IProjects } from "@/lib/appwrite";
import db from "@/lib/database";


interface ICard {
  project_name: string;
  description: string;
  image_url: string;
  delay: number;
}

const ProjectCard = ({ project_name, description, image_url, delay = 0 }: ICard) => {
  const [imgLoading, setImgLoading] = useState(true)
  setTimeout(() => {
    setImgLoading(false)
  }, 1500)
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
    >
      <Card className="min-w-[300px] md:min-w-[350px] min-h-[350px] md:min-h-[700px] flex flex-col border bg-white dark:bg-gray-800 text-black transition-colors duration-300 shadow-lg">
        <CardHeader>
          <CardTitle className="ml-2 text-xl">{project_name}</CardTitle>
          <CardDescription className="ml-3 text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow rounded-md object-contain">

          <div className="relative">
            {imgLoading ? (
              <div className="flex justify-center items-center h-[400px]">
                <Loader2 className="h-18 w-18 animate-spin" />
              </div>
            ) : (
              <Image
                src={image_url}
                alt={project_name}
                width={350}
                height={350}
                className="rounded-md w-full md:h-[600px] mx-auto"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [cloudData, setCloudData] = useState<IProjects[]>([]);
  const [projectsData, setProjectsData] = useState<IProjects[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex % projectsData.length);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [projectsData.length]);

  const fetchProjects = async () => {
    try {
      const res = await db.projects.list();

      if (res.documents.length > 0) {
        setCloudData(res.documents);
        setProjectsData(res.documents.slice(0, 5)); // Initially show half first
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const scrollToIndex = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollPosition = index * scrollContainer.clientWidth;
    scrollContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleShowMore = () => {
    setShowAll(true);
    setProjectsData(cloudData);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setProjectsData(cloudData.slice(0, 5)); // Show only half
  };

  const nextCard = () => {
    const nextIndex = (activeIndex + 1) % projectsData.length;
    scrollToIndex(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (activeIndex - 1 + projectsData.length) % projectsData.length;
    scrollToIndex(prevIndex);
  };

  return (
    <div id="portfolio" className="py-2 my-10 scroll-mt-20">
      <div className="w-full mx-auto flex flex-row justify-center items-center gap-x-4">
        <motion.button
          onClick={prevCard}
          className="hidden md:block h-12 w-12 rounded-full shadow-lg bg-black/20 backdrop-blur-lg hover:bg-black/70 text-white"
          aria-label="Previous slide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronLeft size={24} className="mx-auto" />
        </motion.button>

        <div className="w-[90%] md:w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
          </motion.div>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide shadow-lg"
            style={{ scrollBehavior: "smooth" }}
          >
            <AnimatePresence>
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.$id}
                  className="flex-shrink-0 w-full snap-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard
                    project_name={project.project_name}
                    description={project.description}
                    image_url={project.image_url}
                    delay={index * 0.1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-4">
            {projectsData.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full mx-1 ${index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <motion.button
          onClick={nextCard}
          className="hidden md:block h-12 w-12 rounded-full shadow-lg bg-black/20 backdrop-blur-lg hover:bg-black/70 text-white"
          aria-label="Next slide"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronRight size={24} className="mx-auto" />
        </motion.button>
      </div>

      {showAll ? (
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={handleShowLess}
            className="
                inline-flex h-10 items-center justify-center rounded-md 
                bg-gray-900 px-8 text-sm font-medium 
                text-gray-50 
                shadow 
                transition-colors
                hover:bg-gray-900/90 focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-gray-950 
                disabled:pointer-events-none disabled:opacity-50
                dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Show Less
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={handleShowMore}
            className="
                inline-flex h-10 items-center justify-center rounded-md 
                bg-gray-900 px-8 text-sm font-medium 
                text-gray-50 
                shadow 
                transition-colors
                hover:bg-gray-900/90 focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-gray-950 
                disabled:pointer-events-none disabled:opacity-50
                dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Show More
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
