"use strict";
const { UuBinaryDao } = require("uu_appg01_binarystore");

class TripImageMongo extends UuBinaryDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, code: 1 }, { unique: true });
  }
  async create(uuBinary, data) {
    return await super.insertFromStream(uuBinary, data);
  }

  async deleteByCode(awid, code) {
    let filter = {
      awid: awid,
      code: code,
    };
    return await super.deleteOne(filter);
  }

  async getDataByCode(awid, code) {
    let filter = {
      awid: awid,
      code: code,
    };
    return await super.openDownloadStream(filter);
  }
}

module.exports = TripImageMongo;
