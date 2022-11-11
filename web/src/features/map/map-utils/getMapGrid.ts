import generateTopos from 'features/map/map-utils/generateTopos';

import { featureCollection } from '@turf/turf';

export const getGeometries = () => {
  const geographies = generateTopos();
  const zones = [];
  let index = 0;
  for (const [key, value] of Object.entries(geographies)) {
    zones.push({
      type: 'Feature',
      geometry: {
        ...value.geometry,
      },
      Id: index,
      properties: {
        id: index,
        zoneId: key,
      },
    });
    index++;
  }

  return featureCollection(zones);
};
