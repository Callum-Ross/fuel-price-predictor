import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { siteDetails, fuelTypes } from "./api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class TimePeriod extends React.Component {
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
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
    const options = [];
    let type = "Please select a time to predict, leave empty to select all...";

    if (typeof displayed.S !== "undefined") {
      if (this.props.props === 1) {
        type =
          "Please select a site location to predict, leave empty to select all..";
        for (var site in displayed.S) {
          let label = displayed.S[site].N;
          let value = displayed.S[site].A;
          let option = { value: value, label: label };
          options.push(option);
        }
      }
    }
    if (typeof displayed.Fuels !== "undefined") {
      if (this.props.props === 2) {
        console.log("dfsdf");
        type =
          "Please select a Fuel Type to predict, leave empty to select all..";
        for (var fuel in displayed.Fuels) {
          let label = displayed.Fuels[fuel].Name;
          let value = displayed.Fuels[fuel].FuelId;
          let option = { value: value, label: label };
          options.push(option);
        }
      }
    }

    // for (var i in this.props.tag) {
    //   let myObj = {};
    //   myObj.value = this.props.tag[i].value;
    //   myObj.label = this.props.tag[i].label;
    //   options.push(myObj);
    // }
    // console.log(options);

    const { selectedOption } = this.state;

    return (
      <div
        style={{
          width: "30%",
          paddingLeft: "2.5%",
          zIndex: "auto"
          // position: "absolute"
        }}
      >
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
      </div>
    );
  }
}
function App() {
  const [sites, setSites] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    siteDetails().then(res => setSites(res));
  }, []);
  useEffect(() => {
    fuelTypes().then(res => setTypes(res));
  }, []);
  console.log(types);
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Dropdown props={1} displayed={sites} />
        <Dropdown props={2} displayed={types} />
        <Dropdown props={3} displayed={sites} />
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex"
        }}
      >
        <TimePeriod />

        <TimePeriod />
      </div>
    </div>
  );
}

export default App;
