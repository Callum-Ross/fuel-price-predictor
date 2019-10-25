import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { siteDetails, predictPrices } from "./api";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./App.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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

    if (typeof this.props.predict[0] !== "undefined") {
      for (var q of this.props.predict) {
        var prices = [];
        var label = [];
        var line = "";
        for (var x of q.prediction.results) {
          var colour = randomColor();

          label.push(x.date);
          prices.push(x.price / 1000);
          line = x.address;
        }
        data.push({
          label: line,
          fill: false,
          lineTension: 0.1,
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
      <div style={{ height: 200, width: "100%" }}>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Fuel Price Predictor, in AUD",
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
  };
  handleChange2 = Days => {
    this.setState({ Days });
    this.props.setDays(Days);
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

          let option = { value: displayed.S[site]["value"], label: label };

          options.push(option);
        }
      }
    }
    if (typeof displayed.Num !== "undefined") {
      if (this.props.props === 2) {
        type = "How many days do you wish to predict? (Default is 3)";
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
              hideSelectedOptions={false}
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

function graphPin(predict) {
  var position = [];
  position = predict.location;

  var data = [];
  var labelDates = [];
  for (var dates of predict.prediction.results) {
    labelDates.push(dates.date);
  }
  for (var yo of predict.prediction.results) {
    data.push(yo.price);
  }
  const state = {
    labels: labelDates,
    datasets: [
      {
        label: predict.prediction.results[0].address,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: data
      }
    ]
  };
  return (
    <div style={{ marginRight: "2000%" }}>
      <Marker
        position={position}
        style={{ height: "100%", width: "150%", marginRight: "100px" }}
      >
        <Popup>
          <div style={{ height: 200, width: 325 }}>
            <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text:
                    "Fuel Forecast " + predict.prediction.results[0].address,
                  fontSize: 15
                },
                legend: {
                  display: false,
                  position: "right"
                }
              }}
            />
          </div>
        </Popup>
      </Marker>
      <div styling={{ width: 1000 }}></div>
    </div>
  );
}

function MapReact(predict) {
  const position = [-27.4698, 153.0251];
  return (
    <Map
      center={position}
      zoom={8}
      style={{
        height: "675px",
        zIndex: 1,
        width: "100%"
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Jim Hogan"
      />
      {predict.predict.map(pined => {
        return graphPin(pined);
      })}
    </Map>
  );
}

function App() {
  const [sites, setSites] = useState([]);
  const [predict, setPrediction] = useState([]);
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    siteDetails().then(res => {
      for (var site of res.S) {
        let value =
          site["SiteId"] +
          ", " +
          site["Site Latitude"] +
          ", " +
          site["Site Longitude"];
        site.value = value;
      }
      setSites(res);
    });
  }, []);
  var array = { Num: [] };
  for (var i = 1; i < 20; i++) {
    array.Num.push({ value: i, label: i });
  }

  return (
    <div className="App">
      <div>
        <h1>
          Fuel Price Prediction - CAB432
          <br />
          Callum Ross n10225684, Jack Hu n10176250
          <br />
          Choose a Site and Number of Days to Predict to get Started!
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Dropdown
          props={1}
          displayed={sites}
          setSelected={setSelected}
          setDays={setDays}
          selected={selected}
        />
        <Dropdown
          props={2}
          displayed={array}
          setSelected={setSelected}
          setDays={setDays}
          selected={selected}
        />
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex"
        }}
      ></div>
      {selected.length > 0 ? (
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
              setLoading(true);
              var yes = await callPrices(selected, days, sites);
              setLoading(false);
              setPrediction(yes);
            }}
          >
            Predict them Prices!
          </AwesomeButton>
        </div>
      ) : (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            paddingTop: "4%"
          }}
        ></div>
      )}

      <Tabs style={{ paddingTop: "3%" }}>
        <TabList>
          <Tab>Map</Tab>
          <Tab>Graph</Tab>
        </TabList>

        <TabPanel>
          <h2 style={{ paddingTop: "2%" }}>
            Map with Graphs, click the pins to see the graphs
          </h2>
          <div
            style={{
              paddingTop: "0%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {loading === false ? (
              <MapReact predict={predict} />
            ) : (
              <div
                class="loader"
                style={{
                  marginTop: "3%"
                }}
              ></div>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Graph with all locations</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {loading === false ? (
              <div style={{ width: "60%" }}>
                <Charty predict={predict} />
              </div>
            ) : (
              <div class="loader" style={{ marginTop: "3%" }}></div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
async function callPrices(selected, days, sites) {
  var yes = [];

  for (var i in selected) {
    var pred = await predictPrices(selected[i], days.value);
    yes.push(pred);
  }
  return yes;
}
export default App;
