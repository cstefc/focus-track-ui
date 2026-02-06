import {Priority} from "../../../../src/api/domain/predefined/Priority";
import {Goal} from "../../../../src/api/domain/projects/Goal";
import {render, screen} from "@testing-library/react";
import GoalAccordionDisplay from "../../../../src/features/project/components/goals/GoalAccordionDisplay";
import userEvent from "@testing-library/user-event";

describe("GoalAccordionDisplay", () => {
        it("should show correct information", () => {
            // GIVEN
            const goal = {
                id: 1,
                title: "Goal Title",
                description: "Goal Description",
                priority: Priority.Medium,
                estimate: "Estimate",
            } as Goal;
            const editHandler = vi.fn()
            const deleteHandler = vi.fn()

            // WHEN
            render(<GoalAccordionDisplay goal={goal} handleDelete={deleteHandler} toggleEdit={editHandler}/>)

            // THEN
            expect(screen.getByText('Goal Title')).toBeInTheDocument();
            expect(screen.getByText('Goal Description')).toBeInTheDocument();
        })

        it("should call delete handler", async () => {
            // GIVEN
            const user = userEvent.setup()
            const goal = {
                id: 1,
                title: "Goal Title",
                description: "Goal Description",
                priority: Priority.Medium,
                estimate: "Estimate",
            } as Goal;
            const editHandler = vi.fn()
            const deleteHandler = vi.fn()

            // WHEN
            render(<GoalAccordionDisplay goal={goal} handleDelete={deleteHandler} toggleEdit={editHandler}/>)
            await user.click(screen.getByTestId('DeleteOutlineIcon'))

            // THEN
            expect(deleteHandler).toHaveBeenCalled()
        })

    it("should call editHandler", async () => {
        // GIVEN
        const user = userEvent.setup()
        const goal = {
            id: 1,
            title: "Goal Title",
            description: "Goal Description",
            priority: Priority.Medium,
            estimate: "Estimate",
        } as Goal;
        const editHandler = vi.fn()
        const deleteHandler = vi.fn()

        // WHEN
        render(<GoalAccordionDisplay goal={goal} handleDelete={deleteHandler} toggleEdit={editHandler}/>)
        await user.click(screen.getByTestId('EditIcon'))

        // THEN
        expect(editHandler).toHaveBeenCalled()
    })
})