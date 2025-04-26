import { useState } from "react";
import coupom from "/coupom.png";

export default function CouponsResult({
  coupons,
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  dateRange,
}) {

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto text-white flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <img src={coupom} width="64" alt="Cupom" />
        <h2 className="text-2xl font-bold text-green-400">
          Total:{" "}
          <span className="text-white font-mono">{coupons ?? 0} cps</span> em{" "}
          {dateRange} dia(s)
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="initialDate" className="text-sm text-zinc-300">
          Data Inicial
        </label>
        <input
          type="date"
          id="initialDate"
          value={startDate}
          onChange={handleStartDate}
          className="bg-zinc-700 text-white px-3 py-2 rounded-md border border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="finalDate" className="text-sm text-zinc-300">
          Data Final
        </label>
        <input
          type="date"
          id="finalDate"
          value={endDate}
          onChange={handleEndDate}
          className="bg-zinc-700 text-white px-3 py-2 rounded-md border border-zinc-600"
        />
      </div>

      <div className="bg-zinc-700 p-4 rounded-lg text-sm text-zinc-300 leading-relaxed">
        <p>
          <b className="text-green-400">Observação:</b> os valores devem ser
          colocados <b>por dia</b>.
        </p>
        <p className="mt-1">
          Exemplo: se você realiza 3 transportes por dia, coloque <b>3</b> no
          campo.
        </p>
        <p className="mt-1 italic text-xs">
          * Considerando 1 mês como 30 dias.
        </p>
      </div>
      <div className="bg-zinc-700 p-4 rounded-lg text-sm text-zinc-300 leading-relaxed">
        <p className="mt-1">
          A calculadora tem o propósito de{" "}
          <b className="text-green-400">estimar</b> o total de cupons com base
          nas datas e está considerando que todas as recompensas estão sendo
          coletadas de forma constante.
        </p>
      </div>
    </div>
  );
}
