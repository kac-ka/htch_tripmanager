"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LocationMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async getLocationById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async listAllActiveLocations(
    awid,
    state = "In Operation",
    order = "asc",
    sortBy = "name",
    pageInfo = { pageIndex: 0, pageSize: 1000 }
  ) {
    let filter = {
      awid: awid,
      state: state,
    };
    if (order === "asc") order = 1;
    if (order === "desc") order = -1;

    let sorting = {};
    sorting[sortBy] = order;
    return await super.find(filter, pageInfo, sorting);
  }
}

module.exports = LocationMongo;
