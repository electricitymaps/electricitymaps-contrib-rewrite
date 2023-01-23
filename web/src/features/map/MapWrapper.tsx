import MapControls from 'features/map-controls/MapControls';
import Map from './Map';
import MapFallback, { isOldIOSVersion } from './MapFallback';
import MapTooltip from './MapTooltip';

export default function MapWrapper() {
  const shouldShowFallback = isOldIOSVersion();

  return (
    <>
      <MapTooltip />
      {shouldShowFallback ? <MapFallback /> : <Map />}
      <MapControls />
    </>
  );
}
