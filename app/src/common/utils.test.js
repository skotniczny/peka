import { it, expect } from 'vitest'
import { formatDate } from './utils';

it("parse date ISO string", () => {
  expect(formatDate("2019-02-15T21:19:00.000Z", "HH:mm")).toEqual("21:19");
  expect(formatDate("2019-02-15T21:19:00.000Z", "HH:mm:ss")).toEqual("21:19:00");
  expect(formatDate("2019-02-15T21:19:00.000Z", "dd.MM.yyyy")).toEqual("15.02.2019");
});
