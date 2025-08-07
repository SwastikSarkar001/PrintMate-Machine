import {
  Sidebar,
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

import Searchbar from "@/components/print/Searchbar";
import { ProtectedRoute } from "@/lib/auth-context";
import RecentsSection from "@/components/print/sections/Recents";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for managing your account and settings",
};

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <SidebarProvider open={false}>
        <Sidebar variant="inset" />
        <div className="flex-1 flex flex-col pt-2 md:p-4 gap-4 h-screen overflow-hidden">
          <Searchbar />
          <SidebarInset className="overflow-y-auto md:rounded-xl">
            <RecentsSection />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
