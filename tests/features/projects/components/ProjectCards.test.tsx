import {Project} from "../../../../src/api/domain/projects/Project";
import ProjectCards from "../../../../src/features/projects/components/ProjectCards";
import {render, screen} from "@testing-library/react";
import {useProjectsAttributes} from "../../../../src/hooks/useProjects";

let attributes: Partial<useProjectsAttributes> = {}
vi.mock("@/features/projects/ProjectsScreen", () => ({
    useProjectsContext: () => attributes
}))

const project1 = {
    id: 1,
    title: "Project 1",
    description: "Description 1",
    archived: false
} as Project

const project2 = {
    id: 2,
    title: "Project 2",
    description: "Description 2",
    archived: false
} as Project

describe("ProjectCards", () => {
    it("renders correctly", () => {
        // GIVEN
        attributes = {
            loading: false,
            data: [project1, project2] as Project[]
        } as Partial<useProjectsAttributes>

        // WHEN
        render(<ProjectCards showWithArchived={false}/>)

        // THEN
        expect(screen.getByText("Project 1")).toBeInTheDocument()
        expect(screen.getByText("Description 1")).toBeInTheDocument()
        expect(screen.getByText("Project 2")).toBeInTheDocument()
        expect(screen.getByText("Description 2")).toBeInTheDocument()
    })

    it("shows text when no projects exists", async () => {
        // GIVEN
        attributes = {
            loading: false,
            data: [] as Project[]
        }

        // WHEN
        render(<ProjectCards showWithArchived={false} />)

        // THEN
        expect(screen.getByText("noProjects.active")).toBeInTheDocument()
    })

    it("shows a spinner when loading", () => {
        // GIVEN
        attributes = {
            loading: true,
            data: [] as Project[]
        }

        // WHEN
        render(<ProjectCards showWithArchived={false}/> )

        // THEN
        expect(screen.getByRole("progressbar")).toBeInTheDocument()

    })

});