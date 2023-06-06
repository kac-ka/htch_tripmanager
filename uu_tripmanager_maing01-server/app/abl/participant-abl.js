"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/participant-error.js");

const INSTANCE_ACTIVE_STATE = "active";

const WARNINGS = {
  listUnsupportedKeys: {
    code: `${Errors.ParticipantList.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.ParticipantList.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.ParticipantList.UC_CODE}unsupportedKeys`,
  },
};

class ParticipantAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("participant");
    this.tripDao = DaoFactory.getDao("trip");
    this.instanceDao = DaoFactory.getDao("tripmanagerMain");
    this.participantDao = DaoFactory.getDao("participant");
  }

  async participantUpdate(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("participantUpdate", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.ParticipantUpdate.InvalidDtoIn
    );
    //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.ParticipantUpdate.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.ParticipantUpdate.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let participant;
    participant = await this.participantDao.getParticipantById(awid, dtoIn.id);
    if (!participant) {
      //HDS 3.1
      throw new Errors.ParticipantUpdate.InvalidParticipant({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 3.2
    let dtoOut = {};
    try {
      let updatedParticipant = {};
      if (dtoIn.firstName) {
        updatedParticipant.firstName = dtoIn.firstName;
      }
      if (dtoIn.lastName) {
        updatedParticipant.lastName = dtoIn.lastName;
      }
      if (dtoIn.phoneNumber) {
        updatedParticipant.phoneNumber = dtoIn.phoneNumber;
      }
      if (dtoIn.idCardNumber) {
        updatedParticipant.idCardNumber = dtoIn.idCardNumber;
      }
      if (dtoIn.state) {
        updatedParticipant.state = dtoIn.state;
      }
      updatedParticipant.awid = awid;
      updatedParticipant.id = dtoIn.id;
      dtoOut = await this.participantDao.updateParticipant(updatedParticipant);
    } catch (e) {
      throw new Errors.ParticipantUpdate.ParticipantDaoUpdateFailed({ uuAppErrorMap }, e);
    }
    //HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async participantGet(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("participantGetDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.ParticipantGet.InvalidDtoIn
    );
    //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.ParticipantGet.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.ParticipantGet.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let dtoOut = {};
    dtoIn.awid = awid;
    dtoOut = await this.dao.getParticipantById(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.ParticipantGet.ParticipantDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async participantList(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("participantListDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.ParticipantList.InvalidDtoIn
    );
    //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.ParticipantList.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.ParticipantList.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    if (dtoIn.tripId && dtoIn.state) {
      throw new Errors.ParticipantList.InvalidInput({ uuAppErrorMap });
    }
    //HDS 4
    //HDS 4.A
    let dtoOut = {};
    if (dtoIn.tripId) {
      let tmpTrip = await this.tripDao.getTripById(awid, dtoIn.tripId);
      //HDS 4.A.1
      let participantIds = tmpTrip.participantIdList;
      //HDS 4.A.2.
      dtoOut = await this.dao.listParticipantsById(awid, participantIds, dtoIn.order, dtoIn.sortBy, dtoIn.pageInfo);
    }
    //HDS 4.B, 4.B.1
    if (dtoIn.state) {
      dtoOut = await this.dao.listParticipantsByState(awid, dtoIn.state, dtoIn.order, dtoIn.sortBy, dtoIn.pageInfo);
    }
    //HDS 4.C
    if (!dtoIn.state && !dtoIn.tripId) {
      dtoOut = await this.dao.listAllParticipants(awid, dtoIn.order, dtoIn.sortBy, dtoIn.pageInfo);
    }

    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ParticipantAbl();
