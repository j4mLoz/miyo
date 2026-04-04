import { SavingsHeader } from "./components/SavingsHeader";
import { SavingsSummary } from "./components/SavingsSummary";
import { SavingsList } from "./components/SavingsList";

export default function SavingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <SavingsHeader />
      <SavingsSummary />
      <SavingsList />
    </div>
  );
}
