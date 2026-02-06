import {Project} from "../../../../../src/api/domain/projects/Project";
import {render, screen, waitFor} from "@testing-library/react";
import {ProjectCard} from "@/features/projects/components/project-card/ProjectCard";
import userEvent from "@testing-library/user-event";
import {useProjectsAttributes} from "../../../../../src/hooks/useProjects";
import {mockNavigate} from "../../../../setup";

const mockedUpdate = vi.fn()
const mockedArchive = vi.fn()
const mockedDelete = vi.fn()
vi.mock("@/features/projects/ProjectsScreen", () => ({
    useProjectsContext: () => ({
        updateProject: mockedUpdate,
        deleteProject: mockedDelete,
        archiveProject: mockedArchive,
    } as Partial<useProjectsAttributes>),
}));

describe("ProjectCard", () => {
    it("renders correctly", () => {
        // GIVEN
        const project = {
            id: 1,
            title: "Test Project",
            description: "Test description",
            archived: false
        } as Project

        // WHEN
        render(<ProjectCard project={project}/>)

        // THEN
        expect(screen.getByText("Test Project")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
    })

    it("should enter edit mode after clicking button", async () => {
        // GIVEN
        const project = {
            id: 1,
            title: "Test Project",
            description: "Test description",
            archived: false
        } as Project
        const user = userEvent.setup()
        // WHEN
        render(<ProjectCard project={project}/>)
        await user.click(screen.getByTestId("EditIcon"))

        // THEN
        await waitFor(() => {
            expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
        })
    })

    it("should navigate to project page when clicked", async () => {
        // GIVEN
        const project = {
            id: 1,
            title: "Test Project",
            description: "Test description",
            archived: false
        } as Project
        const user = userEvent.setup()
        // WHEN
        render(<ProjectCard project={project}/>)
        await user.click(screen.getByText("Test Project"))

        // THEN
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/projects/1");
        })
    })
})