var colors = {
  yellow1: 'rgb(230, 195, 130)',
  yellow2: 'rgb(232, 193, 121)',
  purple1: 'rgb(134, 100, 145)',
  purple2: 'rgb(75, 54, 82)'
};

const scales = {
  x: {
    ticks: {
      align: 'center',
      color: colors.purple1
    },
    border: {
      display: false
    },
    grid: {
      display: false
    }
  },
  y: {
    position: 'right',
    ticks: {
      color: colors.purple1
    },
    border: {
      display: false
    },
    grid: {
      color: colors.purple2
    },
    max: 30
  }
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: 12
  },
  scales: scales,
  fill: false,
  radius: 0,
  borderWidth: 1,
  borderColor: colors.yellow1
};


export default options;