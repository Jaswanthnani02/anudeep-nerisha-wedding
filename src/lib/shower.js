// Ask the BlessingShower canvas to rain akshintalu and flowers.
// count: number of pieces; x: optional horizontal origin in px.
export function shower(detail = {}) {
  window.dispatchEvent(new CustomEvent('bless-shower', { detail }))
}
