"use strict";
const TripmanagerMainAbl = require("../../abl/tripmanager-main-abl.js");

class TripmanagerMainController {
  sysUuAppWorkspaceLoad(ucEnv) {
    return TripmanagerMainAbl.sysUuAppWorkspaceLoad(ucEnv.getUri(), ucEnv.getSession());
  }
  init(ucEnv) {
    return TripmanagerMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new TripmanagerMainController();
