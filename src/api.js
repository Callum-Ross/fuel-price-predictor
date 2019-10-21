import axios from "axios";

export async function siteDetails() {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `http://52.187.224.30:3000/sites`;
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
export async function predictPrices(
  siteId,
  startdate,
  enddate,
  lat,
  lng,
  address
) {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `http://52.187.224.30:3000/predict`;
  let data = {};
  await axios
    .get("https://cors-anywhere.herokuapp.com/" + url, {
      params: {
        siteId: siteId,
        startdate: startdate,
        enddate: enddate,
        lat: lat,
        lng: lng,
        address: address
      }
    })
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
