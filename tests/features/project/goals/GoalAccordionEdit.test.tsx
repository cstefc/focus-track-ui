import {Priority} from "../../../../src/api/domain/predefined/Priority";
import {Goal} from "../../../../src/api/domain/projects/Goal";
import {render, screen, waitFor} from "@testing-library/react";
import GoalAccordionEdit from "../../../../src/features/project/components/goals/GoalAccordionEdit";
import userEvent from "@testing-library/user-event";

describe("GoalAccordionEdit", () => {
    it("should show correct information", () => {
        // GIVEN
        const goal = {
            id: 1,
            title: "Goal Title",
            description: "Goal Description",
            priority: Priority.Medium,
            estimate: "Estimate",
        } as Goal;
        const cancelHandler = vi.fn()
        const submitHandler = vi.fn()

        // WHEN
        render(<GoalAccordionEdit goal={goal} submitHandler={submitHandler} cancelHandler={cancelHandler}/>)

        // THEN
        expect(screen.getByDisplayValue("Goal Title")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Goal Description")).toBeInTheDocument()
    })

    it("should should call submitHandler", async () => {
        // GIVEN
        const user = userEvent.setup()
        const goal = {
            id: 1,
            title: "Goal Title",
            description: "Goal Description",
            priority: Priority.Medium,
            estimate: "Estimate",
        } as Goal;
        const cancelHandler = vi.fn()
        const submitHandler = vi.fn()

        // WHEN
        render(<GoalAccordionEdit goal={goal} submitHandler={submitHandler} cancelHandler={cancelHandler}/>)
        await user.type(screen.getByPlaceholderText('forms.titlePlaceholder'), "New Title")
        await user.type(screen.getByPlaceholderText('forms.descriptionPlaceholder'), "New Description")
        await user.click(screen.getByTestId('CheckIcon'))

        // THEN
        await waitFor(() => {
            expect(submitHandler).toHaveBeenCalled()
        })
    })

    it("should call cancelHandler", async () => {
        // GIVEN
        const user = userEvent.setup()
        const goal = {
            id: 1,
            title: "Goal Title",
            description: "Goal Description",
            priority: Priority.Medium,
            estimate: "Estimate",
        } as Goal;
        const cancelHandler = vi.fn()
        const submitHandler = vi.fn()

        // WHEN
        render(<GoalAccordionEdit goal={goal} submitHandler={submitHandler} cancelHandler={cancelHandler}/>)
        await user.type(screen.getByPlaceholderText('forms.titlePlaceholder'), "New Title")
        await user.type(screen.getByPlaceholderText('forms.descriptionPlaceholder'), "New Description")
        await user.click(screen.getByTestId('CancelIcon'))

        // THEN
        await waitFor(() => {
            expect(cancelHandler).toHaveBeenCalled()
        })
    })
})