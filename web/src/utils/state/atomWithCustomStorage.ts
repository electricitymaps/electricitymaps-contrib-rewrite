import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import invariant from 'tiny-invariant';
import { SyncStorage } from 'jotai/utils/atomWithStorage';
import { atom } from 'jotai';

// TODO: consider using preferences from capacitor https://capacitorjs.com/docs/apis/preferences

const NO_STORAGE_VALUE = Symbol();

function createURLStorage<Value extends string>() {
  return {
    getItem: (key: string) => {
      if (typeof location === 'undefined') {
        return NO_STORAGE_VALUE;
      }
      const searchParameters = new URLSearchParams(location.hash.slice(1));
      const storedValue = searchParameters.get(key);
      try {
        return JSON.parse(storedValue || '');
      } catch {
        return NO_STORAGE_VALUE;
      }
    },
    setItem: (key: string, value: Value) => {
      const searchParameters = new URLSearchParams(location.hash.slice(1));
      searchParameters.set(key, value);
      location.hash = searchParameters.toString();
    },
    removeItem: (key: string) => {
      const searchParameters = new URLSearchParams(location.hash.slice(1));
      searchParameters.delete(key);
      location.hash = searchParameters.toString();
    },
  };
}

function createStorage<Value extends string>({
  syncWithUrl,
  syncWithLocalStorage,
  syncWithSessionStorage,
}: StorageOptions): SyncStorage<Value> {
  const _sessionStorage =
    syncWithSessionStorage && createJSONStorage<Value>(() => sessionStorage);
  const _localStorage =
    syncWithLocalStorage && createJSONStorage<Value>(() => localStorage);
  const _URLStorage = syncWithUrl && createURLStorage<Value>();
  invariant(
    _sessionStorage || _localStorage || _URLStorage,
    'No storage provided'
  );

  return {
    getItem: (key) => {
      // Retrieve value in order of preference URLStorage -> sessionStorage -> localStorage
      if (_URLStorage) {
        return _URLStorage.getItem(key);
      }
      if (_sessionStorage) {
        return _sessionStorage.getItem(key);
      }

      if (_localStorage) {
        return _localStorage.getItem(key);
      }

      return typeof NO_STORAGE_VALUE;
    },
    setItem: (key, value) => {
      _URLStorage && _URLStorage.setItem(key, value);
      _sessionStorage && _sessionStorage.setItem(key, value);
      _localStorage && _localStorage.setItem(key, value);
    },
    removeItem: (key) => {
      _URLStorage && _URLStorage.removeItem(key);
      _sessionStorage && _sessionStorage.removeItem(key);
      _localStorage && _localStorage.removeItem(key);
    },
  };
}

interface StorageOptions {
  syncWithUrl?: boolean;
  syncWithLocalStorage?: boolean;
  syncWithSessionStorage?: boolean;
}

/**
 * Creates an atom that is persisted to the URL, localStorage, and/or sessionStorage
 * In case of a conflict, the order of preference is:
 * 1. URL
 * 2. sessionStorage
 * 3. localStorage
 * @see {@link https://github.com/pmndrs/jotai/blob/main/src/utils/atomWithStorage.ts}
 */
export default function atomWithCustomStorage<Value extends string>({
  key,
  initialValue,
  options,
}: {
  key: string;
  initialValue: Value;
  options: StorageOptions;
}) {
  const storage = createStorage(options);
  const baseAtom = atomWithStorage(key, initialValue, storage);

  // Wrap base atom to return initial value if storage is empty
  return atom(
    (get) => {
      const value = get(baseAtom);
      if (typeof value == typeof NO_STORAGE_VALUE) {
        return initialValue;
      }
      return value as Value;
    },
    (get, set, update: Value) => {
      set(baseAtom, update);
    }
  );
}
