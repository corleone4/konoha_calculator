import { useState } from "react";
import Header from "./components/Header";
import FormCoupons from "./components/FormCoupons";
import CouponsResult from "./components/CouponsResult";

const EVENTS = [
  { name: "Transporte", coupons: 40, unique: false, qtd_mes: 30 },
  { name: "Transporte -> Escolta", coupons: 40, unique: false, qtd_mes: 30 },
  { name: "Saque", coupons: 50, unique: false, qtd_mes: 30 },
  { name: "Mensal (50 cps)", coupons: 50, unique: true, qtd_mes: 30 },
  { name: "Mensal (100 cps)", coupons: 100, unique: true, qtd_mes: 30 },
  { name: "Ajuda-Ninja", coupons: 10, unique: true, qtd_mes: 7 },
  { name: "7 Dias de Férias", coupons: 50, unique: true, qtd_mes: 7 },
  { name: "Treino de Jutsus", coupons: 20, unique: true, qtd_mes: 7 },
  { name: "Lanterna", coupons: 50, unique: true, qtd_mes: 7 },
  { name: "Martelinho", coupons: 50, unique: false, qtd_mes: 7 },
  { name: "Martelinho -> Checkin", coupons: 100, unique: true, qtd_mes: 1 },
  { name: "Semanal", coupons: 20, unique: true, qtd_mes: 4 },
  { name: "Invocação da Guilda", coupons: 40, unique: false, qtd_mes: 8 },
  { name: "Check-in", coupons: 200, unique: true, qtd_mes: 1 },
];

// Eventos com faixa de valores
const SELECT_EVENTS = [
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

  // quando o user marca ou desmarca um checkbox:
  // se já tá selecionado → ela remove do estado.
  // se não tá selecionado → ela adiciona com valor inicial qtdPorDia: 1.
  const handleCheckboxChange = (name) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [name]: prev[name] ? undefined : { qtdPorDia: 1 },
    }));
  };
  // quando o user ja marcou a checkbox:
  // qtdPorDia vai ser sobrescrito pelo valor digitado no input.
  const handleQtdChange = (name, value) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [name]: { qtdPorDia: Number(value) },
    }));
  };

  // checkbox de evento com faixa
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

  // atualiza o valor selecionado dos eventos com faixa
  const handleSelectEventValueChange = (name, value) => {
    setSelectedSelectEvents((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        valorSelecionado: Number(value),
      },
    }));
  };
  // calcula a quantidade de dias entre as datas start e end
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

    // fixos
    for (const event of EVENTS) {
      const data = selectedEvents[event.name];
      if (!data) continue;

      const vezesPorDia = data.qtdPorDia || 1;

      if (event.unique) {
        // limita pelos usos únicos no mês proporcional
        const maxUsos = Math.floor(event.qtd_mes * (dias / 30));
        total += event.coupons * Math.min(vezesPorDia, maxUsos);
      } else {
        // evento diário multiplicado por dias q ele ta disponivel
        total += event.coupons * vezesPorDia * dias;
      }
    }

    // eventos com faixa de valores
    for (const event of SELECT_EVENTS) {
      const data = selectedSelectEvents[event.name];
      if (!data) continue;

      const valorSelecionado = data.valorSelecionado || event.min_coupons;
      const usosPermitidos = Math.floor(event.qtd_mes * (dias / 30));
      total += valorSelecionado * usosPermitidos;
    }

    setResult(total);
  };
  return (
    <>
      <Header />
      <main>
        <div className="bg-black flex flex-col">
          <div className="bg-green-800 h-[100vh]">
            <div className="flex justify-center items-center mt-24">
              <h1 className="font-bold text-4xl text-gray-300 m-auto">
                Bem vindo(a) a calculadora de cupons do jogo Naruto Online
              </h1>
            </div>
            <div className="mt-6 w-5/6 m-auto h-auto p-2">
              <div className="flex flex-row w-full h-full gap-25">
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
