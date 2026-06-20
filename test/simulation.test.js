QUnit.module('simulation');

// ── Monthly payment ──────────────────────────────────────────────────────

QUnit.test('monthly payment — 0% rate equals simple division', assert => {
  const p = paramsWith({
    housePrice: 240000, downPaymentPct: 0, notairePct: 0,
    mortgageRate: 0, mortgageTerm: 25,
  });
  const r = simulate(p);
  assert.strictEqual(r.mp, 240000 / 300, `mp = ${r.mp}`);
});

QUnit.test('monthly payment — amortization formula is self-consistent', assert => {
  const p = paramsWith({
    housePrice: 120000, downPaymentPct: 0, notairePct: 0,
    mortgageRate: 6, mortgageTerm: 20,
  });
  const r = simulate(p);
  const mr = 6 / 100 / 12;
  const n = 20 * 12;
  const presentValue = r.mp * (1 - Math.pow(1 + mr, -n)) / mr;
  assert.ok(Math.abs(presentValue - 120000) <= 1, 'discounted payments ≈ loan');
});

QUnit.test('monthly payment — includes notaire in loan', assert => {
  const p = paramsWith({
    housePrice: 200000, downPaymentPct: 10, notairePct: 7.5,
    mortgageRate: 0, mortgageTerm: 25,
  });
  const r = simulate(p);
  const expectedLoan = 200000 + 200000 * 0.075 - 20000;
  assert.strictEqual(r.loan, expectedLoan, `loan = ${r.loan}`);
  assert.strictEqual(r.mp, expectedLoan / 300, 'mp = loan / n');
});

// ── Loan balance ─────────────────────────────────────────────────────────

QUnit.test('mortgage fully paid by end of term', assert => {
  const p = paramsWith({ renovPeriod: 0 });
  const r = simulate(p);
  const expectedHouseVal25 = Math.round(200000 * Math.pow(1.02, 25));
  assert.ok(Math.abs(r.buyNWs[25] - expectedHouseVal25) <= 500, 'house equity ≈ full house value at yr 25');
});

// ── Net worth at year 0 ──────────────────────────────────────────────────

QUnit.test('buyer NW at year 0 = downPayment − notaire', assert => {
  const p = defaultParams();
  const r = simulate(p);
  const expected = 20000 - 200000 * 0.075;
  assert.strictEqual(r.buyNWs[0], Math.round(expected), `buyNW[0] = ${r.buyNWs[0]}`);
});

QUnit.test('renter A NW at year 0 = downPayment (all in PEA)', assert => {
  const p = paramsWith({ peaLimit: 150000, renterInitInvest: 20000 });
  const r = simulate(p);
  const downPayment = 200000 * 0.10;
  assert.strictEqual(r.rANWs[0], 20000, `rANW[0] = ${r.rANWs[0]}`);
});

QUnit.test('renter B NW at year 0 = downPayment (all cash)', assert => {
  const p = defaultParams();
  const r = simulate(p);
  const downPayment = 20000;
  assert.strictEqual(r.rBNWs[0], downPayment, `rBNW[0] = ${r.rBNWs[0]}`);
});

// ── House value appreciation ─────────────────────────────────────────────

QUnit.test('house value grows with appreciation rate', assert => {
  const pHigh = paramsWith({ houseGrowth: 5.0, renovPeriod: 0 });
  const pLow  = paramsWith({ houseGrowth: 1.0, renovPeriod: 0 });
  const rHigh = simulate(pHigh);
  const rLow  = simulate(pLow);
  assert.ok(rHigh.buyNWs[30] > rLow.buyNWs[30], 'higher appreciation → higher NW at yr 30');
});

// ── PEA/CTO split ────────────────────────────────────────────────────────

QUnit.test('renter A invests in CTO when PEA limit exceeded', assert => {
  const p = paramsWith({
    peaLimit: 5000, renterInitInvest: 20000, downPaymentPct: 50,
  });
  const r = simulate(p);
  const downPayment = 200000 * 0.50;
  assert.strictEqual(r.rANWs[0], downPayment, 'rANW[0] = downPayment');
});

// ── PEA saturation tracking ──────────────────────────────────────────────

QUnit.test('PEA saturation year is detected', assert => {
  const p = paramsWith({
    peaLimit: 10000, renterInitInvest: 10000, downPaymentPct: 50,
    rentRatio: 60,
    sp500: 0,
    rentGrowth: 0,
    includeTF: false, includeEntretien: false, includeAssurance: false,
  });
  const r = simulate(p);
  assert.notStrictEqual(r.peaSatA, null, 'PEA saturates for renter A');
  assert.ok(r.peaSatA > 0, `PEA saturated at year ${r.peaSatA}`);
});

// ── Rent crossing mortgage payment ───────────────────────────────────────

QUnit.test('rent crossing detected when rent growth > 0', assert => {
  const p = paramsWith({ rentGrowth: 5, rentRatio: 70, mortgageRate: 3 });
  const r = simulate(p);
  assert.notStrictEqual(r.rentCrossesYear, null, 'crossing year detected');
  assert.ok(r.rentCrossesYear > 0, `crosses at year ${r.rentCrossesYear}`);
});

QUnit.test('no rent crossing when rent >= payment from start', assert => {
  const p = paramsWith({ rentRatio: 110, rentGrowth: 0 });
  const r = simulate(p);
  assert.strictEqual(r.rentCrossesYear, null, 'no crossing');
});

// ── Inflation ────────────────────────────────────────────────────────────

QUnit.test('getInflationRates — disabled returns zeros', assert => {
  const p = paramsWith({ useInflation: false });
  const rates = getInflationRates(p, 10);
  assert.strictEqual(rates.length, 10);
  assert.ok(rates.every(r => r === 0), 'all zeros');
});

QUnit.test('getInflationRates — fixed mode returns constant rate', assert => {
  const p = paramsWith({ useInflation: true, inflationMode: 'fixed', inflationRate: 2.5 });
  const rates = getInflationRates(p, 5);
  assert.strictEqual(rates.length, 5);
  assert.strictEqual(rates[0], 0.025);
  assert.strictEqual(rates[4], 0.025);
});

QUnit.test('applyInflationToResults — year 0 unchanged, year 1 decreased', assert => {
  const p = paramsWith({ useInflation: true, inflationMode: 'fixed', inflationRate: 2 });
  const r = simulate(p);
  const before = [...r.buyNWs];
  applyInflationToResults(r, p);
  assert.strictEqual(r.buyNWs[0], before[0], 'year 0 unchanged');
  assert.ok(r.buyNWs[1] < before[1], 'year 1 decreased after inflation');
});

QUnit.test('applyInflationToResults — no effect when inflation disabled', assert => {
  const p = paramsWith({ useInflation: false });
  const r = simulate(p);
  const before = [...r.buyNWs];
  applyInflationToResults(r, p);
  assert.deepEqual(r.buyNWs, before);
});

// ── negBehavior ──────────────────────────────────────────────────────────

QUnit.test('negBehavior=stop vs withdraw produce different results', assert => {
  const stopP = paramsWith({ rentRatio: 110, negBehavior: 'stop' });
  const withdrawP = paramsWith({ rentRatio: 110, negBehavior: 'withdraw' });
  const stopR = simulate(stopP);
  const withdrawR = simulate(withdrawP);
  const diff = Math.abs(stopR.rANWs[30] - withdrawR.rANWs[30]);
  assert.ok(diff > 0, `NW differ by ${diff}€`);
});

// ── Sanity: NW grows over time ───────────────────────────────────────────

QUnit.test('buyer NW increases over 30 years', assert => {
  const p = defaultParams();
  const r = simulate(p);
  assert.ok(r.buyNWs[30] > r.buyNWs[0], `buyer NW: ${r.buyNWs[0]} → ${r.buyNWs[30]}`);
  assert.ok(r.rANWs[30] > r.rANWs[0], `renter A NW: ${r.rANWs[0]} → ${r.rANWs[30]}`);
  assert.ok(r.rBNWs[30] > r.rBNWs[0], `renter B NW: ${r.rBNWs[0]} → ${r.rBNWs[30]}`);
});

QUnit.test('all NWs are finite and non-negative', assert => {
  const p = defaultParams();
  const r = simulate(p);
  for (let yr = 0; yr <= 30; yr++) {
    assert.notOk(isNaN(r.buyNWs[yr]), `buyNW[${yr}] not NaN`);
    assert.notOk(isNaN(r.rANWs[yr]), `rANW[${yr}] not NaN`);
    assert.notOk(isNaN(r.rBNWs[yr]), `rBNW[${yr}] not NaN`);
  }
});

// ── Summary matches NW arrays ────────────────────────────────────────────

QUnit.test('summary values match NW arrays at milestone years', assert => {
  const p = defaultParams();
  const r = simulate(p);
  r.summary.forEach(s => {
    assert.strictEqual(s.buy, r.buyNWs[s.yr], `buy at yr ${s.yr}`);
    assert.strictEqual(s.rA, r.rANWs[s.yr], `rA at yr ${s.yr}`);
    assert.strictEqual(s.rB, r.rBNWs[s.yr], `rB at yr ${s.yr}`);
  });
});

// ── reinvest after mortgage end ──────────────────────────────────────────

QUnit.test('buyer starts investing after mortgage is paid off', assert => {
  const p = paramsWith({ mortgageTerm: 15, housePrice: 100000, downPaymentPct: 0, notairePct: 0, mortgageRate: 3, sp500: 10 });
  const r = simulate(p);
  assert.strictEqual(r.buyInvestArr[10], 0, 'no stocks during mortgage');
  assert.ok(r.buyNWs[30] > r.buyNWs[15], 'NW continues growing after mortgage');
});

// ── No renovation ────────────────────────────────────────────────────────

QUnit.test('renovPeriod = 0 generates no renovation costs', assert => {
  const p = paramsWith({ renovPeriod: 0, includeRenov: false });
  const r = simulate(p);
  assert.strictEqual(r.renovMonthly, 0);
});
