class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      storage: 'Pick a name!'
    }
  }

  sendReq(typedInput){
    $.ajax({
      method: "POST",
      url: 'http://127.0.0.1:8888/',
      data: typedInput
    })
    // console.log('sending request of ', typedInput);
  }

  getReq(){
    // var state = this.state;
    // console.log('this is state!!!!!!! ', state)
    let that = this;
    $.ajax({
      method: "GET",
      url: 'http://127.0.0.1:8888/stored',
      success: function(data){
        console.log('got the data! ', data);
        // console.log('here is what I want to change: ', state);
        // state = data.name + ' has ' + data.count + ' votes!';
        // this.setState(...)
        console.log('here is that ', that);
        that.setState({
          storage: 'CONGRATS! ' + data.name + ', with ' + data.count + ' votes!'
        })
      }
    });
    // console.log('is it changed???? ', state)
  }

  render(){
    return(
      <div>
        <Input sendRequest={this.sendReq.bind(this)} getRequest={this.getReq.bind(this)}/>
        <Names person={this.state.storage}/>
      </div>
    )
  }
}

const Names = (props) => (
  <div>
    <h4>
      {props.person}
    </h4>
  </div>
)

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
      console.log('subject: ', this.state.search);
      this.props.sendRequest(text)
      this.setState({
        search: ''
      });
      this.props.getRequest();
    }
  }

  monitor(character){
    this.setState({
      search: character.target.value
    })
  }
  render() {
    return <input type="text" value={this.state.search} onChange={this.monitor.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)