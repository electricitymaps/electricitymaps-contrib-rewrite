import { useState, useEffect, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useRefWidthHeightObserver as useReferenceWidthHeightObserver } from './hooks';

import Windy from './windy';
import { useInterpolatedWindData } from '../hooks';
import { useAtom } from 'jotai';
import { selectedDatetimeIndexAtom } from 'utils/state/atoms';
import { useGetWind } from 'api/getWeatherData';
import { MapboxMap } from 'react-map-gl';

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
    return null;
  }
  map.on('click', function (e) {
    // When the map is clicked, get the geographic coordinate.
    const coordinate = map.unproject(e.point);
    console.log('Does this work?', coordinate);
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
    return null;
  }
  const interpolatedData = isSuccess ? useInterpolatedWindData(windData) : undefined;
  console.log('interpolatedData', interpolatedData);
  const enabled = true;

  const isMapLoaded = map?.loaded();
  const isVisible = isSuccess; //enabled && isMapLoaded && !isMoving;

  if (!windy && isVisible && node && interpolatedData) {
    console.log('viewport', viewport);
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
  console.log('windy', windy);
  return (
    <CSSTransition in={true} timeout={300}>
      <canvas
        className="pointer-none z-500 absolute top-0 left-0 flex h-full w-full"
        id="wind"
        width="100%"
        height="100%"
        ref={ref}
      />
    </CSSTransition>
  );
}
