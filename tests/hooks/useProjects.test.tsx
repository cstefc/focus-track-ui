import {renderHook, waitFor} from "@testing-library/react";
import {useGetApi} from "../../src/hooks/useGetApi";
import useProjects from "../../src/hooks/useProjects";
import {CreateProject, Project, UpdateProject} from "../../src/api/domain/projects/Project";
import {sendApi} from "../../src/api/apiCall";

vi.mock("@/hooks/useGetApi");
const mockedUseGetApi = vi.mocked(useGetApi<Project[]>);

vi.mock("@/api/apiCall", () => ({
    sendApi: vi.fn(),
    deleteApi: vi.fn(),
}));
const mockedSendApi = vi.mocked(sendApi<Project>);

const initialValues: Project[] = [
    {id: 0, archived: false, title: "Project 1", description: "Description 1"},
    {id: 1, archived: false, title: "Project 2", description: "Description 2"},
]

describe("useProjects hook", () => {
    it("should fetch projects", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        expect(result.current.loading).toBeFalsy();
        expect(result.current.data).toEqual(initialValues);
    })

    it("should handle failed fetch", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: null});

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        expect(result.current.loading).toBeFalsy();
        expect(result.current.data).toStrictEqual([]);
    })

    it("should update projects when creating", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const newProject: CreateProject = {
            title: "Project 3",
            description: "Description 3",
            archived: false,
        }
        const createdProject: Project = {
            id: 2,
            title: "Project 3",
            description: "Description 3",
            archived: false,
        }
        mockedSendApi.mockResolvedValue(createdProject);

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            expect(result.current.loading).toBeFalsy();
            result.current.createProject(newProject);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.data).toHaveLength(3);
        })
    })

    it("shouldn't update projects when creating fails", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const newProject: CreateProject = {
            title: "Project 3",
            description: "Description 3",
            archived: false,
        }
        mockedSendApi.mockResolvedValue(null);

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            expect(result.current.loading).toBeFalsy();
            result.current.createProject(newProject);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.data).toHaveLength(2);
        })
    })

    it("should update projects when updating", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const newProject: UpdateProject = {
            id: 0,
            title: "Updated Project 1",
            description: "Updated Description 1",
            archived: false,
        }

        const updatedProject: Project = {
            id: 0,
            title: "Updated Project 1",
            description: "Updated Description 1",
            archived: false,
        }
        mockedSendApi.mockResolvedValue(updatedProject);

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            expect(result.current.loading).toBeFalsy();
            result.current.updateProject(newProject);
            expect(result.current.data).toHaveLength(2);
            expect(result.current.data[0]).toStrictEqual(updatedProject);
        })
    })

    it("shouldn't update projects when updating fails", async () => {
        // GIVEN
        mockedUseGetApi.mockReturnValue({loading: false, data: initialValues});
        const newProject: UpdateProject = {
            id: 0,
            title: "Updated Project 1",
            description: "Updated Description 1",
            archived: false,
        }
        mockedSendApi.mockResolvedValue(null);

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            expect(result.current.loading).toBeFalsy();
            result.current.updateProject(newProject);
            expect(result.current.data).toHaveLength(2);
            expect(result.current.data[0].title).toStrictEqual("Project 1");
        })
    })

    it("should update projects when deleting", async () => {
        // GIVEN
        const deleteId: number = 1;

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            result.current.deleteProject(deleteId);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.data).toHaveLength(1);
        })
    })

    it("shouldn't update projects when deleting id doesn't exist", async () => {
        // GIVEN
        const deleteId: number = 5;

        // WHEN
        const {result} = renderHook(() => useProjects());

        // THEN
        await waitFor(() => {
            result.current.deleteProject(deleteId);
            expect(result.current.loading).toBeFalsy();
            expect(result.current.data).toHaveLength(2);
        })
    })

})