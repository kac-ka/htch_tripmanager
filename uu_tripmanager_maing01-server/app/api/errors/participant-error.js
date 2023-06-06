"use strict";

const TripmanagerMainUseCaseError = require("./tripmanager-main-use-case-error.js");
const PARTICIPANT_ERROR_PREFIX = `${TripmanagerMainUseCaseError.ERROR_PREFIX}participant/`;

const ParticipantList = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}participantList/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantList.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantList.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  InvalidInput: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantList.UC_CODE}invalidInput`;
      this.message = "Participants can be filtered only by one parameter at the time.";
    }
  },
};

const ParticipantGet = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}participantGet/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantGet.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantGet.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantGet.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  ParticipantDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantGet.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist.";
    }
  },
};

const ParticipantUpdate = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}participantUpdate/`,
  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantUpdate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripManagerDoesNotExist: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantUpdate.UC_CODE}tripManagerDoesNotExist`;
      this.message = "Trip manager instance does not exist.";
    }
  },
  TripManagerIsNotInCorrectState: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantUpdate.UC_CODE}tripManagerIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },
  InvalidParticipant: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantUpdate.UC_CODE}invalidParticipant`;
      this.message = "Participant does not exist.";
    }
  },
  ParticipantDaoUpdateFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ParticipantUpdate.UC_CODE}participantDaoUpdateFailed`;
      this.message = "Update participant by participant Dao update failed.";
    }
  },
};

module.exports = {
  ParticipantUpdate,
  ParticipantGet,
  ParticipantList,
};
