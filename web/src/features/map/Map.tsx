import Head from 'components/Head';
import LoadingOrError from 'components/LoadingOrError';
import { FillPaint } from 'mapbox-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { Layer, Map, Source } from 'react-map-gl';
import { useCo2ColorScale, useTheme } from '../../hooks/theme';

import useGetState from 'api/getState';
import { useAtom } from 'jotai';
import { TimeAverages } from 'utils/constants';
import { getCO2IntensityByMode } from 'utils/helpers';
import { selectedDatetimeIndexAtom, timeAverageAtom } from 'utils/state';
import { getGeometries } from './map-utils/getMapGrid';

const mapStyle = { version: 8, sources: {}, layers: [] };

export default function MapPage(): ReactElement {
  console.log('Render');

  const [timeAverage] = useAtom(timeAverageAtom);
  const [datetimeIndex] = useAtom(selectedDatetimeIndexAtom);

  const typedTimeAverage = timeAverage as TimeAverages;
  const getCo2colorScale = useCo2ColorScale();

  const theme = useTheme();
  // Calculate layer styles only when the theme changes
  // To keep the stable and prevent excessive rerendering.
  const styles = useMemo(
    () => ({
      hover: { 'fill-color': 'white', 'fill-opacity': 0.3 },
      ocean: { 'background-color': theme.oceanColor },
      zonesBorder: { 'line-color': theme.strokeColor, 'line-width': theme.strokeWidth },
      zonesClickable: {
        'fill-color': [
          'coalesce',
          ['feature-state', 'color'],
          ['get', 'color'],
          theme.clickableFill,
        ],
      } as FillPaint,
    }),
    [theme]
  );

  const { isLoading, isError, error, data } = useGetState(typedTimeAverage);
  const spatialAggregation = 'zone';
  const mapReference = useRef(null);

  const geometries = useMemo(() => getGeometries(), [spatialAggregation]);

  useEffect(() => {
    const map = mapReference?.current?.getMap();
    if (!map || isLoading || isError) {
      return;
    }

    if (!data.data) {
      return;
    }

    for (const [index, feature] of geometries.features.entries()) {
      const { zoneId } = feature.properties;
      const zone = data.data?.zones[zoneId];

      const co2intensity =
        zone && zone[datetimeIndex]
          ? getCO2IntensityByMode(zone[datetimeIndex], 'consumption')
          : undefined;

      const fillColor = getCo2colorScale(co2intensity);

      const existingColor = map.getFeatureState(
        { source: 'zones-clickable', id: index },
        'color'
      );

      if (existingColor !== fillColor) {
        map.setFeatureState(
          {
            source: 'zones-clickable',
            id: index,
          },
          {
            color: fillColor,
          }
        );
      }
    }
  }, [mapReference, geometries, data, getCo2colorScale, datetimeIndex]);

  if (isLoading || isError) {
    if (error) {
      console.error(error);
    }

    return <LoadingOrError error={error as Error} />;
  }

  const southernLatitudeBound = -62.947_193;
  const northernLatitudeBound = 84.613_245;

  return (
    <>
      <Head title="Electricity Maps" />
      <Map
        ref={mapReference}
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 2,
        }}
        minZoom={0.7}
        maxBounds={[
          [Number.NEGATIVE_INFINITY, southernLatitudeBound],
          [Number.POSITIVE_INFINITY, northernLatitudeBound],
        ]}
        mapLib={maplibregl}
        style={{ minWidth: '100vw', height: '100vh' }}
        mapStyle={mapStyle as mapboxgl.Style}
      >
        <Layer id="ocean" type="background" paint={styles.ocean} />
        <Source id="zones-clickable" generateId type="geojson" data={geometries}>
          <Layer id="zones-clickable-layer" type="fill" paint={styles.zonesClickable} />
          <Layer id="zones-border" type="line" paint={styles.zonesBorder} />
          {/* Note: if stroke width is 1px, then it is faster to use fill-outline in fill layer */}
        </Source>
        <Source type="geojson" data={geometries}>
          <Layer
            id="hover"
            type="fill"
            paint={styles.hover}
            filter={['hoverFilter //TODO']}
          />
        </Source>
      </Map>
    </>
  );
}
