QUnit.module('utils');

QUnit.test('fmtK — zero', assert => {
  assert.strictEqual(fmtK(0), '0€');
});

QUnit.test('fmtK — small (under 1000)', assert => {
  assert.strictEqual(fmtK(500), '500€');
  assert.strictEqual(fmtK(999), '999€');
  assert.strictEqual(fmtK(1), '1€');
});

QUnit.test('fmtK — thousands', assert => {
  assert.strictEqual(fmtK(1500), '2k€');
  assert.strictEqual(fmtK(1000), '1k€');
  assert.strictEqual(fmtK(499_999), '500k€');
  assert.strictEqual(fmtK(500_001), '500k€');
});

QUnit.test('fmtK — millions', assert => {
  assert.strictEqual(fmtK(1_000_000), '1.00M€');
  assert.strictEqual(fmtK(1_500_000), '1.50M€');
  assert.strictEqual(fmtK(12_340_000), '12.34M€');
});

QUnit.test('fmtK — negative values', assert => {
  assert.strictEqual(fmtK(-500), '−500€');
  assert.strictEqual(fmtK(-1500), '−2k€');
  assert.strictEqual(fmtK(-1_000_000), '−1.00M€');
});

QUnit.test('fmtN — zero', assert => {
  assert.strictEqual(fmtN(0), '0 €');
});

QUnit.test('fmtN — basic formatting with French locale', assert => {
  const result = fmtN(1234567);
  assert.ok(result.includes('€'), 'contains euro symbol');
  assert.ok(result.includes('1'), 'contains digits');
  assert.notOk(result.includes('NaN'), 'no NaN');
});

QUnit.test('fmtN — negative', assert => {
  const result = fmtN(-5000);
  assert.ok(result.startsWith('−'), 'starts with minus sign');
});

QUnit.test('pct — formatting', assert => {
  assert.strictEqual(pct(0), '0.0%');
  assert.strictEqual(pct(10.5), '10.5%');
  assert.strictEqual(pct(3.14159), '3.1%');
  assert.strictEqual(pct(100), '100.0%');
});

QUnit.test('getMilestones — horizon 30', assert => {
  const m = getMilestones(30);
  assert.deepEqual(m, [10, 15, 25, 30]);
});

QUnit.test('getMilestones — deduplication', assert => {
  const m = getMilestones(10);
  assert.strictEqual(new Set(m).size, m.length, 'no duplicates');
  assert.ok(m.length <= 4);
});

QUnit.test('getMilestones — values clamped to [1, 50]', assert => {
  const m = getMilestones(5);
  m.forEach(v => {
    assert.ok(v >= 1, `milestone ${v} >= 1`);
    assert.ok(v <= 50, `milestone ${v} <= 50`);
  });
});

QUnit.test('getMilestones — horizon 50', assert => {
  const m = getMilestones(50);
  m.forEach(v => assert.ok(v <= 50));
});
