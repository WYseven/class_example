import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js'

import './css/base.css'
import './css/index.css'
// 改变状态，更新视图

let data = [
  {
    id: 1,
    title: '妙味1',
    selected: false
  },
  {
    id: 2,
    title: '妙味2',
    selected: true
  }
]

ReactDOM.render(
  <App list={data} />, 
  document.getElementById('root')
);

