class Stator {
  stateChangeListeners = [];

  currentRule() {}

  isCurrent(data, subsetMatch) {}

  setState(state) {}

  addStateChangeListener(cb) {}

  removeStateChangeListener(cb) {}

  start() {}

  stop() {}
}
