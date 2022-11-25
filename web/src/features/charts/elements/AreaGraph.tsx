/* eslint-disable unicorn/no-null */
/* eslint-disable react/display-name */
import { scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';
import TimeAxis from 'features/time/TimeAxis'; // TODO: Move to a shared folder
import { useAtom } from 'jotai';
import React, { useMemo, useState } from 'react';
import { TimeAverages } from 'utils/constants';
import { selectedDatetimeIndexAtom } from 'utils/state';
import { useRefWidthHeightObserver } from 'utils/viewport';
import { getTimeScale, isEmpty } from '../graphUtils';
import { AreaGraphElement } from '../types';
import AreaGraphLayers from './AreaGraphLayers';
import GraphBackground from './GraphBackground';
import GraphHoverLine from './GraphHoverline';
import ValueAxis from './ValueAxis';

const X_AXIS_HEIGHT = 20;
const Y_AXIS_WIDTH = 40;
const Y_AXIS_PADDING = 4;

const getTotalValues = (layers: any) => {
  const values = layers
    .flatMap((layer: any) => layer.datapoints.map((d: any) => d[1]))
    .filter(() => Number.isFinite);

  return {
    min: Number.isFinite(Math.min(...values)) ? Math.min(...values) : 0,
    max: Number.isFinite(Math.max(...values)) ? Math.max(...values) : 0,
  };
};

const getValueScale = (height: number, totalValues: { min: number; max: number }) =>
  scaleLinear()
    .domain([Math.min(0, 1.1 * totalValues.min), Math.max(0, 1.1 * totalValues.max)])
    .range([height, Y_AXIS_PADDING]);

const getLayers = (
  data: AreaGraphElement[],
  layerKeys: string[],
  layerFill: (key: string) => (d: AreaGraphElement) => number,
  markerFill: (key: string) => string,
  layerStroke?: (key: string) => string
) => {
  if (!data || !data[0]) {
    return [];
  }

  const stackedData = stack<AreaGraphElement>()
    .offset(stackOffsetDiverging)
    .value((d: AreaGraphElement, key: string) => d.layerData[key] || 0) // Assign 0 if no data
    .keys(layerKeys)(data);

  return layerKeys.map((key: string, index: number) => ({
    key,
    stroke: layerStroke ? layerStroke(key) : 'none',
    fill: layerFill(key),
    markerFill: markerFill ? markerFill(key) : layerFill(key),
    datapoints: stackedData[index],
  }));
};

interface AreagraphProps {
  data: AreaGraphElement[];
  testId: string;
  layerKeys: string[];
  layerStroke?: (key: string) => string;
  layerFill: (key: string) => (d: any) => number | string;
  markerFill?: any;
  valueAxisLabel: any;
  markerUpdateHandler: any;
  markerHideHandler: any;
  isMobile: boolean;
  isOverlayEnabled: boolean;
  height: string;
  datetimes: Date[];
  selectedTimeAggregate: TimeAverages; // TODO: Graph does not need to know about this
}

function AreaGraph({
  data,
  testId,
  layerKeys,
  layerStroke,
  layerFill,
  markerFill,
  valueAxisLabel,
  markerUpdateHandler,
  markerHideHandler,
  isMobile,
  height = '10em',
  isOverlayEnabled,
  selectedTimeAggregate,
  datetimes,
}: AreagraphProps) {
  const {
    ref,
    width: containerWidth,
    height: containerHeight,
    node,
  } = useRefWidthHeightObserver(Y_AXIS_WIDTH, X_AXIS_HEIGHT);

  const [selectedDate] = useAtom(selectedDatetimeIndexAtom);

  // Build layers
  const layers = useMemo(
    () => getLayers(data, layerKeys, layerFill, markerFill, layerStroke),
    [data, layerKeys, layerStroke, layerFill, markerFill]
  );

  // Generate graph scales
  const totalValues = useMemo(() => getTotalValues(layers), [layers]);
  const valueScale = useMemo(
    () => getValueScale(containerHeight, totalValues),
    [containerHeight, totalValues]
  );
  const startTime = datetimes.at(0);
  const lastTime = datetimes.at(-1);
  const intervalMs =
    datetimes.length > 1 ? lastTime.getTime() - datetimes.at(-2).getTime() : undefined;
  // The endTime needs to include the last interval so it can be shown
  const endTime = useMemo(
    () => new Date(lastTime.getTime() + intervalMs),
    [lastTime, intervalMs]
  );
  const datetimesWithNext = useMemo(() => [...datetimes, endTime], [datetimes, endTime]);

  const timeScale = useMemo(
    () => getTimeScale(containerWidth, startTime, endTime),
    [containerWidth, startTime, endTime]
  );

  const [graphIndex, setGraphIndex] = useState(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);

  const hoverLineTimeIndex = graphIndex ?? selectedDate.index;

  // Mouse action handlers
  const mouseMoveHandler = useMemo(
    () => (timeIndex: any, layerIndex: any) => {
      setGraphIndex(timeIndex);
      if (layers.length <= 1) {
        // Select the first (and only) layer even when hovering over background
        setSelectedLayerIndex(0);
      } else {
        // use the selected layer (or undefined to hide the tooltips)
        setSelectedLayerIndex(layerIndex);
      }
    },
    [layers, setGraphIndex, setSelectedLayerIndex]
  );
  const mouseOutHandler = useMemo(
    () => () => {
      setGraphIndex(null);
      setSelectedLayerIndex(null);
    },
    [setGraphIndex, setSelectedLayerIndex]
  );

  // Don't render the graph at all if no layers are present
  if (isEmpty(layers)) {
    return null;
  }

  console.log('layers', layers[0].datapoints);

  return (
    <svg
      data-test-id={testId}
      height={height}
      ref={ref}
      style={{ overflow: 'visible', width: '100%' }}
    >
      <GraphBackground
        timeScale={timeScale}
        valueScale={valueScale}
        datetimes={datetimes}
        mouseMoveHandler={mouseMoveHandler}
        mouseOutHandler={mouseOutHandler}
        isMobile={isMobile}
        svgNode={node}
      />
      <AreaGraphLayers
        layers={layers}
        datetimes={datetimesWithNext}
        timeScale={timeScale}
        valueScale={valueScale}
        mouseMoveHandler={mouseMoveHandler}
        mouseOutHandler={mouseOutHandler}
        isMobile={isMobile}
        svgNode={node}
      />
      {!isOverlayEnabled && (
        <TimeAxis
          isLoading={false}
          selectedTimeAggregate={selectedTimeAggregate}
          datetimes={datetimesWithNext}
          scaleWidth={containerWidth}
          transform={`translate(0px, ${containerHeight}px)`}
          className="h-[22px] w-full overflow-visible opacity-50"
        />
      )}
      <ValueAxis
        scale={valueScale}
        label={valueAxisLabel}
        width={containerWidth}
        height={containerHeight}
      />
      <GraphHoverLine
        layers={layers}
        timeScale={timeScale}
        valueScale={valueScale}
        datetimes={datetimes}
        markerUpdateHandler={markerUpdateHandler}
        markerHideHandler={markerHideHandler}
        selectedLayerIndex={selectedLayerIndex}
        selectedTimeIndex={hoverLineTimeIndex}
        svgNode={node}
      />
    </svg>
  );
}

export default React.memo(AreaGraph);
