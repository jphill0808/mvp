'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Initial problem: babel did not recognize the html tags
Solution: installed babelrc and gave the preset of es2015 and react
*/

//put it in the window instead
var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      search: ''
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'handleKeyPress',
    value: function handleKeyPress(value) {
      if (value.key === 'Enter') {
        // console.log('pressed Enter');
        var text = this.state.search;
        console.log('input value: ', this.state.search);
        this.props.sendRequest(text);
        this.setState({
          search: ''
        });
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
      return React.createElement('input', { type: 'text', value: this.state.search, onKeyPress: this.handleKeyPress.bind(this), onChange: this.monitor.bind(this) });
    }
  }]);

  return Input;
}(React.Component);

// console.log('Input: ', Input)


window.Input = Input;