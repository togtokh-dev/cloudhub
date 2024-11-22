import CloudHub from "../src/index";

describe("CloudHub module", () => {
  it("should set the host URL correctly", async () => {
    const host = "https://example.com";
    await CloudHub.setHost(host);

    expect(CloudHub.config.host).toBe(host);
  });

  it("should toggle logger state", async () => {
    await CloudHub.setLogger(true);
    expect(CloudHub.config.logger).toBe(true);

    await CloudHub.setLogger(false);
    expect(CloudHub.config.logger).toBe(false);
  });
});
