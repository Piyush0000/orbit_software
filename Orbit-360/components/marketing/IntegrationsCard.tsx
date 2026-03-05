"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Facebook, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function IntegrationsCard() {
  const { activeStore } = useAuth();
  const [metaStatus, setMetaStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return url.endsWith("/api") ? url : `${url}/api`;
  };
  const API_URL = getApiUrl();

  useEffect(() => {
    if (activeStore?.id) {
      fetchStatus();
    } else {
      setLoading(false);
    }
  }, [activeStore]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "ORBIT_META_CONNECTED") {
        toast.success("Meta account linked successfully!");
        setConnecting(false);
        fetchStatus();
      } else if (event.data?.type === "ORBIT_META_ERROR") {
        toast.error("Meta connection failed.");
        setConnecting(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      // Use the 'marketing-bridge' route to bypass router resolution issues
      const res = await fetch(`${API_URL}/marketing-bridge/status/${activeStore.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setMetaStatus(data);
      } else {
        // Fallback to the regular route
        const fallbackRes = await fetch(`${API_URL}/marketing/meta/status/${activeStore.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (fallbackRes.ok) {
           const data = await fallbackRes.json();
           setMetaStatus(data);
        }
      }
    } catch (e) {
      console.warn("[Marketing] Error fetching status from bridge/standard routes");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!activeStore?.id) return toast.error("No active store");

    setConnecting(true);
    try {
      const token = localStorage.getItem("auth_token");
      // Try bridge first
      const res = await fetch(`${API_URL}/marketing-bridge/connect?storeId=${activeStore.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const { url } = await res.json();
      
      const width = 600, height = 750;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      window.open(
        url, 
        "Connect Meta Ads", 
        `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no`
      );

    } catch (e) {
      toast.error("Failed to initiate Meta connection");
      setConnecting(false);
    }
  };

  if (loading) return null;

  return (
    <Card className="mx-4 lg:mx-6 mb-6 overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-6 flex-1">
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Facebook size={20} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Ad Manager</span>
            </div>
            <CardTitle className="text-2xl">Connect Meta Account</CardTitle>
            <CardDescription>
              Link the browser session for the merchant active in this Chrome tab.
            </CardDescription>
          </CardHeader>
          
          <div className="flex items-center gap-4">
            {!metaStatus?.connected ? (
              <Button 
                onClick={handleConnect} 
                disabled={connecting}
                className="bg-[#1877F2] hover:bg-[#166fe5] text-white gap-2 px-8 py-6 text-lg"
              >
                {connecting ? <Loader2 className="animate-spin" size={24} /> : <Facebook size={24} />}
                {connecting ? "Handshake in progress..." : "Connect Merchant Meta"}
              </Button>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-500 font-bold bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 shadow-sm">
                  <CheckCircle2 size={18} />
                  Connected: {metaStatus.accountName || "Meta Business"}
                </div>
                <div className="text-[10px] text-muted-foreground px-1">
                   Ad Accounts: {metaStatus.adAccounts?.length || 0} Synced
                </div>
              </div>
            )}
            
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground ml-2">
              <AlertCircle size={14} />
              Orbit Platform Safe-Sync
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block w-72 h-full bg-primary/5 p-8 border-l border-primary/10">
           <div className="space-y-4 text-center">
              <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Verified OAuth Flow</div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="p-2 border rounded bg-background text-[10px] font-bold">PIXEL</div>
                 <div className="p-2 border rounded bg-background text-[10px] font-bold">CONV. API</div>
              </div>
              <p className="text-[10px] text-muted-foreground italic underline">Handshake bypasses CSP restrictions.</p>
           </div>
        </div>
      </div>
    </Card>
  );
}
