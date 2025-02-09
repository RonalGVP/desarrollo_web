// utils/regression.js

// Función para calcular la regresión lineal (Y = mX + b)
export const calculateRegressionLine = (xData, yData) => {
    const n = xData.length;
    const sumX = xData.reduce((a, b) => a + b, 0);
    const sumY = yData.reduce((a, b) => a + b, 0);
    const sumXY = xData.reduce((acc, x, i) => acc + x * yData[i], 0);
    const sumX2 = xData.reduce((acc, x) => acc + x * x, 0);
  
    // Calculando la pendiente (m) y la intersección (b)
    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;
  
    // Generando la línea de regresión para cada valor X
    const regressionLine = xData.map(x => m * x + b);
  
    return { slope: m, intercept: b, regressionLine };
  };
  