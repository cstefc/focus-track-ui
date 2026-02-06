import {StepLineAdd} from "../../../../src/features/project/components/steps/StepLineAdd";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("StepLineAdd", () => {
    it("should show add button", () => {
        // GIVEN
        const goalId = 1
        const sequence = 2
        const OnCreate = vi.fn()

        // WHEN
        render(<table>
            <tbody><StepLineAdd goalId={goalId} onCreate={OnCreate} sequence={sequence}/></tbody>
        </table>)

        // THEN
        expect(screen.getByTestId("AddOutlinedIcon")).toBeInTheDocument()
    })

    it("should show input fields when button is clicked", async () => {
        // GIVEN
        const goalId = 1
        const sequence = 2
        const user = userEvent.setup()
        const OnCreate = vi.fn()

        // WHEN
        render(<table>
            <tbody><StepLineAdd goalId={goalId} onCreate={OnCreate} sequence={sequence}/></tbody>
        </table>)
        await user.click(screen.getByTestId("AddOutlinedIcon"))

        // THEN
        expect(screen.getByLabelText("forms.objectiveLabel"))
        expect(screen.getByLabelText("forms.descriptionLabel"))
        expect(screen.getByLabelText("forms.statusLabel"))
        expect(screen.getByLabelText("forms.requirementsLabel"))
    })

    it("should create a new step on click", async () => {
        // GIVEN
        const goalId = 1
        const sequence = 2
        const user = userEvent.setup()
        const OnCreate = vi.fn()

        // WHEN
        render(<table>
            <tbody><StepLineAdd goalId={goalId} onCreate={OnCreate} sequence={sequence}/></tbody>
        </table>)
        await user.click(screen.getByTestId("AddOutlinedIcon"))
        await user.type(screen.getByLabelText("forms.objectiveLabel"), "label")
        await user.type(screen.getByLabelText("forms.descriptionLabel"), "description")
        await user.type(screen.getByLabelText("forms.requirementsLabel"), "requirements")
        screen.debug()
        await user.click(screen.getByTestId("SaveOutlinedIcon"))

        // THEN
        expect(OnCreate).toHaveBeenCalled()
    })
})