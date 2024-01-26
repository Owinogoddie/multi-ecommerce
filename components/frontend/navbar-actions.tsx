"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";

// import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>

      <Link href="/store" 
            className={cn("text-sm font-bold transition-colors hover:text-black text-neutral-500")}
            >
                Create store
            
            </Link>

            {/* <ModeToggle/> */}
    </div>
  );
}
 
export default NavbarActions;