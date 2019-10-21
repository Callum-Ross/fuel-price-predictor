import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { siteDetails, predictPrices } from "./api";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./App.css";

import { Line } from "react-chartjs-2";
function randomColor() {
  var color =
    "rgb(" +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    ")";

  return color;
}
class Charty extends React.Component {
  render() {
    var data = [];
    console.log(this.props.predict);
    if (typeof this.props.predict[0] !== "undefined") {
      console.log(this.props.predict[0]);
      for (var q of this.props.predict) {
        var prices = [];
        var label = [];
        var line = "";
        for (var x of q.prediction.results) {
          var colour = randomColor();

          console.log(x);
          label.push(x.date);
          prices.push(x.price);
          line = "SiteID: " + x.siteid;
        }
        data.push({
          label: line,
          fill: false,
          lineTension: 0.5,
          backgroundColor: colour,
          borderColor: colour,
          borderWidth: 2,
          data: prices
        });
      }
    }

    // for (var i of this.props.predict) {
    //   prices.push(i.prediction.results[index].price / 1000);
    //   index = index + 1;
    // }

    const state = {
      labels: label,
      datasets: data
    };
    return (
      <div style={{ height: 700, width: "100%" }}>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20
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
    selectedOption: null,
    Days: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.setSelected(selectedOption);
    console.log(selectedOption);
  };
  handleChange2 = Days => {
    this.setState({ Days });
    this.props.setDays(Days);
    console.log(Days);
  };

  render() {
    const animatedComponents = makeAnimated();
    let displayed = this.props.displayed;
    var options = [];
    let type = "Loading...";
    if (typeof displayed.S !== "undefined") {
      if (this.props.props === 1) {
        type = "Please select a site location to predict..";
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
        type = "How many days do you wish to predict?";
        options = displayed.Num;
      }
    }

    const { selectedOption } = this.state;
    const { Days } = this.state;

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
              value={Days}
              onChange={this.handleChange2}
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
  const [predict, setPrediction] = useState([]);
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState([]);
  console.log(predict);
  useEffect(() => {
    siteDetails().then(res => setSites(res));
  }, []);
  var array = { Num: [] };
  for (var i = 1; i < 15; i++) {
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
        <Dropdown
          props={1}
          displayed={sites}
          setSelected={setSelected}
          setDays={setDays}
        />
        <Dropdown
          props={2}
          displayed={array}
          setSelected={setSelected}
          setDays={setDays}
        />
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
          onPress={async function() {
            var yes = await callPrices(selected, days);
            setPrediction(yes);
            console.log(yes);
          }}
        >
          Predict them Prices!
        </AwesomeButton>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Charty predict={predict} />
      </div>
    </div>
  );
}
async function callPrices(selected, days) {
  var yes = [];
  for (var i in selected) {
    var pred = await predictPrices(selected[i], days.value);
    yes.push(pred);
  }
  return yes;
}
export default App;
