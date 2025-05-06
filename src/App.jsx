import { useState } from "react";
import Header from "./components/Header";
import FormCoupons from "./components/FormCoupons";
import CouponsResult from "./components/CouponsResult";

const EVENTS = [
  { name: "Transporte", coupons: 40, unique: false, qtd_mes: 30, max_value: 3 },
  { name: "Saque", coupons: 50, unique: false, qtd_mes: 30, max_value: 3 },
  {
    name: "Mensal (50 cps)",
    coupons: 50,
    unique: true,
    qtd_mes: 30,
    max_value: 1,
  },
  {
    name: "Mensal (100 cps)",
    coupons: 100,
    unique: true,
    qtd_mes: 30,
    max_value: 1,
  },
  {
    name: "Roleta da Guilda",
    coupons: 30,
    unique: true,
    qtd_mes: 30,
    max_value: 1,
  },
  {
    name: "Invocação da Guilda",
    coupons: 320,
    unique: true,
    qtd_mes: 1,
    max_value: 1,
  },
  { name: "Check-in", coupons: 250, unique: true, qtd_mes: 1, max_value: 1 },
];

const SELECT_EVENTS = [
  {
    name: "Benefícios Semanais",
    unique: true,
    qtd_mes: 4,
    step: 5,
    min_coupons: 10,
    max_coupons: 30,
  },
  {
    name: "Ilusão Infinita: Perseguição",
    unique: true,
    qtd_mes: 4,
    step: 10,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Ilusão Infinita: Esotérica",
    unique: true,
    qtd_mes: 4,
    step: 10,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Ilusão Infinita: Ataque Básico",
    unique: true,
    qtd_mes: 4,
    step: 10,
    min_coupons: 100,
    max_coupons: 800,
  },
  {
    name: "Árvore dos Desejos",
    unique: true,
    qtd_mes: 30,
    step: 1,
    min_coupons: 10,
    max_coupons: 25,
  },
];

function getDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [startDate, setStartDate] = useState(getDate);
  const [endDate, setEndDate] = useState(getDate);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [selectedSelectEvents, setSelectedSelectEvents] = useState({});
  const [result, setResult] = useState(null);
  const [dateRange, setDateRange] = useState(1);

  const handleCheckboxChange = (name) => {
    setSelectedEvents((prev) => {
      const isActive = !!prev[name];

      if (isActive) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }

      if (name === "Transporte" || name === "Saque") {
        const other = name === "Transporte" ? "Saque" : "Transporte";
        const otherQtd = prev[other]?.qtdPorDia || 0;
        if (otherQtd >= 3) return prev;
      }

      return {
        ...prev,
        [name]: { qtdPorDia: 1 },
      };
    });
  };

  const handleQtdChange = (name, value) => {
    const evento = EVENTS.find((ev) => ev.name === name);
    if (!evento) return;

    setSelectedEvents((prev) => {
      const outroNome = name === "Transporte" ? "Saque" : "Transporte";
      const outroQtd = prev[outroNome]?.qtdPorDia || 0;
      const novoValor = Number(value);

      if (novoValor + outroQtd > 3 || novoValor > evento.max_value) {
        return prev;
      }

      return {
        ...prev,
        [name]: { qtdPorDia: novoValor },
      };
    });
  };

  const handleSelectEventChange = (name, isChecked) => {
    setSelectedSelectEvents((prev) => ({
      ...prev,
      [name]: isChecked
        ? {
            valorSelecionado: SELECT_EVENTS.find((e) => e.name === name)
              .min_coupons,
          }
        : undefined,
    }));
  };

  const handleSelectEventValueChange = (name, value) => {
    setSelectedSelectEvents((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        valorSelecionado: Number(value),
      },
    }));
  };

  const calcularDias = () => {
    if (!startDate || !endDate) return 30;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const diasValidos = diffDays > 0 ? diffDays : 30;
    setDateRange(diasValidos);
    return diasValidos;
  };

  const calcularTotal = () => {
    const dias = calcularDias();
    let total = 0;

    // Eventos fixos selecionados
    EVENTS.forEach((event) => {
      const selected = selectedEvents[event.name];
      if (selected) {
        const qtdPorDia = selected.qtdPorDia || 1;
        if (event.qtd_mes === 30) {
          total += event.coupons * Math.min(qtdPorDia, event.max_value) * dias;
        } else {
          // Ex: semanal, mensal
          const vezesPermitidas = Math.floor((dias / 30) * event.qtd_mes);
          total +=
            event.coupons *
            Math.min(qtdPorDia, event.max_value) *
            vezesPermitidas;
        }
      }
    });

    // Eventos selecionáveis
    SELECT_EVENTS.forEach((event) => {
      const selected = selectedSelectEvents[event.name];
      if (selected) {
        const qtd = Math.floor((dias / 30) * event.qtd_mes);
        const valor = selected.valorSelecionado || event.min_coupons;
        total += valor * qtd;
      }
    });

    setResult(total);
  };

  return (
    <>
      <Header />
      <main>
        <div className="bg-black flex flex-col">
          <div className="bg-green-800 min-h-screen">
            <div className="flex justify-center items-center mt-24">
              <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-center text-gray-300">
                Bem vindo(a) a calculadora de cupons do jogo Naruto Online
              </h1>
            </div>
            <div className="mt-6 w-11/12 md:w-5/6 m-auto h-auto p-2">
              <div className="flex flex-col lg:flex-row w-full h-full gap-8">
                <FormCoupons
                  events={EVENTS}
                  selectEvents={SELECT_EVENTS}
                  selectedEvents={selectedEvents}
                  selectedSelectEvents={selectedSelectEvents}
                  checkBoxChange={handleCheckboxChange}
                  quantityChange={handleQtdChange}
                  handleSelectEventChange={handleSelectEventChange}
                  handleSelectEventValueChange={handleSelectEventValueChange}
                  resultFunction={calcularTotal}
                />

                <CouponsResult
                  coupons={result}
                  startDate={startDate}
                  endDate={endDate}
                  handleStartDate={(e) => setStartDate(e.target.value)}
                  handleEndDate={(e) => setEndDate(e.target.value)}
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
