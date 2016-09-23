import React, { Component } from 'react';
import { Button, FormControl, Glyphicon, PageHeader } from 'react-bootstrap';
import ActionBar from './components/ActionBar';
import Processing from './components/Processing';
import './withdraw.css';
import config from './config';
import API from './api/api';

const AMOUNTS = [20, 50, 100, 150, 200, 250];

export default class Withdraw extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      amount: '',
      isOtherActive: false,
      isProcessing: false,
    }

    this.setAmount = this.setAmount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOtherClick = this.handleOtherClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  setAmount(amount) {
    this.setState({
        amount: amount,
        isOtherActive: false,
    });
  }

  handleChange(e) {
   this.setState({ amount: e.target.value });
 }

  renderAmountButtons() {
    const amount = this.state.amount;

    return AMOUNTS.map((item, index) => {
      return (
        <Button
          key={item}
          active={ amount === item }
          className="Withdraw-button"
          onClick={this.setAmount.bind(this,item)}
        >
          {item + '$'}
        </Button>
      );
    })
  }

  handleClearClick() {
    this.setState({
      amount: '',
    });
  }

  renderClear() {
    // when the user types, show Erase button
    if (this.state.amount.length > 0) {
      return (
        <Button className="Withdraw-clear" onClick={this.handleClearClick}>
          <Glyphicon glyph="erase" /> Erase
        </Button>
      );
    }
  }

  renderAmountForm() {
    if (this.state.isOtherActive) {
      return (
        <div className="Withdraw-form">
          <p className="Withdraw-formText">
            Key in desired amount
          </p>
          <div className="Withdraw-inputWrap">
            <FormControl
              className="Withdraw-input"
              type="text"
              value={this.state.amount}
              onChange={this.handleChange}
            />
           {this.renderClear()}
          </div>
        </div>
      )
    }
  }

  handleOtherClick() {
    // show the Other amount form
    // also clear previous selected amounts
    // [Confirm button will disappear]
    this.setState({
      isOtherActive: true,
      amount: ''
    });
  }

  handleNextClick() {
    const amount = this.state.amount;

    this.setState({
      isProcessing: true,
    });

    if (amount !== 0) {
      API.withdrawAmount(amount).then(() => {
        // withdraw succesfull
        // navigate to next page
        this.context.router.push(config.withdraw.next);
      }, () => {
        // withdraw failed
        console.log('Balance error');

        this.setState({
          isProcessing: false,
        })
      })
    }
  }

  render() {
    return (
      <div className="Withdraw">
        { this.state.isProcessing && <Processing /> }
        <PageHeader>
          Money withdraw<br />
          <small>Please select amount</small>
        </PageHeader>
        {this.renderAmountButtons()}
        <Button
          active={this.state.isOtherActive}
          className="Withdraw-button"
          onClick={this.handleOtherClick}
        >
          Other
        </Button>

        {this.renderAmountForm()}

        <ActionBar
          showNext={this.state.amount !== '' && this.state.amount !== '0'}
          backLink={config.withdraw.back}
          nextLabel={'Withdraw ' + parseInt(this.state.amount, 10) + '$'}
          onNextClick={this.handleNextClick}
        />
      </div>
    );
  }
}

Withdraw.contextTypes = {
  router: React.PropTypes.object.isRequired
};
