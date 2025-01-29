import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/blocks/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-200">{children}</main>
    </SidebarProvider>
  );
}
