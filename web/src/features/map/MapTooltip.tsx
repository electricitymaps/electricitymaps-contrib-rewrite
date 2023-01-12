import * as Portal from '@radix-ui/react-portal';
import { useAtom } from 'jotai';

import useGetState from 'api/getState';
import CarbonIntensitySquare from 'components/CarbonIntensitySquare';
import { CircularGauge } from 'components/CircularGauge';
import { getSafeTooltipPosition } from 'components/tooltips/utilities';
import { ZoneName } from 'components/ZoneName';
import { useTranslation } from 'translation/translation';
import { Mode } from 'utils/constants';
import { formatDate } from 'utils/formatting';
import {
  productionConsumptionAtom,
  selectedDatetimeIndexAtom,
  timeAverageAtom,
} from 'utils/state/atoms';
import { hoveredZoneAtom, mapMovingAtom, mousePositionAtom } from './mapAtoms';

function TooltipInner({
  zoneData,
  date,
  zoneId,
}: {
  date: string;
  zoneId: string;
  zoneData: {
    co2intensity: number;
    co2intensityProduction: number;
    zoneKey: string;
    fossilFuelRatio: number;
    fossilFuelRatioProduction: number;
    renewableRatio: number;
    renewableRatioProduction: number;
    stateDatetime: number;
  };
}) {
  const {
    co2intensity,
    co2intensityProduction,
    fossilFuelRatio,
    fossilFuelRatioProduction,
    renewableRatio,
    renewableRatioProduction,
  } = zoneData;
  const [currentMode] = useAtom(productionConsumptionAtom);
  const isConsumption = currentMode === Mode.CONSUMPTION;

  return (
    <div className="w-full p-4 text-center">
      <ZoneName zone={zoneId} textStyle="text-base" />
      <div className="flex self-start text-xs">{date}</div>
      <div className=" flex w-full flex-grow p-1 sm:pr-4">
        <div className="flex w-full  flex-grow flex-row content-between justify-between">
          <CarbonIntensitySquare
            co2intensity={isConsumption ? co2intensity : co2intensityProduction}
          />
          <div className="px-4">
            <CircularGauge
              name="Low-carbon"
              ratio={isConsumption ? fossilFuelRatio : fossilFuelRatioProduction}
            />
          </div>
          <CircularGauge
            name="Renewable"
            ratio={isConsumption ? renewableRatio : renewableRatioProduction}
          />
        </div>
      </div>
    </div>
  );
}

export default function MapTooltip() {
  const [mousePosition] = useAtom(mousePositionAtom);
  const [hoveredZone] = useAtom(hoveredZoneAtom);
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const [timeAverage] = useAtom(timeAverageAtom);
  const [isMapMoving] = useAtom(mapMovingAtom);
  const { i18n, __ } = useTranslation();
  const { data } = useGetState();

  if (!hoveredZone || isMapMoving) {
    return null;
  }

  const { x, y } = mousePosition;
  const hoveredZoneData = data?.data?.zones[hoveredZone.zoneId] ?? undefined;
  const zoneData = hoveredZoneData
    ? data?.data?.zones[hoveredZone.zoneId][selectedDatetime.datetimeString]
    : undefined;

  const screenWidth = window.innerWidth;
  const tooltipWithDataPositon = getSafeTooltipPosition(x, y, screenWidth, 290, 176);
  const emptyTooltipPosition = getSafeTooltipPosition(x, y, screenWidth, 176, 80);

  const formattedDate = formatDate(
    new Date(selectedDatetime.datetimeString),
    i18n.language,
    timeAverage
  );

  if (zoneData) {
    return (
      <Portal.Root className="absolute left-0 top-0 h-0 w-0">
        <div
          className="relative h-[176px] w-[276px] rounded border bg-gray-100  text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900"
          style={{ left: tooltipWithDataPositon.x, top: tooltipWithDataPositon.y }}
        >
          <div>
            <TooltipInner
              zoneData={zoneData}
              zoneId={hoveredZone.zoneId}
              date={formattedDate}
            />
          </div>
        </div>
      </Portal.Root>
    );
  }
  return (
    <Portal.Root className="absolute left-0 top-0 h-0 w-0">
      <div
        className="relative h-[80px] w-[176px] rounded border bg-gray-100 p-3 text-center text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900"
        style={{ left: emptyTooltipPosition.x, top: emptyTooltipPosition.y }}
      >
        <div>
          <ZoneName zone={hoveredZone.zoneId} textStyle="text-base" />
          <div className="flex self-start text-xs">{formattedDate}</div>
          <p className="text-start">{__('tooltips.noParserInfo')}</p>
        </div>
      </div>
    </Portal.Root>
  );
}
