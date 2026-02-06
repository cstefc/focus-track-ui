import {render, screen} from "@testing-library/react";
import CreateGoalDialog from "../../../../../src/features/project/components/goals/create-dialog/CreateGoalDialog";
import userEvent from "@testing-library/user-event";


describe("CreateGoalDialog", () => {
    it("should show button", () => {
        // GIVEN
        const projectId = "1"
        const createHandler = vi.fn()

        // WHEN
        render(<CreateGoalDialog projectId={projectId} createHandler={createHandler}/>)

        // THEN
        expect(screen.getByText("button.createGoal")).toBeInTheDocument()
    })

    it("should show dialog when button is clicked", async () => {
        // GIVEN
        const projectId = "1"
        const createHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(<CreateGoalDialog projectId={projectId} createHandler={createHandler}/>)
        await user.click(screen.getByText("button.createGoal"))

        // THEN
        expect(screen.getByText("create.goalTitle")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("forms.titlePlaceholder")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("forms.descriptionPlaceholder")).toBeInTheDocument()
        expect(screen.getByText("button.save")).toBeInTheDocument()
        expect(screen.getByText("button.cancel"))
    })

    it("should call createHandler when save is pressed", async () => {
        // GIVEN
        const projectId = "1"
        const createHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(<CreateGoalDialog projectId={projectId} createHandler={createHandler}/>)
        await user.click(screen.getByText("button.createGoal"))
        await user.type(screen.getByPlaceholderText("forms.titlePlaceholder"), "goal title")
        await user.type(screen.getByPlaceholderText("forms.descriptionPlaceholder"), "goal description")
        await user.click(screen.getByText("button.save"))

        // THEN
        expect(createHandler).toHaveBeenCalled()
    })
})