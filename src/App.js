import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Board} from './Board';

let _columnId = 0;
let _cardId = 0;

class App extends Component {
  state = {
    columns: ['TODO', 'Doing', 'Done'].map((title, i) => ({
      id: _columnId++,
      title,
      cards: Array.from({length: 3}).map(() => ({
        id: ++_cardId,
        title: `Card ${_cardId}`,
      })),
    })),
  };

  addColumn = title => {
    const newColumn = {
      id: ++_columnId,
      title,
      cards: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (columnId, title) => {
    const newCard = {id: ++_cardId, title};
    this.setState(state => ({
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? {...column, cards: [...column.cards, newCard]}
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, destIndex) => {
    let _card;
    this.setState(state => ({
      columns: state.columns
        // 1) Remove the card from its current position.
        .map(column => {
          const cardIndex = column.cards.findIndex(card => card.id === cardId);
          // If the card is not present, leave this column alone.
          if (cardIndex === -1) return column;
          _card = column.cards[cardIndex];
          return {
            ...column,
            cards: [
              ...column.cards.slice(0, cardIndex),
              ...column.cards.slice(cardIndex + 1),
            ],
          };
        })
        // 2) Insert the card into the destination position.
        .map(column => {
          return column.id !== destColumnId
            ? column
            : {
                ...column,
                cards: [
                  ...column.cards.slice(0, destIndex),
                  _card,
                  ...column.cards.slice(destIndex),
                ],
              };
        }),
    }));
  };

  render() {
    return (
      <Board
        cards={this.state.cards}
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
