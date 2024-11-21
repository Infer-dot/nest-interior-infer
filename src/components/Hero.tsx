"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const heroContent = [
  {
    title: "Welcome to Our Platform",
    description: "Revolutionizing the way you work and create",
    cta: "Get connect on call",
    image: "/landpage.jpg?height=1080&width=1920",
  },
  {
    title: "Unlock Your Potential",
    description: "Powerful tools to boost your productivity",
    cta: "Learn More",
    image: "/landpage2.jpg?height=1080&width=1920",
  },
  {
    title: "Join Our Community",
    description: "Connect with like-minded individuals and grow together",
    cta: "Sign Up Now",
    image: "/landpage3.jpg?height=1080&width=1920",
  },
];

export default function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[100vh]"
    //onMouseEnter={plugin.current.stop}
    //onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {heroContent.map((content, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-screen">
              <Image
                src={content.image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex flex-col justify-center items-start p-12 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {content.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                  {content.description}
                </p>
                <a href="">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-black border-white hover:bg-white hover:text-black transition-colors"
                  >
                    {content.cta}
                  </Button>
                </a>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
