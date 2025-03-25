// Create a new layout file for the main (non-admin) part of the site
"use client"

import type React from "react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

