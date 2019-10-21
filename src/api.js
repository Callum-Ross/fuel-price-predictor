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
export async function predictPrices(siteId, days) {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  console.log(siteId);
  let data = {};
  var someDate = new Date("2019-02-28");
  someDate.setDate(someDate.getDate() + days); //number  of days to add, e.x. 15 days
  var dateFormated = someDate.toISOString().substr(0, 10);

  console.log(siteId.label);
  const params = {
    siteid: siteId.value,
    address: siteId.label
  };
  console.log(siteId.value);

  const url =
    `http://20.43.96.83/predict?&startdate=2019-02-28&lat=yourquery&long=yourquery&enddate=` +
    dateFormated;
  console.log(url);

  await axios
    .get("https://cors-anywhere.herokuapp.com/" + url, { params })
    .then(res => (data = { prediction: res.data }))
    .catch(err => {
      console.log(err);
    });
  console.log(data);
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
