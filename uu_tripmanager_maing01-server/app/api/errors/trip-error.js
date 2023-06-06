"use strict";

const TripmanagerMainUseCaseError = require("./tripmanager-main-use-case-error.js");
const TRIP_ERROR_PREFIX = `${TripmanagerMainUseCaseError.ERROR_PREFIX}trip/`;

const TripCreate = {
  UC_CODE: `${TRIP_ERROR_PREFIX}tripCreate/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  InvalidDepartureDate: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}invalidDepartureDate`;
      this.message = "Departure date is invalid - it cannot be set in the past.";
    }
  },
  InvalidArrivalDate: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}invalidArrivalDate`;
      this.message = "Arrival date is invalid - arrival date must be greater than departure date";
    }
  },
  InvalidLocation: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}invalidLocation`;
      this.message = "Location does not exists.";
    }
  },
  LocationNotInOperation: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}locationNotInOperation`;
      this.message = "Location is currently not in operation.";
    }
  },
  TripDaoCreateFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripCreate.UC_CODE}tripDaoCreateFailed`;
      this.message = "Create trip by trip DAO create failed.";
    }
  },
};
const TripImage = {
  UC_CODE: `${TRIP_ERROR_PREFIX}tripImage/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripImage.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripImageDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripImage.UC_CODE}tripImageDoesNotExist`;
      this.message = "Object tripImage does not exist.";
    }
  },
  InvalidImage: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripImage.UC_CODE}invalidImage`;
      this.message = "The image is invalid or it is not an image.";
    }
  },
  UuBinaryCreateFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripImage.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Create uuBinary failed.";
    }
  },
};

const TripGet = {
  UC_CODE: `${TRIP_ERROR_PREFIX}tripGet/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripGet.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripGet.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripGet.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripGet.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
};

const TripDelete = {
  UC_CODE: `${TRIP_ERROR_PREFIX}tripDelete/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  InvalidTripState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}invalidTripState`;
      this.message = "You cannot delete trip that is not in created state.";
    }
  },
  ParticipantListNotEmpty: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}participantListNotEmpty`;
      this.message = "You cannot delete trip with participants already added.";
    }
  },
  UuBinaryDeleteFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}uuBinaryDeleteFailed`;
      this.message = "Deleting uuBinary failed.";
    }
  },
  UuDeleteFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripDelete.UC_CODE}uuBinaryDeleteFailed`;
      this.message = "Trip deleting failed.";
    }
  },
};

const TripAddParticipant = {
  UC_CODE: `${TRIP_ERROR_PREFIX}tripAddParticipant/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  InvalidTripState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}invalidTripState`;
      this.message = "Trip must be in created state to add participants.";
    }
  },
  TripCapacityFull: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}tripCapacityFull`;
      this.message = "Trip capacity has been filled.";
    }
  },
  ParticipantDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}participantDoesNotExist`;
      this.message = "Participant doesn't exist.";
    }
  },
  InvalidParticipantState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}invalidParticipantState`;
      this.message = "Participant must be in active state.";
    }
  },
  TripDaoAddParticipantFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${TripAddParticipant.UC_CODE}tripDaoAddParticipantFailed`;
      this.message = "Adding participant by DAO addParticipant has failed.";
    }
  },
};

module.exports = {
  TripAddParticipant,
  TripDelete,
  TripGet,
  TripCreate,
  TripImage,
};
