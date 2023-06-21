export function resetRem(doc: Document, win: Window) {
  const fn = () => {
    const docEl = doc.documentElement,
      clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener('resize', fn)
  doc.addEventListener('DOMContentLoaded', fn)
}
resetRem(document, window)
