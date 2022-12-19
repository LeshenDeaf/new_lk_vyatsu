import { useState, useMemo } from 'react';

export function useMap<K, V>(
  initialValue?: ReadonlyArray<readonly [K, V]>
) {
  const [map] = useState(() => new Map(initialValue));
  const [size, setSize] = useState(map.size);

  const componentMap = useMemo(() => {
    return {
      set(key: K, value: V) {
        const result = map.set(key, value);
        setSize(map.size);
        return result;
      },
      has(key: K) {
        return map.has(key)
      },
      delete(key: K) {
        const result = map.delete(key);
        setSize(map.size);
        return result;
      },
      clear() {
        map.clear();
        setSize(0);
      },
      map<R>(mapper: (element: V, key: K) => R) {
        const result: R[] = [];

        map.forEach((item, key) => {
          result.push(mapper(item, key));
        });

        return result;
      },
      get size() {
        return size;
      }
    }
  }, [map, size]);

  return componentMap;

}
