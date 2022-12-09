import { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useRefWidthHeightObserver as useReferenceWidthHeightObserver } from './hooks';

import { useGetWind } from 'api/getWeatherData';
import { useAtom } from 'jotai';
import { MapboxMap } from 'react-map-gl';
import { selectedDatetimeIndexAtom } from 'utils/state/atoms';
import { useInterpolatedWindData } from '../hooks';
import Windy from './windy';

export default function WindLayer({
  map,
  isMoving,
}: {
  map?: MapboxMap;
  isMoving: boolean;
}) {
  const [windy, setWindy] = useState(null);
  const { ref, width, height, node } = useReferenceWidthHeightObserver();
  if (!map || !map.unproject || !map.project) {
    // TODO: handle
  }
  map.on('click', function (e) {
    // When the map is clicked, get the geographic coordinate.
    const coordinate = map.unproject(e.point);
  });

  const viewport = useMemo(() => {
    const sw = map?.unproject([0, height]);
    const ne = map?.unproject([width, 0]);
    const swArray = [sw.lng, sw.lat];
    const neArray = [ne.lng, ne.lat];
    return [
      [
        [0, 0],
        [width, height],
      ],
      width,
      height,
      [swArray, neArray],
    ];
  }, [map, width, height]);
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const { data: windData, isSuccess } = useGetWind(selectedDatetime.datetimeString);
  if (!isSuccess) {
    // TODO: handle
  }
  const interpolatedData = isSuccess ? useInterpolatedWindData(windData) : undefined;
  const enabled = true;

  const isMapLoaded = map?.loaded();
  const isVisible = isSuccess && !isMoving; //enabled && isMapLoaded && !isMoving;

  useEffect(() => {
    if (!windy && isVisible && node && interpolatedData) {
      const w = new Windy({
        canvas: node,
        data: interpolatedData,
        map,
      });
      w.start(...viewport);
      // Set in the next render cycle.

      setWindy(w);
      setTimeout(() => {
        setWindy(w);
      }, 0);
    } else if (windy && !isVisible) {
      windy.stop();
      setWindy(null);
    }
  }, [windy, isVisible, map, interpolatedData, viewport, isMoving]);

  // const { ref, width, height, node } = useReferenceWidthHeightObserver();

  // = useMemo(() => {
  //   const sw = unproject([0, height]);
  //   const ne = unproject([width, 0]);
  //   return [
  //     [
  //       [0, 0],
  //       [width, height],
  //     ],
  //     width,
  //     height,
  //     [sw, ne],
  //   ];
  // }, [unproject, width, height]);

  // Kill and reinitialize Windy every time the layer visibility changes, which
  // will usually be at the beginning and the end of dragging. Windy initialization
  // is currently very slow so we take it to the next render cycle so that the
  // rendering of everything else is not blocked. This will hopefully be less
  // hacky once Windy service is merged here and perhaps optimized via WebGL.
  // See https://github.com/tmrowco/electricitymap-contrib/issues/944.

  // if (!windy && isVisible && map && interpolatedData) {
  //   const w = new Windy({
  //     canvas: node,
  //     data: interpolatedData,
  //     project,
  //     unproject,
  //   });
  //   w.start(...viewport),
  //     // Set in the next render cycle.
  //     setTimeout(() => {
  //       setWindy(w);
  //     }, 0);
  // } else if (windy && !isVisible) {
  //   windy.stop();
  //   setWindy(null);
  // }

  return (
    <CSSTransition in={true} timeout={600}>
      <canvas
        className="pointer-events-none absolute h-full w-full"
        style={{
          display: isVisible ? 'block' : 'none',
        }}
        id="wind"
        width={width}
        height={height}
        ref={ref}
      />
    </CSSTransition>
  );
}
