import { getText } from './getText';
import { reformat } from './analyzeText';

(async function (): Promise<void> {
  const results = await getText('test2.png');
  return reformat(results);
})();