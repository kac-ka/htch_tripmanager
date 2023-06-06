"use strict";
const TripmanagerMainUseCaseError = require("./tripmanager-main-use-case-error.js");

const Init = {
  UC_CODE: `${TripmanagerMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  TripManagerDaoCreateFailed: class extends TripmanagerMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}tripManagerDaoCreateFailed`;
      this.message = "TrimManagerInstance DAO create failed";
    }
  },
};

const SysUuAppWorkspaceLoad = {
  UC_CODE: `${TripmanagerMainUseCaseError.ERROR_PREFIX}sysUuAppWorkspaceLoad/`,
};

module.exports = {
  SysUuAppWorkspaceLoad,
  Init,
};
