import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import config from './../config';
import './ActionBar.css';

export default class ActionBar extends Component {
  render() {
    const { showNext, backLink, nextLabel } = this.props;

    return (
      <div className="ActionBar">
          <Link to={backLink}>
            <Button
              className="ActionBar-back">
              <Glyphicon glyph="chevron-left" />
              Back
            </Button>
          </Link>

        { showNext &&
          <Button
            className="ActionBar-next"
            bsStyle="primary"
            bsSize="large"
            onClick={this.props.onNextClick}
          >
            { nextLabel || 'Confirm' }
          </Button>
        }

        <Link to={config.abortLink}>
          <Button
            className="ActionBar-retreive">
            <Glyphicon glyph="log-out" />
            Exit
          </Button>
        </Link>
      </div>
    );
  }
}

ActionBar.propTypes = {
  showNext: React.PropTypes.bool.isRequired,
  onNextClick: React.PropTypes.func,
  backLink: React.PropTypes.string.isRequired,
  nextLabel: React.PropTypes.string,
};
