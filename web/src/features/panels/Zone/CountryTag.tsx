import { CountryFlag } from 'components/Flag';

export function CountryTag({ zoneId }: { zoneId: string }) {
  const countryName = 'Denmark';
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-0 text-xs">
      <CountryFlag zoneId={zoneId} flagSize={16} />
      <span>{countryName}</span>
    </span>
  );
}
