"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TripMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async createTrip(trip) {
    return await super.insertOne(trip);
  }
  async getTripById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }
  async deleteTripById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.deleteOne(filter);
  }
  async addParticipant(awid, id, participantId) {
    return await super.findOneAndUpdate(
      { awid, id },
      { $push: { participantIdList: participantId } },
      { upsert: true }
    );
  }
}

module.exports = TripMongo;
