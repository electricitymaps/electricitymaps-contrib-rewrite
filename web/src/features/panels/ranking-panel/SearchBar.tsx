import { HiMagnifyingGlass } from 'react-icons/hi2';

function SearchBar({ placeholder, searchHandler, value }: any) {
  const onHandleInput = (event: unknown) => {
    if (searchHandler) {
      searchHandler(event);
    }
  };

  return (
    <div className="mb-2 flex h-12 flex-row items-center rounded bg-gray-100 p-3 dark:bg-slate-700">
      <HiMagnifyingGlass />
      <input
        data-test-id="zone-search-bar"
        className="font w-full bg-inherit pl-2 text-base "
        placeholder={placeholder}
        onChange={onHandleInput}
        value={value}
      />
    </div>
  );
}

export default SearchBar;
