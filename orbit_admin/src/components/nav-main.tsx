"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>(
    () => {
      // Initialize openItems based on current pathname
      const initialOpen: Record<string, boolean> = {};
      items.forEach((item) => {
        if (item.items?.some((subItem) => pathname.startsWith(subItem.url))) {
          initialOpen[item.title] = true;
        }
      });
      return initialOpen;
    },
  );

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1 px-2 pt-2">
          {items.map((item) => {
            const hasItems = item.items && item.items.length > 0;
            const isOpen = openItems[item.title];
            const isActive =
              pathname === item.url ||
              item.items?.some((sub) => pathname === sub.url);

            return (
              <SidebarMenuItem key={item.title}>
                {hasItems ? (
                  <>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "group/btn w-full justify-between transition-all duration-200 hover:bg-blue-600/10",
                        isActive &&
                          "bg-blue-600/5 text-blue-600 font-semibold shadow-sm ring-1 ring-blue-600/10",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-colors duration-200",
                              isActive
                                ? "text-blue-600"
                                : "text-muted-foreground group-hover/btn:text-blue-600",
                            )}
                          />
                        )}
                        <span className="text-sm">{item.title}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300 text-muted-foreground/50",
                          isOpen && "rotate-90 text-blue-600",
                        )}
                      />
                    </SidebarMenuButton>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      <SidebarMenuSub className="ml-4 border-l-2 border-blue-600/10 py-1 pl-2">
                        {item.items?.map((subItem) => {
                          const isSubActive = pathname === subItem.url;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a
                                  href={subItem.url}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors duration-200",
                                    isSubActive
                                      ? "bg-blue-600/10 text-blue-600 font-medium"
                                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "h-1 w-1 rounded-full",
                                      isSubActive
                                        ? "bg-blue-600"
                                        : "bg-transparent",
                                    )}
                                  />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </div>
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      "group/btn transition-all duration-200 hover:bg-blue-600/10",
                      isActive &&
                        "bg-blue-600/5 text-blue-600 font-semibold shadow-sm ring-1 ring-blue-600/10",
                    )}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors duration-200",
                            isActive
                              ? "text-blue-600"
                              : "text-muted-foreground group-hover/btn:text-blue-600",
                          )}
                        />
                      )}
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
