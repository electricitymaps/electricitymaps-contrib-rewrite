import Head from 'components/Head';
import LoadingOrError from 'components/LoadingOrError';
import { ReactElement, useMemo } from 'react';
import useGetState from 'api/getState';
import { TimeAverages } from 'types';
import { Map, Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { generateMapStyle } from './map-utils/generateMapStyle';
import { useCo2ColorScale, useTheme } from '../../hooks/theme';
import { FillPaint } from 'mapbox-gl';

const mapStyle = { version: 8, sources: {}, layers: [] };

export default function MapPage(): ReactElement {
  const theme = useTheme();

  // Calculate layer styles only when the theme changes
  // To keep the stable and prevent excessive rerendering.
  const styles = useMemo(
    () => ({
      hover: { 'fill-color': 'white', 'fill-opacity': 0.3 },
      ocean: { 'background-color': theme.oceanColor },
      zonesBorder: { 'line-color': theme.strokeColor, 'line-width': theme.strokeWidth },
      zonesClickable: {
        'fill-color': ['coalesce', ['feature-state', 'color'], ['get', 'color'], theme.clickableFill],
      } as FillPaint,
    }),
    [theme]
  );

  const { isLoading, isError, error, data } = useGetState(TimeAverages.HOURLY);

  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />;
  }
  // console.log('data', data);
  const zonesClickable = data;
  // console.log('zonesClickable', zonesClickable);

  const southernLattitudeBound = -62.947_193;
  const northernLattitudeBound = 84.613_245;

  return (
    <>
      <Head title="Vitamin" />
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 2,
        }}
        minZoom={0.7}
        maxBounds={[
          [Number.NEGATIVE_INFINITY, southernLattitudeBound],
          [Number.POSITIVE_INFINITY, northernLattitudeBound],
        ]}
        mapLib={maplibregl}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={mapStyle as mapboxgl.Style}
      >
        <Layer id="ocean" type="background" paint={styles.ocean} />
        <Source id="zones-clickable" generateId type="geojson" data={data}>
          <Layer id="zones-clickable-layer" type="fill" paint={styles.zonesClickable} />
          <Layer id="zones-border" type="line" paint={styles.zonesBorder} />
          {/* Note: if stroke width is 1px, then it is faster to use fill-outline in fill layer */}
        </Source>
        <Source type="geojson" data={zonesClickable}>
          <Layer id="hover" type="fill" paint={styles.hover} filter={['hoverFilter //TODO']} />
        </Source>
      </Map>

      <div className="m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]">
        {/* {Object.entries(data.countries).map(([zoneKey, zoneOverviews]) =>
          zoneOverviews.length > 0 ? <li key={zoneKey}>{zoneOverviews[0].co2intensity}</li> : undefined
        )} */}
      </div>
    </>
  );
}
