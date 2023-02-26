function getAvg(arr: number[]) {
  const total = arr.reduce((acc, c) => acc + c, 0);
  return total / arr.length;
}

function getSum(arr: number[]) {
  return arr.reduce((acc, c) => acc + c, 0);
}

const calculateTrendline = function (data: number[][], xKey: number, yKey: number) {
  const xData: number[] = data.map((value) => value[xKey]);
  const yData: number[] = data.map((value) => value[yKey]);

  const xMean = getAvg(xData);
  const yMean = getAvg(yData);

  const xMinusxMean = xData.map((val) => val - xMean);
  const yMinusyMean = yData.map((val) => val - yMean);

  const xMinusxMeanSq = xMinusxMean.map((val) => val ** 2);

  const xy = [];
  for (let x = 0; x < data.length; x += 1) {
    xy.push(xMinusxMean[x] * yMinusyMean[x]);
  }

  const xySum = getSum(xy);

  const b1 = xySum / getSum(xMinusxMeanSq);
  const b0 = yMean - b1 * xMean;

  return {
    slope: b1,
    yStart: b0,
    calcY: (x: number) => b0 + b1 * x,
  };
};

export default calculateTrendline;
