import TransactionForm from "@/components/TransactionForm";

export default function NewTransactionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          Nueva transacción
        </h1>

        {/* ❌ sin props de función */}
        <TransactionForm />
      </div>
    </div>
  );
}
