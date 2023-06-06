const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("participantUpdate_test", () => {
  //expect.assertions(7);
  test("HDS1", async () => {
    let dtoIn = {
      id: "62bd830b6f87627dddb7d16c",
      firstName: "Leopold",
      lastName: "Koprný",
      phoneNumber: "111222333",
      idCardNumber: "1234",
      state: "Active",
    };
    let session = await TestHelper.login("EmployeeUser");
    let result = await TestHelper.executePostCommand("participantUpdate", dtoIn, session);
    expect(result.status).toEqual(200);
    expect(result.firstName).toEqual(dtoIn.firstName);
    expect(result.lastName).toEqual(dtoIn.lastName);
    expect(result.phoneNumber).toEqual(dtoIn.phoneNumber);
    expect(result.idCardNumber).toEqual(dtoIn.idCardNumber);
    expect(result.state).toEqual("Active");
    expect(result.uuAppErrorMap).toEqual({});
  });
});
