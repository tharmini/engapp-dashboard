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
import { LineChart } from 'react-chartkick';
import 'chart.js';
import axios from "axios";

export let getChartData = chartSummary => {
    let IssueCountDetails = [];
    for (let i = 0; i < chartSummary.length; i++) {
        let IssueCount = {};
        IssueCount.name = chartSummary[i].name;
        IssueCount.data = {};

        let summaryData = chartSummary[i].data;

        for (let key in summaryData) {
            if (summaryData.hasOwnProperty(key)) {
                let sumDate = summaryData[key].date;
                IssueCount.data[sumDate] = summaryData[key].count;
            }
        }
        IssueCountDetails.push(IssueCount);
    }
    return IssueCountDetails;
};

export default class OpenvsClosedChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            chartSummary: []
        };
    }

    componentDidMount() {
        axios
            .create({
                withCredentials: false
            })
            .get('http://' + process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/gitIssues/count')
            .then(res => res.data)
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        chartSummary: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        if (!this.state.isLoaded) {
            return <p>Loading...</p>;
        }
        var chartData = getChartData(this.state.chartSummary);
        return (
            <div>
                <LineChart
                    data={chartData}
                    colors={['#B80000', '#2E7442']}
                    curve={false}
                    // width={'650px'}
                    // height={'250px'}
                    messages={{ empty: 'Data is not Available' }}
                    library={{
                        legend: {
                            labels: {
                                fontColor: '#3f51b5'
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: { fontColor: '#3f51b5' },
                                    scaleLabel: { fontColor: '#3f51b5' }
                                }
                            ],
                            xAxes: [
                                {
                                    ticks: { fontColor: '#3f51b5' }
                                }
                            ]
                        }
                    }}
                />
            </div>
        );
    }
}
