import generateTopos from 'features/map/map-utils/generateTopos';

import { featureCollection } from '@turf/turf';
import { MapGeometries } from 'types';

export const getGeometries = (): MapGeometries => {
  const geographies = generateTopos();

  return featureCollection(zones);
};
