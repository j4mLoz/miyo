export default function SubscriptionSummary({
  subscriptions,
  show,
  toggle,
}: any) {
  const total = subscriptions.reduce(
    (acc: number, s: any) => acc + Number(s.amount || 0),
    0,
  );

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={toggle}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        {show ? "Ocultar total" : "Mostrar total"}
      </button>

      {show && (
        <div className="bg-white px-4 py-2 rounded-lg shadow font-semibold">
          Total: ${total}
        </div>
      )}
    </div>
  );
}
