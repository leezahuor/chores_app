import { describe, it, expect } from "vitest";
import {
  getNextDate,
  getNextAssignee,
} from "../../src/utils/ChoreUtils.jsx";

describe("ChoreUtils", () => {
  describe("getNextDate", () => {
    it("adds 1 day for daily frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "daily");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-02");
    });

    it("adds 7 days for weekly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "weekly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-08");
    });

    it("adds 28 days for monthly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "monthly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-29");
    });

    it("returns same date if frequency is invalid", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "yearly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-01");
    });
  });

  describe("getNextAssignee", () => {
    it("returns the next assignee in the list", () => {
      expect(getNextAssignee("Leeza")).toBe("Amanda");
      expect(getNextAssignee("Amanda")).toBe("Josh");
      expect(getNextAssignee("Josh")).toBe("Sesame");
    });

    it("wraps around to the first assignee", () => {
      expect(getNextAssignee("Sesame")).toBe("Leeza");
    });

    it("defaults to the first assignee if current is not in the list", () => {
      expect(getNextAssignee("Unknown")).toBe("Leeza");
    });
  });
});
