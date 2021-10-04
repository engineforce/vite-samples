import axios from 'axios';
import { range } from 'lodash';
import pLimit from 'p-limit';

const limit = pLimit(1);

export async function getVersions() {
  return await Promise.all(
    range(0, 2).map(() =>
      limit(
        async () =>
          (
            await axios.get<any>(`https://dev.platform.tymlez.com/api/version`)
          ).data.gitTag,
      ),
    ),
  );
}
