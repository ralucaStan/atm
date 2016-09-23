import React, { Component } from 'react';
import { PageHeader, Glyphicon } from 'react-bootstrap';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ActionBar from './components/ActionBar';
import Processing from './components/Processing';
import bills from './images/bills.svg';
import config from './config';
import API from './api/api';
import './CashIn.css';
import './transactions.css';

export default class CashIn extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      items: [],
      isProcessing: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const card = (
      <div className="CashIn-cardWrap" key="card">
        <Glyphicon className="CashIn-card" glyph="credit-card" />
      </div>
    );
    this.setState({
      items: [card],
      isCardRemoved: false,
    });
  }

  handleClick() {
    // fake user interaction
    const billsImg = <img src={bills} key="bills" className="CashIn-bills" alt="Remove card"/>;

    // user retreives card
    if (!this.state.isCardRemoved) {
      this.setState({
        items: [billsImg],
        isCardRemoved: true,
      });
    } else {
      // user retreives bills

      this.setState({
        isProcessing: true,
      });

      API.cashIn().then(() => {
        // delivery succesfull
        // navigate to next page
        this.context.router.push(config.cashin.next);
      })
    }


  }

  render() {
    return (
      <div className="CashIn">
        {this.state.isProcessing && <Processing />}
        <PageHeader>
          Get your card and take your money!<br />
          <small>Transaction is complete</small>
        </PageHeader>

        <strong>Please remove</strong>
        <br />
        <CSSTransitionGroup
          transitionName="fadeDown"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.items}
        </CSSTransitionGroup>
        <br />
        {
          !this.state.isProcessing &&
          <Glyphicon
            className="CashIn-arrow"
            glyph="triangle-bottom"
            onClick={this.handleClick}
          />
        }

        <ActionBar
          showNext={false}
          backLink={config.cashin.back}
        />
      </div>
    );
  }
}

CashIn.contextTypes = {
  router: React.PropTypes.object.isRequired
};
