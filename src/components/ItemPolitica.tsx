import type { Item } from "@/lib/politicas";

export default function ItemPolitica({ item }: { item: Item }) {
  const hayTexto = Boolean(item.et || item.texto);

  return (
    <div className="flex gap-3">
      <span className="w-8 shrink-0 text-right text-sm font-semibold text-blue-900">{item.n}</span>
      <div className="min-w-0 flex-1">
        {hayTexto && (
          <p className="leading-relaxed text-slate-700">
            {item.et && (
              <strong className="font-semibold text-slate-900">
                {item.et}
                {item.texto ? ": " : ""}
              </strong>
            )}
            {item.texto}
          </p>
        )}
        {item.hijos && (
          <div className={`space-y-3 ${hayTexto ? "mt-3" : ""}`}>
            {item.hijos.map((hijo, i) => (
              <ItemPolitica key={`${hijo.n}-${i}`} item={hijo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
