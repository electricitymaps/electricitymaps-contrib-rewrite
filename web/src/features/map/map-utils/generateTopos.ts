/* eslint-disable unicorn/no-abusive-eslint-disable */
import { merge } from 'topojson-client';
import topo from '../../../../config/world.json';

// eslint-disable-next-line unicorn/no-abusive-eslint-disable, unicorn/no-abusive-eslint-disable
/* eslint-disable */
// @ts-nocheck
const generateTopos = () => {
  const zones = {};
  Object.keys(topo.objects).forEach((k) => {
    if (!topo.objects[k].arcs) {
      return;
    }
    const geo = {
      geometry: merge(topo, [topo.objects[k]]),
      properties: topo.objects[k].properties,
    };
    // Exclude zones with null geometries.
    if (geo.geometry) {
      zones[k] = geo;
    }
  });
  return zones;
};

export default generateTopos;
