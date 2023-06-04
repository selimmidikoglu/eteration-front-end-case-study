import { loadState, saveState, store } from "../../redux/store";
import { describe, test, expect, vi } from "vitest";
import { dummyStateBasketSlice, dummyStateProductSlice } from "../../helpers/utils/dummyState";

describe("Store redux", () => {
  test("loadState returns undefined", () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => {
      throw new Error("Localstorage Error");
    });
    const result = loadState();
    expect(result).toBeUndefined();
  });
  test("loadState returns object", () => {
    const dummyLocalStorageObj = {
      productSlice: dummyStateProductSlice,
      basketSlice: dummyStateBasketSlice,
    };
    vi.spyOn(localStorage, "getItem").mockImplementation(() => {
      return JSON.stringify(dummyLocalStorageObj);
    });
    const result = loadState();
    expect(result).toEqual(dummyLocalStorageObj);
  });
  test("saveState saves state to local", () => {
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      return;
    });
    const state = store.getState();
    const result = saveState(state);
    expect(result).toBeUndefined();
  });
  test("saveState error catch", () => {
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("Localstorage Error");
    });
    const state = store.getState();
    const result = saveState(state);
    expect(result).toBeUndefined();
  });
  test("store.subscribe", () => {
    const mockUnsubscribe = vi.fn();
    const mockSubscribe = vi.spyOn(store, "subscribe").mockReturnValue(mockUnsubscribe);
    const mockListener = vi.fn();
    store.subscribe(mockListener);
    expect(mockSubscribe).toHaveBeenCalledWith(mockListener);
    mockUnsubscribe();
    mockSubscribe.mockRestore();
  });
});
