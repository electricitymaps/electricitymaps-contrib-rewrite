import { merge } from 'topojson-client';
import { MapGeometries } from 'types';
import topo from '../../../../config/world.json';
// TODO: Investigate if we can move this step to buildtime geo scripts
export interface TopoObject {
  type: any;
  arcs: number[][][];
  properties: {
    zoneName: string;
    countryKey: string;
    countryName?: string; //Potential bug spotted, check why aggregated view value doesn't have country name
    isAggregatedView: boolean;
    isHighestGranularity: boolean;
    center: number[];
  };
}

export interface Topo {
  type: any;
  arcs: number[][][];
  objects: {
    [key: string]: TopoObject;
  };
}

/**
 * This function takes the topojson file and converts it to a geojson file
 */
const generateTopos = (): MapGeometries => {
  const geometries: MapGeometries = { features: [], type: 'FeatureCollection' };
  const topography = topo as Topo;

  for (const k of Object.keys(topography.objects)) {
    if (!topography.objects[k].arcs) {
      continue;
    }
    const geo = {
      type: 'Feature',
      geometry: merge(topography as any, [topography.objects[k]]),
      properties: {
        zoneId: topography.objects[k].properties.zoneName,
        color: 'red',
      },
    };

    geometries.features.push(geo);
  }
  return geometries;
};

export default generateTopos;
