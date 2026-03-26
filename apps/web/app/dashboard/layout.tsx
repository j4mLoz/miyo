import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* 🔥 Sidebar */}
      <Sidebar />

      {/* 🔥 Contenido */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Topbar />

        {children}
      </div>
    </div>
  );
}
