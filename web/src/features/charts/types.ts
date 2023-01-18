import { ElectricityModeType, ZoneDetail, ZoneKey } from 'types';

export interface AreaGraphElement {
  datetime: Date;
  meta: ZoneDetail;
  layerData: { [layerKey: string]: number };
}

export interface InnerAreaGraphTooltipProps {
  zoneDetail: ZoneDetail;
  selectedLayerKey: ElectricityModeType | ZoneKey;
}
