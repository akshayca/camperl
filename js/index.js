'use strict';

var xmlhttp = new XMLHttpRequest();
var recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
var allTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    recentCallback(myArr);
  }
};
xmlhttp.open("GET", recentUrl, true);
xmlhttp.send();

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    alltimeCallback(myArr);
  }
};
xhr.open("GET", allTimeUrl, true);
xhr.send();
var recentObj;
var alltimeObj;
var count = 0;

function recentCallback(myArr) {
  recentObj = myArr;
  count++;
  if (count >= 2) {
    myApp();
  }
}

function alltimeCallback(myArr) {
  count++;
  alltimeObj = myArr;
  if (count >= 2) {
    myApp();
  }
}

function myApp() {

  var Header = React.createClass({
    displayName: 'Header',

    render: function render() {
      return React.createElement(
        'div',
        { id: 'header' },
        React.createElement(
          'h1',
          { className: 'text-center' },
          'FreeCodeCamp Leaderboard'
        )
      );
    }
  });

  var Camper = React.createClass({
    displayName: 'Camper',

    render: function render() {

      return React.createElement(
        'tr',
        { className: 'active text-center', id: 'myList' },
        React.createElement(
          'td',
          { className: 'info index' },
          this.props.indexProp
        ),
        React.createElement(
          'td',
          { className: 'info pic' },
          React.createElement('img', { className: 'img img-responsive img-circle prof-pic', src: this.props.imageProp })
        ),
        React.createElement(
          'td',
          { className: 'info name' },
          React.createElement(
            'a',
            { href: "https://www.freecodecamp.com/" + this.props.nameProp, target: '_blank' },
            React.createElement(
              'span',
              { id: 'camper-name' },
              ' ',
              this.props.nameProp
            )
          )
        ),
        React.createElement(
          'td',
          { className: 'info recent' },
          ' ',
          this.props.recentProp,
          ' '
        ),
        React.createElement(
          'td',
          { className: 'info all-time' },
          this.props.alltimeProp
        )
      );
    }
  });

  var Leaderboard = React.createClass({
    displayName: 'Leaderboard',

    getInitialState: function getInitialState() {
      return {
        recent: recentObj,
        alltime: alltimeObj,
        defaultDisplay: alltimeObj
      };
    },
    updateState: function updateState(newState) {
      this.setState({
        defaultDisplay: newState
      });
      //console.log(this.state.text);
    },
    switchToAlltime: function switchToAlltime() {
      this.updateState(this.state.alltime);
    },
    switchToRecent: function switchToRecent() {
      this.updateState(this.state.recent);
    },
    render: function render() {
      var rows = [];
      for (var i = 0; i < this.state.defaultDisplay.length; i++) {
        var display = this.state.defaultDisplay[i];

        rows.push(React.createElement(Camper, { keyProp: i + 1,
          indexProp: i + 1,
          imageProp: display.img,
          nameProp: display.username,
          recentProp: display.recent,
          alltimeProp: display.alltime
        }));
      }

      return React.createElement(
        'div',
        { className: 'table-responsive text-center data-table' },
        React.createElement(
          'table',
          { className: 'table table-condensed table-hover table-bordered table-striped data-table' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              { className: 'active', key: 'header' },
              React.createElement(
                'td',
                { className: 'info index' },
                '#'
              ),
              React.createElement('td', { className: 'info pic' }),
              React.createElement(
                'td',
                { className: 'info name' },
                'Camper Name'
              ),
              React.createElement(
                'td',
                { className: 'info recent' },
                React.createElement(
                  'a',
                  { onClick: this.switchToRecent },
                  'Past 30 days'
                )
              ),
              React.createElement(
                'td',
                { className: 'info all-time' },
                React.createElement(
                  'a',
                  { onClick: this.switchToAlltime },
                  'All Time'
                )
              )
            )
          ),
          rows
        )
      );
    }

  });

  var AppClass = React.createClass({
    displayName: 'AppClass',

    render: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Header, null),
        React.createElement(Leaderboard, null)
      );
    }
  });

  ReactDOM.render(React.createElement(AppClass, null), document.getElementById('app'));
}