export function generateRacerWinLikelihoodCalculator(): (
  callback: (likelihood: number) => void
) => void {
  const delay: number = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning: number = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
}
