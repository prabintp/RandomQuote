import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Swipeable from 'react-swipeable';
import detectTouch from 'detect-touch';


class QuoteContainer extends Component {
  render() {
    return (
      <div className="quoteContainer">
        <ul>
          <li dangerouslySetInnerHTML={{__html: this.props.quote}}>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {quotes: []};
    this.handleClick = this.handleClick.bind(this);
    this.addIsTouchClass();
  }

  addIsTouchClass(){
    if(detectTouch.hasTouch === true){
      $('html').addClass('touch');
    }
  }

  handleClick() {
    this.getQuote();
  }

  ran_col() { //function name
    var color,safeColors = ['00','33','66','99','cc','ff'];
    var rand = function() {
      return Math.floor(Math.random()*6);
    };
      var r = safeColors[rand()];
      var g = safeColors[rand()];
      var b = safeColors[rand()];
      color = "#"+r+g+b;
      document.getElementById('appContainer').style.background = color;
  }

  componentDidMount() {
    $.ajaxSetup({ cache: false });
    this.getQuote();
    this.addSwipeEvent();
  }

  getQuote() {
      return $.getJSON('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
        .then((data) => {
          this.setState({ quotes: data[0].content });
          this.ran_col();
        });
    }

  render() {
    return (
    <Swipeable onSwiped={this.handleClick} onTap={this.handleClick} preventDefaultTouchmoveEvent={true}>
      <div className="App appContainer" id="appContainer">
        <div className="App-intro">
          <QuoteContainer quote={this.state.quotes} />
        </div>
        <div className="nextButton">
          <button  value="Try other" onClick={this.handleClick}>Try Other</button>
        </div>
      </div>
      <div className="infoMsg">
        Try Next with <em>Swipe</em> or <em>Tap</em>
      </div>
    </Swipeable>
    );
  }
}



export default App;
