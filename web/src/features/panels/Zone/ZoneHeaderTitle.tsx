import { Link } from 'react-router-dom';

interface ZoneHeaderTitleProps {
  title: string;
  formattedDate: string;
  labels?: React.ReactElement[];
  countryTag?: React.ReactElement;
}

export default function ZoneHeaderTitle({
  title,
  labels,
  formattedDate,
  countryTag,
}: ZoneHeaderTitleProps) {
  // TODO: add correct icon
  return (
    <div className="flex flex-row pl-2">
      <Link className="mr-4 self-center text-3xl text-gray-400" to="/">
        {'❮'}
      </Link>
      <div>
        <h2 className="text-md mb-1 text-base font-medium">
          <span>{title}</span>
          <span> {countryTag}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-1 text-center">
          {labels}
          <p className="whitespace-nowrap text-xs">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
