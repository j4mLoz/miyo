import Sidebar from "@/components/dashboard/Sidebar";

export default function SettingsLayout({ children }: any) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#F7F9F9] min-h-screen">{children}</main>
    </div>
  );
}
