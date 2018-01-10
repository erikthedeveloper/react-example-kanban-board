import _ from 'lodash';

let _columnId = 0;
let _cardId = 0;

export const initialState = {
  columns: ['TODO', 'Doing', 'Done'].map((title, i) => ({
    id: _columnId++,
    title,
    cards: Array.from({length: 3}).map(() => ({
      id: ++_cardId,
      title: `Card ${_cardId}`
    }))
  }))
};

const updateColumnCards = (columnIndex, updateCards) => ({columns}) => ({
  columns: Object.assign([...columns], {
    [columnIndex]: {
      ...columns[columnIndex],
      cards: updateCards(columns[columnIndex].cards)
    }
  })
});

const getCoordinates = (state, cardId) => {
  let y;
  const x = state.columns.findIndex(column => {
    y = column.cards.findIndex(card => card.id === cardId);
    return y !== -1;
  });

  return [x, y];
};

export const moveCard = (cardId, [destX, destY]) => state => {

  const [curX, curY] = getCoordinates(state, cardId);
  // 1) Stash card so we can insert at destination
  const card = state.columns[curX].cards[curY];

  return _.flowRight([
    // 3) Insert card at destination position
    updateColumnCards(destX, cards => [
      ...cards.slice(0, destY),
      card,
      ...cards.slice(destY)
    ]),
    // 2) Remove card from current position
    updateColumnCards(curX, cards => [
      ...cards.slice(0, curY),
      ...cards.slice(curY + 1)
    ])
  ])(state);
};

export const addColumn = title => ({columns}) => {
  const newColumn = {id: ++_columnId, title, cards: []};
  return {columns: [...columns, newColumn]};
};

export const addCard = (columnId, title) => state => {
  const newCard = {id: ++_cardId, title};
  return updateColumnCards(
    state.columns.findIndex(column => column.id === columnId),
    cards => [...cards, newCard]
  )(state);
};
