export function classNamesModule(styles, ...classes) {
  return classes
    .map((cls) => {
      if (typeof cls === 'string') {
        return styles[cls] || cls; // Si existe en styles, usarlo; si no, dejarlo como string
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
