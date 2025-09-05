import { describe, it, expect } from "vitest";
import { getNextDate, getNextAssignee } from "../../src/utils/ChoreUtils.jsx";

describe("ChoreUtils", () => {
  // Tests various scenarios for getNextDate
  describe("getNextDate", () => {
    it("Checks if 1 day gets added for daily frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "daily");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-02");
    });

    it("Checks if 7 days gets added for weekly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "weekly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-08");
    });

    it("Checks if 28 days gets added for monthly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "monthly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-29");
    });

    it("Checks if same date gets returned if frequency is invalid", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "yearly");
      expect(result.toISOString().slice(0, 10)).toBe("2025-09-01");
    });
  });

  // Tests various scenarios for getNextAssignee
  describe("getNextAssignee", () => {
    it("Checks if next assignee in the list gets returned", () => {
      expect(getNextAssignee("Leeza")).toBe("Amanda");
      expect(getNextAssignee("Amanda")).toBe("Josh");
      expect(getNextAssignee("Josh")).toBe("Sesame");
    });

    it("Checks if last assignee wraps back around to the first assignee", () => {
      expect(getNextAssignee("Sesame")).toBe("Leeza");
    });

    it("Checks if an unknown assignee will default to the first assignee", () => {
      expect(getNextAssignee("Unknown")).toBe("Leeza");
    });
  });
});
