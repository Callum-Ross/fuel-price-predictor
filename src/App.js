import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { siteDetails, predictPrices } from "./api";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./App.css";

import { Line } from "react-chartjs-2";

class Charty extends React.Component {
  render() {
    const state = {
      labels: ["January", "February", "March", "April", "May"],

      datasets: [
        {
          label: "Rainfall",

          fill: false,

          lineTension: 0.5,

          backgroundColor: "rgba(75,192,192,1)",

          borderColor: "rgba(0,0,0,1)",

          borderWidth: 2,

          data: [65, 59, 80, 81, 56]
        },
        {
          label: "Not",

          fill: false,

          lineTension: 0.5,

          backgroundColor: "rgba(75,192,192,1)",

          borderColor: "rgba(0,0,0,1)",

          borderWidth: 2,

          data: [67, 55, 90, 92, 23]
        }
      ]
    };
    return (
      <div style={{ height: "60%", width: "70%", padding: "1%" }}>
        <Line
          data={state}
          options={{
            title: {
              display: true,

              text: "Predicted Price",

              fontSize: 50
            },

            legend: {
              display: true,

              position: "right"
            }
          }}
        />
      </div>
    );
  }
}

class Dropdown extends React.Component {
  state = {
    selectedOption: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });

    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const animatedComponents = makeAnimated();
    let displayed = this.props.displayed;
    var options = [];
    let type = "Loading...";
    console.log(displayed);
    if (typeof displayed.S !== "undefined") {
      if (this.props.props === 1) {
        type =
          "Please select a site location to predict, leave empty to select all..";
        for (var site in displayed.S) {
          let label = displayed.S[site]["Site Name"];
          let value = displayed.S[site]["SiteId"];
          let option = { value: value, label: label };
          options.push(option);
        }
      }
    }
    if (typeof displayed.Num !== "undefined") {
      if (this.props.props === 2) {
        console.log("dfsdf");
        type = "How many days do you wish to predict?";
        options = displayed.Num;
      }
    }

    const { selectedOption } = this.state;

    return (
      <>
        <div
          style={{
            width: "30%",
            //paddingLeft: "2.5%",
            zIndex: "auto"
            // position: "absolute"
          }}
        >
          {this.props.props === 1 ? (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              style={{ zIndex: "auto" }}
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              placeholder={type}
              isMulti
            />
          ) : (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              style={{ zIndex: "auto" }}
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              placeholder={type}
            />
          )}
        </div>
      </>
    );
  }
}
function App() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    siteDetails().then(res => setSites(res));
  }, []);

  var array = { Num: [] };
  for (var i = 1; i < 21; i++) {
    array.Num.push({ value: i, label: i });
  }

  return (
    <div className="App">
      <div>
        <h1>
          Fuel Price Prediction - CAB432
          <br />
          Callum Ross n10225684, Jack Hu n10176250
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Dropdown props={1} displayed={sites} />
        <Dropdown props={2} displayed={array} />
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex"
        }}
      ></div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          paddingTop: "2%"
        }}
      >
        <AwesomeButton
          type="primary"
          onPress={() => {
            predictPrices();
          }}
        >
          Predict them Prices!
        </AwesomeButton>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Charty />
      </div>
    </div>
  );
}

export default App;
