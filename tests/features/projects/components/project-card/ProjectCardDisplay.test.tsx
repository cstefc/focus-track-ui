import {Project} from "@/api/domain/projects/Project";
import {render, screen, waitFor} from "@testing-library/react";
import ProjectCardDisplay from "../../../../../src/features/projects/components/project-card/ProjectCardDisplay";
import userEvent from "@testing-library/user-event";

const onEdit = vi.fn()

describe("ProjectCardDisplay", () => {
    it("renders correctly", () => {
        // GIVEN
        const project: Project = {
            id: 2,
            title: "project title",
            description: "project description",
            archived: false
        }

        // WHEN
        render(<ProjectCardDisplay project={project} onEdit={onEdit}/>)

        // THEN
        expect(screen.getByText("project title")).toBeInTheDocument()
        expect(screen.getByText("project description")).toBeInTheDocument()
    })

    it("should trigger onEdit when edit icon is pressed", async () => {
        // GIVEN
        const project: Project = {
            id: 2,
            title: "project title",
            description: "project description",
            archived: false
        }
        const user = userEvent.setup()

        // WHEN
        render(<ProjectCardDisplay project={project} onEdit={onEdit}/>)
        await user.click(screen.getByRole('button'))

        // THEN
        await waitFor(() => {
            expect(onEdit).toHaveBeenCalled()
        })

    })
})