import { resolvePath } from 'react-router-dom';

const DEFAULT_FLAG_SIZE = 48;

const getFlagFileName = (zoneId: string) => {
  // Return (zonesConfig[zoneId.toUpperCase()] || {}).flag_file_name; TODO: enable when config setup
  return 'dk.png';
};

const getFlagUri = function (zoneId: string, flagSize = DEFAULT_FLAG_SIZE) {
  if (!zoneId) {
    return;
  }
  const flagFile = getFlagFileName(zoneId);
  return resolvePath(`flags_iso/${flagSize}/${flagFile}`).pathname;
};

export function CountryFlag({ zoneId, flagSize = DEFAULT_FLAG_SIZE, ...props }: { zoneId: string; flagSize?: number }) {
  const flagUri = getFlagUri(zoneId, flagSize);

  if (flagUri === undefined) {
    return <div>No flag</div>;
  }

  return <img src={flagUri} alt={zoneId} {...props} />;
}
