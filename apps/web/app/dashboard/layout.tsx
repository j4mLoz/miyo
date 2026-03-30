import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido */}
      <main className="flex-1 min-h-screen bg-[#F7F9F9] p-6">{children}</main>
    </div>
  );
}
