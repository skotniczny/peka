import { getTime } from './utils';

it("parse departure string", () => {
  expect(getTime("2019-02-15T21:19:00.000Z")).toEqual("21:19");
});
