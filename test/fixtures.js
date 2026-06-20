function defaultParams() {
  return {
    housePrice:        200000,
    downPaymentPct:    10,
    notairePct:        7.5,
    mortgageRate:      3.35,
    mortgageTerm:      25,
    rentRatio:         80,
    ownerCostPct:      1.5,
    chargesBase:       100,
    chargesGrowth:     2.5,
    renovAmount:       5000,
    renovPeriod:       15,
    rentGrowth:        1.5,
    peaLimit:          150000,
    sp500:             10.5,
    houseGrowth:       2.0,
    houseGrowthMode:   'fixed',
    houseReplayYears:  20,
    savingsRate:       2.5,
    horizon:           30,
    renterInitInvest:  20000,
    includeTF:         true,
    includeEntretien:  true,
    includeAssurance:  true,
    includeRenov:      false,
    etfMode:           'fixed',
    etfReturns:        null,
    useInflation:      false,
    inflationMode:     'fixed',
    inflationRate:     2.0,
    peaFee:            0.12,
    negBehavior:       'stop',
  };
}

function paramsWith(overrides) {
  return Object.assign(defaultParams(), overrides);
}
