"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type ServiceItem = {
  name: string;
  href?: string;
  items?: ServiceItem[];
};

type ServiceCategoryType = {
  name: string;
  items: ServiceItem[];
};

const servicesData: ServiceCategoryType[] = [
  {
    name: "Drawings",
    items: [
      { name: "Floor Plans", href: "#floor-plans" },
      { name: "Working Designs", href: "#working-designs" },
      {
        name: "3D Visuals",
        items: [
          { name: "Interior Renderings", href: "#interior-renderings" },
          { name: "Exterior Renderings", href: "#exterior-renderings" },
          { name: "Virtual Tours", href: "#virtual-tours" },
        ],
      },
    ],
  },
  {
    name: "Project Management Consultancy",
    items: [
      {
        name: "Bungalow",
        items: [
          {
            name: "Design Consultation",
            href: "#bungalow-design-consultation",
          },
          {
            name: "Construction Management",
            href: "#bungalow-construction-management",
          },
        ],
      },
      {
        name: "Flat",
        items: [
          { name: "Space Planning", href: "#flat-space-planning" },
          { name: "Renovation Guidance", href: "#flat-renovation-guidance" },
        ],
      },
    ],
  },
  {
    name: "Electrical Works",
    items: [
      { name: "Wiring Installation", href: "#wiring-installation" },
      { name: "Lighting Design", href: "#lighting-design" },
      { name: "Smart Home Integration", href: "#smart-home-integration" },
    ],
  },
  {
    name: "Plumbing Work",
    items: [
      { name: "Pipe Installation", href: "#pipe-installation" },
      { name: "Bathroom Fixtures", href: "#bathroom-fixtures" },
      { name: "Water Heating Systems", href: "#water-heating-systems" },
    ],
  },
  {
    name: "Paint Works",
    items: [
      { name: "Interior Painting", href: "#interior-painting" },
      { name: "Exterior Painting", href: "#exterior-painting" },
      { name: "Texture Painting", href: "#texture-painting" },
    ],
  },
  {
    name: "Furniture & Corporate Work",
    items: [
      { name: "Custom Furniture Design", href: "#custom-furniture-design" },
      { name: "Office Space Planning", href: "#office-space-planning" },
      {
        name: "Ergonomic Workspace Solutions",
        href: "#ergonomic-workspace-solutions",
      },
    ],
  },
  {
    name: "False Ceiling Works",
    items: [
      { name: "Gypsum Ceiling Design", href: "#gypsum-ceiling-design" },
      {
        name: "Acoustic Ceiling Solutions",
        href: "#acoustic-ceiling-solutions",
      },
      { name: "LED Ceiling Integration", href: "#led-ceiling-integration" },
    ],
  },
];

const ExpandableItem: React.FC<{ item: ServiceItem; depth: number }> = ({
  item,
  depth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`ml-${depth * 4}`}>
        {item.items ? (
          <button
            onClick={toggleOpen}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span>{item.name}</span>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        ) : (
          <a
            href={item.href}
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {item.name}
          </a>
        )}
        <AnimatePresence>
          {isOpen && item.items && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.items.map((subItem) => (
                <ExpandableItem
                  key={subItem.name}
                  item={subItem}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const ServiceCategory: React.FC<{ category: ServiceCategoryType }> = ({
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full text-left py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors rounded-md"
      >
        <span>{category.name}</span>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 border-l-2 border-gray-300 dark:border-gray-600"
          >
            {category.items.map((item) => (
              <ExpandableItem key={item.name} item={item} depth={0} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesSection = () => {
  const phoneNumber = "+918910809232"; // Replace with your actual WhatsApp number
  return (
    <div id="services" className="scroll-mt-10 border-none">
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mx-auto w-[90%] md:w-[80%] shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Our Services</CardTitle>
              <CardDescription>
                Explore our range of interior management services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {servicesData.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ServiceCategory category={category} />
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=Hey!%20I'm%20interested%20in%20a%20specific%20service%20where`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center my-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
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
          Need Custom Arrangements
        </Button>
      </motion.a>
    </div>
  );
};

export default ServicesSection;
