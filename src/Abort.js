import React, { Component } from 'react';
import { PageHeader, Glyphicon } from 'react-bootstrap';
import Processing from './components/Processing';
import './Abort.css';
import './transactions.css';
import API from './api/api';
import config from './config';

export default class Abort extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isProcessing: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isProcessing: true,
    });

    API.abort().then(() => {
      // abort succesfull
      // navigate to intro
      this.context.router.push(config.abort.next);
    })
  }

  render() {
    return (
      <div className="Abort">
        {this.state.isProcessing && <Processing />}
        <PageHeader>
          Please take your card<br />
          <small>Have a good day!</small>
        </PageHeader>

        <Glyphicon className="Abort-card" glyph="credit-card" />
          <br />
          {
            !this.state.isProcessing &&
            <Glyphicon
              className="Abort-arrow"
              glyph="triangle-bottom"
              onClick={this.handleClick}
            />
          }

      </div>
    );
  }
}

Abort.contextTypes = {
  router: React.PropTypes.object.isRequired
};
