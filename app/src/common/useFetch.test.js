import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns loading true immediately when url is provided", () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetch("https://example.com/data"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test("returns idle state when url is null", () => {
    const { result } = renderHook(() => useFetch(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("sets data on successful fetch", async () => {
    const payload = { items: [1, 2, 3] };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(payload),
    });

    const { result } = renderHook(() => useFetch("https://example.com/data"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(payload);
    expect(result.current.error).toBeNull();
  });

  test("sets error on failed fetch", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    const { result } = renderHook(() => useFetch("https://example.com/data"));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe("HTTP 500");
  });

  test("handles network error", async () => {
    global.fetch.mockRejectedValue(new TypeError("Failed to fetch"));

    const { result } = renderHook(() => useFetch("https://example.com/api"));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe("Failed to fetch");
  });

  test("resets error and sets loading when url changes", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 404 });
    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: "https://example.com/a" },
    });

    await waitFor(() => expect(result.current.error).not.toBeNull());

    global.fetch.mockReturnValue(new Promise(() => {}));
    rerender({ url: "https://example.com/b" });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  test("keeps previous data while loading new url", async () => {
    const firstPayload = { items: [1, 2, 3] };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(firstPayload),
    });

    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: "https://example.com/a" },
    });

    await waitFor(() => expect(result.current.data).toEqual(firstPayload));

    global.fetch.mockReturnValue(new Promise(() => {}));
    rerender({ url: "https://example.com/b" });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual(firstPayload);
  });

  test("aborts previous request when url changes", () => {
    const abortSpy = vi.spyOn(AbortController.prototype, "abort");
    global.fetch.mockReturnValue(new Promise(() => {}));

    const { rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: "https://example.com/a" },
    });
    rerender({ url: "https://example.com/b" });

    expect(abortSpy).toHaveBeenCalledTimes(1);
    abortSpy.mockRestore();
  });

  test("sets loading false when url changes to null", async () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: "https://example.com/data" },
    });

    expect(result.current.loading).toBe(true);

    rerender({ url: null });

    expect(result.current.loading).toBe(false);
  });
});
