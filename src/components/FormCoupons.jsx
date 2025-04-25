import { useState } from "react";
import coupomImg from "/coupom.png";
export default function FormCoupons({ options, setTotalCoupons, dateRange }) {
  const [eventos, setEventos] = useState(
    options.reduce((acc, curr) => {
      acc[curr.name] = { ativo: false, vezes: curr.unique ? 1 : 0, qtd_mes: curr.qtd_mes };
      return acc;
    }, {})
  );

  const handleResults = () => {
    const total = options.reduce((sum, opt) => {
      const evento = eventos[opt.name];
      console.log(evento.name)
      
      return evento.ativo ? sum + evento.vezes * opt.coupons : sum;
    }, 0);

    console.log(total);
    setTotalCoupons(total);
  };
  return (
    <div className="bg-green-700 w-1/2 pt-6 flex flex-col h-full gap-2">
      {options.map((option, index) => (
        <div key={index} className="flex flex-row">
          <div className="flex w-1/2 items-center justify-center gap-1">
            <label htmlFor={`coupon-${index}`} className="text-white text-md">
              {option.name}
            </label>
          </div>
          <div className="flex w-1/2 items-center justify-center gap-1">
            <input
              type="checkbox"
              checked={eventos[option.name].ativo}
              onChange={() =>
                setEventos((prev) => ({
                  ...prev,
                  [option.name]: {
                    ...prev[option.name],
                    ativo: !prev[option.name].ativo,
                  },
                }))
              }
            />
            {!option.unique && (
              <>
                <input
                  key={option}
                  type="number"
                  value={eventos[option.name].vezes}
                  onChange={(e) =>
                    setEventos((prev) => ({
                      ...prev,
                      [option.name]: {
                        ...prev[option.name],
                        vezes: Number(e.target.value),
                      },
                    }))
                  }
                  id={`coupon-${index}`}
                  name={`coupon-${option.name}`}
                  className="h-5 w-12 bg-gray-300"
                />
                <div className="flex flex-row pl-6">
                  <div className="pt-3">
                    <span>{option.coupons * eventos[option.name].vezes}</span>
                  </div>{" "}
                  <div>
                    <img width={"48px"} src={coupomImg} />
                  </div>
                </div>
              </>
            )}
            {option.unique && (
              <>
                <input
                  type="number"
                  value="1"
                  readOnly
                  id={`coupon-${index}`}
                  name={`coupon-${option.name}`}
                  className="h-5 w-12 bg-gray-600"
                  onChange={handleResults}
                />
                <div className="flex flex-row pl-6">
                  <div className="pt-3">
                    <span>{option.coupons * eventos[option.name].vezes}</span>
                  </div>{" "}
                  <div>
                    <img width={"48px"} src={coupomImg} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <button
        className="bg-gray-800 p-1 text-gray-400 hover:text-white"
        onClick={handleResults}
      >
        Calcular
      </button>
    </div>
  );
}
