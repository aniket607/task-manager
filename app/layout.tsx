import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BackgroundPlus } from "@/components/plus-bg";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/auth";
import CustomSessionProvider from "@/components/providers/session-provider";
import { QueryProvider } from "@/components/providers/query-provider";

// Configure the font
const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aniket's Task Manager",
  description: "Personal Task Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning className={geist.className}>
      <head />
      <body>
        <QueryProvider>
          <CustomSessionProvider session={session}>
            <ThemeProvider>
              <div className="relative min-h-screen">
                {/* Theme toggle button in a fixed position */}
                <div className="fixed top-4 right-4 z-50">
                  <ModeToggle />
                </div>

                {/* Main content */}
                {children}

                {/* Background elements */}
                <div className="fixed bottom-0 left-0 right-0 flex justify-center z-[45] pointer-events-none">
                  <div
                    className="h-32 w-[90%] overflow-x-hidden bg-[rgb(54,157,253)] bg-opacity-100 md:bg-opacity-70 blur-[337.4px]"
                    style={{ transform: "rotate(-30deg)" }}
                  />
                </div>
                <BackgroundPlus className="fixed bottom-0 left-0 w-full h-full -z-50 opacity-50" />
              </div>
            </ThemeProvider>
          </CustomSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
