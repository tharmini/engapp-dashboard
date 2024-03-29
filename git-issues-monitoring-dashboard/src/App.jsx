/*
 * Copyright (c) 2019, WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import './App.css';
import IssuesPerTeamTable from './components/IssuesPerTeamTable';
import IssuesForlabelsChart from './components/IssuesForlabelsChart';
import OpenvsClosedGraph from './components/OpenvsClosedChart';
import IssuesAgingGraph from './components/IssuesAgingGraph';
import Paper from '@material-ui/core/es/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import Popup from './components/Popup';

const PageWrapper = withStyles({
  root: {
    padding: '0px 15px 0px 15px',
    background: 'transparent',
    boxShadow: 'none',
    textAlign: 'center',
    color: '#3f51b5'
  }
})(Paper);

const DivBorder = {
  border: '2px solid #aaa',
  overflowX: 'auto',
  borderColor: '#3f51b5',
  width: '700px',
  height: '300px'
};

const PopDivBorder = {
  border: '2px solid #aaa',
  overflowX: 'auto',
  borderColor: '#3f51b5',
  width: '100%',
  height: '100%'
};


class App extends Component {
constructor(props) {
    super(props);
    this.state = { showPopup: false, content: null };
    this.togglePopup = this.togglePopup.bind(this);

  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      content: data
    });
  }

  togglePopupClose() {
    this.setState({
      showPopup: false,
    });
  }
  render() {
    return (
      <PageWrapper>
        <h1> Git Issues Monitoring Dashboard</h1>

        <React.Fragment>
        {this.state.showPopup ?
                    <Popup
                      text={this.state.content}
                      closePopup={this.togglePopupClose.bind(this)}
                    />
                    : null
                  }
          <div className='rowC' >
          <div onClick={(e) => this.togglePopup(<div style={PopDivBorder} ><IssuesPerTeamTable /></div>)}>
            <PageWrapper>
              <h2>Issues Count Per Team</h2>
              <div style={DivBorder} ><IssuesPerTeamTable /></div>
            </PageWrapper>
            <div onClick={(e) => this.togglePopup(<div style={PopDivBorder} ><IssuesForlabelsChart /></div>)}>
            <PageWrapper>
              <h2>Issues Count based on Lables for team</h2>
              <div style={DivBorder} ><IssuesForlabelsChart /></div>
            </PageWrapper>
          </div>
          <div className='rowC'>
          <div onClick={(e) => this.togglePopup(<div style={PopDivBorder} ><OpenvsClosedGraph /></div>)}>
            <PageWrapper>
              <h2>Open vs Closed Chart</h2>
              <div style={DivBorder} ><OpenvsClosedGraph /></div>
            </PageWrapper>
            <div onClick={(e) => this.togglePopup(<div style={PopDivBorder} ><IssuesAgingGraph /></div>)}>
            <PageWrapper>
              <h2>Issues Aging Graph</h2>
              <div style={DivBorder} ><IssuesAgingGraph /></div>
            </PageWrapper>
          </div>
        </React.Fragment>
      </PageWrapper>
    );
  }
}
export default App;