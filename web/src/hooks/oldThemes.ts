enum step {
  ZERO = 0,
  TWO_HUNDRED = 200,
  FOUR_HUNDRED = 400,
  SIX_HUNDRED = 600,
  EIGHT_HUNDRED = 800,
}

const steps = [step.ZERO, step.TWO_HUNDRED, step.FOUR_HUNDRED, step.SIX_HUNDRED, step.EIGHT_HUNDRED];

export const themes = {
  colorblindDark: {
    co2Scale: {
      steps,
      colors: ['#FFFFB0', '#E0B040', '#A06030', '#602020', '#000010'],
    },
    oceanColor: '#33414A',
    strokeWidth: 0.3,
    strokeColor: '#6D6D6D',
    clickableFill: '#7A878D',
    nonClickableFill: '#7A878D',
  },
  dark: {
    co2Scale: {
      steps,
      colors: ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'],
    },
    oceanColor: '#33414A',
    strokeWidth: 0.3,
    strokeColor: '#6D6D6D',
    clickableFill: '#7A878D',
    nonClickableFill: '#7A878D',
  },
  colorblindBright: {
    co2Scale: {
      steps,
      colors: ['#FFFFB0', '#E0B040', '#A06030', '#602020', '#000010'],
    },
    oceanColor: '#FAFAFA',
    strokeWidth: 0.3,
    strokeColor: '#FAFAFA',
    clickableFill: '#D4D9DE',
    nonClickableFill: '#D4D9DE',
  },
  bright: {
    co2Scale: {
      steps,
      colors: ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'],
    },
    oceanColor: '#FAFAFA',
    strokeWidth: 0.3,
    strokeColor: '#FAFAFA',
    clickableFill: '#D4D9DE',
    nonClickableFill: '#D4D9DE',
  },
};
