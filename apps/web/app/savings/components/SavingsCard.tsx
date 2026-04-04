import Link from "next/link";

export function SavingsCard({ saving }) {
  return (
    <Link href={`/savings/${saving.id}`}>
      <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition cursor-pointer">
        <h3 className="font-semibold text-gray-800">{saving.name}</h3>

        <p className="text-xl font-bold mt-2 text-gray-900">
          € {saving.currentAmount.toLocaleString()}
        </p>

        {saving.goalAmount && (
          <p className="text-sm text-gray-500 mt-1">
            Meta: € {saving.goalAmount.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}
