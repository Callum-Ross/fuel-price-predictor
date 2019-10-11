export async function siteDetails() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `https://fppdirectapi-prod.fuelpricesqld.com.au/Subscriber/GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=1`;
  console.log("yes");
  let data = [];
  await fetch(proxyurl + url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // prettier-ignore
      "Authorization":
        "FPDAPI SubscriberToken=ea92a388-5358-44e1-a765-6aa9c4cb2cd0"
    }
  })
    .then(response => response.json())
    .then(contents => (data = contents));
  return data;
}
export async function fuelTypes() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `https://fppdirectapi-prod.fuelpricesqld.com.au/Subscriber/GetCountryFuelTypes?countryId=21`;
  let data = [];
  await fetch(proxyurl + url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // prettier-ignore
      "Authorization":
        "FPDAPI SubscriberToken=ea92a388-5358-44e1-a765-6aa9c4cb2cd0"
    }
  })
    .then(response => response.json())
    .then(contents => (data = contents));
  console.log(data);
  return data;
}
