import type { Metadata } from "next";
import "@/app/ui/globals.css";
import ClientProviders from "./ClientProviders";






export const metadata: Metadata = {
  title: "Novotel Living Mazatlán - Electric Plans",
  description: "Visualize the electrical diagrams of the HVAC system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
