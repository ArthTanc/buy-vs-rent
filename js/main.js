function refresh() {
  const p = getParams();

  const riDownPayment = p.housePrice * p.downPaymentPct / 100;
  const riSlider = document.getElementById('renterInitInvest');
  riSlider.max = riDownPayment;
  if (p.renterInitInvest > riDownPayment) {
    riSlider.value = riDownPayment;
    p.renterInitInvest = riDownPayment;
  }

  const r = simulate(p);
  applyInflationToResults(r, p);
  updateLabels(p, r);

  document.getElementById('p-mp').textContent      = fmtN(r.mp);
  document.getElementById('p-rent').textContent    = fmtN(r.initRent);
  document.getElementById('p-notaire').textContent = fmtN(r.notaire);

  let totalMonthly = r.baseSurplusMonthly;
  const fracTF = 0.45, fracEnt = 0.35, fracAss = 0.20;
  if (p.includeTF)         totalMonthly += r.ownerCostsMonthly * fracTF;
  if (p.includeEntretien)  totalMonthly += r.ownerCostsMonthly * fracEnt;
  if (p.includeAssurance)  totalMonthly += r.ownerCostsMonthly * fracAss;
  if (p.includeRenov)      totalMonthly += r.renovMonthly;
  const totalAnnual = totalMonthly * 12;
  document.getElementById('p-surplus').textContent = `${fmtN(totalMonthly)}/mois · ${fmtN(totalAnnual)}/an`;

  const warn = document.getElementById('pea-warn');
  const msgs=[];
  if (r.peaSatA) msgs.push(`Scénario A : PEA plein à l'an ${r.peaSatA}.`);
  if (r.peaSatB) msgs.push(`Scénario B : PEA plein à l'an ${r.peaSatB}.`);
  if (msgs.length) {
    warn.innerHTML = '⚠️ Plafond PEA atteint — '+msgs.join(' ')+' Montez à 300k€ pour un couple.';
    warn.style.display = 'block';
  } else { warn.style.display = 'none'; }

  const inflLabel = document.getElementById('v-inflationApplied');
  if (p.useInflation) {
    const inflRates = getInflationRates(p, p.horizon + 1);
    const avg = inflRates.reduce((a,b) => a + b, 0) * 100 / inflRates.length;
    inflLabel.textContent = `moy. ${pct(avg)}`;
  } else {
    inflLabel.textContent = '';
  }

  drawChart(r.years, r.buyNWs, r.rANWs, r.rBNWs, p, r);
  updateTable(r.summary);

  const crossWarn = document.getElementById('rent-cross-warn');
  if (r.rentCrossesYear) {
    const rentAtCross = r.initRent * Math.pow(1+p.rentGrowth/100, r.rentCrossesYear);
    crossWarn.innerHTML =
      `⚠️ Le loyer dépasse la mensualité à l'<strong>an ${r.rentCrossesYear}</strong> ` +
      `(${fmtN(rentAtCross)}/mois). Le locataire cesse d'investir à ce moment.`;
    crossWarn.style.display = 'block';
  } else { crossWarn.style.display = 'none'; }
}

document.querySelectorAll('input[type=range],input[type=checkbox],input[type=radio]').forEach(el => {
  el.addEventListener('input', refresh);
  el.addEventListener('change', refresh);
});

document.querySelectorAll('input[name="etfMode"]').forEach(el => {
  el.addEventListener('change', updateSectionVisibility);
});
document.getElementById('useInflation').addEventListener('change', updateSectionVisibility);
document.querySelectorAll('input[name="houseGrowthMode"]').forEach(el => {
  el.addEventListener('change', updateSectionVisibility);
});
document.getElementById('addPortfolioBtn').addEventListener('click', addPortfolioItem);
document.getElementById('etfSelect').addEventListener('change', () => { updateReplayMax(); refresh(); });
document.getElementById('portfolioEtfSelect').addEventListener('change', updateReplayMax);

populateEtfSelects();
updateSectionVisibility();
refresh();
