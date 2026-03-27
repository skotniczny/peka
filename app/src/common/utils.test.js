import { formatDate, HHmm, HHmmss, ddMMyyyy } from './utils';

it("parse date ISO string", () => {
  expect(formatDate("2019-02-15T21:19:00.000Z", HHmm)).toEqual("21:19");
  expect(formatDate("2019-02-15T21:19:00.000Z", HHmmss)).toEqual("21:19:00");
  expect(formatDate("2019-02-15T21:19:00.000Z", ddMMyyyy)).toEqual("15.02.2019");
});

it("formats a Date object as-is", () => {
  expect(formatDate(new Date(2019, 1, 15, 21, 19), HHmm)).toEqual("21:19");
});

it("throws on invalid dateTime", () => {
  expect(() => formatDate(123, HHmm)).toThrow(TypeError);
  expect(() => formatDate("not-a-date", HHmm)).toThrow(TypeError);
  expect(() => formatDate(null, HHmm)).toThrow(TypeError);
});
