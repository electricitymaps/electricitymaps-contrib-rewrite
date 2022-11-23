/* eslint-disable unicorn/no-null */
import { bisectLeft } from 'd3-array';
// import { pointer } from 'd3-selection';
// // https://observablehq.com/@d3/d3-selection-2-0

import { scaleTime } from 'd3-scale';
import { pointer } from 'd3-selection';
import { GenerationType, StorageType } from 'types';
import { modeOrder } from 'utils/constants';

export const detectHoveredDatapointIndex = (
  event_: any,
  datetimes: any,
  timeScale: any,
  svgNode: any
) => {
  if (datetimes.length === 0) {
    return null;
  }
  const dx = event_.pageX
    ? event_.pageX - svgNode.getBoundingClientRect().left
    : pointer(event_); // TODO: check if this works
  const datetime = timeScale.invert(dx);
  // Find data point closest to
  let index = bisectLeft(datetimes, datetime);
  if (index > 0 && datetime - datetimes[index - 1] < datetimes[index] - datetime) {
    index -= 1;
  }
  if (index > datetimes.length - 1) {
    index = datetimes.length - 1;
  }
  return index;
};

// If in mobile mode, put the tooltip to the top of the screen for
// readability, otherwise float it depending on the marker position.
export const getTooltipPosition = (isMobile: boolean, marker: { x: number; y: number }) =>
  isMobile ? { x: 0, y: 0 } : marker;

// TODO: Deprecate this
export const isEmpty = (object: any) =>
  [Object, Array].includes((object || {}).constructor) &&
  Object.entries(object || {}).length === 0;

export const noop = () => undefined;

export const getTimeScale = (width: number, startTime: Date, endTime: Date) =>
  scaleTime()
    .domain([new Date(startTime), new Date(endTime)])
    .range([0, width]);

export const getStorageKey = (name: string): StorageType | undefined => {
  switch (name) {
    case 'hydro storage': {
      return 'hydro';
    }
    case 'battery storage': {
      return 'battery';
    }
    default: {
      return undefined;
    }
  }
};

// Todo: is this type of function necessary?
export const getGenerationTypeKey = (name: string): GenerationType | undefined => {
  if (modeOrder.includes(name as GenerationType)) {
    return name as GenerationType;
  }

  return undefined;
};
