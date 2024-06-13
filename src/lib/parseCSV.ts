
export const parseCSVData = (csv: string) => {
  const lines = csv.split('\n');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    if (line.length < 7) continue; // Skip incomplete lines

    const [date, open, high, low, close] = line;
    result.push({
      x: new Date(date).getTime(),
      y: [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close)]
    });
  }

  return result;
};
