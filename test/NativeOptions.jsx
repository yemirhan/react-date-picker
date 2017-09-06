import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ValueOptions extends Component {
  onPreferNativeChange = event =>
    this.props.setState({
      preferNative: event.target.checked,
    })

  render() {
    const {
      preferNative,
    } = this.props;

    return (
      <fieldset id="detailoptions">
        <legend htmlFor="viewoptions">Prefer native input?</legend>

        <div>
          <input
            id="preferNative"
            type="checkbox"
            checked={preferNative}
            onChange={this.onPreferNativeChange}
          />
          <label htmlFor="preferNative">Prefer native</label>
        </div>
      </fieldset>
    );
  }
}

ValueOptions.propTypes = {
  preferNative: PropTypes.bool,
  setState: PropTypes.func.isRequired,
};
