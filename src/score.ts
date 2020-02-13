type tResults = { frames: number[]; totalScore: number; cumulativeScores: number[] };

function getCumulativeScore(frames: number[]): number[] {
  return frames.reduce((results, value, index) => {
    results.push(value + (results[index - 1] ? results[index - 1] : 0));
    return results;
  }, []);
}

function addToCache(cache: {}, idx: number, target: number): void {
  if (!cache[idx]) {
    cache[idx] = [];
  }
  cache[idx].push(target);
}

export function getScoreStats(scoreString: string): tResults {
  let framesIndex = 0;
  const frames = [];
  let totalScore = 0;
  const scoreCache = {};
  const cacher = addToCache.bind(null, scoreCache);
  for (let index = 0; index < scoreString.length; index++) {
    const score = scoreString[index].toLowerCase();
    let frameScore = 0;
    if (score === 'x' || score === '/') {
      frameScore = 10;
      score === '/' && (frameScore -= frames[framesIndex]);
      if (index <= 9) {
        totalScore += frameScore;
        cacher(index + 1, framesIndex);
        frames[framesIndex] = frameScore;
        score === 'x' && cacher(index + 2, framesIndex);
        framesIndex++;
      }
    } else {
      frameScore = parseInt(score) || 0;
      if (index <= 9) {
        const last = frames[framesIndex];
        if (last !== undefined) {
          frames[framesIndex] += frameScore;
          totalScore += frames[framesIndex];
          framesIndex++;
        } else {
          frames[framesIndex] = frameScore;
        }
      }
    }
    if (scoreCache[index]) {
      scoreCache[index].forEach((targetIdx: number) => {
        frames[targetIdx] += frameScore;
        totalScore += frameScore;
      });
    }
  }
  return { frames, totalScore, cumulativeScores: getCumulativeScore(frames) };
}