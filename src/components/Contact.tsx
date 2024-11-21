"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import db from "@/lib/database";
import { ICont } from "@/lib/appwrite";


const AnimatedContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contactData, setContactData] = useState<ICont | null>(null)
  //const phoneNumber = "8910809232";

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    fetchContacts()
    return () => clearTimeout(timer);
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await db.contacts.list();
      //res.documents.map((con: ICont) => console.log({
      //  phone_no: con.phone_no,
      //  whatsapp_no: con.whatsapp_no,
      //  email: con.email,
      //}))

      if (res.documents.length > 0) {
        res.documents.map((con: ICont) => setContactData({
          phone_no: con.phone_no,
          whatsapp_no: con.whatsapp_no,
          email: con.email,
        }))
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.a
              href={`tel:${contactData?.phone_no}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mb-2"
            >
              <Button
                variant="default"
                size="icon"
                className="bg-blue-500/70 backdrop-blur-lg hover:bg-blue-600/90 h-12 w-12 rounded-full shadow-lg"
              >
                <Phone className="h-6 w-6 text-white" />
                <span className="sr-only">Call Phone Number</span>
              </Button>
            </motion.a>
            <motion.a
              href={`https://wa.me/${contactData?.whatsapp_no}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-2"
            >
              <Button
                variant="default"
                size="icon"
                className="bg-green-500/70 backdrop-blur-lg hover:bg-green-600/90 h-12 w-12 rounded-full shadow-lg"
              >
                <MessageCircle className="h-6 w-6 text-white" />
                <span className="sr-only">Contact on WhatsApp</span>
              </Button>
            </motion.a>
          </>
        )}
      </AnimatePresence>
      <Button
        variant="default"
        size="icon"
        onClick={toggleOpen}
        className="bg-black/60 hover:bg-black/80 backdrop-blur-md h-12 w-12 rounded-full shadow-lg font-bold"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Plus className="h-6 w-6 text-white" />
          ) : (
            <MessageSquare className="h-6 w-6 text-white" />
          )}
        </motion.div>
        <span className="sr-only">
          {isOpen ? "Close contact options" : "Open contact options"}
        </span>
      </Button>
    </motion.div>
  );
};

export default AnimatedContactButton;
