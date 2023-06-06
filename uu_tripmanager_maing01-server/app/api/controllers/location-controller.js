"use strict";
const LocationAbl = require("../../abl/location-abl.js");

class LocationController {

  locationList(ucEnv) {
    return LocationAbl.locationList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  locationGet(ucEnv) {
    return LocationAbl.locationGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LocationController();
