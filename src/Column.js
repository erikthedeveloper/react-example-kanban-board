import React from 'react';
import {TextInput} from './TextInput';

export function Column(props) {
  return (
    <div className="Column">
      <div className="Column__title">{props.title}</div>
      {props.children}
      <TextInput onSubmit={props.addCard} placeholder="Add card..." />
    </div>
  );
}
