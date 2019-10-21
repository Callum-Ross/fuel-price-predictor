import axios from "axios";

export async function siteDetails() {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `http://20.43.96.83/sites`;
  console.log("yes");
  let data = {};
  await axios
    .get("https://cors-anywhere.herokuapp.com/" + url, {
      "Access-Control-Allow-Origin": "*"
    })
    .then(res => (data = { S: res.data }))
    .catch(err => {
      console.log(err);
    });
  return data;
}
export async function predictPrices(siteId) {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  console.log(siteId);
  const url = `http://20.43.96.83/predict?&startdate=2019-03-05&lat=yourquery&long=yourquery&address=yourquery`;
  let data = {};
  var someDate = new Date("2019-03-05");
  someDate.setDate(someDate.getDate() + 15); //number  of days to add, e.x. 15 days
  var dateFormated = someDate.toISOString().substr(0, 10);
  dateFormated = JSON.stringify(dateFormated);
  console.log(dateFormated);
  const params = {
    siteid: siteId.value,
    enddate: dateFormated
  };
  console.log(siteId.value);
  await axios
    .get("https://cors-anywhere.herokuapp.com/" + url, { params })
    .then(res => (data = { prediction: res.data }))
    .catch(err => {
      console.log(err);
    });
  return data;
}
//   await fetch(proxyurl + url, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin" // include, *same-origin, omit
//   })
//     .then(response => {
//       response.json();
//     })
//     .then(contents => (data = contents));
//   return data;
// }
