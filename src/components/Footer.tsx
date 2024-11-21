import { Heart, Instagram, Mail, MapPin, Phone, Shield, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row  gap-8 justify-start md:justify-around  md:items-center text-lg md:text-xl">
          <div className="md:max-w-[50%]">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm md:text-lg text-gray-300">
              We are a premier interior design company dedicated to transforming
              spaces into beautiful, functional environments.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                14 Nurullah Doctor Lane, Kolkata, 700017
              </li>
              <li className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                (+91) 8910809232
              </li>
              <li className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" />
                nest.exin@gmail.com
              </li>
              <li className="flex items-center text-sm">
                <Heart className="w-4 h-4 mr-2" />
                <p className="mr-1.5">Follow us on : </p>
                <Link href={"https://x.com/nestexin"}> < Twitter className="w-4 h-4 mr-2" /> </Link>
                <Link href={"https://www.youtube.com/@nestexin"}><Youtube className="w-4 h-4 mr-2" /></Link>
                <Link href={"https://www.instagram.com/nest_exin"}><Instagram className="w-4 h-4 mr-2" /></Link>
              </li>
              <li className="hidden md:block text-sm">
                <Link
                  className="flex flex-row items-center justify-start"
                  href="/admin"
                >
                  <Shield className="w-4 h-4  mr-2" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Nest Interior. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
