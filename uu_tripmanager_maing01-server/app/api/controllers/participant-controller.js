"use strict";
const ParticipantAbl = require("../../abl/participant-abl.js");

class ParticipantController {

  participantUpdate(ucEnv) {
    return ParticipantAbl.participantUpdate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  participantGet(ucEnv) {
    return ParticipantAbl.participantGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  participantList(ucEnv) {
    return ParticipantAbl.participantList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ParticipantController();
