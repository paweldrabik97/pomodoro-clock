function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}console.clear();

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mm: "" + this.props.sessionLength,
      ss: "00",
      min: this.props.sessionLength,
      sec: 0,
      break: false,
      timerLabel: "Session" };

  }

  componentDidMount() {
    this.interval = setInterval(
    () => this.setState({ time: Date.now() }),
    1000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reset !== prevProps.reset && this.props.reset) {
      this.setState({
        mm: "" + this.props.sessionLength,
        ss: "00",
        min: this.props.sessionLength,
        sec: 0,
        break: false,
        timerLabel: "Session" });

    }
    if (this.props.sessionLength !== prevProps.sessionLength) {
      this.setState({
        mm: "" + this.props.sessionLength,
        ss: "00",
        min: this.props.sessionLength,
        sec: 0 });

    }
    if (this.state.time !== prevState.time && this.props.start) {
      let min = this.state.min;
      let sec = this.state.sec;
      let isBreak = this.state.break;
      let timerLabel = this.state.timerLabel;

      if (!isBreak && min === 0 && sec === 0) {
        min = this.props.breakLength;
        sec = 0;
        isBreak = true;
        timerLabel = "Break";
      } else if (isBreak && min === 0 && sec === 0) {
        min = this.props.sessionLength;
        sec = 0;
        isBreak = true;
        timerLabel = "Session";
      } else {
        min = this.state.sec > 0 ? this.state.min : this.state.min - 1;
        sec = this.state.sec > 0 ? this.state.sec - 1 : 59;
      }
      if (min === 0 && sec === 0) {
        document.getElementById("beep").play();
      }

      //settin state of display of minutes and secondes left
      this.setState({
        min: min,
        sec: sec,
        mm: min.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false }),

        ss: sec.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false }),

        break: isBreak,
        timerLabel: timerLabel });

    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { id: "timer-div" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.timerLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      this.state.mm, ":", this.state.ss)), /*#__PURE__*/


      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


class Clock extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleBreakDec",












    () => {
      if (!this.state.start) {
        const breakLength =
        this.state.breakLength > 1 ? this.state.breakLength - 1 : 1;
        this.setState({ breakLength: breakLength });
      }
    });_defineProperty(this, "handleBreakInc",

    () => {
      if (!this.state.start) {
        const breakLength =
        this.state.breakLength < 60 ? this.state.breakLength + 1 : 60;
        this.setState({ breakLength: breakLength });
      }
    });_defineProperty(this, "handleSessionDec",

    () => {
      if (!this.state.start) {
        const sessionLength =
        this.state.sessionLength > 1 ? this.state.sessionLength - 1 : 1;
        this.setState({ sessionLength: sessionLength });
      }
    });_defineProperty(this, "handleSessionInc",

    () => {
      if (!this.state.start) {
        const sessionLength =
        this.state.sessionLength < 60 ? this.state.sessionLength + 1 : 60;
        this.setState({ sessionLength: sessionLength });
      }
    });_defineProperty(this, "handleStart",

    () => {
      this.setState({
        start: this.state.start ? false : true,
        reset: false });

    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        start: false,
        reset: true });

      document.getElementById("beep").currentTime = 0;
      document.getElementById("beep").pause();
    });this.state = { breakLength: 5, sessionLength: 25, start: false, reset: true };this.handleBreakDec = this.handleBreakDec.bind(this);this.handleBreakInc = this.handleBreakInc.bind(this);this.handleSessionDec = this.handleSessionDec.bind(this);this.handleSessionInc = this.handleSessionInc.bind(this);}

  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { class: "main-title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { class: "length-control" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", {
        id: "break-decrement",
        class: "btn-level",
        onClick: this.handleBreakDec }, /*#__PURE__*/

      React.createElement("i", { class: "fa fa-arrow-down fa-2x" })), /*#__PURE__*/

      React.createElement("span", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("button", {
        id: "break-increment",
        class: "btn-level",
        onClick: this.handleBreakInc }, /*#__PURE__*/

      React.createElement("i", { class: "fa fa-arrow-up fa-2x" })))), /*#__PURE__*/



      React.createElement("div", { class: "length-control" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", {
        id: "session-decrement",
        class: "btn-level",
        onClick: this.handleSessionDec }, /*#__PURE__*/

      React.createElement("i", { class: "fa fa-arrow-down fa-2x" })), /*#__PURE__*/

      React.createElement("span", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("button", {
        id: "session-increment",
        class: "btn-level",
        onClick: this.handleSessionInc }, /*#__PURE__*/

      React.createElement("i", { class: "fa fa-arrow-up fa-2x" })))), /*#__PURE__*/



      React.createElement(Timer, {
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength,
        start: this.state.start,
        reset: this.state.reset }), /*#__PURE__*/

      React.createElement("div", { id: "controls" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handleStart }, /*#__PURE__*/
      React.createElement("i", { class: "fa fa-play fa-2x" }), /*#__PURE__*/
      React.createElement("i", { class: "fa fa-pause fa-2x" })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.handleReset }, /*#__PURE__*/
      React.createElement("i", { class: "fa fa-refresh fa-2x" })))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("app"));