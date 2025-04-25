import { useState } from "react";
import coupom from "/coupom.png";

export default function CouponsResult({ coupons, initialDate, finalDate, setInitialDate, setFinalDate, dateRange }) {
 
    return (
    <div className="bg-emerald-700 w-1/2 p-32 h-full">
      <div className="flex flex-row">
        <div>
          <img src={coupom} width={"96px"} />
        </div>
        <div className="pt-8 text-white"> Total: {coupons} cupons em {dateRange} dia(s)</div>
      </div>

      <div className="mt-12">
        <label htmlFor="initialDate" className="text-white">
          Data Inicial
        </label>
        <input
          type="date"
          id="initialDate"
          value={initialDate}
          onChange={(e) => setInitialDate(e.target.value)}
          className="ml-2"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="finalDate" className="text-white">
          Data Final
        </label>
        <input
          type="date"
          id="finalDate"
          value={finalDate}
          onChange={(e) => setFinalDate(e.target.value)}
          className="ml-2"
        />
      </div>

      <div>
        <h3> OBS: Os valores devem ser colocados <b>por dia</b> <br/>ou seja: se você realiza 3 transportes por dia, coloque 3 no valor. <br/> Considere: 1 mês = 30 dias.</h3>
      </div>
    </div>
  );
}
