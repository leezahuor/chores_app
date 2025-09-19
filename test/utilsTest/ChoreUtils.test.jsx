import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import {
  getNextDate,
  getNextAssignee,
  formatDisplayDate,
  getLateChores,
  sortLateChoresFirst,
  isChoreLate,
} from "../../src/utils/ChoreUtils.jsx";

describe("ChoreUtils", () => {
  const mockToday = new Date("2025-09-18T12:00:00Z"); // Mocks today's date
  const realDate = Date; // Stores real date

  // Before every test, set system time to mockToday
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockToday);
  });

  // After each test, restores code affected by timers 
  afterAll(() => {
    vi.useRealTimers();
    global.Date = realDate;
  });

  // Tests various scenarios for getNextDate
  describe("getNextDate", () => {
    it("Checks if 1 day gets added for daily frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "daily");
      expect(result).toBe("2025-09-02");
    });

    it("Checks if 7 days gets added for weekly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "weekly");
      expect(result).toBe("2025-09-08");
    });

    it("Checks if 28 days gets added for monthly frequency", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "monthly");
      expect(result).toBe("2025-09-29");
    });

    it("Checks if same date gets returned if frequency is invalid", () => {
      const today = new Date("2025-09-01");
      const result = getNextDate(today, "yearly");
      expect(result).toBe("2025-09-01");
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

// Tests various scenarios for formatDisplayDate
describe("formatDisplayDate", () => {
  it("Checks if date format changes from YYYY-MM-DD to MM/DD/YYYY", () => {
    const result = formatDisplayDate("2025-09-17");
    expect(result).toBe("09/17/2025");
  });

  it("Checks if function handles invalid input properly", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {}); // Spy on console.warn

    const input = 12345; // Invalid input
    const output = formatDisplayDate(input);

    expect(output).toBe(""); // Expects output to be empty string
    expect(consoleSpy).toHaveBeenCalledWith("Date must be a string", input); // Expects console.warn to trigger

    consoleSpy.mockRestore(); // Restores original console.warn
  });
});

// Tests various scenarios for getLateChores
describe("getLateChores", () => {
  it("Flags chores with past due dates as late", () => {
    const chores = [
      { id: 1, choreName: "Mop", dueDate: "2025-09-10" }, // Late
      { id: 2, choreName: "Vacuum", dueDate: "2026-09-20" }, // Not late
      { id: 3, choreName: "Dishes", dueDate: null }, // No date
    ];
    const result = getLateChores(chores);
    expect(result[0].isLate).toBe(true);
    expect(result[1].isLate).toBe(false);
    expect(result[2].isLate).toBe(false);
  });

  it("Returns empty array when chores is empty", () => {
    expect(getLateChores([])).toEqual([]);
  });
});

// Tests various scenarios for sortLateChoresFirst
describe("sortLateChoresFirst", () => {
  it("places late chores at the beginning of the array", () => {
    const chores = [
      { id: 1, choreName: "Mop", isLate: false },
      { id: 2, choreName: "Vacuum", isLate: true },
      { id: 3, choreName: "Dishes", isLate: false },
    ];
    const result = sortLateChoresFirst(chores);
    expect(result[0].choreName).toBe("Vacuum"); // Late chore should be first
  });

  it("maintains relative order among chores with same lateness status", () => {
    const chores = [
      { id: 1, choreName: "A", isLate: false },
      { id: 2, choreName: "B", isLate: false },
      { id: 3, choreName: "C", isLate: true },
      { id: 4, choreName: "D", isLate: true },
    ];
    const result = sortLateChoresFirst(chores);
    expect(result.map((c) => c.choreName)).toEqual(["C", "D", "A", "B"]);
  });
});

// Tests various scenarios for isChoreLate
describe("isChoreLate", () => {
  it("Returns true when dueDate is before today", () => {
    expect(isChoreLate({ dueDate: "2025-09-10" })).toBe(true);
  });

  it("Returns false when dueDate is after today", () => {
    expect(isChoreLate({ dueDate: "2026-09-30" })).toBe(false);
  });

  it("Returns false when dueDate is null or undefined", () => {
    expect(isChoreLate({ dueDate: null })).toBe(false);
    expect(isChoreLate({})).toBe(false);
  });
});
