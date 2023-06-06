"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ParticipantMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async listParticipantsByState(
    awid,
    state,
    order = "asc",
    sortBy = "name",
    pageInfo = { pageIndex: 0, pageSize: 100 }
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

  async listParticipantsById(
    awid,
    participantIdList,
    order = "asc",
    sortBy = "name",
    pageInfo = { pageIndex: 0, pageSize: 100 }
  ) {
    let filter = {
      awid: awid,
      id: { $in: participantIdList.map((id) => new ObjectId(id)) },
    };
    if (order === "asc") order = 1;
    if (order === "desc") order = -1;

    let sorting = {};
    sorting[sortBy] = order;

    return await super.find(filter, pageInfo, sorting);
  }

  async listAllParticipants(awid, order = "asc", sortBy = "name", pageInfo = { pageIndex: 0, pageSize: 1000 }) {
    let filter = {
      awid: awid,
    };
    if (order === "asc") order = 1;
    if (order === "desc") order = -1;

    let sorting = {};
    sorting[sortBy] = order;
    return await super.find(filter, pageInfo, sorting);
  }

  async getParticipantById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async updateParticipant(uuObject) {
    let filter = {
      id: uuObject.id,
      awid: uuObject.awid,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = ParticipantMongo;
