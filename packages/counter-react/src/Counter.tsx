import { useCallback, useState } from 'react';
import { getVersions } from '@sample/version';

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [versions, setVersions] = useState([] as any[]);

  const send = useCallback(async () => {
    const currentVersions = await getVersions();
    setVersions((v) => [...v, ...currentVersions]);
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

      <pre style={{ textAlign: 'left', fontSize: 10 }}>
        {JSON.stringify(versions, undefined, 2)}
      </pre>
    </p>
  );
}
