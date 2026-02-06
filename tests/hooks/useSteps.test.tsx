import {CreateStep, Step, UpdateStep} from "../../src/api/domain/projects/Step";
import {Status} from "../../src/api/domain/predefined/Status";
import {useGetApi} from "../../src/hooks/useGetApi";
import {sendApi} from "../../src/api/apiCall";
import useSteps from "../../src/hooks/useSteps";
import {renderHook, waitFor} from "@testing-library/react";

vi.mock("@/hooks/useGetApi");
const mockedUseGetApi = vi.mocked(useGetApi<Step[]>);

vi.mock("@/api/apiCall", () => ({
    sendApi: vi.fn(),
    deleteApi: vi.fn(),
}))
const mockedSendApi = vi.mocked(sendApi<Step>);

const initialValues: Step[] = [
    {
        id: 1,
        sequence: 1,
        status: Status.NotStarted,
        requirements: "None",
        objective: "Objective 1",
        description: "Description 1"
    },
    {
        id: 2,
        sequence: 2,
        status: Status.NotStarted,
        requirements: "None",
        objective: "Objective 2",
        description: "Description 2"
    },
]

describe('useSteps', () => {
    it("should fetch the goals steps", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        expect(result.current.loading).toBeFalsy();
        expect(result.current.steps).toStrictEqual(initialValues);
    })

    it("should handle failed fetching of steps", async () => {
        // GIVEN
        mockedUseGetApi.mockResolvedValue({loading: false, data: null});

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toStrictEqual([]);
        })
    })

    it("should update steps when creating", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const createData: CreateStep = {
            goalId: 1,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing",
            description: "Description 3"
        }
        const created: Step = {
            id: 3,
            sequence: 3,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing",
            description: "Description 3"
        }
        mockedSendApi.mockResolvedValue(created)

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.createStep(createData);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(3);
        })
    })

    it("shouldn't update steps when creating failed", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const createData: CreateStep = {
            goalId: 1,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing",
            description: "Description 3"
        }
        mockedSendApi.mockResolvedValue(null)

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.createStep(createData);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(2);
        })
    })

    it("should update steps when updating", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const updateData: UpdateStep = {
            id: 1,
            sequence: 1,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing Update",
            description: "Description 1"
        }
        const updated: Step = {
            id: 1,
            sequence: 1,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing Update",
            description: "Description 1"
        }
        mockedSendApi.mockResolvedValue(updated)

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.updateStep(updateData);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(2);
            expect(result.current.steps[0].objective).toStrictEqual("Testing Update");
        })
    })

    it("shouldn't update steps when updating fails", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const updateData: UpdateStep = {
            id: 1,
            sequence: 1,
            status: Status.NotStarted,
            requirements: "None",
            objective: "Testing Update",
            description: "Description 1"
        }
        mockedSendApi.mockResolvedValue(null)

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.updateStep(updateData);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(2);
            expect(result.current.steps[0].objective).not.toStrictEqual("Testing Update");
        })
    })

    it("should update steps when deleting", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const deleteId = 1;

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.deleteStep(deleteId);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(1);
        })
    })

    it("shouldn't update steps when deleting wrong id", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const deleteId = 5;

        // WHEN
        const {result} = renderHook(() => useSteps(1));

        // THEN
        await waitFor(() => {
            result.current.deleteStep(deleteId);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.steps).toHaveLength(2);
        })
    })
})