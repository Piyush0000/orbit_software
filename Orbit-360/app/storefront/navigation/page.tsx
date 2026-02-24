"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, MenuSquare, Navigation, PencilLine, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NavigationPage() {
  const { activeStore } = useAuth();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 pt-0 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Navigation</h1>
          <p className="text-muted-foreground text-sm">
            Manage your store's menus, headers, and footer links.
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-2" /> Add Menu
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
             <div className="space-y-1">
               <CardTitle className="flex items-center gap-2">
                 <MenuSquare className="size-5 text-muted-foreground" /> Main Menu
                 <Badge variant="secondary" className="font-normal text-xs uppercase tracking-wider">Default</Badge>
               </CardTitle>
               <CardDescription>
                 This is usually displayed in your storefront header.
               </CardDescription>
             </div>
             <Button variant="ghost" size="sm" className="hidden sm:flex">
               <PencilLine className="size-4 mr-2" /> Edit Menu
             </Button>
          </CardHeader>
          <CardContent className="space-y-2">
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Home</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /</span>
                </div>
             </div>
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Collections</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /collections</span>
                </div>
             </div>
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Products</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /products</span>
                </div>
             </div>
             <Button size="sm" className="mt-2 w-full border-dashed border justify-start text-primary" variant="outline">
                <Plus className="size-4 mr-2" /> Add menu item
             </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
             <div className="space-y-1">
               <CardTitle className="flex items-center gap-2">
                 <Navigation className="size-5 text-muted-foreground" /> Footer Menu
               </CardTitle>
               <CardDescription>
                 Used primarily in the website footer for legal and extra links.
               </CardDescription>
             </div>
             <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" className="text-destructive hidden sm:flex">
                   <Trash2 className="size-4 mr-2" /> Delete
                 </Button>
                 <Button variant="ghost" size="sm" className="hidden sm:flex">
                   <PencilLine className="size-4 mr-2" /> Edit Menu
                 </Button>
             </div>
          </CardHeader>
          <CardContent className="space-y-2">
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Privacy Policy</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /privacy</span>
                </div>
             </div>
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Terms of Service</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /terms</span>
                </div>
             </div>
             <div className="flex flex-col gap-2 rounded-md border p-4 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <GripVertical className="size-4 text-muted-foreground opacity-50" />
                   <span className="font-medium text-sm">Contact Us</span>
                   <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">Link: /contact</span>
                </div>
             </div>
             <Button variant="ghost" size="sm" className="mt-2 w-full border-dashed border justify-start text-primary" variant="outline">
                <Plus className="size-4 mr-2" /> Add menu item
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
