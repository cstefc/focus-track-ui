import {vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import {useGetApi} from "../../src/hooks/useGetApi";
import {getApi} from "../../src/api/apiCall";

vi.mock("@/api/apiCall", () => ({
    getApi: vi.fn(),
}));

const mockedGetApi = vi.mocked(getApi);

describe("useGetApi", async () => {
    it("should call getApi correctly", async () => {
        // GIVEN
        const mockData = {value: "test value"};
        mockedGetApi.mockResolvedValue(mockData);

        // WHEN
        const {result} = renderHook(() => useGetApi("/test"));

        // THEN initial state
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();

        expect(getApi).toHaveBeenCalledWith("/test");
        expect(getApi).toHaveBeenCalledTimes(1);

        // THEN after async API resolves
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toEqual(mockData);
        })
    });

    it("should handle null response correctly", async () => {
        // GIVEN
        const mockData = null;
        mockedGetApi.mockResolvedValue(mockData);

        // WHEN
        const {result} = renderHook(() => useGetApi("/test"));

        // THEN before await
        expect(result.current.loading).toBe(true);

        // THEN after await
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeNull();
        })

    })
})
