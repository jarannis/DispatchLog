import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import Theme from './Theme';
import './App.css';
//injectTapEventPlugin();
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import MenuBar from './MenuBar';

const theme = createMuiTheme({
  pallette : {
    primary: {
      main: '#039be5',
    },
    secondary: indigo,
  },
});



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      curPage: "home",
    }
  }
  componentWillMount(){

  }
  render() {
    var AppBar = MenuBar.ButtonAppBar;
    return (
      <div className="App">
        <MenuBar curPage={this.state.curPage} />
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default App;