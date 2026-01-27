import {Step} from "../../../../src/api/domain/projects/Step";
import {Status} from "../../../../src/api/domain/predefined/Status";
import {render, screen} from "@testing-library/react";
import {StepLineDisplay} from "../../../../src/features/project/components/steps/StepLineDisplay";
import userEvent from "@testing-library/user-event";

describe("StepLineDisplay", () => {
    it("shows correct information", () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSetEdit = vi.fn()
        const mockDeleteHandler = vi.fn()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineDisplay step={step} setEdit={mockSetEdit} deleteHandler={mockDeleteHandler}/>
                </tbody>
            </table>
        )

        // THEN
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("Objective")).toBeInTheDocument()
        expect(screen.getByText("Description")).toBeInTheDocument()
        expect(screen.getByText("Requirements")).toBeInTheDocument()
        expect(screen.getByText("status.NotStarted")).toBeInTheDocument()
    })

    it("calls delete handler", async () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSetEdit = vi.fn()
        const mockDeleteHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineDisplay step={step} setEdit={mockSetEdit} deleteHandler={mockDeleteHandler}/>
                </tbody>
            </table>
        )
        await user.click(screen.getByTestId("DeleteOutlineIcon"))

        // THEN
        expect(mockDeleteHandler).toHaveBeenCalledWith(1)
    })

    it("calls setEdit", async () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSetEdit = vi.fn()
        const mockDeleteHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineDisplay step={step} setEdit={mockSetEdit} deleteHandler={mockDeleteHandler}/>
                </tbody>
            </table>
        )
        await user.click(screen.getByTestId("EditIcon"))

        // THEN
        expect(mockSetEdit).toHaveBeenCalledWith(true)
    })
})