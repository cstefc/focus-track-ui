import {render, screen, waitFor} from "@testing-library/react";
import CreateProjectDialog from "@/features/projects/components/create-dialog/CreateProjectDialog";
import {useProjectsAttributes} from "@/hooks/useProjects";
import userEvent from "@testing-library/user-event";

const mockedCreateProject = vi.fn()
vi.mock("@/features/projects/ProjectsScreen", () => ({
    useProjectsContext: () => ({
        createProject: mockedCreateProject,
    } as Partial<useProjectsAttributes>)
}))

describe("CreateProjectDialog", () => {
    it("renders correctly", () => {
        // GIVEN

        // WHEN / THEN
        expect(() => render(<CreateProjectDialog/>)).not.toThrow();
    })

    it("should show button when not visible", () => {
        // GIVEN

        // WHEN
        render(<CreateProjectDialog/>)

        // THEN
        expect(screen.queryByText("create.projectTitle")).not.toBeInTheDocument()
        expect(screen.queryByText("button.createProject")).toBeInTheDocument()

    })

    it("should toggle visibility when button clicked", async () => {
        // GIVEN
        const user = userEvent.setup()

        // WHEN
        render(<CreateProjectDialog/>)
        const button = screen.getByText("button.createProject")
        await user.click(button)

        // THEN
        await waitFor(() => {
            expect(screen.getByText("create.projectTitle")).toBeInTheDocument()
        })

    })

    it("should create a project when submit is clicked", async () => {
        // GIVEN
        const title: string = "test title"
        const description: string = "test description"
        const user = userEvent.setup()

        // WHEN
        render(<CreateProjectDialog/>)
        await user.click(screen.getByText('button.createProject'))
        await user.type(screen.getByPlaceholderText('forms.titlePlaceholder'), title)
        await user.type(screen.getByPlaceholderText("forms.descriptionPlaceholder"), description)
        await user.click(screen.getByText('button.save'))

        // THEN
        await waitFor(() => {
            expect(mockedCreateProject).toHaveBeenCalledWith({
                title: title,
                description: description,
                archived: false,
            })
        })
    })

    it("should check input", async () => {
        // GIVEN
        const description: string = "description"
        const user = userEvent.setup()

        // WHEN
        render(<CreateProjectDialog/>)
        await user.click(screen.getByText("button.createProject"))
        await user.clear(screen.getByPlaceholderText('forms.titlePlaceholder'))
        await user.type(screen.getByPlaceholderText("forms.descriptionPlaceholder"), description)
        await user.click(screen.getByText('button.save'))

        // THEN
        await waitFor(() => {
            expect(mockedCreateProject).not.toHaveBeenCalledWith({
                title: "",
                description: description,
                archived: false,
            })
        })

    })
})