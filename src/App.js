import React from "react";
import Select from "react-select";
class Dropdown extends React.Component {
  state = {
    selectedOption: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.selected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    console.log("dfsdfsd");
    const options = [];
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
          style={{ zIndex: "auto" }}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          placeholder="Please select a searchable tag or leave empty to search for all..."
          isMulti
        />
      </div>
    );
  }
}
function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Dropdown />
      <Dropdown />
      <Dropdown />
    </div>
  );
}

export default App;
