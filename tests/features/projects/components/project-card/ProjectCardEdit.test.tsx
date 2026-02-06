import {render, screen, waitFor} from "@testing-library/react";
import {ProjectCardEdit} from "@/features/projects/components/project-card/ProjectCardEdit";
import {Project} from "@/api/domain/projects/Project";
import {useProjectsAttributes} from "../../../../../src/hooks/useProjects";
import userEvent from "@testing-library/user-event";

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
const onEdit = vi.fn()


describe("project card edit", () => {
    it("should render correctly", () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={onEdit}/>)
        // THEN
        expect(screen.getByPlaceholderText("forms.titlePlaceholder")).toHaveValue("test project");
        expect(screen.getByPlaceholderText("forms.descriptionPlaceholder")).toHaveValue("test description");
    })

    it("should call onEdit when cancel is clicked", async () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }
        const user = userEvent.setup()

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={onEdit}/>)
        await user.click(screen.getByTestId("CancelIcon"))

        // THEN
        await waitFor(() => {
                expect(onEdit).toHaveBeenCalled()
            }
        )

    })

    it("should call update function", async () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }
        const user = userEvent.setup()

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={onEdit}/>)
        await user.click(screen.getByTestId("CheckIcon"))

        // THEN
        await waitFor(() => {
                expect(onEdit).toHaveBeenCalled()
                expect(mockedUpdate).toHaveBeenCalled()
            }
        )
    })

    it("should call archive function", async () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }
        const user = userEvent.setup()

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={onEdit}/>)
        await user.click(screen.getByTestId("ArchiveOutlinedIcon"))
        await user.click(screen.getByText("button.continue"))

        // THEN
        await waitFor(() => {
                expect(onEdit).toHaveBeenCalled()
                expect(mockedArchive).toHaveBeenCalled()
            }
        )
    })

    it("should call delete function", async () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }
        const user = userEvent.setup()

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={onEdit}/>)
        await user.click(screen.getByTestId("DeleteOutlineIcon"))
        await user.click(screen.getByText("button.continue"))

        // THEN
        await waitFor(() => {
                expect(onEdit).toHaveBeenCalled()
                expect(mockedDelete).toHaveBeenCalled()
            }
        )
    })
})