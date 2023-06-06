"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/location-error.js");

const INSTANCE_ACTIVE_STATE = "active";
const IN_OPERATION_STATE = "In Operation";

const WARNINGS = {
  getUnsupportedKeys: {
    code: `${Errors.LocationGet.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.LocationGet.UC_CODE}unsupportedKeys`,
  },
};

class LocationAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("location");
    this.instanceDao = DaoFactory.getDao("tripmanagerMain");
  }

  async locationList(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("locationListDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.LocationList.InvalidDtoIn
    );
    //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.LocationList.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.LocationList.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let dtoOut = {};
    dtoIn.awid = awid;
    dtoOut = await this.dao.listAllActiveLocations(awid, IN_OPERATION_STATE, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    //HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async locationGet(awid, dtoIn) {
    //HDS 1, 1.1
    let validationResult = this.validator.validate("locationGetDtoInType", dtoIn);
    //1.2, 1.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.LocationGet.InvalidDtoIn
    );
    //HDS2
    let tripManagerInstance = await this.instanceDao.getByAwid(awid);
    if (!tripManagerInstance) {
      //HDS 2.1.1
      throw new Errors.LocationGet.TripManagerDoesNotExist(uuAppErrorMap, { awid: awid });
    } else {
      //HDS 2.1.2
      if (tripManagerInstance.state !== INSTANCE_ACTIVE_STATE) {
        throw new Errors.LocationGet.TripManagerIsNotInCorrectState(uuAppErrorMap, {
          awid: awid,
          currenState: tripManagerInstance.state,
          expectedState: INSTANCE_ACTIVE_STATE,
        });
      }
    }
    //HDS 3
    let dtoOut = {};
    dtoIn.awid = awid;
    dtoOut = await this.dao.getLocationById(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.LocationGet.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new LocationAbl();
