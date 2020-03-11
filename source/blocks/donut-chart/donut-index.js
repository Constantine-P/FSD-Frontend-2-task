import DonutChart from './scripts/DonutChart';

const donutCharts = document.querySelectorAll('.js-donut-chart');

donutCharts.forEach((donutChart) => {
  new DonutChart(donutChart, {
    donut: {
      width: 124,
      height: 130,
      radius: 57,
      strokeWidth: 6,
      gap: 2,
      animStrokeWidth: 11,
      animDuration: 200,
    },
    parts: [
      {
        value: 180,
        title: 'Великолепно',
        gradient: {
          name: 'best',
          values: [
            { offset: 0, color: '#FFE39C' },
            { offset: 100, color: '#FFBA9C' },
          ],
        },
        hoverText: '520 голосов',
      },
      {
        value: 90,
        title: 'Хорошо',
        gradient: {
          name: 'good',
          values: [
            { offset: 0, color: '#6FCF97' },
            { offset: 100, color: '#66D2EA' },
          ],
        },
        hoverText: '350 голосов',
      },
      {
        value: 90,
        title: 'Удовлетворительно',
        gradient: {
          name: 'satisfactory',
          values: [
            { offset: 0, color: '#BC9CFF' },
            { offset: 100, color: '#8BA4F9' },
          ],
        },
        hoverText: '260 голосов',
      },
      {
        value: 0,
        title: 'Разочарован',
        gradient: {
          name: 'unsatisfactory',
          values: [
            { offset: 0, color: '#919191' },
            { offset: 100, color: '#3D4975' },
          ],
        },
        hoverText: '0 голосов',
      },
    ],
    styles: {
      number: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Quicksand, OpenSans, sans-serif',
      },
      word: {
        fontSize: '15px',
        fontWeight: 'bold',
        fontFamily: 'Montserrat, OpenSans, sans-serif',
      },
    },
  });
});
