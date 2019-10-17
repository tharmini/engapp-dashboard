import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import "chart.js";

class IssuesForlabelsChart extends Component {
    // initially data is empty in state
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            chartSummary: []
        };
    }

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
            .then(res => res.data)
            .then(data => {
                this.setState({ IssueData: data, isLoaded: true });
                console.log(this.state.IssueData);
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
            <div  >
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <MaterialTable

                    title=""
                    columns={[
                        {
                            title: "Teams", field: "name", cellStyle: {
                                backgroundColor: '#E1E7EF',
                                color: 'black'
                            },
                            headerStyle: {
                                backgroundColor: '#05376F',
                            }
                        },
                        {
                            title: "Num Of Issues", field: "totalIssueCount", cellStyle: {
                                backgroundColor: '#E1E7EF',
                                color: 'black'
                            },
                            headerStyle: {
                                backgroundColor: '#05376F',
                            }
                        }
                    ]}
                    data={this.state.IssueData}

                    options={{
                        responsive: true,
                        exportButton: false,
                        grouping: false,
                        sorting: true,
                        search: false,
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        }
                    }}
                />
            </div>
        );
    }
}
export default IssuesForlabelsChart;