import React, { Component } from 'react';
import 'chart.js';
import axios from "axios";
import { Bar } from "react-chartjs-2";

class IssuesForlabelsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            timeStamp: "",
            isLoaded: false
        };
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "bottom",
        chartName: "Git Issue"
    };

    componentDidMount() {
        const getProductNamesURL =
            "http://" +
            process.env.REACT_APP_HOST +
            ":" +
            process.env.REACT_APP_PORT +
            "/gitIssues/issueCount";
        axios
            .create({
                withCredentials: false
            })
            .get(getProductNamesURL)
            .then(res => {
                var response = res.data;
                console.log("response", response);
                var ProductName = response.map(function (e) {
                    return e.name;
                });
                var L1IssueCount = response.map(function (e) {
                    return e.L1IssueCount;
                });
                var L2IssueCount = response.map(function (e) {
                    return e.L2IssueCount;
                });
                var L3IssueCount = response.map(function (e) {
                    return e.L3IssueCount;
                });

                this.setState({

                    isLoaded: true,
                    chartData: {
                        labels: ProductName,
                        datasets: [
                            {
                                label: "Severity/Blocker",
                                data: L1IssueCount,
                                backgroundColor: "#8d0f06"
                            },
                            {
                                label: "Severity/Critical",
                                data: L2IssueCount,
                                backgroundColor: "#d45810"
                            },
                            {
                                label: "Severity/Major",
                                data: L3IssueCount,
                                backgroundColor: "#d4c70e"
                            }
                        ]
                    }
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return <p>Loading...</p>;
        }
        return (
            <div className="App">
                <div>
                    <div className="chart">
                        <Bar
                            data={this.state.chartData}
                            stacked={true}
                            responsive={true}
                            maintainAspectRatio={false}

                            options={{

                                responsive: true,
                                animation: {
                                    duration: 1,
                                    onComplete: function () {
                                        var chartInstance = this.chart,
                                            ctx = chartInstance.ctx;
                                        ctx.textAlign = "center";
                                        ctx.textBaseline = "bottom";
                                        this.data.datasets.forEach(function (dataset, i) {
                                            var meta = chartInstance.controller.getDatasetMeta(i);
                                            meta.data.forEach(function (bar, index) {
                                                var data = dataset.data[index];
                                                if (data !== 0) {
                                                    ctx.fillText(data, bar._model.x, bar._model.y - 0);
                                                }
                                            });
                                        });
                                    }
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            display: true,
                                            ticks: {
                                                fontColor: "#05376F",
                                                fontWeight: "bold",
                                                fontFamily: "sans-serif",
                                                beginAtZero: true,


                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Teams',
                                                fontWeight: "bold",
                                                fontFamily: "sans-serif",
                                                fontColor: "#05376F ",



                                            },
                                            // barPercentage: 1,
                                            minBarLength: 0,
                                            gridLines: {
                                                //display: true,
                                                drawBorder: true,
                                                offsetGridLines: true,
                                                color: " #d5dee2",
                                                drawTicks: true,
                                                drawOnChartArea: true,
                                                circular: true
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            display: true,
                                            ticks: {
                                                fontColor: "black",
                                                beginAtZero: true
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Number of Issues',
                                                fontWeight: "bold",
                                                fontFamily: "sans-serif",
                                                fontColor: "#05376F ",

                                            },

                                            fontColor: "red",
                                            gridLines: {
                                                //display: true,
                                                drawBorder: true,
                                                offsetGridLines: true,
                                                color: " #d5dee2",
                                                drawTicks: true,
                                                drawOnChartArea: true,
                                                circular: true
                                            }
                                        }
                                    ]
                                },
                                legend: {
                                    labels: {
                                        fontColor: "#3f51b5"
                                    },
                                    display: "true",
                                    position: "top"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default IssuesForlabelsChart;
