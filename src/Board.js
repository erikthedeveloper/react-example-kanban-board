import React from 'react';
import {Column} from './Column';
import {DraggableCard} from './Card';
import {TextInput} from './TextInput';

export function Board({columns, moveCard, getCoordinates, addCard, addColumn}) {
  return (
    <div className="Board">
      {columns.map((column, x) => (
        <Column
          key={column.id}
          title={column.title}
          // bind columnId as the 1st argument
          addCard={addCard.bind(null, column.id)}
        >
          {column.cards.map((card, y) => {
            return (
              <DraggableCard
                key={card.id}
                title={card.title}
                // Props required for drag and drop
                id={card.id}
                getCoordinates={getCoordinates}
                moveCard={moveCard}
              />
            );
          })}
          {column.cards.length === 0 && (
            <DraggableCard
              isSpacer
              id={null}
              getCoordinates={id => (id === null ? [x, 0] : getCoordinates(id))}
              moveCard={moveCard}
            />
          )}
        </Column>
      ))}
      <div className="Column">
        <TextInput onSubmit={addColumn} placeholder="Add Column..." />
      </div>
    </div>
  );
}
