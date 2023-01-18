import { max as d3Max } from 'd3-array';
import {
  ElectricityModeType,
  ElectricityStorageKeyType,
  Exchange,
  GenerationType,
  Maybe,
  ZoneDetail,
  ZoneKey,
} from 'types';
import { MixMode, modeOrder } from 'utils/constants';
import { getCO2IntensityByMode, getProductionCo2Intensity } from 'utils/helpers';
import exchangesToExclude from '../../../../config/excludedAggregatedExchanges.json'; // TODO: do something globally

const LABEL_MAX_WIDTH = 102;
const ROW_HEIGHT = 13;
const PADDING_Y = 7;
const PADDING_X = 5;
const X_AXIS_HEIGHT = 15;
const DEFAULT_FLAG_SIZE = 16;

export function getExchangeCo2Intensity(
  mode: ZoneKey,
  zoneData: ZoneDetail,
  electricityMixMode: MixMode
) {
  const exchange = (zoneData.exchange || {})[mode];
  const exchangeCo2Intensity = (zoneData.exchangeCo2Intensities || {})[mode];

  if (exchange >= 0) {
    return exchangeCo2Intensity;
  }

  return getCO2IntensityByMode(zoneData, electricityMixMode);
}

export interface ProductionDataType {
  production: Maybe<number>;
  capacity: Maybe<number>;
  isStorage: boolean;
  storage: Maybe<number>;
  mode: ElectricityModeType;
  tCo2eqPerMin: number;
}

export const getProductionData = (data: ZoneDetail): ProductionDataType[] =>
  modeOrder.map((mode) => {
    const isStorage = mode.includes('storage');
    const generationMode = mode.replace(' storage', '') as GenerationType;
    // Power in MW

    const capacity = data.capacity?.[mode];
    const production = data.production?.[generationMode];
    const storage = data.storage?.[generationMode as ElectricityStorageKeyType];

    // Production CO₂ intensity
    const gCo2eqPerkWh = getProductionCo2Intensity(mode, data);
    const value = isStorage && storage ? storage : production || 0;
    const gCo2eqPerHour = gCo2eqPerkWh * 1e3 * value;
    const tCo2eqPerMin = gCo2eqPerHour / 1e6 / 60;

    return {
      isStorage,
      storage,
      production,
      capacity,
      mode,
      tCo2eqPerMin,
    };
  });

export function getElectricityProductionValue({
  capacity,
  isStorage,
  production,
  storage,
}: ProductionDataType) {
  const value = isStorage && storage ? -storage : production;
  // If the value is not defined but the capacity
  // is zero, assume the value is also zero.
  if (!Number.isFinite(value) && capacity === 0) {
    return 0;
  }
  return value || 0;
}

export const getDataBlockPositions = (
  prouductionLength: number,
  exchangeData: ExchangeDataType[]
) => {
  const productionHeight = prouductionLength * (ROW_HEIGHT + PADDING_Y);
  const productionY = X_AXIS_HEIGHT + PADDING_Y;

  const exchangeMax = d3Max(exchangeData, (d) => d.mode.length) || 0;

  const exchangeFlagX =
    LABEL_MAX_WIDTH - 4 * PADDING_X - DEFAULT_FLAG_SIZE - exchangeMax * 8;
  const exchangeHeight = exchangeData.length * (ROW_HEIGHT + PADDING_Y);
  const exchangeY = productionY + productionHeight + ROW_HEIGHT + PADDING_Y;

  return {
    productionHeight,
    productionY,
    exchangeFlagX,
    exchangeHeight,
    exchangeY,
  };
};

export interface ExchangeDataType {
  exchange: number;
  exchangeCapacityRange: [number, number];
  mode: ZoneKey; // TODO: This should not be called "mode" as it's a zonekey
  gCo2eqPerkWh: Maybe<number>;
  tCo2eqPerMin: Maybe<number>;
}
export const getExchangeData = (
  data: ZoneDetail,
  exchangeKeys: ZoneKey[],
  electricityMixMode: MixMode
): ExchangeDataType[] =>
  exchangeKeys.map((key) => {
    // Power in MW
    const exchange = (data.exchange || {})[key];
    const exchangeCapacityRange = (data.exchangeCapacities || {})[key];

    // Exchange CO₂ intensity
    const gCo2eqPerkWh = getExchangeCo2Intensity(key, data, electricityMixMode);
    const gCo2eqPerHour = gCo2eqPerkWh ? gCo2eqPerkWh * 1e3 * exchange : null;
    const tCo2eqPerMin = gCo2eqPerHour ? gCo2eqPerHour / 1e6 / 60 : null;

    return {
      exchange,
      exchangeCapacityRange,
      mode: key,
      gCo2eqPerkWh,
      tCo2eqPerMin,
    };
  });

export const getExchangesToDisplay = (
  currentZoneKey: ZoneKey,
  isAggregatedToggled: boolean,
  exchangeZoneKeysForCurrentZone: Exchange
): ZoneKey[] => {
  const exchangeKeysToRemove = isAggregatedToggled
    ? exchangesToExclude.exchangesToExcludeCountryView
    : exchangesToExclude.exchangesToExcludeZoneView;

  const exchangeZoneKeysToRemove = new Set(
    exchangeKeysToRemove.flatMap((exchangeKey) => {
      const split = exchangeKey.split('->');
      if (split.includes(currentZoneKey)) {
        return split.filter((exchangeKey) => exchangeKey !== currentZoneKey);
      }
      return [];
    })
  );

  const currentExchanges = Object.keys(exchangeZoneKeysForCurrentZone);
  return currentExchanges
    ? currentExchanges.filter(
        (exchangeZoneKey) => !exchangeZoneKeysToRemove.has(exchangeZoneKey)
      )
    : [];
};
