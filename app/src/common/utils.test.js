import { handleResponse, formatDate, HHmm, HHmmss, ddMMyyyy } from "./utils";

describe("handleResponse", () => {
  test("throws error when response is not ok", () => {
    expect(() => handleResponse({ ok: false, status: 502 })).toThrow();
  });
 
  test("returns parsed JSON when response.ok is true", async () => {
    const payload = { data: "success" };
    const response = {
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    };
    const result = await handleResponse(response);
    expect(result).toEqual(payload);
    expect(response.json).toHaveBeenCalled();
  });
});

describe("formatDate", () => {
  test("parse date ISO string", () => {
    expect(formatDate("2019-02-15T21:19:00.000Z", HHmm)).toEqual("21:19");
    expect(formatDate("2019-02-15T21:19:00.000Z", HHmmss)).toEqual("21:19:00");
    expect(formatDate("2019-02-15T21:19:00.000Z", ddMMyyyy)).toEqual("15.02.2019");
  });

  test("formats a Date object as-is", () => {
    expect(formatDate(new Date(2019, 1, 15, 21, 19), HHmm)).toEqual("21:19");
  });

  test("throws on invalid dateTime", () => {
    expect(() => formatDate(123, HHmm)).toThrow(TypeError);
    expect(() => formatDate("not-a-date", HHmm)).toThrow(TypeError);
    expect(() => formatDate(null, HHmm)).toThrow(TypeError);
  });
});
