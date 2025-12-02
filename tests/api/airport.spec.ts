import { test, expect } from "../../fixtures/fixtures";
import { ApiEndpoints } from "../../data/apiEndpoints";
import { AirportNames } from "../../data/airports";

let airportsResponseBody: any;

test.describe("Airport API suite", () => {

  test.beforeEach(async ({ api }) => {
    // fetch airport list once before each test
    const response = await api.get(ApiEndpoints.AIRPORTS);

    expect(response.status(), "Unexpected status code for /airports").toBe(200);

    airportsResponseBody = await response.json();
    expect(Array.isArray(airportsResponseBody.data),
      "Response data for /airports is not an array"
    ).toBe(true);
  });

  test("Scenario 1: Verify airport count = 30", async () => {
    expect(
      airportsResponseBody.data.length,
      "Number of airports returned by /airports is incorrect"
    ).toBe(30);
  });

  test("Scenario 2: Verify specific airports exist", async () => {
    const expectedAirports = [
      AirportNames.AKUREYRI,
      AirportNames.ST_ANTHONY,
      AirportNames.CFB_BAGOTVILLE
    ];
    const names = airportsResponseBody.data.map((item: any) => item.attributes.name);

    for (const airport of expectedAirports) {
      expect(
        names,
        `Expected airport '${airport}' was not found in /airports response`
      ).toContain(airport);
    }
  });

  test("Scenario 3: Distance between KIX and NRT is > 400 km", async ({ api }) => {
    const DISTANCE_COMPARE_WITH = 400;
    const response = await api.post(ApiEndpoints.DISTANCE, {
      data: { from: "KIX", to: "NRT" }
    });

    expect(response.status(), "Unexpected status code for distance endpoint").toBe(200);

    const body = await response.json();
    const distanceKm = body.data.attributes.kilometers;

    expect(
      distanceKm,
      `Distance returned for KIX -> NRT is: ${distanceKm} km, but should be > ${DISTANCE_COMPARE_WITH}`
    ).toBeGreaterThan(DISTANCE_COMPARE_WITH);
  });
});