export default function FormCoupons({
  events,
  selectEvents,
  selectedEvents,
  selectedSelectEvents,
  checkBoxChange,
  quantityChange,
  handleSelectEventChange,
  handleSelectEventValueChange,
  resultFunction,
}) {
  return (
    <>
      <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto flex flex-col gap-6 text-white">
        <h2 className="text-2xl font-bold text-green-400"> Eventos Fixos</h2>

        {events.map((event) => (
          <div key={event.name} className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!selectedEvents[event.name]}
                onChange={() => checkBoxChange(event.name)}
                className="accent-green-500 w-4 h-4"
              />
              {event.name}{" "}
              <span className="text-green-300">({event.coupons} cps)</span>
            </label>
            {!!selectedEvents[event.name] && !event.unique && (
              <input
                type="number"
                min="1"
                className="w-20 px-2 py-1 rounded bg-zinc-700 border border-zinc-600 text-white"
                value={selectedEvents[event.name].qtdPorDia}
                onChange={(e) => quantityChange(event.name, e.target.value)}
                placeholder="Qtd"
              />
            )}

            {!!selectedEvents[event.name] && event.unique && (
              <input
                type="text"
                readOnly
                className="w-20 px-2 py-1 rounded bg-zinc-700 border border-zinc-600 text-white"
                value="1"
                placeholder="Qtd"
              />
            )}
          </div>
        ))}
      </div>
      <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto flex flex-col gap-6 text-white">
        <h2 className="text-2xl font-bold text-green-400">Eventos Variáveis</h2>
        {selectEvents.map((event) => {
          const selected = selectedSelectEvents[event.name];
          return (
            <div key={event.name} className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={(e) =>
                    handleSelectEventChange(event.name, e.target.checked)
                  }
                  className="accent-green-500 w-4 h-4"
                />
                {event.name}
              </label>

              {selected && (
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={event.min_coupons}
                    max={event.max_coupons}
                    value={selected.valorSelecionado}
                    onChange={(e) =>
                      handleSelectEventValueChange(event.name, e.target.value)
                    }
                    className="w-full accent-green-500"
                  />
                  <span className="font-mono text-green-300">
                    {selected.valorSelecionado} cps
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <button
          className="bg-green-600 text-white font-bold py-2 mt-6 rounded-xl hover:bg-green-500 transition-all duration-200 hover:scale-105"
          onClick={resultFunction}
        >
          Calcular Cupons
        </button>
      </div>
    </>
  );
}
