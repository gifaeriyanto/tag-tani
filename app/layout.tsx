'use client';

import 'styles/tailwind.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { SidebarProvider } from 'components/Sidebar/SidebarContext';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body suppressHydrationWarning className="overflow-x-hidden">
        <SidebarProvider>
          <Sidebar />
          <Header />
          <main className="mt-16 lg:ml-[220px] min-h-screen">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
