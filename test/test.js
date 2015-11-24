import BlurredImage from '../src';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <BlurredImage alt='a cool image' radius={50} src='/largetest.jpg' style={{width: '100%'}}/>
      </div>
    )
  }
}

var main = document.createElement('div');
main.id = 'app';
document.body.appendChild(main);

ReactDOM.render(<App/>, main);
