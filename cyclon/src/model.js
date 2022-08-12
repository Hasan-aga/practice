import { getJsonFromFetch } from "./helpers/helper";
class Model {
  workouts = [];
  state = {};
  constructor() {
    this.state.ok = "okkk";
  }

  getLocationFromName = async function (countryName) {
    try {
      console.log(`fetching info for ${countryName}`);
      const countryData = await getJsonFromFetch(countryName);
      const latlng = [countryData.results[0].lat, countryData.results[0].lon];
      this.state.countryData = countryData;
      return latlng;
    } catch (e) {
      console.error(e);
      throw new Error(
        `failed to get location for ${countryName}, ${e.message}`
      );
    }
  };
}

export default new Model();
