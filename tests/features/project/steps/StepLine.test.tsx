import {StepLine} from "../../../../src/features/project/components/steps/StepLine";
import {render} from "@testing-library/react";
import {Status} from "../../../../src/api/domain/predefined/Status";
import {Step} from "../../../../src/api/domain/projects/Step";

describe("Step Line", () => {
    it("should render without error", () => {
        // GIVEN
        const step: Step = {
            id: 1,
            sequence: 2,
            objective: "Objective",
            description: "Description",
            requirements: "Requirements",
            status: Status.NotStarted
        }
        const mockOnDelete = vi.fn()
        const mockOnUpdate = vi.fn()

        // WHEN / THEN
        render(
            <table>
                <tbody>
                <StepLine step={step} onDelete={mockOnDelete} onUpdate={mockOnUpdate} goalId={0}/>
                </tbody>
            </table>
        )
    })

})