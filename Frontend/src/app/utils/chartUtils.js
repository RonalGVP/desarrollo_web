export const getChartOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
    },
  },
});