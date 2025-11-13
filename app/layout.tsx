"use client"

import "styles/tailwind.css"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { Header } from "components/Header"
import { Sidebar } from "components/Sidebar"
import { SidebarProvider } from "components/Sidebar/SidebarContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body suppressHydrationWarning className="overflow-x-hidden">
        <SidebarProvider>
          <Sidebar />
          <Header />
          <main className="mt-16 min-h-[calc(100vh-64px)] lg:ml-[220px]">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  )
}
