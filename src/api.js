import axios from "axios";

export async function siteDetails() {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `http://20.43.96.83/sites`;
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

  let latThing = siteId.value.split(", ")[1];
  let longThing = siteId.value.split(", ")[2];

  let value = siteId.value.split(", ")[0];

  let data = {};
  if (typeof days === "undefined") {
    days = 3;
  }
  var someDate = new Date("2019-02-28");
  someDate.setDate(someDate.getDate() + days); //number  of days to add, e.x. 15 days
  var dateFormated = someDate.toISOString().substr(0, 10);
  console.log(siteId.label);

  console.log(longThing);

  console.log(latThing);
  const params = {
    siteid: value,
    address: siteId.label,
    lat: latThing,
    lng: longThing
  };
  console.log(params);
  const url =
    `http://20.43.96.83/predict?&startdate=2019-02-28&enddate=` + dateFormated;

  await axios
    .get("https://cors-anywhere.herokuapp.com/" + url, { params })
    .then(res => (data = { prediction: res.data }))
    .catch(err => {
      console.log(err);
    });
  data.location = [parseFloat(latThing), parseFloat(longThing)];
  console.log(data);
  return data;
}
