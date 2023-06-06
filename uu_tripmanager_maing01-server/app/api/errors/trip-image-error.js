"use strict";

const TripmanagerMainUseCaseError = require("./tripmanager-main-use-case-error.js");
const TRIP_IMAGE_ERROR_PREFIX = `${TripmanagerMainUseCaseError.ERROR_PREFIX}tripImage/`;

const TripImage = {
  UC_CODE: `${TRIP_IMAGE_ERROR_PREFIX}tripImage/`,
};

module.exports = {
  TripImage,
};
