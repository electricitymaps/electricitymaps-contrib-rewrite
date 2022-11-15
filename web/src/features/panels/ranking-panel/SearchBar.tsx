import { useRef } from 'react';

function SearchBar({ placeholder, searchHandler, value }: any) {
  const reference = useRef(null);

  const onHandleInput = (event: unknown) => {
    console.log('event', event);
    if (searchHandler) {
      searchHandler(event);
    }
  };

  return (
    <div className="mb-1 flex h-8 flex-row items-center rounded bg-gray-200 p-3 dark:bg-slate-700">
      <div>?</div>
      <input
        className="font w-full bg-inherit pl-2 text-base "
        ref={reference}
        placeholder={placeholder}
        onChange={onHandleInput}
        value={value}
      />
    </div>
  );
}

export default SearchBar;
