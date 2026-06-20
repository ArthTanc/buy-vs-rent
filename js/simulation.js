function simulate(p) {
  const notaire = p.housePrice * p.notairePct / 100;
  const downPayment = p.housePrice * p.downPaymentPct / 100;

  const loan = p.housePrice + notaire - downPayment;
  const mr   = p.mortgageRate / 100 / 12;
  const n    = p.mortgageTerm * 12;
  const mp   = mr > 0
    ? loan * (mr * Math.pow(1+mr,n)) / (Math.pow(1+mr,n) - 1)
    : loan / n;
  const initRent = mp * p.rentRatio / 100;
  const sp  = p.sp500 / 100;
  const sav = p.savingsRate / 100;
  const peaFee = p.peaFee / 100;

  function getYearReturn(yr) {
    if (p.etfReturns && p.etfReturns.length > 0)
      return p.etfReturns[yr % p.etfReturns.length] / 100;
    return sp;
  }

  let buyInvest = 0;
  const ri = Math.min(p.renterInitInvest, downPayment);

  let rA = {
    peaP: Math.min(ri, p.peaLimit), peaC: Math.min(ri, p.peaLimit),
    ctoP: Math.max(0, ri - p.peaLimit), ctoC: Math.max(0, ri - p.peaLimit),
    totC: ri,
  };
  let rACash = downPayment - ri;

  let rB = { peaP: 0, peaC: 0, ctoP: 0, ctoC: 0, totC: 0 };
  let rBCash = downPayment;

  const years=[], buyNWs=[], rANWs=[], rBNWs=[];
  const houseEquities=[], buyInvestArr=[];
  const rARates=[], rBRates=[];
  let peaSatA=null, peaSatB=null;
  let catchARen=null, catchBRen=null, crossARen=null, crossBRen=null;

  function afterTax(peaP, peaC, ctoP, ctoC) {
    return (peaP - Math.max(0, peaP-peaC)*0.172) + (ctoP - Math.max(0, ctoP-ctoC)*0.30);
  }
  function blended(peaP, peaC, ctoP, ctoC) {
    const pG=Math.max(0,peaP-peaC), cG=Math.max(0,ctoP-ctoC), tot=pG+cG;
    return tot>0 ? (pG*0.172+cG*0.30)/tot*100 : 0;
  }
  function stepPort(o, surplus, rate) {
    let {peaP, peaC, ctoP, ctoC, totC} = o;
    peaP *= (1+rate) * (1 - peaFee);
    ctoP *= (1+rate);
    const eff = p.negBehavior==='stop' ? Math.max(0,surplus) : surplus;
    if (eff > 0) {
      const space = Math.max(0, p.peaLimit-totC);
      const toPEA=Math.min(eff,space), toCTO=eff-toPEA;
      peaP+=toPEA; peaC+=toPEA; ctoP+=toCTO; ctoC+=toCTO; totC+=eff;
    } else if (eff < 0) {
      const draw=Math.min(-eff, peaP+ctoP);
      if (draw>0) {
        const tot=peaP+ctoP, pf=tot>0?peaP/tot:0.5;
        const dP=draw*pf, dC=draw*(1-pf);
        if (peaP>0){peaC=peaC*Math.max(0,peaP-dP)/peaP; peaP=Math.max(0,peaP-dP);}
        if (ctoP>0){ctoC=ctoC*Math.max(0,ctoP-dC)/ctoP; ctoP=Math.max(0,ctoP-dC);}
      }
    }
    return {peaP,peaC,ctoP,ctoC,totC};
  }

  let houseGrowthCum = null;
  let houseGrowthRates = null;
  if (p.houseGrowthMode === 'replay') {
    houseGrowthRates = getHistoricalHousePriceReturns(p.houseReplayYears);
    houseGrowthCum = [1];
    for (let i = 1; i <= 50; i++) {
      const gr = houseGrowthRates[(i-1) % houseGrowthRates.length] / 100;
      houseGrowthCum.push(houseGrowthCum[i-1] * (1 + gr));
    }
  }

  for (let yr=0; yr<=50; yr++) {
    const houseVal  = houseGrowthCum
      ? Math.round(p.housePrice * houseGrowthCum[yr])
      : p.housePrice * Math.pow(1+p.houseGrowth/100, yr);
    const months    = yr*12;
    const mortBal   = yr>=p.mortgageTerm ? 0
      : loan*(Math.pow(1+mr,n)-Math.pow(1+mr,months))/(Math.pow(1+mr,n)-1);
    const ownerCosts = houseVal*p.ownerCostPct/100;
    const rentAnnual = initRent*12*Math.pow(1+p.rentGrowth/100, yr);
    const renovCost  = yr>0 && p.renovPeriod>0 && yr%p.renovPeriod===0 ? p.renovAmount : 0;

    const houseEquity = houseVal - mortBal;
    const buyNW = houseEquity + buyInvest;

    const rANW = afterTax(rA.peaP, rA.peaC, rA.ctoP, rA.ctoC) + rACash;
    const rBNW = afterTax(rB.peaP, rB.peaC, rB.ctoP, rB.ctoC) + rBCash;

    if (!peaSatA && rA.totC>=p.peaLimit && yr>0) peaSatA=yr;
    if (!peaSatB && rB.totC>=p.peaLimit && yr>0) peaSatB=yr;
    if (catchARen === null && buyNW > rANW && yr > 0) catchARen = yr;
    if (catchBRen === null && buyNW > rBNW && yr > 0) catchBRen = yr;
    if (catchARen !== null && crossARen === null && rANW > buyNW && yr > catchARen) crossARen = yr;
    if (catchBRen !== null && crossBRen === null && rBNW > buyNW && yr > catchBRen) crossBRen = yr;

    years.push(yr);
    buyNWs.push(Math.round(buyNW));
    rANWs.push(Math.round(rANW));
    rBNWs.push(Math.round(rBNW));
    houseEquities.push(Math.round(houseEquity));
    buyInvestArr.push(Math.round(buyInvest));
    rARates.push(blended(rA.peaP, rA.peaC, rA.ctoP, rA.ctoC));
    rBRates.push(blended(rB.peaP, rB.peaC, rB.ctoP, rB.ctoC));

    if (yr<50) {
      const baseSurplus  = (yr<p.mortgageTerm ? mp*12 : 0) - rentAnnual;
      const fracTF = 0.45, fracEnt = 0.35, fracAss = 0.20;
      let ownerBonus = 0;
      if (p.includeTF)         ownerBonus += fracTF * ownerCosts;
      if (p.includeEntretien)  ownerBonus += fracEnt * ownerCosts;
      if (p.includeAssurance)  ownerBonus += fracAss * ownerCosts;
      const renovBonus   = p.includeRenov ? renovCost : 0;
      const surplus      = baseSurplus + ownerBonus + renovBonus;
      const yrRate = getYearReturn(yr);

      if (yr < p.mortgageTerm) {
        buyInvest -= renovCost;
      } else {
        buyInvest = buyInvest*(1+yrRate) + mp*12 - renovCost;
      }

      rA = stepPort(rA, surplus, yrRate);
      rB = stepPort(rB, surplus, yrRate);
      rACash *= (1+sav);
      rBCash *= (1+sav);
    }
  }

  const milestones = getMilestones(p.horizon);
  const summary = milestones.map(yr => ({
    yr,
    buy:         buyNWs[yr],
    houseEquity: houseEquities[yr],
    buyStocks:   buyInvestArr[yr],
    rA:          rANWs[yr],
    rB:          rBNWs[yr],
    rARate:      rARates[yr],
    rBRate:      rBRates[yr],
  }));

  const ownerCostsMonthly  = p.housePrice*p.ownerCostPct/100/12;
  const renovMonthly       = p.renovPeriod>0 ? p.renovAmount/p.renovPeriod/12 : 0;
  const baseSurplusMonthly = mp - initRent;

  let rentCrossesYear = null;
  if (p.rentGrowth>0 && initRent<mp) {
    const t = Math.log(mp/initRent)/Math.log(1+p.rentGrowth/100);
    rentCrossesYear = Math.round(t);
    if (rentCrossesYear>50) rentCrossesYear=null;
  }

  return { years, buyNWs, rANWs, rBNWs, summary, mp, initRent, notaire, loan,
           peaSatA, peaSatB, catchARen, catchBRen, crossARen, crossBRen,
           baseSurplusMonthly, ownerCostsMonthly, renovMonthly,
           rentCrossesYear };
}

function getInflationRates(p, nYears) {
  if (!p.useInflation) return Array(nYears).fill(0);
  if (p.inflationMode === 'replay') {
    const inflData = getHistoricalInflation(nYears);
    if (inflData && inflData.length > 0) {
      return Array.from({length: nYears}, (_, i) => inflData[i % inflData.length] / 100);
    }
  }
  const fixed = p.inflationRate / 100;
  return Array(nYears).fill(fixed);
}

function applyInflationToResults(r, p) {
  if (!p.useInflation) return;
  const nYears = r.years.length;
  const inflRates = getInflationRates(p, nYears);
  let cumDiv = 1;
  for (let yr = 0; yr < nYears; yr++) {
    const adj = 1 / cumDiv;
    r.buyNWs[yr] = Math.round(r.buyNWs[yr] * adj);
    r.rANWs[yr] = Math.round(r.rANWs[yr] * adj);
    r.rBNWs[yr] = Math.round(r.rBNWs[yr] * adj);
    if (yr < nYears - 1) cumDiv *= (1 + inflRates[yr]);
  }
  r.summary = r.summary.map(s => ({
    ...s,
    buy: r.buyNWs[s.yr],
    rA: r.rANWs[s.yr],
    rB: r.rBNWs[s.yr],
  }));
}
