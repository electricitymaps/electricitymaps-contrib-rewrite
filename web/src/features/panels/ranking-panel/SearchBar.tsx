import { useEffect, useRef } from 'react';

function SearchBar({ className, documentKeyUpHandler, placeholder, searchHandler }: any) {
  const reference = useRef(null);

  // Set up global key up handlers that apply to this search bar
  useEffect(() => {
    const keyUpHandler = documentKeyUpHandler
      ? (event_: { key: any }) => documentKeyUpHandler(event_.key, reference)
      : () => {};
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  });

  // Apply the search query after every key press
  const onHandleKeyUp = (event: any) => {
    if (searchHandler) {
      searchHandler(event.target.value.toLowerCase());
    }
  };

  return (
    <div className={className}>
      <input ref={reference} placeholder={placeholder} onKeyUp={onHandleKeyUp} />
    </div>
  );
}

export default SearchBar;
