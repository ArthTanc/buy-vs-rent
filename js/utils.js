const fmtK = v => {
  const a = Math.abs(v), s = v < 0 ? '−' : '';
  if (a >= 1e6) return `${s}${(a/1e6).toFixed(2)}M€`;
  if (a >= 1e3) return `${s}${Math.round(a/1000)}k€`;
  return `${s}${Math.round(a)}€`;
};
const fmtN = v => {
  const a = Math.abs(v), s = v < 0 ? '−' : '';
  return `${s}${Math.round(a).toLocaleString('fr-FR')} €`;
};
const pct = v => `${v.toFixed(1)}%`;

function getMilestones(h) {
  const raw = [h*0.35, h*0.55, h*0.75, h];
  const snapped = raw.map(v => Math.max(1, Math.min(50, Math.round(v / 5) * 5 || 1)));
  return [...new Set(snapped)];
}
