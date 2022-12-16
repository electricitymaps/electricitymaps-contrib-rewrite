import { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRefWidthHeightObserver as useReferenceWidthHeightObserver } from './hooks';
import { useGetWind } from 'api/getWeatherData';
import { useAtom } from 'jotai';
import { MapboxMap } from 'react-map-gl';
import { selectedDatetimeIndexAtom, windLayerAtom } from 'utils/state/atoms';
import Windy from './windy';
import { ToggleOptions } from 'utils/constants';

const createWindy = async (canvas: HTMLCanvasElement, data: any, map: MapboxMap) => {
  return await new Windy({
    canvas,
    data,
    map,
  });
};

export default function WindLayer({
  map,
  isMoving,
}: {
  map?: MapboxMap;
  isMoving: boolean;
}) {
  const [windy, setWindy] = useState(null);
  const { ref, width, height, node } = useReferenceWidthHeightObserver();
  const viewport = useMemo(() => {
    const sw = map?.unproject([0, height]);
    const ne = map?.unproject([width, 0]);
    const swArray = [sw?.lng, sw?.lat];
    const neArray = [ne?.lng, ne?.lat];
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
  const { data: windData, isSuccess } = useGetWind();
  const [windLayerToggle] = useAtom(windLayerAtom);
  const isWindLayerEnabled =
    windLayerToggle === ToggleOptions.ON && selectedDatetime.index === 24;
  const isVisible = isSuccess && !isMoving && isWindLayerEnabled;

  useEffect(() => {
    if (!windy && isVisible && node && isWindLayerEnabled && windData) {
      createWindy(node, windData, map!).then((w) => {
        w.start(...viewport);
        setWindy(w);
      });
    } else if (!isVisible && windy) {
      windy.stop();
      setWindy(null);
    }
  }, [isVisible, isSuccess, node, windy, viewport]);

  return (
    <canvas
      className={`pointer-events-none absolute h-full w-full duration-300 ${
        // Using display: none here will cause the observer to return width and height of 0
        // so instead we use opacity which can also be transitioned nicely
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      id="wind"
      width={width}
      height={height}
      ref={ref}
    />
  );
}
