"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const pathname = usePathname() || "";

  // Helper function to generate title from pathname
  const getTitle = (path: string) => {
    // Handle root path
    if (path === "/" || path === "") return "Summary";

    // Remove query params if any
    const pathWithoutQuery = path.split("?")[0];

    // Split by slash and filter out empty segments (handles leading/trailing slashes)
    const segments = pathWithoutQuery
      .split("/")
      .filter((segment) => segment.length > 0);

    if (segments.length === 0) return "Summary";

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    // Capitalize first letter and handle special dashes if any
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 p-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getTitle(pathname)}</h1>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" asChild size="sm" className="hidden sm:flex rounded-full">
            <Link href="/request-call">Request a Call</Link>
          </Button>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://www.evoclabs.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground font-semibold"
            >
              Evoc Labs.
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
