import { getJsonFromFetch } from "./helpers/helper";
import { API_KEY } from "./helpers/config";
class Model {
  workouts = [];

  getLocationFromName = async function (countryName) {
    try {
      console.log(API_KEY);
      console.log(`fetching info for ${countryName}`);
      const countryData = await getJsonFromFetch(countryName);
      const latlng = [countryData.results[0].lat, countryData.results[0].lon];
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
