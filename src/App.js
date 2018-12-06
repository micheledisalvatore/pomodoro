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
    super(props);

    this.state = {
      isTimeFocus: true,
      isTimeShortBreak: false,
      isTimeLongBreak: false,
      currentSession: 1,
      currentGoal: 1,
      isPaused: true,
      pauseDuration: 0,
      pauseStart: Math.floor(Date.now() / 1000),
    };
  }

  onCountdownEnd = () => {
    this.setState((state) => {
      const newState = Object.assign({}, state);

      newState.isTimeFocus = false;
      newState.isTimeShortBreak = false;
      newState.isTimeLongBreak = false;
      newState.pauseDuration = 0;

      if (state.isTimeFocus) {
        if (state.currentSession < SESSIONS) {
          newState.isTimeShortBreak = true;
        } else {
          newState.isTimeLongBreak = true;
        }
      } else if (state.isTimeLongBreak) {
        newState.isTimeFocus = true;
        newState.currentSession = 1;

        if (newState.currentGoal === GOALS) {
          newState.currentGoal = 1;
          this.pauseCountdown();
        }
      } else if (state.isTimeShortBreak) {
        newState.isTimeFocus = true;
        newState.currentSession = state.currentSession + 1;
        newState.currentGoal = state.currentGoal + 1;
      }

      return newState;
    }, () => {
      const {
        isTimeFocus,
        currentSession,
        isTimeShortBreak,
        isTimeLongBreak,
        currentGoal,
      } = this.state;

      if (!Notify.needsPermission) {
        if (isTimeFocus) {
          (new Notify('Focus', { body: `Time to be focused for 25 minutes (round ${currentSession} of ${SESSIONS})` })).show();
        } else if (isTimeShortBreak) {
          (new Notify('Short break', { body: `Time to take a break of 5 minutes (round ${currentSession} of ${SESSIONS})` })).show();
        } else if (isTimeLongBreak) {
          (new Notify('Long break', { body: `Time to relax for 30 minutes (goal ${currentGoal} of ${GOALS})` })).show();
        }
      }
    });
  }

  notifyAndToggle = () => {
    if (Notify.needsPermission && Notify.isSupported()) {
      Notify.requestPermission(this.toggleCountdown, this.toggleCountdown);
    } else {
      this.toggleCountdown();
    }
  }

  toggleCountdown = () => {
    const { isPaused } = this.state;

    if (isPaused) {
      this.startCountdown();
    } else {
      this.pauseCountdown();
    }
  }

  pauseCountdown = () => {
    this.setState({
      pauseStart: Math.floor(Date.now() / 1000),
      isPaused: true,
    });
  }

  startCountdown = () => {
    this.setState(({ pauseStart, pauseDuration }) => {
      const pauseEnd = Math.floor(Date.now() / 1000);
      const newPauseDuration = pauseDuration + pauseEnd - pauseStart;

      return {
        pauseStart: 0,
        pauseDuration: newPauseDuration,
        isPaused: false,
      };
    });
  }

  render() {
    const {
      isTimeFocus,
      isPaused,
      isTimeShortBreak,
      isTimeLongBreak,
      currentSession,
      currentGoal,
      pauseDuration,
    } = this.state;
    return (
      <Container>
        {isTimeFocus && <Countdown color="red" duration={DURATION.focus} onEnd={this.onCountdownEnd} isPaused={isPaused} pauseDuration={pauseDuration} />}
        {isTimeShortBreak && <Countdown color="blue" duration={DURATION.shortBreak} onEnd={this.onCountdownEnd} isPaused={isPaused} pauseDuration={pauseDuration} />}
        {isTimeLongBreak && <Countdown color="green" duration={DURATION.longBreak} onEnd={this.onCountdownEnd} isPaused={isPaused} pauseDuration={pauseDuration} />}
        <Controller onClick={this.notifyAndToggle} isPaused={isPaused} />
        <div>
          <InfoBox current={currentSession} total={SESSIONS} title="Round" />
          <InfoBox current={currentGoal} total={GOALS} title="Goal" />
        </div>
      </Container>
    );
  }
}

export default App;
