import React from 'react';
import { connect } from 'react-redux';

import GameScreens from './GameScreens';

@connect(
  state => ({
    activeScreen: state.app.activeScreen
  }),
  dispatch => ({
    dispatch
  })
)
class App extends React.Component {
  render() {
    const { activeScreen } = this.props;

    return (
      <div className="app">
        <div id="game" className="game" />
        <GameScreens activeScreen={activeScreen} />
      </div>
    );
  }
}

export default App;
