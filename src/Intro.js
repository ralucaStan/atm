import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { PageHeader, Glyphicon } from 'react-bootstrap';
import Processing from './components/Processing';

import './Intro.css';
import './transactions.css';
import API from './api/api';


export default class Intro extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      items: [],
      isProcessing: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const card = (<div key="card">
      <Glyphicon
         className="Intro-card"
         glyph="credit-card"
      />
    </div>);

    this.setState({items: [card]});
  }

  handleNext() {
    //go to next step
    this.context.router.push('/pin');
  }

  handleClick() {
    // remove card icon from screen
    this.setState({
      items: [],
      isProcessing: true
    });

    API.insertCard().then(() => {
      this.handleNext();
    });
  }

  render() {
    return (
      <div className="Intro">
        { this.state.isProcessing && <Processing /> }
        <PageHeader>
          Welcome!<br />
          <small>Please insert card</small>
        </PageHeader>

        { !this.state.isProcessing &&
          <Glyphicon
            className="Intro-arrow"
            glyph="triangle-top"
            onClick={this.handleClick}
          />
        }

        <br />
        <CSSTransitionGroup
          transitionName="fadeUp"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.items}
        </CSSTransitionGroup>
      </div>
    );
  }
}

Intro.contextTypes = {
  router: React.PropTypes.object.isRequired
};
