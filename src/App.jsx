import { useState } from "react";
import Header from "./components/Header";
import FormCoupons from "./components/FormCoupons";
import CouponsResult from "./components/CouponsResult";

const DAILY_COUPONS_OPTIONS = [
  { name: "Transporte", coupons: 40, unique: false, qtd_mes: 30 },
  { name: "Transporte -> Escolta", coupons: 40, unique: false, qtd_mes: 30 },
  { name: "Saque", coupons: 50, unique: false, qtd_mes: 30 },
  { name: "Mensal (50 cps)", coupons: 50, unique: true, qtd_mes: 30 },
  { name: "Mensal (100 cps)", coupons: 100, unique: true, qtd_mes: 30 },
];

const EVENT_COUPONS_OPTIONS = [
  { name: "Ajuda-Ninja", coupons: 10, unique: true, qtd_mes: 7 },
  { name: "7 Dias de Férias", coupons: 50, unique: true, qtd_mes: 7 },
  { name: "Treino de Jutsus", coupons: 20, unique: true, qtd_mes: 7 },
  { name: "Lanterna", coupons: 50, unique: true, qtd_mes: 7 },
  { name: "Martelinho", coupons: 50, unique: false, qtd_mes: 7 },
]

const WEEKLY_COUPONS_OPTIONS = [
  { name: "Semanal", coupons: 20, unique: true, qtd_mes: 4 },
  { name: "Invocação da Guilda", coupons: 40, unique: false, qtd_mes: 8 },
]

const MONTHLY_COUPONS_OPTIONS = [
  { name: "Check-in", coupons: 200, unique: true, qtd_mes: 1 },
]

const SELECT_COUPONS_OPTION = [
  {
    name: "Benefícios Semanais",
    unique: true,
    qtd_mes: 4,
    min_coupons: 10,
    max_coupons: 30,
  },
  {
    name: "Ilusão Infinita: Perseguição",
    unique: true,
    qtd_mes: 4,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Ilusão Infinita: Esotérica",
    unique: true,
    qtd_mes: 4,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Ilusão Infinita: Ataque Básico",
    unique: true,
    qtd_mes: 4,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Roleta da Guilda",
    unique: false,
    qtd_mes: 30,
    min_coupons: 0,
    max_coupons: 100,
  },
  {
    name: "Câmara dos Tesouros dos Sennin",
    unique: false,
    qtd_mes: 7,
    min_coupons: 50,
    max_coupons: 80,
  },
  {
    name: "Festival das Flores de Cerejeira",
    unique: false,
    qtd_mes: 7,
    min_coupons: 20,
    max_coupons: 100,
  },
  {
    name: "Árvore dos Desejos",
    unique: true,
    qtd_mes: 30,
    min_coupons: 10,
    max_coupons: 25,
  },
];

export default function App() {
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const dateRange =
    initialDate && finalDate
      ? 
      Math.max(
          Math.ceil(
            (new Date(finalDate) - new Date(initialDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1,
          1
        )
      : 1;
 
  return (
    <>
      <Header />
      <main>
        <div className="bg-black flex flex-col">
          <div className="bg-green-800 h-[150vh]">
            <div className="flex justify-center items-center mt-24">
              <h1 className="font-bold text-4xl text-gray-300 m-auto">
                Bem vindo(a) a calculadora de cupons do jogo Naruto Online
              </h1>
            </div>
            <div className="mt-6 w-5/6 m-auto h-auto p-2">
              <div className="flex flex-row w-full h-full gap-25">
                <FormCoupons
                  options={DAILY_COUPONS_OPTIONS}
                  weekly={WEEKLY_COUPONS_OPTIONS}
                  setTotalCoupons={setTotalCoupons}
                  dateRange={dateRange}
                />
                <CouponsResult
                  coupons={totalCoupons}
                  initialDate={initialDate}
                  finalDate={finalDate}
                  setInitialDate={setInitialDate}
                  setFinalDate={setFinalDate}
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
