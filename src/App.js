import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as state from './state';
import {Board} from './Board';

class App extends Component {
  state = state.initialState;

  addColumn = title => {
    this.setState(state.addColumn(title));
  };

  addCard = (columnId, title) => {
    this.setState(state.addCard(columnId, title));
  };

  moveCard = (curPos, nextPos) => {
    this.setState(state.moveCard(curPos, nextPos));
  };

  getCoordinates = (cardId) => {
    let y;
    const x = this.state.columns.findIndex(column => {
      y = column.cards.findIndex(card => card.id === cardId);
      return y !== -1;
    });

    return [x, y];
  };

  render() {
    return (
      <Board
        columns={this.state.columns}
        moveCard={this.moveCard}
        getCoordinates={this.getCoordinates}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
