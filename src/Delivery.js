import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './Delivery.css';
import Processing from './components/Processing';
import bills from './images/bills.svg';
import API from './api/api';
import config from './config';

export default class Delivery extends Component {
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    API.deliveringCash().then(() => {
      // delivery succesfull
      // navigate to next page
      this.context.router.push(config.delivery.next);
    });
  }

  render() {
    return (
      <div className="Delivery">
        <PageHeader>
          Preparing your bills<br />
          <small>Please wait</small>
        </PageHeader>
        <img src={ bills } className="Delivery-bills" alt="Bills icon" />
        <br />
        <Processing />
      </div>
    );
  }
}

Delivery.contextTypes = {
  router: React.PropTypes.object.isRequired
};
