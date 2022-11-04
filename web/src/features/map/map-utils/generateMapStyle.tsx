import generateTopos from './generateTopos';
import config from '../../../../config/zones.json';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Property } from 'maplibre-gl';
import { Zones, GenerationTypes } from 'types';

export interface MapZone {
  geography: any;
  config: any;
  hourly: any;
  daily: any;
  monthly: any;
  yearly: any;
}

type z = typeof config;

export type ZoneConfigTypes = {
  [key in keyof z]: {
    disclaimer?: string;
    estimation_method?: string;
    delays?: any;
    bounding_box?: number[][];
    capacity?: GenerationTypes;
    contributors?: string[];
    timezone?: Date | string | null;
    flag_file_name?: string;
    parsers?: any;
  };
};

export const combineZoneData = (zoneData: any, aggregate: any) => {
  // Combines details and overviews and other relevant keys
  // From zoneData for a specific aggregate into a single object
  const { overviews, details, hasData } = zoneData[aggregate];
  const { hasParser } = zoneData.config;
  const { center } = zoneData.geography.properties;

  if (overviews.length === 0) {
    // If there is no data available return one entry with static data
    return [{ hasData, hasParser, center }];
  }

  const combined = overviews.map((overview: any, index: any) => {
    return { ...overview, ...details[index], hasParser, center };
  });

  return combined;
};

export const generateMapStyle = (data: any): FeatureCollection<Geometry, GeoJsonProperties> => {
  const mapStyle: mapboxgl.Style = {
    version: 8,
    sources: {},
    layers: [],
  };
  const TIME = {
    HOURLY: 'hourly',
    DAILY: 'daily',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
  };

  const geographies = generateTopos();

  const zones = {};
  const selectedTimeAggregate = 'hourly';

  const zonesConfig: ZoneConfigTypes = config;

  const keys = Object.keys(zonesConfig) as Array<keyof ZoneConfigTypes>;

  for (const key of keys) {
    const zone: MapZone = {
      geography: undefined,
      config: undefined,
      hourly: undefined,
      daily: undefined,
      monthly: undefined,
      yearly: undefined,
    };
    const zoneConfig = zonesConfig[key];
    if (!geographies[key]) {
      continue;
    }
    zone.geography = geographies[key];
    zone.config = {};
    for (const agg of Object.keys(TIME) as Array<keyof typeof TIME>) {
      zone[TIME[agg] as keyof MapZone] = { details: [], overviews: [], isExpired: true };
    }

    zone.config.capacity = zoneConfig.capacity;
    zone.config.contributors = zoneConfig.contributors;
    zone.config.timezone = zoneConfig.timezone;
    // HasParser is true if parser exists, or if estimation method exists
    zone.config.hasParser = zoneConfig.parsers?.production !== undefined || zoneConfig.estimation_method !== undefined;
    zone.config.delays = zoneConfig.delays;
    zone.config.disclaimer = zoneConfig.disclaimer;
    zone.config.countryCode = key;
    // Console.log('dsfs', data?.countries);
    // Zone.hourly = data?.countries[key].length > 0 ? data.countries[key][24] : undefined;
    // Console.log('dsfs', zone.hourly, data?.countries['AR'][24]);
    //Needs refactoring to type this
    zones[key] = zone;
  }

  const zoneValues = Object.values(zones);
  console.log('zones', zones);

  const features = zoneValues.map((zone, index) => {
    // Map a country view of all zones with "subZoneNames" to the aggregated view
    // If (isAggregateEnabled && zone.geography.properties.isAggregatedView) {
    if (true) {
      const length = (coordinate: string | any[]) => (coordinate ? coordinate.length : 0);
      const zoneId = zone.config.countryCode;

      return {
        type: 'Feature',
        geometry: {
          ...zone.geography.geometry,
          coordinates: zone.geography.geometry.coordinates.filter(length), // Remove empty geometries
        },
        id: index, // Assign an integer id so the feature can be updated later on
        properties: {
          color: undefined,
          zoneData: zone[selectedTimeAggregate].overviews,
          zoneId,
        },
      };
    }
    // Map zone view of all zones and exclude countries that are combined from subzones
    if (!isAggregateEnabled && !zone.geography.properties.isCombined) {
      const length = (coordinate) => (coordinate ? coordinate.length : 0);
      const zoneId = zone.config.countryCode;
      return {
        type: 'Feature',
        geometry: {
          ...zone.geography.geometry,
          coordinates: zone.geography.geometry.coordinates.filter(length), // Remove empty geometries
        },
        id: index, // Assign an integer id so the feature can be updated later on
        properties: {
          color: undefined,
          zoneData: zone[selectedTimeAggregate].overviews,
          zoneId,
        },
      };
    }
    if (!zone.geography.properties.aggregatedView) {
      return {};
    }
  });

  return {
    type: 'FeatureCollection',
    features,
  };
  // TODO: `zoneValues` will change even in cases where the geometry doesn't change.
  // This will cause this memo to re-update although it should only update when the
  // Geometry changes. This will slow down the map render..
};
