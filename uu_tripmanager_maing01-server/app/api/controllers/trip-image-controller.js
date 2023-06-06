"use strict";
const TripImageAbl = require("../../abl/trip-image-abl.js");

class TripImageController {

  tripImage(ucEnv) {
    return TripImageAbl.tripImage(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TripImageController();
