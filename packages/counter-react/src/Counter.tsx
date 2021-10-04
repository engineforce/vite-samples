import { useCallback, useEffect, useState } from 'react';
import pLimit from 'p-limit';
import axios from 'axios';
import { range } from 'lodash';
const limit = pLimit(1);

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [versions, setVersions] = useState([] as any[]);

  const send = useCallback(async () => {
    const currentVersions = await Promise.all(
      range(0, 1).map((i) =>
        limit(
          async () =>
            (
              await axios.get<any>(
                `https://dev.platform.tymlez.com/api/version`,
              )
            ).data,
        ),
      ),
    );
    setVersions((v) => [...v, currentVersions]);
  }, []);

  return (
    <p>
      <button
        type="button"
        onClick={() => {
          setCount((count) => count + 1);
          send();
        }}
      >
        count is: {count}
      </button>

      <pre>{JSON.stringify(versions, undefined, 2)}</pre>
    </p>
  );
}
