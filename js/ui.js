function drawChart(years, buyNWs, rANWs, rBNWs, p, r) {
  const h = p.horizon;
  const maxY = (() => {
    let m = 0;
    const last = Math.min(h, years.length - 1);
    for (let i = 0; i <= last; i++) m = Math.max(m, buyNWs[i], rANWs[i], rBNWs[i]);
    return Math.max(m * 1.12, 1000);
  })();
  const shapes = [
    { type:'line', x0:p.mortgageTerm, x1:p.mortgageTerm, y0:0, y1:1,
      yref:'paper', line:{color:'#c8c0a8', dash:'dot', width:1.5} }
  ];
  if (p.renovPeriod>0) {
    for (let y=p.renovPeriod; y<=h; y+=p.renovPeriod)
      shapes.push({ type:'line', x0:y, x1:y, y0:0, y1:1,
        yref:'paper', line:{color:'#e0d8c8', dash:'dot', width:1} });
  }
  if (r.peaSatA && r.peaSatA<=h)
    shapes.push({ type:'line', x0:r.peaSatA, x1:r.peaSatA, y0:0, y1:1,
      yref:'paper', line:{color:'#90c0e8', dash:'dash', width:1} });
  if (r.rentCrossesYear && r.rentCrossesYear<=h)
    shapes.push({ type:'line', x0:r.rentCrossesYear, x1:r.rentCrossesYear, y0:0, y1:1,
      yref:'paper', line:{color:'#e87040', dash:'dash', width:1.5} });
  if (r.catchARen && r.catchARen<=h)
    shapes.push({ type:'line', x0:r.catchARen, x1:r.catchARen, y0:0, y1:1,
      yref:'paper', line:{color:'#c8a040', dash:'dot', width:1} });
  if (r.catchBRen && r.catchBRen<=h)
    shapes.push({ type:'line', x0:r.catchBRen, x1:r.catchBRen, y0:0, y1:1,
      yref:'paper', line:{color:'#a08060', dash:'dot', width:1} });
  if (r.crossARen && r.crossARen<=h)
    shapes.push({ type:'line', x0:r.crossARen, x1:r.crossARen, y0:0, y1:1,
      yref:'paper', line:{color:'#1a7a58', dash:'dash', width:1} });
  if (r.crossBRen && r.crossBRen<=h)
    shapes.push({ type:'line', x0:r.crossBRen, x1:r.crossBRen, y0:0, y1:1,
      yref:'paper', line:{color:'#5840a0', dash:'dash', width:1} });

  const annotations = [];
  if (p.mortgageTerm<=h)
    annotations.push({ x:p.mortgageTerm, y:1, yref:'paper', text:'crédit soldé',
      showarrow:false, font:{color:'#a09070',size:9}, xanchor:'left' });
  if (r.peaSatA && r.peaSatA<=h)
    annotations.push({ x:r.peaSatA, y:0.94, yref:'paper', text:'PEA plein',
      showarrow:false, font:{color:'#4080b0',size:9}, xanchor:'left' });
  if (r.rentCrossesYear && r.rentCrossesYear<=h)
    annotations.push({ x:r.rentCrossesYear, y:0.87, yref:'paper', text:'loyer > mensualité',
      showarrow:false, font:{color:'#c05010',size:9}, xanchor:'left' });
  if (r.catchARen && r.catchARen<=h)
    annotations.push({ x:r.catchARen, y:0.80, yref:'paper', text:'acheteur rattrape A',
      showarrow:false, font:{color:'#c8a040',size:9}, xanchor:'left' });
  if (r.catchBRen && r.catchBRen<=h)
    annotations.push({ x:r.catchBRen, y:0.73, yref:'paper', text:'acheteur rattrape B',
      showarrow:false, font:{color:'#a08060',size:9}, xanchor:'left' });
  if (r.crossARen && r.crossARen<=h)
    annotations.push({ x:r.crossARen, y:0.66, yref:'paper', text:'locataire A > acheteur',
      showarrow:false, font:{color:'#1a7a58',size:9}, xanchor:'left' });
  if (r.crossBRen && r.crossBRen<=h)
    annotations.push({ x:r.crossBRen, y:0.59, yref:'paper', text:'locataire B > acheteur',
      showarrow:false, font:{color:'#5840a0',size:9}, xanchor:'left' });

  const traces = [
    { x:years, y:buyNWs, name:'🏠 Acheter (0% CGT)',
      line:{color:'#9a7020',width:2.5}, hovertemplate:'An %{x} — %{y:,.0f} €<extra></extra>' },
    { x:years, y:rANWs, name:'📈 Louer + S&P (apport investi)',
      line:{color:'#1a7a58',width:2.5}, hovertemplate:'An %{x} — %{y:,.0f} €<extra></extra>' },
    { x:years, y:rBNWs, name:'💶 Louer + S&P (apport épargne)',
      line:{color:'#5840a0',width:2.5}, hovertemplate:'An %{x} — %{y:,.0f} €<extra></extra>' },
  ];

  Plotly.react('chart', traces, {
    paper_bgcolor:'#ffffff', plot_bgcolor:'#fafbfc',
    margin:{t:10,r:10,b:80,l:70},
    xaxis:{ tickprefix:'A', color:'#9ca3af', gridcolor:'#eef0f4',
            tickfont:{color:'#9ca3af',size:11}, range:[0,h] },
    yaxis:{ type:'linear', color:'#9ca3af', gridcolor:'#eef0f4',
            tickfont:{color:'#9ca3af',size:11},
            tickformat:',.0f', ticksuffix:' €', range:[0, maxY] },
    legend:{ orientation:'h', x:0.5, xanchor:'center', y:-0.22,
             font:{color:'#6b7280',size:11}, bgcolor:'rgba(0,0,0,0)' },
    shapes, annotations,
    hoverlabel:{ bgcolor:'#ffffff', bordercolor:'#dde0e8',
                 font:{color:'#1a1c22',family:'monospace',size:12} }
  }, {responsive:true, displayModeBar:false});
}

function updateTable(summary) {
  const tbody = document.getElementById('tbl-body');
  tbody.innerHTML = summary.map(({yr, buy, houseEquity, buyStocks, rA, rB, rARate, rBRate}) => {
    const best = Math.max(buy, rA, rB);
    const hl = v => v===best ? 'color:#1a1c22;font-weight:700' : 'color:#9ca3af';
    const dc = d => d>0 ? '#1a7a58' : '#b03020';
    const rc = r => r>25 ? '#b03020' : '#1a60b0';
    const dA=rA-buy, dB=rB-buy;

    const breakdown = buyStocks > 0
      ? `<div style="font-size:9px;color:#9ca3af;margin-top:1px">🏠 ${fmtK(houseEquity)} + 📈 ${fmtK(buyStocks)}</div>`
      : `<div style="font-size:9px;color:#9ca3af;margin-top:1px">🏠 ${fmtK(houseEquity)}</div>`;

    return `<tr>
      <td style="color:#6b7280">An ${yr}</td>
      <td style="${hl(buy)}">${fmtN(buy)}${breakdown}</td>
      <td style="${hl(rA)}">${fmtN(rA)}<span class="diff" style="color:${dc(dA)}">${dA>0?'+':''}${fmtK(dA)}</span></td>
      <td style="color:${rc(rARate)}">${pct(rARate)}</td>
      <td style="${hl(rB)}">${fmtN(rB)}<span class="diff" style="color:${dc(dB)}">${dB>0?'+':''}${fmtK(dB)}</span></td>
      <td style="color:${rc(rBRate)}">${pct(rBRate)}</td>
    </tr>`;
  }).join('');
}

function getParams() {
  const g  = id => parseFloat(document.getElementById(id).value);
  const cb = id => document.getElementById(id).checked;
  const rb = id => document.querySelector(`input[name="${id}"]:checked`).value;
  const etfMode = rb('etfMode');
  let etfReturns = null;
  if (etfMode === 'replay') {
    const sel = document.getElementById('etfSelect');
    if (sel) etfReturns = getHistoricalReturns(sel.value, g('replayYears'));
  } else if (etfMode === 'portfolio') {
    const items = Array.from(document.querySelectorAll('#portfolioList .port-item'));
    if (items.length > 0) {
      const rates = items.map(item => {
        const id = item.dataset.etfId;
        const alloc = parseFloat(item.dataset.alloc);
        const yrs = g('portfolioReplayYears');
        const rets = getHistoricalReturns(id, yrs);
        if (!rets || rets.length === 0) return null;
        return rets.map(r => r * alloc / 100);
      }).filter(Boolean);
      if (rates.length > 0) {
        const maxLen = Math.max(...rates.map(r => r.length));
        etfReturns = Array.from({length: maxLen}, (_, i) =>
          rates.reduce((sum, r) => sum + (r[i % r.length] || 0), 0)
        );
      }
    }
  }
  return {
    housePrice:        g('housePrice'),
    downPaymentPct:    g('downPaymentPct'),
    notairePct:        g('notairePct'),
    mortgageRate:      g('mortgageRate'),
    mortgageTerm:      g('mortgageTerm'),
    rentRatio:         g('rentRatio'),
    ownerCostPct:      g('ownerCostPct'),
    chargesBase:       g('chargesBase'),
    chargesGrowth:     g('chargesGrowth'),
    renovAmount:       g('renovAmount'),
    renovPeriod:       g('renovPeriod'),
    rentGrowth:        g('rentGrowth'),
    peaLimit:          g('peaLimit'),
    sp500:             g('sp500'),
    houseGrowth:       g('houseGrowth'),
    houseGrowthMode:   rb('houseGrowthMode'),
    houseReplayYears:  g('houseReplayYears'),
    savingsRate:       g('savingsRate'),
    horizon:           g('horizon'),
    renterInitInvest:  g('renterInitInvest'),
    includeTF:         cb('includeTF'),
    includeEntretien:  cb('includeEntretien'),
    includeAssurance:  cb('includeAssurance'),
    includeRenov:      cb('includeRenov'),
    etfMode,
    etfReturns,
    useInflation:      cb('useInflation'),
    inflationMode:     cb('useInflation') ? rb('inflationMode') : 'fixed',
    inflationRate:     g('inflationRate'),
    peaFee:            g('peaFee'),
  };
}

function updateLabels(p, r) {
  const fr = (v,s='') => typeof v==='number'
    ? v.toLocaleString('fr-FR',{maximumFractionDigits:2})+s : v+s;
  const downPayment = p.housePrice * p.downPaymentPct / 100;

  document.getElementById('v-housePrice').textContent    = fr(p.housePrice,' €');
  document.getElementById('v-downPayment').textContent   = `${p.downPaymentPct.toFixed(0)}% (${fr(downPayment,' €')})`;
  document.getElementById('v-notairePct').textContent    = fr(p.notairePct)+'%';
  document.getElementById('v-mortgageRate').textContent  = p.mortgageRate.toFixed(2)+'%';
  document.getElementById('v-mortgageTerm').textContent  = p.mortgageTerm+' ans';
  document.getElementById('v-rentRatio').textContent     = p.rentRatio+'%';
  document.getElementById('v-ownerCostPct').textContent  = p.ownerCostPct+'% val./an';
  document.getElementById('v-chargesBase').textContent   = p.chargesBase+' €/mois';
  document.getElementById('v-chargesGrowth').textContent = p.chargesGrowth+'%/an';
  document.getElementById('v-renovAmount').textContent   = fr(p.renovAmount,' €');
  document.getElementById('v-renovPeriod').textContent   = p.renovPeriod+' ans';
  document.getElementById('v-rentGrowth').textContent    = p.rentGrowth+'%/an';
  document.getElementById('v-peaLimit').textContent      = fr(p.peaLimit,' €');
  document.getElementById('v-peaFee').textContent        = p.peaFee.toFixed(2)+'%/an';
  if (p.inflationMode === 'replay') {
    const inflData = getHistoricalInflation(31);
    const avg = inflData.reduce((a,b)=>a+b,0) / inflData.length;
    document.getElementById('v-inflationRate').textContent = `replay (moy. ${pct(avg)})`;
  } else {
    document.getElementById('v-inflationRate').textContent = p.inflationRate+'%/an';
  }
  document.getElementById('v-sp500').textContent         = p.sp500+'%/an';
  if (p.houseGrowthMode === 'replay') {
    const avgHG = getHistoricalHousePriceReturns(p.houseReplayYears).reduce((a,b)=>a+b,0) / p.houseReplayYears;
    document.getElementById('v-houseGrowth').textContent = `replay (moy. ${pct(avgHG)})`;
  } else {
    document.getElementById('v-houseGrowth').textContent = p.houseGrowth+'%/an';
  }
  const hrp = document.getElementById('houseReplayYears');
  if (hrp) document.getElementById('v-houseReplayYears').textContent = hrp.value+' ans';
  const rp = document.getElementById('replayYears');
  if (rp) document.getElementById('v-replayYears').textContent = rp.value+' ans';
  const prp = document.getElementById('portfolioReplayYears');
  if (prp) document.getElementById('v-portfolioReplayYears').textContent = prp.value+' ans';
  document.getElementById('v-savingsRate').textContent   = p.savingsRate+'%/an';
  document.getElementById('v-horizon').textContent       = p.horizon+' ans';
  document.getElementById('v-renterInitInvest').textContent = fr(Math.min(p.renterInitInvest, downPayment),' €');

  document.getElementById('pea-bar').style.width        = Math.min(100, p.peaLimit/3000)+'%';
  document.getElementById('pea-detail').textContent     = `≤ ${(p.peaLimit/1000).toFixed(0)} 000 € versés`;
  document.getElementById('cto-detail').textContent     = `> ${(p.peaLimit/1000).toFixed(0)} 000 € versés`;

  document.getElementById('ib-base').textContent        = fmtN(r.baseSurplusMonthly);
  const fracTF = 0.45, fracEnt = 0.35, fracAss = 0.20;
  document.getElementById('cb-tf-hint').textContent  =
    `≈ ${fmtN(r.ownerCostsMonthly * fracTF)}/mois en an 1`;
  document.getElementById('cb-ent-hint').textContent  =
    `≈ ${fmtN(r.ownerCostsMonthly * fracEnt)}/mois en an 1`;
  document.getElementById('cb-ass-hint').textContent  =
    `≈ ${fmtN(r.ownerCostsMonthly * fracAss)}/mois en an 1`;
  document.getElementById('cb-renov-hint').textContent  =
    p.renovPeriod>0
      ? `${fr(p.renovAmount,'€')} tous les ${p.renovPeriod} ans ≈ ${fmtN(r.renovMonthly)}/mois amorti`
      : 'Aucun ravalement prévu';
}

function updateSectionVisibility() {
  const mode = document.querySelector('input[name="etfMode"]:checked').value;
  document.getElementById('fixedRateSection').style.display = mode === 'fixed' ? 'block' : 'none';
  document.getElementById('replaySection').style.display = mode === 'replay' ? 'block' : 'none';
  document.getElementById('portfolioSection').style.display = mode === 'portfolio' ? 'block' : 'none';
  const infl = document.getElementById('useInflation').checked;
  document.getElementById('inflationControls').style.display = infl ? 'block' : 'none';
  const hgMode = document.querySelector('input[name="houseGrowthMode"]:checked').value;
  document.getElementById('houseGrowthFixedSection').style.display = hgMode === 'fixed' ? 'block' : 'none';
  document.getElementById('houseGrowthReplaySection').style.display = hgMode === 'replay' ? 'block' : 'none';
}

function updateReplayMax() {
  const slider = document.getElementById('replayYears');
  const sel = document.getElementById('etfSelect');
  if (sel) {
    const maxYrs = getMaxYearsForEtf(sel.value);
    slider.max = maxYrs;
    if (parseInt(slider.value) > maxYrs) slider.value = maxYrs;
  }
  const slider2 = document.getElementById('portfolioReplayYears');
  if (!slider2) return;
  const items = document.querySelectorAll('#portfolioList .port-item');
  if (items.length > 0) {
    let minMax = 999;
    for (const item of items) {
      const m = getMaxYearsForEtf(item.dataset.etfId);
      if (m < minMax) minMax = m;
    }
    slider2.max = minMax;
    if (parseInt(slider2.value) > minMax) slider2.value = minMax;
  } else if (slider2) {
    const maxYrs = getMaxYearsForEtf(document.getElementById('portfolioEtfSelect').value);
    slider2.max = maxYrs;
    if (parseInt(slider2.value) > maxYrs) slider2.value = maxYrs;
  }
}

function populateEtfSelects() {
  const sel1 = document.getElementById('etfSelect');
  const sel2 = document.getElementById('portfolioEtfSelect');
  const opts = HISTORICAL.etfs.map(e => `<option value="${e.id}">${e.name} (${e.ticker})</option>`).join('');
  if (sel1) sel1.innerHTML = opts;
  if (sel2) sel2.innerHTML = opts;
}

function addPortfolioItem() {
  const sel = document.getElementById('portfolioEtfSelect');
  const alloc = parseFloat(document.getElementById('portfolioAlloc').value);
  if (!sel || !alloc || alloc <= 0) return;
  const list = document.getElementById('portfolioList');
  const existing = list.querySelectorAll('.port-item');
  const totalAlloc = [...existing].reduce((s, i) => s + parseFloat(i.dataset.alloc), 0);
  const newTotal = totalAlloc + alloc;
  if (newTotal > 100) return;
  const etfId = sel.value;
  const etfName = sel.options[sel.selectedIndex].text;
  const div = document.createElement('div');
  div.className = 'port-item';
  div.dataset.etfId = etfId;
  div.dataset.alloc = alloc;
  div.style.cssText = 'display:flex;align-items:center;gap:4px;padding:4px 6px;margin-bottom:4px;background:#f0f2f6;border-radius:4px;font-size:11px';
  div.innerHTML = `<span style="flex:1">${etfName}</span><span style="font-weight:600;color:var(--rA)">${alloc}%</span><button style="padding:1px 6px;font-size:10px;border:1px solid #dde0e8;border-radius:3px;background:var(--bg);cursor:pointer;color:#b03020">✕</button>`;
  div.querySelector('button').onclick = () => { div.remove(); updateReplayMax(); refresh();
    const items = list.querySelectorAll('.port-item');
    const tot = [...items].reduce((s, i) => s + parseFloat(i.dataset.alloc), 0);
    document.getElementById('portfolioTotalAlloc').textContent = `Allocation: ${tot}%`;
  };
  list.appendChild(div);
  document.getElementById('portfolioTotalAlloc').textContent = `Allocation: ${newTotal}%`;
  updateReplayMax();
  refresh();
}
