import React, { Component } from 'react';
import Notify from 'notifyjs';

import Countdown from './components/countdown';
import Controller from './components/controller';
import InfoBox from './components/info-box';

import { Container } from './App.styled';

const DURATION = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 30 * 60,
};
const SESSIONS = 4;
const GOALS = 12;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isTimeFocus: true,
      isTimeShortBreak: false,
      isTimeLongBreak: false,
      currentSession: 1,
      currentGoal: 1,
      isPaused: true,
      pauseDuration: 0,
      pauseStart: Math.floor(Date.now() / 1000),
    }
  }

  onCountdownEnd = () => {
    this.setState(state => {
      const newState = Object.assign({}, state);

      newState.isTimeFocus = false;
      newState.isTimeShortBreak = false;
      newState.isTimeLongBreak = false;
      newState.pauseDuration = 0;

      if(state.isTimeFocus) { 
        if (state.currentSession < SESSIONS) {
          newState.isTimeShortBreak = true;
        } else {
          newState.isTimeLongBreak = true;
        }
      } else if(state.isTimeLongBreak) {
        newState.isTimeFocus = true;
        newState.currentSession = 1;

        if (newState.currentGoal === GOALS) {
          newState.currentGoal = 1;
          this.pauseCountdown();
        }
      } else if(state.isTimeShortBreak) {
        newState.isTimeFocus = true;
        newState.currentSession = state.currentSession + 1;
        newState.currentGoal = state.currentGoal + 1;
      }

      return newState
    }, () => {
      if (!Notify.needsPermission) {
        if(this.state.isTimeFocus) {
          (new Notify('Focus', { body: `Time to be focused for 25 minutes (round ${this.state.currentSession} of ${SESSIONS})` })).show();
        } else if (this.state.isTimeShortBreak) {
          (new Notify('Short break', { body: `Time to take a break of 5 minutes (round ${this.state.currentSession} of ${SESSIONS})` })).show();
        } else if (this.state.isTimeLongBreak) {
          (new Notify('Long break', { body: `Time to relax for 30 minutes (goal ${this.state.currentGoal} of ${GOALS})` })).show();
        }
      }
    })
  }

  notifyAndToggle = () => {
    if (Notify.needsPermission && Notify.isSupported()) {
      Notify.requestPermission(this.toggleCountdown, this.toggleCountdown)
    } else {
      this.toggleCountdown();
    }
  }

  toggleCountdown = () => {
    if(this.state.isPaused) {
      this.startCountdown();
    } else {
      this.pauseCountdown();
    }
  }

  pauseCountdown = () => {
    this.setState({
      pauseStart: Math.floor(Date.now() / 1000),
      isPaused: true,
    })
  }

  startCountdown = () => {
    this.setState(({ pauseStart, pauseDuration }) => {
      const pauseEnd = Math.floor(Date.now() / 1000)
      const newPauseDuration = pauseDuration + pauseEnd - pauseStart;

      return {
        pauseStart: 0,
        pauseDuration: newPauseDuration,
        isPaused: false,
      }
    })
  }

  render() {
    return (
      <Container>
        {this.state.isTimeFocus && <Countdown color="red" duration={DURATION.focus} onEnd={this.onCountdownEnd} isPaused={this.state.isPaused} pauseDuration={this.state.pauseDuration} />}
        {this.state.isTimeShortBreak && <Countdown color="blue" duration={DURATION.shortBreak} onEnd={this.onCountdownEnd} isPaused={this.state.isPaused} pauseDuration={this.state.pauseDuration} />}
        {this.state.isTimeLongBreak && <Countdown color="green" duration={DURATION.longBreak} onEnd={this.onCountdownEnd} isPaused={this.state.isPaused} pauseDuration={this.state.pauseDuration} />}
        <Controller onClick={this.notifyAndToggle} isPaused={this.state.isPaused} />
        <div>
          <InfoBox current={this.state.currentSession} total={SESSIONS} title="Round" />
          <InfoBox current={this.state.currentGoal} total={GOALS} title="Goal" />
        </div>
      </Container>
    );
  }
}

export default App;
