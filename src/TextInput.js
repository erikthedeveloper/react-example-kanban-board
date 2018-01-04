import React, {Component} from 'react';

export class TextInput extends Component {
  onSubmit = event => {
    const form = event.target;
    event.preventDefault();

    const value = form.input.value.trim();
    if (!value) return;

    this.props.onSubmit(value);
    form.reset();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} ref={node => (this.form = node)}>
        <input
          type="text"
          className="TextForm__input"
          name="input"
          placeholder={this.props.placeholder}
          autoComplete="off"
        />
      </form>
    );
  }
}
