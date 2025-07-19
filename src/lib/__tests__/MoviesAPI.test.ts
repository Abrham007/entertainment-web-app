import { describe, it, expect, vi, beforeEach } from "vitest";
import MoviesAPI from "../MoviesAPI";

const sample = [{ id: 1 }];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("MoviesAPI.getShowDescription", () => {
  it("fetches and returns data", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: sample }),
      });
    global.fetch = fetchMock;
    const data = await MoviesAPI.getShowDescription("movie", "test", 2024);
    expect(fetchMock).toHaveBeenCalled();
    expect(data).toEqual(sample);
  });

  it("throws on network error", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(MoviesAPI.getShowDescription("tv", "q", 0)).rejects.toThrow();
  });
});
