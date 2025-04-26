{/* 
            
            {events.map((event) => (
          <div key={event.name}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedEvents[event.name]}
                onChange={(e) => handleCheckboxChange(event.name)}
              />
              {event.name} ({event.coupons} cps)
            </label>
            {!!selectedEvents[event.name] && (
              <input
                type="number"
                min="1"
                value={selectedEvents[event.name].qtdPorDia}
                onChange={(e) => handleQtdChange(event.name, e.target.value)}
                placeholder="Qtd por dia"
              />
            )}
          </div>
        ))}

*/}


{/* {events.map((event) => (
        <div key={event.name} className="flex flex-row">
          <div className="flex w-1/2 items-center justify-center gap-1">
            <label htmlFor={`coupon-${event.name}`} className="text-white text-md">
              {event.name}
            </label>
          </div>
          <div className="flex w-1/2 items-center justify-center gap-1">
            <input
              type="checkbox"
              checked={!!selectedEvents[event.name]}
              onChange={checkBoxChange}
            />
            {!!selectedEvents[event.name] && (
              <input
                type="number"
                min="1"
                value={selectedEvents[event.name].qtdPorDia}
                onChange={(e) => handleQtdChange(event.name, e.target.value)}
                placeholder="Qtd por dia"
              />
            )}
            <div className="pt-3">

            </div>
            <div>
              <img width={"48px"} src={coupomImg} />
            </div>
          </div>
        </div>
      ))} */}