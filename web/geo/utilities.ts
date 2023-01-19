import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  area,
  Feature,
  featureCollection,
  featureEach,
  getCoords,
  getType,
  length,
  Polygon,
  polygon,
  polygonToLineString,
  Properties,
  truncate,
} from '@turf/turf';

// Replace native Node.js __dirname with an es module compatible version
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getPolygons(input) {
  /* Transform the feature collection of polygons and multi-polygons into a feature collection of polygons only */
  /* all helper functions should rely on its output */
  const handlePolygon = (feature, props) => polygon(getCoords(feature), props);
  const handleMultiPolygon = (feature, props) =>
    getCoords(feature).map((coord) => polygon(coord, props));

  const polygons: Feature<Polygon, Properties>[] = [];
  let fc;
  fc = getType(input) !== 'FeatureCollection' ? featureCollection([input]) : input;

  featureEach(fc, (feature) => {
    const type = getType(feature);
    switch (type) {
      case 'Polygon': {
        polygons.push(handlePolygon(feature, feature.properties));
        break;
      }
      case 'MultiPolygon': {
        polygons.push(...handleMultiPolygon(feature, feature.properties));
        break;
      }
      default: {
        throw new Error(`Encountered unhandled type: ${type}`);
      }
    }
  });

  return truncate(featureCollection(polygons), { precision: 6 });
}

function isSliver(polygon, polArea, sliverRatio) {
  const lineStringLength = length(polygonToLineString(polygon));
  return Number(lineStringLength / polArea) > Number(sliverRatio);
}

function getHoles(fc, minArea: number, sliverRatio) {
  const holes: Feature<Polygon, Properties>[] = [];
  featureEach(fc, (ft: any) => {
    const coords = getCoords(ft);
    if (coords.length > 0) {
      for (const coord of coords) {
        const pol = polygon([coord]);
        const polArea = area(pol);
        if (polArea < minArea && !isSliver(pol, polArea, sliverRatio)) {
          holes.push(pol);
        }
      }
    }
  });
  return featureCollection(holes);
}

const fileExists = (fileName: string) => fs.existsSync(fileName);

const getJSON = (fileName: string) => JSON.parse(fs.readFileSync(fileName, 'utf8'));

const writeJSON = (fileName: string, object: any) =>
  fs.writeFileSync(fileName, JSON.stringify(object), { encoding: 'utf8', flag: 'w' });

function log(message: string) {
  console.error('\u001B[31m%s\u001B[0m', `ERROR: ${message}`);
}

/**
 * Function to round a number to a specific amount of decimals.
 * @param {number} number - The number to round.
 * @param {number} decimals - Defaults to 2 decimals.
 * @returns {number} Rounded number.
 */
const round = (number: number, decimals = 2) => {
  return Math.round((number + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
};

export {
  __dirname,
  fileExists,
  getHoles,
  getJSON,
  getPolygons,
  isSliver,
  log,
  round,
  writeJSON,
};
