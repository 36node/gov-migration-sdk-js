import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK migration", () => {
  it("should list applications", async () => {
    const result = await sdk.application.listApplications();
    expect(result.body.length).toBe(100);
  });

  let application;

  it("should create application", async () => {
    const newApplication = {
      name: "jam",
      phone: "13810437619",
      identity: "330225198009121387",
    };

    const result = await sdk.application.createApplication({
      body: newApplication,
    });
    application = result.body;
    expect(application).toMatchObject(newApplication);
  });

  it("should get application", async () => {
    const result = await sdk.application.showApplicationById({
      applicationId: application.id,
    });
    expect(result.body.id).toBe(application.id);
  });

  it("should delete application", async () => {
    const result = await sdk.application.deleteApplication({
      applicationId: application.id,
    });
    expect(result.body).toEqual({});
  });
});
