/*
Initial problem: babel did not recognize the html tags
Solution: installed babelrc and gave the preset of es2015 and react
*/

//put it in the window instead
class Input extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  handleKeyPress(value){
    if(value.key === 'Enter') {
      // console.log('pressed Enter');
      var text = this.state.search;
      console.log('input value: ', this.state.search);
      this.props.sendRequest(text)
      this.setState({
        search: ''
      });
    }
  }

  monitor(character){
    this.setState({
      search: character.target.value
    })
  }
  render() {
    return <input type="text" value={this.state.search} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.monitor.bind(this)}/>
  }
}


// console.log('Input: ', Input)
window.Input = Input;