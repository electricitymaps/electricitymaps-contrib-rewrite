import generateTopos from './generateTopos';
import zonesConfig from '../../../../config/zones.json';

export const generateMapStyle = (): mapboxgl.Style => {
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

  Object.keys(zonesConfig).forEach((key) => {
    const zone = {};
    console.log('sda', key);
    const zoneConfig = zonesConfig[key];
    if (!geographies[key]) {
      return;
    }
    zone.geography = geographies[key];
    zone.config = {};
    Object.keys(TIME).forEach((agg) => {
      zone[TIME[agg]] = { details: [], overviews: [], isExpired: true };
    });
    console.log('sfd');
    zone.config.capacity = zoneConfig.capacity;
    zone.config.contributors = zoneConfig.contributors;
    zone.config.timezone = zoneConfig.timezone;
    // hasParser is true if parser exists, or if estimation method exists
    zone.config.hasParser = zoneConfig.parsers?.production !== undefined || zoneConfig.estimation_method !== undefined;
    zone.config.delays = zoneConfig.delays;
    zone.config.disclaimer = zoneConfig.disclaimer;
    zone.config.countryCode = key;

    zones[key] = zone;
  });

  const zoneValues = Object.values(zones);

  const features = zoneValues.map((zone, i) => {
    // Map a country view of all zones with "subZoneNames" to the aggregated view
    // if (isAggregateEnabled && zone.geography.properties.isAggregatedView) {
    if (true) {
      const length = (coordinate: string | any[]) => (coordinate ? coordinate.length : 0);
      const zoneId = zone.config.countryCode;
      console.log('zone', zone);
      return {
        type: 'Feature',
        geometry: {
          ...zone.geography.geometry,
          coordinates: zone.geography.geometry.coordinates.filter(length), // Remove empty geometries
        },
        id: i, // assign an integer id so the feature can be updated later on
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
        id: i, // assign an integer id so the feature can be updated later on
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
    // TODO: Clean up further
    zonesClickable: {
      type: 'FeatureCollection',
      features,
    },
  };
  // TODO: `zoneValues` will change even in cases where the geometry doesn't change.
  // This will cause this memo to re-update although it should only update when the
  // geometry changes. This will slow down the map render..
};
