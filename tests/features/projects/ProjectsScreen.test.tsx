import {render, screen} from "@testing-library/react";
import ProjectsScreen from "../../../src/features/projects/ProjectsScreen";
import {useProjectsAttributes} from "../../../src/hooks/useProjects";
import userEvent from "@testing-library/user-event";


let mockedUseProjects = {} as Partial<useProjectsAttributes>;
vi.mock("@/hooks/useProjects", () => ({
    default: () => (mockedUseProjects)
}));

describe("Projects Screen", () => {
    it("renders correctly", () => {
        // GIVEN
        mockedUseProjects = {
            loading: false,
            data: []
        } as Partial<useProjectsAttributes>

        // WHEN
        render(<ProjectsScreen/>)

        // THEN
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("description")).toBeInTheDocument();
        expect(screen.getByText("tabs.active")).toBeInTheDocument();
        expect(screen.getByText("tabs.archived")).toBeInTheDocument();
        expect(screen.getByText("noProjects.active")).toBeInTheDocument();
    })

    it("should switch tabs when clicked", async () => {
        // GIVEN
        mockedUseProjects = {
            loading: false,
            data: []
        } as Partial<useProjectsAttributes>
        const user = userEvent.setup()
        // WHEN
        render(<ProjectsScreen/>)
        await user.click(screen.getByText("tabs.archived"));

        // THEN
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("description")).toBeInTheDocument();
        expect(screen.getByText("tabs.active")).toBeInTheDocument();
        expect(screen.getByText("tabs.archived")).toBeInTheDocument();
        expect(screen.getByText("noProjects.archived")).toBeInTheDocument();
    })
})
