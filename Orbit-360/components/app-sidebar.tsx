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
  CreditCard,
  LifeBuoy,
  MessageSquare,
  Activity,
  Facebook,
  Search,
  Globe,
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
      title: "Summary",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      color: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Activity,
      color: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      badge: "Live",
    },
    {
      title: "Storefront",
      url: "#",
      icon: Monitor,
      color: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
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
          title: "Coupons & Discounts",
          url: "/storefront/coupons",
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
      color: "text-rose-500",
      iconBg: "bg-rose-500/10",
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
      color: "text-amber-500",
      iconBg: "bg-amber-500/10",
      items: [
        {
          title: "Meta Ads",
          isCategory: true,
        },
        {
          title: "Performance",
          url: "/marketing/meta/performance",
        },
        {
          title: "Campaigns",
          url: "/marketing/meta/campaigns",
        },
        {
          title: "Creatives",
          url: "/marketing/meta/creatives",
        },
        {
          title: "Google Ads",
          isCategory: true,
        },
        {
          title: "Ad Manager",
          url: "/marketing/google/manager",
        },
        {
          title: "Performance",
          url: "/marketing/google/performance",
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: Truck,
      color: "text-sky-500",
      iconBg: "bg-sky-500/10",
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
      color: "text-cyan-500",
      iconBg: "bg-cyan-500/10",
    },
    {
      title: "Automation",
      url: "/automation",
      icon: Zap,
      color: "text-yellow-500",
      iconBg: "bg-yellow-500/10",
      badge: "Pro",
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Plug,
      color: "text-violet-500",
      iconBg: "bg-violet-500/10",
    },
    {
      title: "Finance",
      url: "/finance",
      icon: CreditCard,
      color: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      color: "text-slate-500",
      iconBg: "bg-slate-500/10",
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
      color: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
      color: "text-pink-500",
      iconBg: "bg-pink-500/10",
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
import { Badge } from "@/components/ui/badge";
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
  const isActive = (url: string | undefined | null) => {
    if (!url) return false;
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
                <div className="flex items-center gap-3 px-2 py-2.5 cursor-pointer hover:bg-sidebar-accent/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-sidebar-border/50">
                  <div className="flex aspect-square size-9 items-center justify-center rounded-xl overflow-hidden bg-white dark:bg-sidebar-accent shadow-sm group-hover:shadow-md transition-all ring-1 ring-black/5 dark:ring-white/10">
                    <img
                      src={logoSrc}
                      alt="Orbit 360 Logo"
                      width={36}
                      height={36}
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-foreground">
                      {activeStore?.name || activeTeam.name}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      {activeStore?.subdomain 
                        ? `${activeStore.subdomain}.orbit360.shop` 
                        : activeTeam.plan}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
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
              {data.navMain.map((item: any) => {
                const isMainActive = item.items
                  ? item.items.some((sub: any) => isActive(sub.url))
                  : isActive(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <SidebarMenuButton
                          tooltip={item.title}
                          onClick={() => toggleItem(item.title)}
                          isActive={isMainActive}
                          className={`hover:bg-sidebar-accent/50 transition-all duration-200 py-5 rounded-xl ${isMainActive ? "bg-sidebar-accent/70 font-bold" : "font-medium"}`}
                        >
                          {item.icon && (
                            <div className={`p-1.5 rounded-lg transition-colors ${isMainActive ? item.iconBg + " " + item.color : "text-muted-foreground group-hover:text-foreground"}`}>
                              <item.icon className="size-4.5" />
                            </div>
                          )}
                          <span className="ml-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 h-4 bg-primary/10 text-primary border-none">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight
                            className={`ml-auto size-4 transition-transform duration-300 ${item.badge ? "ml-2" : ""} ${
                              openItems[item.title] ? "rotate-90" : "text-muted-foreground/50"
                            }`}
                          />
                        </SidebarMenuButton>

                        {openItems[item.title] && (
                          <SidebarMenuSub>
                            {item.items.map((subItem: any) => {
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
                              
                              if (subItem.isCategory) {
                                return (
                                  <div key={subItem.title} className="px-2 py-2 mt-2 first:mt-0">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center gap-2">
                                      <div className="h-[1px] flex-1 bg-border/40" />
                                      {subItem.title}
                                      <div className="h-[1px] flex-1 bg-border/40" />
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <SidebarMenuSubItem key={subItem.url}>
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
                        className={`hover:bg-sidebar-accent/50 transition-all duration-200 py-5 rounded-xl ${isActive(item.url) ? "bg-sidebar-accent/70 font-bold" : "font-medium"}`}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <div className={`p-1.5 rounded-lg transition-colors ${isActive(item.url) ? item.iconBg + " " + item.color : "text-muted-foreground group-hover:text-foreground"}`}>
                              <item.icon className="size-4.5" />
                            </div>
                          )}
                          <span className="ml-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 h-4 bg-primary/10 text-primary border-none">
                              {item.badge}
                            </Badge>
                          )}
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
              className="hover:bg-sidebar-accent/50 transition-all duration-200 rounded-xl"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent/80 text-sidebar-foreground border border-sidebar-border/50">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                <span className="truncate font-bold">
                  {mounted && resolvedTheme === "dark"
                    ? "Dark Mode"
                    : "Light Mode"}
                </span>
                <span className="truncate text-[10px] text-muted-foreground uppercase font-semibold">
                  {mounted && resolvedTheme === "dark" ? "light" : "dark"} view
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent/50 hover:bg-sidebar-accent/50 transition-all duration-200 rounded-xl"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                    <span className="text-xs font-bold text-primary">
                      {initials}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                    <span className="truncate font-bold text-foreground">
                      {displayName}
                    </span>
                    <span className="truncate text-[10px] uppercase text-muted-foreground font-black tracking-widest">
                      {user?.role || "MERCHANT"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
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
