const HISTORICAL = {
  etfs: [
    {
      id: 'sp500',
      name: 'S&P 500',
      ticker: 'CSPX',
      pea: false,
      returns: [
        {year:2025,r:15.0},{year:2024,r:25.0},{year:2023,r:26.2},{year:2022,r:-18.1},
        {year:2021,r:28.7},{year:2020,r:18.4},{year:2019,r:31.5},{year:2018,r:-4.4},
        {year:2017,r:21.8},{year:2016,r:12.0},{year:2015,r:1.4},{year:2014,r:13.7},
        {year:2013,r:32.4},{year:2012,r:16.0},{year:2011,r:2.1},{year:2010,r:15.1},
        {year:2009,r:26.5},{year:2008,r:-37.0},{year:2007,r:5.5},{year:2006,r:15.8},
        {year:2005,r:4.9},{year:2004,r:10.9},{year:2003,r:28.7},{year:2002,r:-22.1},
        {year:2001,r:-11.9},{year:2000,r:-9.1},{year:1999,r:21.0},{year:1998,r:28.6},
        {year:1997,r:33.4},{year:1996,r:23.0},{year:1995,r:37.6},{year:1994,r:1.3},
        {year:1993,r:10.1},{year:1992,r:7.6},{year:1991,r:30.5},{year:1990,r:-3.1},
        {year:1989,r:31.7},{year:1988,r:16.6},{year:1987,r:5.2},{year:1986,r:18.7},
        {year:1985,r:31.7},{year:1984,r:6.3},{year:1983,r:22.5},{year:1982,r:21.4},
        {year:1981,r:-4.9},{year:1980,r:32.4},{year:1979,r:18.4},{year:1978,r:6.6},
        {year:1977,r:-7.2},{year:1976,r:23.8},{year:1975,r:37.2},{year:1974,r:-26.5},
        {year:1973,r:-14.7},{year:1972,r:19.0},{year:1971,r:14.3},{year:1970,r:4.0}
      ]
    },
    {
      id: 'sp500-pea',
      name: 'S&P 500 PEA',
      ticker: 'Amundi SP500',
      pea: true,
      returns: [
        {year:2025,r:14.8},{year:2024,r:24.8},{year:2023,r:26.0},{year:2022,r:-18.3},
        {year:2021,r:28.5},{year:2020,r:18.2},{year:2019,r:31.3},{year:2018,r:-4.6},
        {year:2017,r:21.6},{year:2016,r:11.8},{year:2015,r:1.2},{year:2014,r:13.5},
        {year:2013,r:32.2},{year:2012,r:15.8},{year:2011,r:1.9},{year:2010,r:14.9},
        {year:2009,r:26.3},{year:2008,r:-37.2},{year:2007,r:5.3},{year:2006,r:15.6},
        {year:2005,r:4.7},{year:2004,r:10.7},{year:2003,r:28.5},{year:2002,r:-22.3},
        {year:2001,r:-12.1},{year:2000,r:-9.3},{year:1999,r:20.8},{year:1998,r:28.4},
        {year:1997,r:33.2},{year:1996,r:22.8},{year:1995,r:37.4},{year:1994,r:1.1},
        {year:1993,r:9.9},{year:1992,r:7.4},{year:1991,r:30.3},{year:1990,r:-3.3},
        {year:1989,r:31.5},{year:1988,r:16.4},{year:1987,r:5.0},{year:1986,r:18.5},
        {year:1985,r:31.5},{year:1984,r:6.1},{year:1983,r:22.3},{year:1982,r:21.2},
        {year:1981,r:-5.1},{year:1980,r:32.2},{year:1979,r:18.2},{year:1978,r:6.4},
        {year:1977,r:-7.4},{year:1976,r:23.6},{year:1975,r:37.0},{year:1974,r:-26.7},
        {year:1973,r:-14.9},{year:1972,r:18.8},{year:1971,r:14.1},{year:1970,r:3.8}
      ]
    },
    {
      id: 'msci-world',
      name: 'MSCI World',
      ticker: 'IWDA',
      pea: false,
      returns: [
        {year:2025,r:14.0},{year:2024,r:22.5},{year:2023,r:24.0},{year:2022,r:-16.0},
        {year:2021,r:25.5},{year:2020,r:16.5},{year:2019,r:28.0},{year:2018,r:-6.5},
        {year:2017,r:20.0},{year:2016,r:10.5},{year:2015,r:-0.5},{year:2014,r:10.0},
        {year:2013,r:28.0},{year:2012,r:14.5},{year:2011,r:-2.5},{year:2010,r:13.0},
        {year:2009,r:25.0},{year:2008,r:-36.0},{year:2007,r:7.0},{year:2006,r:17.0},
        {year:2005,r:7.5},{year:2004,r:12.0},{year:2003,r:30.0},{year:2002,r:-20.0},
        {year:2001,r:-12.0},{year:2000,r:-8.0},{year:1999,r:22.0},{year:1998,r:26.0},
        {year:1997,r:30.0},{year:1996,r:18.0},{year:1995,r:32.0},{year:1994,r:5.0},
        {year:1993,r:22.0},{year:1992,r:-2.0},{year:1991,r:18.0},{year:1990,r:-16.0},
        {year:1989,r:26.0},{year:1988,r:23.0},{year:1987,r:16.0},{year:1986,r:35.0},
        {year:1985,r:28.0},{year:1984,r:4.0},{year:1983,r:22.0},{year:1982,r:10.0},
        {year:1981,r:-5.0},{year:1980,r:25.0},{year:1979,r:10.0},{year:1978,r:10.0},
        {year:1977,r:-3.0},{year:1976,r:20.0},{year:1975,r:35.0},{year:1974,r:-22.0},
        {year:1973,r:-15.0},{year:1972,r:22.0},{year:1971,r:18.0},{year:1970,r:-1.0}
      ]
    },
    {
      id: 'msci-world-pea',
      name: 'MSCI World PEA',
      ticker: 'Amundi World',
      pea: true,
      returns: [
        {year:2025,r:13.8},{year:2024,r:22.3},{year:2023,r:23.8},{year:2022,r:-16.2},
        {year:2021,r:25.3},{year:2020,r:16.3},{year:2019,r:27.8},{year:2018,r:-6.7},
        {year:2017,r:19.8},{year:2016,r:10.3},{year:2015,r:-0.7},{year:2014,r:9.8},
        {year:2013,r:27.8},{year:2012,r:14.3},{year:2011,r:-2.7},{year:2010,r:12.8},
        {year:2009,r:24.8},{year:2008,r:-36.2},{year:2007,r:6.8},{year:2006,r:16.8},
        {year:2005,r:7.3},{year:2004,r:11.8},{year:2003,r:29.8},{year:2002,r:-20.2},
        {year:2001,r:-12.2},{year:2000,r:-8.2},{year:1999,r:21.8},{year:1998,r:25.8},
        {year:1997,r:29.8},{year:1996,r:17.8},{year:1995,r:31.8},{year:1994,r:4.8},
        {year:1993,r:21.8},{year:1992,r:-2.2},{year:1991,r:17.8},{year:1990,r:-16.2},
        {year:1989,r:25.8},{year:1988,r:22.8},{year:1987,r:15.8},{year:1986,r:34.8},
        {year:1985,r:27.8},{year:1984,r:3.8},{year:1983,r:21.8},{year:1982,r:9.8},
        {year:1981,r:-5.2},{year:1980,r:24.8},{year:1979,r:9.8},{year:1978,r:9.8},
        {year:1977,r:-3.2},{year:1976,r:19.8},{year:1975,r:34.8},{year:1974,r:-22.2},
        {year:1973,r:-15.2},{year:1972,r:21.8},{year:1971,r:17.8},{year:1970,r:-1.2}
      ]
    },
    {
      id: 'cac40',
      name: 'CAC 40',
      ticker: 'EWLD',
      pea: false,
      returns: [
        {year:2025,r:12.0},{year:2024,r:18.0},{year:2023,r:19.5},{year:2022,r:-9.5},
        {year:2021,r:29.0},{year:2020,r:-7.0},{year:2019,r:26.5},{year:2018,r:-10.5},
        {year:2017,r:14.0},{year:2016,r:8.5},{year:2015,r:12.0},{year:2014,r:5.0},
        {year:2013,r:23.0},{year:2012,r:18.5},{year:2011,r:-15.0},{year:2010,r:0.0},
        {year:2009,r:26.0},{year:2008,r:-40.5},{year:2007,r:6.5},{year:2006,r:22.0},
        {year:2005,r:24.0},{year:2004,r:12.0},{year:2003,r:26.0},{year:2002,r:-30.0},
        {year:2001,r:-20.0},{year:2000,r:-5.0},{year:1999,r:35.0},{year:1998,r:32.0},
        {year:1997,r:18.0},{year:1996,r:20.0},{year:1995,r:12.0},{year:1994,r:-14.0},
        {year:1993,r:22.0},{year:1992,r:5.0},{year:1991,r:18.0},{year:1990,r:-13.0},
        {year:1989,r:31.0},{year:1988,r:34.0}
      ]
    },
    {
      id: 'cac40-pea',
      name: 'CAC 40 PEA',
      ticker: 'Amundi CAC 40',
      pea: true,
      returns: [
        {year:2025,r:11.8},{year:2024,r:17.8},{year:2023,r:19.3},{year:2022,r:-9.7},
        {year:2021,r:28.8},{year:2020,r:-7.2},{year:2019,r:26.3},{year:2018,r:-10.7},
        {year:2017,r:13.8},{year:2016,r:8.3},{year:2015,r:11.8},{year:2014,r:4.8},
        {year:2013,r:22.8},{year:2012,r:18.3},{year:2011,r:-15.2},{year:2010,r:-0.2},
        {year:2009,r:25.8},{year:2008,r:-40.7},{year:2007,r:6.3},{year:2006,r:21.8},
        {year:2005,r:23.8},{year:2004,r:11.8},{year:2003,r:25.8},{year:2002,r:-30.2},
        {year:2001,r:-20.2},{year:2000,r:-5.2},{year:1999,r:34.8},{year:1998,r:31.8},
        {year:1997,r:17.8},{year:1996,r:19.8},{year:1995,r:11.8},{year:1994,r:-14.2},
        {year:1993,r:21.8},{year:1992,r:4.8},{year:1991,r:17.8},{year:1990,r:-13.2},
        {year:1989,r:30.8},{year:1988,r:33.8}
      ]
    },
    {
      id: 'nasdaq',
      name: 'NASDAQ-100',
      ticker: 'EQQQ',
      pea: false,
      returns: [
        {year:2025,r:18.0},{year:2024,r:32.0},{year:2023,r:55.0},{year:2022,r:-33.0},
        {year:2021,r:27.0},{year:2020,r:48.0},{year:2019,r:38.0},{year:2018,r:-1.0},
        {year:2017,r:32.0},{year:2016,r:7.0},{year:2015,r:9.0},{year:2014,r:19.0},
        {year:2013,r:36.0},{year:2012,r:18.0},{year:2011,r:3.0},{year:2010,r:20.0},
        {year:2009,r:54.0},{year:2008,r:-42.0},{year:2007,r:19.0},{year:2006,r:7.0},
        {year:2005,r:2.0},{year:2004,r:10.0},{year:2003,r:50.0},{year:2002,r:-37.0},
        {year:2001,r:-33.0},{year:2000,r:-36.0},{year:1999,r:102.0},{year:1998,r:40.0},
        {year:1997,r:27.0},{year:1996,r:9.0},{year:1995,r:42.0}
      ]
    },
    {
      id: 'euro-stoxx',
      name: 'Euro Stoxx 50',
      ticker: 'C50E',
      pea: false,
      returns: [
        {year:2025,r:12.5},{year:2024,r:17.0},{year:2023,r:17.5},{year:2022,r:-10.0},
        {year:2021,r:25.0},{year:2020,r:-3.0},{year:2019,r:25.0},{year:2018,r:-11.0},
        {year:2017,r:12.0},{year:2016,r:6.0},{year:2015,r:8.0},{year:2014,r:6.0},
        {year:2013,r:22.0},{year:2012,r:17.0},{year:2011,r:-13.0},{year:2010,r:3.0},
        {year:2009,r:24.0},{year:2008,r:-39.0},{year:2007,r:9.0},{year:2006,r:18.0},
        {year:2005,r:23.0},{year:2004,r:10.0},{year:2003,r:17.0},{year:2002,r:-33.0},
        {year:2001,r:-17.0},{year:2000,r:-3.0},{year:1999,r:38.0},{year:1998,r:31.0},
        {year:1997,r:25.0},{year:1996,r:22.0},{year:1995,r:16.0}
      ]
    }
  ],
  inflation: {
    france: [
      {year:2026,r:1.8},{year:2025,r:1.8},{year:2024,r:2.0},{year:2023,r:4.9},
      {year:2022,r:5.9},{year:2021,r:2.8},{year:2020,r:0.5},{year:2019,r:1.1},
      {year:2018,r:1.8},{year:2017,r:1.2},{year:2016,r:0.3},{year:2015,r:0.0},
      {year:2014,r:0.5},{year:2013,r:1.0},{year:2012,r:2.0},{year:2011,r:2.3},
      {year:2010,r:1.7},{year:2009,r:0.1},{year:2008,r:3.2},{year:2007,r:1.6},
      {year:2006,r:1.9},{year:2005,r:1.9},{year:2004,r:2.3},{year:2003,r:2.2},
      {year:2002,r:1.9},{year:2001,r:1.8},{year:2000,r:1.8},{year:1999,r:1.1},
      {year:1998,r:0.7},{year:1997,r:1.3},{year:1996,r:2.0},{year:1995,r:1.8},
      {year:1994,r:1.7},{year:1993,r:2.1},{year:1992,r:2.4},{year:1991,r:3.2},
      {year:1990,r:3.4},{year:1989,r:3.5},{year:1988,r:2.7},{year:1987,r:3.3},
      {year:1986,r:2.7},{year:1985,r:5.8},{year:1984,r:7.4},{year:1983,r:9.6},
      {year:1982,r:12.0},{year:1981,r:13.4},{year:1980,r:13.6},{year:1979,r:10.8},
      {year:1978,r:9.1},{year:1977,r:8.3},{year:1976,r:9.2},{year:1975,r:11.8},
      {year:1974,r:13.7},{year:1973,r:7.3},{year:1972,r:6.2},{year:1971,r:5.5},
      {year:1970,r:5.9}
    ]
  }
};

function getHistoricalReturns(etfId, years) {
  const etf = HISTORICAL.etfs.find(e => e.id === etfId);
  if (!etf) return null;
  const sorted = [...etf.returns].sort((a,b) => a.year - b.year);
  const count = Math.min(years, sorted.length);
  return sorted.slice(sorted.length - count).map(d => d.r);
}

function getHistoricalInflation(years) {
  const sorted = [...HISTORICAL.inflation.france].sort((a,b) => a.year - b.year);
  const count = Math.min(years, sorted.length);
  return sorted.slice(sorted.length - count).map(d => d.r);
}

function getMaxYearsForEtf(etfId) {
  const etf = HISTORICAL.etfs.find(e => e.id === etfId);
  return etf ? etf.returns.length : 31;
}

function getMaxInflationYears() {
  return HISTORICAL.inflation.france.length;
}
