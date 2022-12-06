import type { Meta, StoryObj } from '@storybook/react';
import BarBreakdownProductionChart from 'features/charts/bar-breakdown/BarBreakdownProductionChart';

const meta: Meta<typeof BarBreakdownProductionChart> = {
  title: 'charts/BarBreakdownProductionChart',
  component: BarBreakdownProductionChart,
};

type Story = StoryObj<typeof BarBreakdownProductionChart>;

const data = {
  co2intensity: 187.32,
  co2intensityProduction: 190.6,
  countryCode: 'PT',
  fossilFuelRatio: 0.3,
  fossilFuelRatioProduction: 0.3,
  renewableRatio: 0.7,
  renewableRatioProduction: 0.7,
  stateDatetime: '2022-11-28T07:00:00.000Z',
  _isFinestGranularity: true,
  capacity: {
    'battery storage': null,
    biomass: 700,
    coal: 0,
    gas: 4520,
    geothermal: 0,
    hydro: 4578,
    'hydro storage': 3585,
    nuclear: 0,
    oil: 0,
    solar: 1616,
    unknown: null,
    wind: 5389,
  },
  dischargeCo2Intensities: {
    battery: 136.442_667_362_438_53,
    hydro: 136.442_667_362_438_53,
  },
  dischargeCo2IntensitySources: {
    battery: 'electricityMap, 2021 average',
    hydro: 'electricityMap, 2021 average',
  },
  exchange: { ES: -934 },
  exchangeCapacities: {},
  exchangeCo2Intensities: { ES: 187.32 },
  isValid: true,
  maxCapacity: 5389,
  maxDischarge: 395,
  maxExport: 934,
  maxImport: 0,
  maxProduction: 2365,
  maxStorage: 0,
  maxStorageCapacity: 3585,
  price: { currency: 'EUR', value: 120 },
  production: {
    biomass: 350,
    coal: 0,
    gas: 1930,
    geothermal: null,
    hydro: 1445,
    nuclear: null,
    oil: null,
    solar: 17,
    unknown: 29,
    wind: 2365,
  },
  productionCo2Intensities: {
    biomass: 439.145_806,
    coal: 1099.976_527,
    gas: 492.109_361,
    geothermal: 38,
    hydro: 10.7,
    nuclear: 5.13,
    oil: 1124.903_938,
    solar: 25.6,
    unknown: 700,
    wind: 12.62,
  },
  productionCo2IntensitySources: {
    biomass: 'EU-ETS, ENTSO-E 2021',
    coal: 'eGrid 2020; Oberschelp, Christopher, et al. "Global emission hotspots of coal power generation."',
    gas: 'IPCC 2014; EU-ETS, ENTSO-E 2021',
    geothermal: 'IPCC 2014',
    hydro: 'UNECE 2022',
    nuclear: 'UNECE 2022',
    oil: 'IPCC 2014; EU-ETS, ENTSO-E 2021',
    solar: 'INCER ACV',
    unknown: 'assumes thermal (coal, gas, oil or biomass)',
    wind: 'UNECE 2022, WindEurope "Wind energy in Europe, 2021 Statistics and the outlook for 2022-2026" Wind Europe Proceedings (2021)',
  },
  source: ['entsoe.eu'],
  storage: { battery: null, hydro: -395 },
  totalCo2Discharge: 53_894_853.608_163_215,
  totalCo2Export: 174_956_880,
  totalCo2Import: 0,
  totalCo2NetExchange: -174_956_880,
  totalCo2Production: 1_169_515_098.83,
  totalCo2Storage: 0,
  totalConsumption: 5597,
  totalDischarge: 395,
  totalExport: 934,
  totalImport: 0,
  totalProduction: 6136,
  totalStorage: 0,
  hasParser: true,
  center: [-7.8, 39.6],
};

const productionData = [
  { isStorage: false, production: null, capacity: 0, mode: 'nuclear', tCo2eqPerMin: 0 },
  {
    isStorage: false,
    production: null,
    capacity: 0,
    mode: 'geothermal',
    tCo2eqPerMin: 0,
  },
  {
    isStorage: false,
    production: 350,
    capacity: 700,
    mode: 'biomass',
    tCo2eqPerMin: 2.561_683_868_333_333,
  },
  { isStorage: false, production: 0, capacity: 0, mode: 'coal', tCo2eqPerMin: 0 },
  {
    isStorage: false,
    production: 2365,
    capacity: 5389,
    mode: 'wind',
    tCo2eqPerMin: 0.497_438_333_333_333_3,
  },
  {
    isStorage: false,
    production: 17,
    capacity: 1616,
    mode: 'solar',
    tCo2eqPerMin: 0.007_253_333_333_333_333,
  },
  {
    isStorage: false,
    storage: -395,
    production: 1445,
    capacity: 4578,
    mode: 'hydro',
    tCo2eqPerMin: 0.257_691_666_666_666_65,
  },
  {
    isStorage: true,
    storage: -395,
    production: 1445,
    capacity: 3585,
    mode: 'hydro storage',
    tCo2eqPerMin: -0.898_247_560_136_053_7,
  },
  {
    isStorage: true,
    storage: null,
    capacity: null,
    mode: 'battery storage',
    tCo2eqPerMin: 0,
  },
  {
    isStorage: false,
    production: 1930,
    capacity: 4520,
    mode: 'gas',
    tCo2eqPerMin: 15.829_517_778_833_331,
  },
  { isStorage: false, production: null, capacity: 0, mode: 'oil', tCo2eqPerMin: 0 },
  {
    isStorage: false,
    production: 29,
    capacity: null,
    mode: 'unknown',
    tCo2eqPerMin: 0.338_333_333_333_333_3,
  },
];

const exchangeData = [
  { exchange: -934, mode: 'ES', gCo2eqPerkWh: 187.32, tCo2eqPerMin: -2.915_948 },
  { exchange: 200, mode: 'FR', gCo2eqPerkWh: 999.32, tCo2eqPerMin: 45.915_948 },
];

export const IncludesStorage: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    //testId: 'none',
    data: data,
    productionData: productionData,
    exchangeData: exchangeData,
    onExchangeRowMouseOut: () => {},
    onExchangeRowMouseOver: () => {},
    onProductionRowMouseOut: () => {},
    onProductionRowMouseOver: () => {},
    width: 300,
    height: 300,
    isMobile: false,
  },
};

export default meta;
