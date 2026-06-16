export function parseFraction(input: string): number {
  if (!input) return NaN;
  const trimmed = input.trim();
  
  // Handle decimals like '1.5'
  if (!trimmed.includes('/')) {
    const num = parseFloat(trimmed);
    return isNaN(num) ? NaN : num;
  }
  
  // Handle mixed numbers '1 1/2'
  if (trimmed.includes(' ')) {
    const parts = trimmed.split(' ').filter(p => p.length > 0);
    if (parts.length === 2) {
      const whole = parseFloat(parts[0]);
      const fracParts = parts[1].split('/');
      if (fracParts.length === 2) {
        const num = parseFloat(fracParts[0]);
        const den = parseFloat(fracParts[1]);
        if (!isNaN(whole) && !isNaN(num) && !isNaN(den) && den !== 0) {
          return whole + (num / den);
        }
      }
    }
    return NaN;
  }
  
  // Handle simple fractions '1/2'
  const fracParts = trimmed.split('/');
  if (fracParts.length === 2) {
    const num = parseFloat(fracParts[0]);
    const den = parseFloat(fracParts[1]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }
  
  return NaN;
}
