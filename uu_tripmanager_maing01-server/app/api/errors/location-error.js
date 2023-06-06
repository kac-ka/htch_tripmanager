"use strict";

const TripmanagerMainUseCaseError = require("./tripmanager-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${TripmanagerMainUseCaseError.ERROR_PREFIX}location/`;

const LocationGet = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}locationGet/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationGet.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationGet.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationGet.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  LocationDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationGet.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exists.";
    }
  },
};

const LocationList = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}locationList/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationList.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LocationList.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
};

module.exports = {
  LocationList,
  LocationGet,
};
