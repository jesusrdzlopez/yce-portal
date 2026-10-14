export default function BotonPayPal() {
  return (
    <form
      action="https://www.paypal.com/ncp/payment/MF9ZS9YXGXGZW"
      method="post"
      target="_blank"
      className="inline-grid content-start justify-items-center gap-2"
    >
      <input
        type="submit"
        value="Comprar ahora"
        className="h-[2.625rem] min-w-[11.625rem] cursor-pointer rounded-3xl border-0 bg-[#FFD140] px-8 text-center font-[Helvetica,Arial,sans-serif] text-base font-bold leading-5 text-black"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Tarjetas aceptadas" />
      <section className="text-xs text-slate-600">
        Con la tecnología de{" "}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
          alt="PayPal"
          className="inline h-3.5 align-middle"
        />
      </section>
    </form>
  );
}
