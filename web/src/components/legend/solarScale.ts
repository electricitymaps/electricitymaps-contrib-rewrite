import { scaleLinear } from 'd3-scale';

export const solarColor = scaleLinear<string>()
  .domain([0, 500, 1000])
  .range(['black', 'transparent', 'gold'])
  .clamp(true);
