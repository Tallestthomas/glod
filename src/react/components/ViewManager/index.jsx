import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../../utils/history';
import { Timer, SplitsMenu } from '..';

class ViewManager extends React.Component {
  static Views() {
    return {
      timer: <Timer />,
      settings: <SplitsMenu />,
    };
  }

  static View(props) {
    console.log(props);
    const name = props.location.search.substr(1);
    const view = ViewManager.Views()[name];
    if (view == null) { throw new Error(`View '${name}' is undefined`); }
    return view;
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={ViewManager.View} />
        </div>
      </Router>
    );
  }
}

export default ViewManager;
