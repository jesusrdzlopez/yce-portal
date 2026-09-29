import { signOut } from "@/auth";

export default function EncabezadoPortal({
  titulo,
  nombreUsuario,
}: {
  titulo: string;
  nombreUsuario: string;
}) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
            Portal YCE México
          </p>
          <h1 className="text-lg font-semibold text-slate-900">{titulo}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{nombreUsuario}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
