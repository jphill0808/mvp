'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      storage: 'Pick a name!'
    };
    return _this;
  }

  _createClass(App, [{
    key: 'sendReq',
    value: function sendReq(typedInput) {
      $.ajax({
        method: "POST",
        url: 'http://127.0.0.1:8888/',
        data: typedInput
      });
      // console.log('sending request of ', typedInput);
    }
  }, {
    key: 'getReq',
    value: function getReq() {
      // var state = this.state;
      // console.log('this is state!!!!!!! ', state)
      var that = this;
      $.ajax({
        method: "GET",
        url: 'http://127.0.0.1:8888/stored',
        success: function success(data) {
          console.log('got the data! ', data);
          // console.log('here is what I want to change: ', state);
          // state = data.name + ' has ' + data.count + ' votes!';
          // this.setState(...)
          console.log('here is that ', that);
          that.setState({
            storage: 'CONGRATS! ' + data.name + ', with ' + data.count + ' votes!'
          });
        }
      });
      // console.log('is it changed???? ', state)
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Input, { sendRequest: this.sendReq.bind(this), getRequest: this.getReq.bind(this) }),
        React.createElement(Names, { person: this.state.storage })
      );
    }
  }]);

  return App;
}(React.Component);

var Names = function Names(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      props.person
    )
  );
};

// class NameLists extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       search: '',
//       count: 0
//     }
//   }

//   updateReq() {}

//   render() {
//     return <h4>
//       Congrats! {this.state.search}
//     </h4>
//   }
// }

var Input = function (_React$Component2) {
  _inherits(Input, _React$Component2);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this2 = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this2.state = {
      search: ''
    };
    return _this2;
  }

  _createClass(Input, [{
    key: 'handleKeyPress',
    value: function handleKeyPress(value) {
      if (value.key === 'Enter') {
        // console.log('pressed Enter');
        var text = this.state.search;
        console.log('subject: ', this.state.search);
        this.props.sendRequest(text);
        this.setState({
          search: ''
        });
        this.props.getRequest();
      }
    }
  }, {
    key: 'monitor',
    value: function monitor(character) {
      this.setState({
        search: character.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('input', { type: 'text', value: this.state.search, onChange: this.monitor.bind(this), onKeyPress: this.handleKeyPress.bind(this) });
    }
  }]);

  return Input;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));