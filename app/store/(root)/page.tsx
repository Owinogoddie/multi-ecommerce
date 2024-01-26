'use client'
import { useModalStore } from "@/hooks/use-store-modal";
import { ClerkLoaded, ClerkLoading,  SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SetupPage() {

  const isOpen=useModalStore((state)=>state.isOpen)
  const onOpen=useModalStore((state)=>state.onOpen)

  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }

  },[isOpen,onOpen])
  return (
  <main>
    <ClerkLoading>
      <p>Loading....</p>
    </ClerkLoading>
    <ClerkLoaded>

    <SignedIn>
      <UserButton afterSignOutUrl="/store"/>
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal"/>
    </SignedOut>
    </ClerkLoaded>

    ROOT PAGE

  </main>
  )
}
