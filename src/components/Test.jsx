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
      if (event.qtd_mes >= 30) {
        total += event.coupons * Math.min(vezesPorDia, 1) * dias;
      } else {
        const maxUsos = Math.floor(event.qtd_mes * (dias / 30));
        total += event.coupons * Math.min(vezesPorDia, maxUsos);
      }
    } else {
      // evento diário comum
      total += event.coupons * vezesPorDia * dias;
    }
    
    
    // if (event.unique) {
    //   const maxUsos = Math.floor(event.qtd_mes * (dias / 30));
    //   total += event.coupons * Math.min(vezesPorDia, maxUsos);
    // } else {
    //   total += event.coupons * vezesPorDia * dias;
    // }
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