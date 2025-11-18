"use client"
import { useState } from "react"
import Link from "next/link"

function MenuButton({ className, onClick }) {
  return (
    <div role="button" className={`menu-button lg:hidden ${className}`} onClick={onClick}>
      <span className="top"></span>
      <span className="middle"></span>
      <span className="bottom"></span>
    </div>
  )
}

export default function Header() {
  const [isOpen, setOpen] = useState(false)
  const buttonStyle = isOpen ? "open" : "closed"

  return (
    <nav className="sticky top-0 bg-secondary text-primary py-2 z-50">
      <div className="container flex justify-between items-center uppercase font-bold">
        <span>Site Title </span>
        <div>
          <div className="gap-5 hidden lg:flex">
    
            <Link href="#host">Host</Link>
            <Link href="#about">About</Link>
            <Link href="#articles">Articles</Link>
          </div>
          <MenuButton role="button" className={buttonStyle} onClick={() => setOpen(!isOpen)} />
          {isOpen ? (
            <div className="absolute left-0 flex w-full flex-col items-center bg-secondary/90 backdrop-blur-sm gap-4 py-3 transition-all border-t border-primary translate-y-2 rounded-b-md">f
  
              <Link href="#host" onClick={() => setOpen(false)}>
                Host
              </Link>
              <Link href="#about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="#articles" onClick={() => setOpen(false)}>
                Articles
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
