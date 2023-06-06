"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const {
  Profile,
  AppClientTokenService,
  UuAppWorkspace,
  UuSubAppInstance,
  WorkspaceAuthorizationService,
  UuAppWorkspaceError,
} = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const { Config } = require("uu_appg01_server").Utils;

const Errors = require("../api/errors/tripmanager-main-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

const logger = LoggerFactory.get("TripmanagerMainAbl");

class TripmanagerMainAbl {
  constructor() {
    this.validator = Validator.load();

    this.mainDao = DaoFactory.getDao("tripmanagerMain");
  }

  async sysUuAppWorkspaceLoad(uri, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    let dtoOut = {};

    // hds 1
    const asidData = await UuSubAppInstance.get();

    // hds 2
    const awidData = await UuAppWorkspace.get(awid);

    // hds 3
    // ISSUE The uuAppProductPortalUri is not allowed in this map by official documentation but should be
    // https://uuapp.plus4u.net/uu-sls-maing01/3f1ef221518d49f2ac936f53f83ebd84/issueDetail?id=611f6bdf545e5300294e5ed1
    const relatedObjectsMap = {
      uuAppUuFlsBaseUri: Config.get("fls_base_uri"),
      uuAppUuSlsBaseUri: Config.get("sls_base_uri"),
      uuAppBusinessRequestsUri: Config.get("business_request_uri"),
      uuAppBusinessModelUri: Config.get("business_model_uri"),
      uuAppApplicationModelUri: Config.get("application_model_uri"),
      uuAppUserGuideUri: Config.get("user_guide_uri"),
      uuAppWebKitUri: Config.get("web_uri"),
      uuAppProductPortalUri: Config.get("product_portal_uri"),
    };

    // hds 4
    const cmdUri = UriBuilder.parse(uri).setUseCase("sys/uuAppWorkspace/load").clearParameters();
    const authorizationResult = await WorkspaceAuthorizationService.authorize(session, cmdUri.toUri());

    const profileData = {
      uuIdentityProfileList: authorizationResult.getIdentityProfiles(),
      profileList: authorizationResult.getAuthorizedProfiles(),
    };

    // hds 5
    dtoOut.sysData = { asidData, awidData, relatedObjectsMap, profileData };

    // hds 6, 6.A

    // hds 7
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["tripmanagerMain", "trip", "tripImage", "participant", "location"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    if (dtoIn.uuBtLocationUri) {
      const baseUri = uri.getBaseUri();
      const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
      const location = uuBtUriBuilder.getParameters().id;
      const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();

      const createAwscDtoIn = {
        name: "UuTripmanager",
        typeCode: "uu-tripmanager-maing01",
        location: location,
        uuAppWorkspaceUri: baseUri,
      };

      const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
      const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
      const callOpts = AppClientTokenService.setToken({ session }, appClientToken);

      // TODO HDS
      let awscId;
      try {
        const awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
        awscId = awscDtoOut.id;
      } catch (e) {
        if (e.code.includes("applicationIsAlreadyConnected") && e.paramMap.id) {
          logger.warn(`Awsc already exists id=${e.paramMap.id}.`, e);
          awscId = e.paramMap.id;
        } else {
          throw new Errors.Init.CreateAwscFailed({ uuAppErrorMap }, { location: dtoIn.uuBtLocationUri }, e);
        }
      }

      const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscId).toUri();

      await UuAppWorkspace.connectArtifact(
        baseUri,
        {
          artifactUri: artifactUri.toString(),
          synchronizeArtifactBasicAttributes: false,
        },
        session
      );
    }

    // HDS 3
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
        }
        throw e;
      }
    }

    // HDS 4
    dtoIn.awid = awid;
    dtoIn.state = "active";
    delete dtoIn.uuAppProfileAuthorities;

    let tripManagerInstance = {};
    try {
      tripManagerInstance = this.mainDao.create(dtoIn);
    } catch (e) {
      throw new Errors.Init.TripManagerDaoCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 5
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      tripManagerInstance,
      uuAppErrorMap: uuAppErrorMap,
    };
  }
}

module.exports = new TripmanagerMainAbl();
