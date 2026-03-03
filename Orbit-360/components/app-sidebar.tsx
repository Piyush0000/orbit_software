"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  Cog,
  LayoutDashboard,
  Megaphone,
  Monitor,
  Moon,
  Package,
  Plug,
  Plus,
  Settings,
  ShoppingCart,
  Store,
  Sun,
  Truck,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Kishor Irnak",
    email: "kishorirnak@gmail.com",
  },
  teams: [
    {
      name: "Orbit 360",
      logo: Command,
      plan: "Powered by Evoc Labs.",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Storefront",
      url: "#",
      icon: Monitor,
      items: [
        {
          title: "Website Editor",
          url: "/storefront/editor",
        },
        {
          title: "Navigation",
          url: "/storefront/navigation",
        },
        {
          title: "Preview Store",
          url: "/storefront/preview",
        }
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Orders",
          url: "/sales/orders",
        },
        {
          title: "Products",
          url: "/sales/products",
        },
        {
          title: "Customers",
          url: "/sales/customers",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Performance",
          url: "/marketing/performance",
        },
        {
          title: "Campaigns",
          url: "/marketing/campaigns",
        },
        {
          title: "Creatives",
          url: "/marketing/creatives",
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Tracking",
          url: "/logistics/tracking",
        },
        {
          title: "Rate Calculator",
          url: "/logistics/rate-calculator",
        },
        {
          title: "Pincode Check",
          url: "/logistics/pincode",
        },
        {
          title: "Returns",
          url: "/logistics/returns",
        },
        {
          title: "Warehouses",
          url: "/logistics/warehouses",
        },
        {
          title: "Settings",
          url: "/logistics/settings",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Automation",
      url: "/automation",
      icon: Zap,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Plug,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ExternalLink } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user, activeStore, setActiveStore, logout } = useAuth();
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const displayName = user?.merchantName || user?.fullName || user?.name || "Merchant";
  const displayEmail = user?.email || "";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine active state helper
  const isActive = (url: string) => {
    if (url === "/" && pathname === "/") return true;
    if (url === "/") return false;

    // Normalize both by removing trailing slashes for comparison
    const normalizedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    return normalizedPath === normalizedUrl;
  };

  // Update open items based on current path
  React.useEffect(() => {
    const newOpenItems: Record<string, boolean> = { ...openItems };

    data.navMain.forEach((item) => {
      // Check if any sub-item matches the current path
      if (item.items) {
        const hasActiveSubItem = item.items.some((subItem) =>
          isActive(subItem.url)
        );
        if (hasActiveSubItem) {
          newOpenItems[item.title] = true;
        }
      }
    });

    if (Object.keys(newOpenItems).length > Object.keys(openItems).length) {
      setOpenItems(newOpenItems);
    }
  }, [pathname]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Determine which logo to use based on theme
  // Use dark logo as default during SSR to avoid hydration mismatch
  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const basePath = process.env.NODE_ENV === "production" ? "/Orbit-360" : "";
  const logoSrc =
    currentTheme === "dark"
      ? `${basePath}/orbit360-logo.png`
      : `${basePath}/orbit360-logoBlack.png`;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-white">
                    <img
                      src={logoSrc}
                      alt="Orbit 360 Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeStore?.name || activeTeam.name}
                    </span>
                    <span className="truncate text-xs">
                      {activeStore?.subdomain 
                        ? `${activeStore.subdomain}.orbit360.shop` 
                        : activeTeam.plan}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </div>
              </DropdownMenuTrigger>
              {user?.stores && user.stores.length > 0 && (
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Switch Store
                  </DropdownMenuLabel>
                  {user.stores.map((store: any) => (
                    <DropdownMenuItem key={store.id} onClick={() => {
                        setActiveStore(store);
                    }} className="gap-2 p-2 cursor-pointer">
                       <div className="flex size-6 items-center justify-center rounded-sm border">
                         <Store className="size-4 shrink-0" />
                       </div>
                       {store.name}
                       {activeStore?.id === store.id && (
                         <div className="ml-auto flex size-2 rounded-full bg-primary animate-pulse" />
                       )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                    <div className="flex size-6 items-center justify-center rounded-md bg-background border">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add new store</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const isMainActive = item.items
                  ? item.items.some((sub) => isActive(sub.url))
                  : isActive(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <SidebarMenuButton
                          tooltip={item.title}
                          onClick={() => toggleItem(item.title)}
                          isActive={isMainActive}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight
                            className={`ml-auto transition-transform duration-200 ${
                              openItems[item.title] ? "rotate-90" : ""
                            }`}
                          />
                        </SidebarMenuButton>

                        {openItems[item.title] && (
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const isPreview = subItem.title === "Preview Store";
                              
                              let previewUrl = subItem.url;
                              if (isPreview && activeStore) {
                                // If running locally and using upfront themes, map categories to dynamic dev ports
                                if (activeStore.upfrontTemplateUrl && activeStore.upfrontTemplateUrl.includes('localhost:')) {
                                  previewUrl = activeStore.upfrontTemplateUrl;
                                } else if (activeStore.templateName || activeStore.domain) {
                                  const getP = (str: string | undefined | null) => {
                                    if (!str) return null;
                                    const s = str.toLowerCase();
                                    if (s.includes("toy")) return "3004";
                                    if (s.includes("electronic") || s.includes("tech")) return "3006";
                                    if (s.includes("food") || s.includes("grocery")) return "3007";
                                    if (s.includes("footwear") || s.includes("shoe")) return "3008";
                                    if (s.includes("fragrance") || s.includes("perfume")) return "3009";
                                    if (s.includes("beauty") || s.includes("cosmetic")) return "3010";
                                    if (s.includes("jewel") || s.includes("jewelry")) return "3017";
                                    if (s.includes("fashion") || s.includes("clothing") || s.includes("apparel") || s.includes("wear")) return "3005";
                                    return null;
                                  };
                                  
                                  let port = getP(activeStore.templateName) || 
                                             getP(activeStore.category) || 
                                             getP(activeStore.industry) || 
                                             getP(activeStore.subdomain) || 
                                             "3006"; // Default fallback
                                             
                                  const sub = activeStore.subdomain || "preview";
                                  previewUrl = `http://${sub}.localhost:${port}`;
                                } else if (activeStore.storefrontUrl) {
                                  previewUrl = activeStore.storefrontUrl;
                                }
                              }
                              
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={!isPreview && isActive(subItem.url)}
                                  >
                                    <Link 
                                      href={isPreview ? previewUrl : subItem.url}
                                      {...(isPreview ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    >
                                      <span>{subItem.title}</span>
                                      {isPreview && <ExternalLink className="ml-auto w-3 h-3 text-muted-foreground" />}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive(item.url)}
                        asChild
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {mounted && resolvedTheme === "dark"
                    ? "Dark Mode"
                    : "Light Mode"}
                </span>
                <span className="truncate text-xs">
                  Switch to{" "}
                  {mounted && resolvedTheme === "dark" ? "light" : "dark"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {initials}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {displayName}
                    </span>
                    <span className="truncate text-xs uppercase text-muted-foreground font-medium tracking-wider">
                      {user?.role || "MERCHANT"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {initials}
                      </span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {displayName}
                      </span>
                      <span className="truncate text-xs">{displayEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
