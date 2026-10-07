import Image from "next/image";

export default function PieSitio() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <Image
            src="/logos/lions-international.webp"
            alt="Lions International"
            width={48}
            height={48}
            unoptimized
            className="h-12 w-12"
          />
          <Image
            src="/logos/yce-mexico.webp"
            alt="México · Youth Camps & Exchange"
            width={52}
            height={50}
            unoptimized
            className="h-12 w-auto"
          />
        </div>
        <p>Programa de Campamentos e Intercambio Juveniles · Distrito Múltiple B México</p>
        <p>ycemexico.org</p>
      </div>
    </footer>
  );
}
