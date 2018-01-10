import React, {Component} from 'react';
import _ from 'lodash';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Board} from './Board';

let _columnId = 0;
let _cardId = 0;

class App extends Component {
  state = {
    columns: ['TODO', 'Doing', 'Done'].map(title => ({
      id: _columnId++,
      title,
      cards: Array.from({length: 3}).map(() => ({
        id: ++_cardId,
        title: `Card ${_cardId}`
      }))
    }))
  };

  addColumn = title => {
    this.setState(({columns}) => {
      const newColumn = {id: ++_columnId, title, cards: []};
      return {columns: [...columns, newColumn]};
    });
  };

  addCard = (columnId, title) => {
    this.setState(state => {
      const newCard = {id: ++_cardId, title};
      return updateColumnCards(
        state.columns.findIndex(column => column.id === columnId),
        cards => [...cards, newCard]
      )(state);
    });
  };

  moveCard = (cardId, [destX, destY]) => {
    this.setState(state => {
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
    });
  };

  render() {
    return (
      <Board
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

function updateColumnCards(columnIndex, updateCards) {
  return ({columns}) => ({
    columns: Object.assign([...columns], {
      [columnIndex]: {
        ...columns[columnIndex],
        cards: updateCards(columns[columnIndex].cards)
      }
    })
  });
}

function getCoordinates(state, cardId) {
  let y;
  const x = state.columns.findIndex(column => {
    y = column.cards.findIndex(card => card.id === cardId);
    return y !== -1;
  });

  return [x, y];
}

export default DragDropContext(HTML5Backend)(App);
