import { describe, it, expect } from "vitest";
import { generateMockFeed } from "../lib/mock";

describe("generateMockFeed", () => {
  it("returns sentimentScore within [-1,1] and totals non-negative", () => {
    const p = generateMockFeed();
    expect(p.sentimentScore).toBeGreaterThanOrEqual(-1);
    expect(p.sentimentScore).toBeLessThanOrEqual(1);
    expect(p.totals.positive).toBeGreaterThanOrEqual(0);
    expect(p.totals.neutral).toBeGreaterThanOrEqual(0);
    expect(p.totals.negative).toBeGreaterThanOrEqual(0);
  });

  it("has platform share that sums ~ 1", () => {
    const p = generateMockFeed();
    const sum = Object.values(p.platformShare).reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(0.99);
    expect(sum).toBeLessThan(1.01);
  });

  it("produces up to 10 keywords and at least one mention", () => {
    const p = generateMockFeed();
    expect(p.trendingKeywords.length).toBeGreaterThan(0);
    expect(p.trendingKeywords.length).toBeLessThanOrEqual(10);
    expect(p.mentions.length).toBeGreaterThan(0);
  });
});
