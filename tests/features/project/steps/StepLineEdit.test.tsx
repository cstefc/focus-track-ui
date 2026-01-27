import {StepLineEdit} from "../../../../src/features/project/components/steps/StepLineEdit";
import {render, screen} from "@testing-library/react";
import {Status} from "../../../../src/api/domain/predefined/Status";
import {Step} from "../../../../src/api/domain/projects/Step";
import userEvent from "@testing-library/user-event";

describe("StepLineEdit", () => {
    it("fills in the correct values at init", () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSubmitHandler = vi.fn()
        const mockCancelHandler = vi.fn()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineEdit step={step} submitHandler={mockSubmitHandler} cancelHandler={mockCancelHandler}/>
                </tbody>
            </table>
        )

        // THEN
        expect(screen.getByDisplayValue("2")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Objective")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Description")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Requirements")).toBeInTheDocument()
        expect(screen.getByLabelText("status.NotStarted")).toBeInTheDocument()
    })

    it("calls cancel handler", async () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSubmitHandler = vi.fn()
        const mockCancelHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineEdit step={step} submitHandler={mockSubmitHandler} cancelHandler={mockCancelHandler}/>
                </tbody>
            </table>
        )
        await user.click(screen.getByTestId("CancelIcon"))

        // THEN
        expect(mockCancelHandler).toHaveBeenCalled()
    })

    it("calls submitHandler", async () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockSubmitHandler = vi.fn()
        const mockCancelHandler = vi.fn()
        const user = userEvent.setup()

        // WHEN
        render(
            <table>
                <tbody>
                <StepLineEdit step={step} submitHandler={mockSubmitHandler} cancelHandler={mockCancelHandler}/>
                </tbody>
            </table>
        )
        await user.click(screen.getByTestId("CheckIcon"))

        // THEN
        expect(mockSubmitHandler).toHaveBeenCalled()
    })
})