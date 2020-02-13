import { getScoreStats } from '../src/score';

test('perfect game', () => {
  const scores = 'XxXxXxXxXxXx';
  const { frames, totalScore, cumulativeScores } = getScoreStats(scores);
  expect(totalScore).toBe(300);
  expect(frames).toEqual([30, 30, 30, 30, 30, 30, 30, 30, 30, 30]);
  expect(cumulativeScores).toEqual([30, 60, 90, 120, 150, 180, 210, 240, 270, 300]);
});