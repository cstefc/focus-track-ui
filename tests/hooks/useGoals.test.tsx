import {vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import useGoals from "@/hooks/useGoals";
import {useGetApi} from "@/hooks/useGetApi";
import {sendApi, deleteApi} from "@/api/apiCall"
import {CreateGoal, Goal, UpdateGoal} from "../../src/api/domain/projects/Goal";


vi.mock("@/hooks/useGetApi");
vi.mock("@/api/apiCall", () => ({
    sendApi: vi.fn(),
    deleteApi: vi.fn(),
}));

const mockedUseGetApi = vi.mocked(useGetApi<Goal[]>);
const mockedSendApi = vi.mocked(sendApi<Goal>);

const initData: Goal[] = [
    {id: 1, title: "Title 1", estimate: "est 1", priority: 0, description: "description 1"},
    {id: 2, title: "Title 2", estimate: "est 2", priority: 1, description: "description 2"},
]

describe('useGoals', () => {
    it("should get the goals", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: true, data: undefined});

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        expect(useGetApi).toHaveBeenCalledWith("/goals?id=1");
        expect(result.current.loading).toEqual(true);
        expect(result.current.goals).toEqual([]);
    });

    it("should return the loaded goals", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initData});

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        expect(useGetApi).toHaveBeenCalledWith("/goals?id=1");
        expect(result.current.loading).toEqual(false);
        expect(result.current.goals).toHaveLength(2);
    });

    it("should handle null response gracefully", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: null});

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        expect(useGetApi).toHaveBeenCalledWith("/goals?id=1");
        expect(result.current.goals).toStrictEqual([]);
    })

    it("should update goals (create)", async () => {
        // GIVEN
        const createData: CreateGoal = {
            projectId: "1",
            title: "title",
            description: "desc",
            priority: 0,
            estimate: "0"
        }
        const resolvedData: Goal = {
            id: 3,
            title: "new Goal",
            description: "newly created goal",
            priority: 0,
            estimate: "",
        }
        mockedUseGetApi.mockReturnValue({loading: false, data: initData});
        mockedSendApi.mockResolvedValue(resolvedData);

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        await waitFor(() => {
            result.current.createGoal(createData);
            expect(sendApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(3);
            expect(result.current.goals[2].id).toStrictEqual(3);
        });

    })

    it("shouldn't update goals when creation failed", async () => {
        // GIVEN
        const createData: CreateGoal = {
            projectId: "1",
            title: "title",
            description: "desc",
            priority: 0,
            estimate: "0"
        }
        mockedUseGetApi.mockReturnValue({loading: false, data: initData});
        mockedSendApi.mockResolvedValue(null);

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        await waitFor(() => {
            result.current.createGoal(createData);
            expect(sendApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(2);
        });

    })

    it("should update goals (update)", async () => {
        // GIVEN
        const updateData: UpdateGoal = {
            id: 1,
            title: "updated title",
            description: "new decr",
            priority: 2,
            estimate: ""
        }

        const resolvedData: Goal = {
            id: 1,
            title: "updated title",
            description: "new decr",
            priority: 2,
            estimate: ""
        }

        mockedUseGetApi.mockReturnValue({loading: false, data: initData});
        mockedSendApi.mockResolvedValue(resolvedData);

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        await waitFor(() => {
            result.current.updateGoal(updateData);
            expect(sendApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(2);
            expect(result.current.goals[0].id).toStrictEqual(1);
            expect(result.current.goals[0].title).toStrictEqual("updated title");
        })

    })

    it("shouldn't update goals when update failed", async () => {
        // GIVEN
        const updateData: UpdateGoal = {
            id: 1,
            title: "updated title",
            description: "new decr",
            priority: 2,
            estimate: ""
        }

        mockedUseGetApi.mockReturnValue({loading: false, data: initData});
        mockedSendApi.mockResolvedValue(null);

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        await waitFor(() => {
            result.current.updateGoal(updateData);
            expect(sendApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(2);
            expect(result.current.goals[0].id).toStrictEqual(1);
            expect(result.current.goals[0].title).toStrictEqual("Title 1");
        })

    })

    it("should update goals (delete)", async () => {
        // GIVEN
        const deleteId: number = 2;
        mockedUseGetApi.mockReturnValue({loading: true, data: initData});

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        await waitFor(() => {
            result.current.deleteGoal(deleteId);
            expect(deleteApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(1);
        })
    })

    it("shouldn't update goals when id doesn't exist", async () => {
        // GIVEN
        const deleteId: number = 5;

        // WHEN
        const {result} = renderHook(() => useGoals("1"));

        // THEN
        await waitFor(() => {
            result.current.deleteGoal(deleteId);
            expect(deleteApi).toHaveBeenCalled();
            expect(result.current.goals).toHaveLength(2);
        })
    })
})