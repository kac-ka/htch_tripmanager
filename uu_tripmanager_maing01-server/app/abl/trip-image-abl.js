"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class TripImageAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("tripImage");
  }

  async tripImage(awid, dtoIn) {}
}

module.exports = new TripImageAbl();
