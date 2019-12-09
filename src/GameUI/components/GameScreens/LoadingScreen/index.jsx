import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from '../../Default/ProgressBar';

@connect(
  state => ({
    progress: state.loading.progress
  }),
  dispatch => ({
    dispatch
  })
)
class LoadingScreen extends React.Component {
  render() {
    const { progress } = this.props;
    return (
      <div className="game-screen-content">
        <div className="game-screen-item game-screen-title">Textures laden</div>
        <div className="game-screen-item">
          <ProgressBar progress={progress} />
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
