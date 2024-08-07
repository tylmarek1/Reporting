interface FormatNumberOps {
  decimalPlaces?: number;
}

/**
 * Metoda pro formátování čísel.
 * @param {number} entryValue - Vstupní hodnota.
 * @param {number }decimalPlaces - Počet desetinných míst.
 * @returns
 */
export function formatNumber(entryValue?: number, opts?: FormatNumberOps) {
  if (!entryValue) return "";

  const formatOpts: FormatNumberOps = { decimalPlaces: 2, ...opts };

  // ParseFloat tam je proto, ze kdyz se provede toFixed tak se vrati string, ktery se ale nesfomatuje metedou toLocaleString.
  // Formatovani pomoci toLocaleString funguje pouze na cisla.
  return parseFloat(entryValue.toFixed(formatOpts.decimalPlaces)).toLocaleString();
}

export default {
  formatNumber,
};
