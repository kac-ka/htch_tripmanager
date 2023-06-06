"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/trip-error.js");
const { BinaryStoreError } = require("uu_appg01_binarystore");

const INSTANCE_ACTIVE_STATE = "active";
const PARTICIPANT_ACTIVE_STATE = "active";
const TRIP_CREATED_STATE = "created";
const IN_OPERATION_STATE = "In Operation";

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.TripCreate.UC_CODE}unsupportedKeys`,
  },
  getImageDataUnsupportedKeys: {
    code: `${Errors.TripImage.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.TripGet.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.TripDelete.UC_CODE}unsupportedKeys`,
  },
  addParticipantUnsupportedKeys: {
    code: `${Errors.TripDelete.UC_CODE}unsupportedKeys`,
  },
};

class TripAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.instanceDao = DaoFactory.getDao("tripmanagerMain");
    this.locDao = DaoFactory.getDao("location");
    this.imageDao = DaoFactory.getDao("tripImage");
    this.participantDao = DaoFactory.getDao("participant");
  }

  async tripAddParticipant(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("tripAddParticipantDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.addParticipantUnsupportedKeys.code,
      Errors.TripAddParticipant.InvalidDtoIn
    );
    // //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.TripAddParticipant.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.TripAddParticipant.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let tmpTrip;
    dtoIn.awid = awid;
    tmpTrip = await this.dao.getTripById(awid, dtoIn.id);
    if (!tmpTrip) {
      throw new Errors.TripAddParticipant.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 4
    if (tmpTrip.state.toLowerCase() !== TRIP_CREATED_STATE) {
      throw new Errors.TripAddParticipant.InvalidTripState(
        { uuAppErrorMap },
        { id: dtoIn.id, currentState: tmpTrip.state, expectedState: TRIP_CREATED_STATE }
      );
    }
    //HDS 5
    if (tmpTrip.participantIdList.length === tmpTrip.capacity) {
      throw new Errors.TripAddParticipant.TripCapacityFull({ uuAppErrorMap });
    }
    //HDS 6
    let participant;
    participant = await this.participantDao.getParticipantById(awid, dtoIn.participantId);
    if (!participant) {
      //HDS 6.1.1
      throw new Errors.TripAddParticipant.ParticipantDoesNotExist({ uuAppErrorMap }, { id: dtoIn.participantId });
    }
    if (participant.state.toLowerCase() !== PARTICIPANT_ACTIVE_STATE) {
      //HDS 6.2.1
      throw new Errors.TripAddParticipant.InvalidParticipantState(
        { uuAppErrorMap },
        { id: dtoIn.participantId, currentState: participant.state, expectedState: PARTICIPANT_ACTIVE_STATE }
      );
    }
    //HDS 7
    try {
      await this.dao.addParticipant(awid, dtoIn.id, participant.id);
    } catch (e) {
      throw new Errors.TripAddParticipant.TripDaoAddParticipantFailed({ uuAppErrorMap }, e);
    }
    //HDS 8
    let dtoOut = {};
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async tripDelete(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("tripDeleteDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.TripDelete.InvalidDtoIn
    );
    // //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.TripDelete.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.TripDelete.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    dtoIn.awid = awid;
    let dtoOut = {};
    let tmpTrip = await this.dao.getTripById(awid, dtoIn.id);
    if (!tmpTrip) {
      throw new Errors.TripDelete.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    //HDS 4
    if (tmpTrip.state.toLowerCase() !== TRIP_CREATED_STATE) {
      throw new Errors.TripDelete.InvalidTripState(
        { uuAppErrorMap },
        { currentState: tmpTrip.state, expectedState: TRIP_CREATED_STATE }
      );
    }

    //HDS 5
    if (tmpTrip.participantIdList.length !== 0) {
      throw new Errors.TripDelete.ParticipantListNotEmpty(
        { uuAppErrorMap },
        { id: dtoIn.id, participantList: tmpTrip.participantList }
      );
    }

    //HDS 6
    try {
      await this.imageDao.deleteByCode(awid, tmpTrip.coverImage);
    } catch (e) {
      throw new Errors.TripDelete.UuBinaryDeleteFailed({ uuAppErrorMap }, e);
    }
    //HDS 7
    try {
      await this.dao.deleteTripById(awid, dtoIn.id);
    } catch (error) {
      throw new Errors.TripDelete.UuDeleteFailed({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async tripGet(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("tripGetDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.TripGet.InvalidDtoIn
    );
    //HDS 2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.TripGet.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.TripGet.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let dtoOut = {};
    dtoIn.awid = awid;
    dtoOut = await this.dao.getTripById(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.TripGet.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async tripCreate(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("tripCreateDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.TripCreate.InvalidDtoIn
    );
    //HDS 2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.TripCreate.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.TripCreate.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS3
    let tripImage;
    if (!dtoIn.coverImage.contentType.includes("image")) {
      throw new Errors.TripImage.InvalidImage({ uuAppErrorMap });
    }
    try {
      tripImage = await this.imageDao.create({ awid }, dtoIn.coverImage);
      dtoIn.coverImage = tripImage.code;
    } catch (e) {
      if (e instanceof BinaryStoreError) {
        throw new Errors.TripImage.UuBinaryCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    //HDS 4
    let dateDep = new Date(dtoIn.departureDate).getTime();
    if (dateDep < Date.now()) {
      //HDS 4.1
      throw new Errors.TripCreate.InvalidDepartureDate(uuAppErrorMap, { departureDate: dtoIn.departureDate });
    }
    //HDS 5
    let dateArr = new Date(dtoIn.arrivalDate).getTime();
    if (dateArr < new Date(dtoIn.departureDate).getTime()) {
      //HDS 5.1
      throw new Errors.TripCreate.InvalidArrivalDate(uuAppErrorMap, {
        departureDate: dtoIn.departureDate,
        arrivalDate: dtoIn.arrivalDate,
      });
    }
    //HDS 6
    let location;
    location = await this.locDao.getLocationById(awid, dtoIn.locationId);
    if (!location) {
      //HDS 6.1
      throw new Errors.TripCreate.InvalidLocation({ uuAppErrorMap }, { id: dtoIn.locationId });
    }
    if (location.state !== IN_OPERATION_STATE) {
      throw new Errors.TripCreate.LocationNotInOperation(
        { uuAppErrorMap },
        { state: location.state, expectedState: IN_OPERATION_STATE }
      );
    }
    //HDS 7
    dtoIn.awid = awid;
    dtoIn.state = TRIP_CREATED_STATE;
    dtoIn.participantIdList = Array();
    let dtoOut = {};
    try {
      dtoOut = await this.dao.createTrip(dtoIn);
    } catch (e) {
      //HDS 7.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.TripCreate.TripDaoCreateFailed(uuAppErrorMap, e);
      }
    }
    //HDS 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async getImageData(awid, dtoIn) {
    // HDS 1, 1.1
    let validationResult = this.validator.validate("tripImageDtoInType", dtoIn);
    // HDS 1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getImageDataUnsupportedKeys.code,
      Errors.TripImage.InvalidDtoIn
    );
    // HDS 2
    let dtoOut = {};
    try {
      dtoOut = await this.imageDao.getDataByCode(awid, dtoIn.image);
    } catch (e) {
      if (e.code === "uu-app-binarystore/objectNotFound") {
        throw new Errors.TripImage.TripImageDoesNotExist({ uuAppErrorMap }, { image: dtoIn.image });
      }
      throw e;
    }
    // HDS 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new TripAbl();
