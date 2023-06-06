"use strict";
const TripAbl = require("../../abl/trip-abl.js");

class TripController {
  tripAddParticipant(ucEnv) {
    return TripAbl.tripAddParticipant(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  tripDelete(ucEnv) {
    return TripAbl.tripDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  tripGet(ucEnv) {
    return TripAbl.tripGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  tripCreate(ucEnv) {
    return TripAbl.tripCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TripAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters);
  }

  async getImageData(ucEnv) {
    let dtoIn = ucEnv.parameters;
    let dtoOut = await TripAbl.getImageData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }
}

module.exports = new TripController();
