import React, { Component } from 'react';
import ActionBar from './components/ActionBar';
import Processing from './components/Processing';
import { Button, Glyphicon, FormControl, PageHeader } from 'react-bootstrap';
import API from './api/api';
import config from './config';
import './Pin.css';
const PINLENGTH = 4;

export default class Pin extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      inputHasError: false,
      pin: '',
      isProcessing: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleChange(event) {
   this.setState({pin: event.target.value});
  }

  clearInput() {
    this.setState({
      pin: '',
    });
  }

  handleClick() {
    let pin = this.state.pin;

    //fake processing with image
    this.setState({
      isProcessing: true,
    });

    API.isPinCorrect(pin).then((value) => {
      // Pin is correct
      // navigate to next page
      this.context.router.push(config.pin.next);
    }, () => {
      // Pin is incorrect
      // show error
      this.setState({
        inputHasError: true,
        pin: '',
        isProcessing: false,
      });
    });
  }

  renderClear() {
    if (this.state.pin.length > 0) {
      return (
        <Button className="Pin-erase" onClick={this.clearInput}>
          <Glyphicon glyph="erase" /> Erase
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="Pin">
        { this.state.isProcessing && <Processing />}
        <PageHeader>
          Please enter PIN <br />
          <small>Cover the keypad while you enter the pin</small>
        </PageHeader>

        <div className="Pin-inputWrap">
          <FormControl
            className="Pin-input"
            ref={(c) => this._input = c}
            type="password"
            value={this.state.pin}
            onChange={this.handleChange}
          />
          {this.renderClear()}
        </div>

        {
          this.state.inputHasError &&
          <p className="Pin-error">
            Pin code invalid. Please retype.
          </p>
        }

        <ActionBar
          showNext={this.state.pin.length === PINLENGTH }
          backLink={config.pin.back}
          onNextClick={this.handleClick}
        />
      </div>
    );
  }
}

Pin.contextTypes = {
  router: React.PropTypes.object.isRequired
};
