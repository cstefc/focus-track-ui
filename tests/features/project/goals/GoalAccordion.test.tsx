import {Goal} from "../../../../src/api/domain/projects/Goal";
import {Priority} from "../../../../src/api/domain/predefined/Priority";
import {GoalAccordion} from "../../../../src/features/project/components/goals/GoalAccordion";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/features/project/components/steps/StepTable", () => ({
    default: (id: number) => <></>,
}));

describe("GoalAccordion", () => {
    it("should show correct information", () => {
        // GIVEN
        const goal = {
            id: 1,
            title: "Goal Title",
            description: "Goal Description",
            priority: Priority.Medium,
            estimate: "Estimate",
        } as Goal;
        const updateHandler = vi.fn()
        const deleteHandler = vi.fn()

        // WHEN
        render(<GoalAccordion goal={goal} updateHandler={updateHandler} deleteHandler={deleteHandler}/>)

        // THEN
        expect(screen.getByText('Goal Title')).toBeInTheDocument();
        expect(screen.getByText('Goal Description')).toBeInTheDocument();
    })
})