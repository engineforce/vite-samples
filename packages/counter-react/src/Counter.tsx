import { useCallback, useState } from 'react';
import { getVersions } from '@sample/version';
import styled from 'styled-components';

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [versions, setVersions] = useState([] as any[]);

  const send = useCallback(async () => {
    const currentVersions = await getVersions();
    setVersions((v) => [...v, ...currentVersions]);
  }, []);

  return (
    <p>
      <Title>Hello Styled Components!</Title>
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

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
