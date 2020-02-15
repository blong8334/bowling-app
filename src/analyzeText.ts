// import * as data from '../data/results.json';

export function reformat(data: { [key: string]: any[] }): void {
  const organized = data.Blocks.reduce((map, block) => {
    const { BlockType, Id } = block;
    delete block.BlockType;
    delete block.Id;
    if (!map[BlockType]) {
      map[BlockType] = {};
    }
    map[BlockType][Id] = block;
    return map;
  }, {}) as { [key: string]: {} };
  // now we want to go through each cell and add it to a results array.
  const results = [];
  Object.keys(organized.CELL).forEach((id) => {
    const values = organized.CELL[id];
    const row = values.RowIndex - 1;
    const col = values.ColumnIndex - 1;
    const resultString = (values.Relationships || []).map((ship) => {
      return ship.Ids.map((id) => organized.WORD[id].Text).join(', ');
    }).join(', ');
    if (!results[row]) {
      results[row] = [];
    }
    results[row][col] = resultString;
  });
  console.log(results);
}