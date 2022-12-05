import { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from '@turf/turf';

export type Maybe<T> = T | null | undefined;

export type ZoneKey = string;

export interface GridState {
  callerLocation?: [number, number];
  data: {
    zones: { [key: string]: ZoneResponse };
    createdAt: string;
    datetime: string;
    datetimes: Array<string>;
    exchanges: { [key: string]: ExchangeResponse };
    stateAggregation: string;
  };
}

export interface ExchangeResponse {
  [datetimeKey: string]: {
    netFlow: number;
    co2intensity: number;
  };
}

export interface ExchangeOverview {
  netFlow: number;
  co2intensity: number;
}

export interface ExchangeArrowData extends ExchangeOverview {
  rotation: number;
  lonlat: [number, number];
  key: string;
}

export interface ZoneResponse {
  [key: string]: {
    co2intensity: number; //Non camel case sad face
    co2intensityProduction: number;
    countryCode: string;
    fossilFuelRatio: number;
    fossilFuelRatioProduction: number;
    renewableRatio: number;
    renewableRatioProduction: number;
    stateDatetime: number;
  };
}

export interface ZoneOverviewForTimePeriod {
  [dateTimeKey: string]: ZoneOverview;
}
export interface ZoneOverview {
  zoneKey: string;
  co2intensity?: number;
  co2intensityProduction?: number;
  stateDatetime: string;
}

export type GenerationType =
  | 'biomass'
  | 'coal'
  | 'gas'
  | 'hydro'
  | 'nuclear'
  | 'oil'
  | 'solar'
  | 'unknown'
  | 'geothermal'
  | 'wind';

export type StorageType = 'hydro storage' | 'battery storage';
export type StorageKeyType = 'battery' | 'hydro';

export type ElectricityModeType = GenerationType | StorageType;

export interface ZoneDetail extends ZoneOverview {
  _isFinestGranularity: boolean;
  capacity: { [key in ElectricityModeType]: Maybe<number> };
  dischargeCo2Intensities: { [key in StorageKeyType]: number };
  dischargeCo2IntensitySources: { [key in StorageKeyType]: string };
  exchange: { [key: string]: number };
  exchangeCapacities?: {
    [key: string]: number[]; // TODO: Why can I not use [number, number] here?
  };
  exchangeCo2Intensities: { [key: string]: number };
  fossilFuelRatio: number;
  fossilFuelRatioProduction: number;
  isValid: boolean;
  maxCapacity: number;
  maxDischarge: number;
  maxExport: number;
  maxExportCapacity: number;
  maxImport: number;
  maxImportCapacity: number;
  maxProduction: number;
  maxStorage: number;
  maxStorageCapacity: number;
  price?: {
    value: number;
    currency: string;
  };
  production: { [key in GenerationType]: Maybe<number> };
  productionCo2Intensities: { [key in GenerationType]: number };
  productionCo2IntensitySources: { [key in GenerationType]: string };
  renewableRatio: number;
  renewableRatioProduction: number;
  source: string;
  storage: { [key in StorageKeyType]: Maybe<number> };
  totalCo2Discharge: number;
  totalCo2Export: number;
  totalCo2Import: number;
  totalCo2NetExchange: number;
  totalCo2Production: number;
  totalCo2Storage: number;
  totalConsumption: number;
  totalDischarge: number;
  totalExport: number;
  totalImport: number;
  totalProduction: number;
  totalStorage: number;
}

export interface ZoneDetails {
  hasData: boolean;
  stateAggregation: 'daily' | 'hourly' | 'monthly' | 'yearly';
  zoneStates: {
    [key: string]: ZoneDetail;
  };
}

export interface MapGeometries extends FeatureCollection<Geometry> {
  features: Array<MapGeometry>;
}
export interface MapGeometry extends Feature<Polygon | MultiPolygon> {
  geometry: MultiPolygon | Polygon;
  Id?: number;
  properties: {
    zoneId: string;
    color: string;
  };
}

export interface MapTheme {
  co2Scale: CO2Scale;
  clickableFill: string;
  nonClickableFill: string;
  oceanColor: string;
  strokeWidth: number;
  strokeColor: string;
}

export interface CO2Scale {
  steps: number[];
  colors: string[];
}
