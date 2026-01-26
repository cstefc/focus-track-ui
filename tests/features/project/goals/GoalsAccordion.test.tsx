import {UseGoalsAttributes} from "@/hooks/useGoals";
import {GoalsAccordion} from "../../../../src/features/project/components/goals/GoalsAccordion";
import {render, screen} from "@testing-library/react";
import {Goal} from "../../../../src/api/domain/projects/Goal";
import {Priority} from "../../../../src/api/domain/predefined/Priority";
import userEvent from "@testing-library/user-event";
import {mockNavigate} from "../../../setup";

vi.mock("@/features/project/components/steps/StepTable", () => ({
    default: (id: number) => <></>,
}));

let mockedUseGoals: Partial<UseGoalsAttributes> = {}
vi.mock("@/hooks/useGoals", () => ({
    default: (projectId: string) => mockedUseGoals,
}))

const goal1: Goal = {
    id: 1,
    title: "Goal 1",
    description: "Description 1",
    estimate: "00:00",
    priority: Priority.Low
}

const goal2: Goal = {
    id: 2,
    title: "Goal 2",
    description: "Description 2",
    estimate: "00:00",
    priority: Priority.Medium
}

describe("GoalsAccordion", () => {
    it("should render spinner when loading", () => {
        // GIVEN
        mockedUseGoals = {
            loading: true,
            goals: []
        }

        // WHEN
        render(<GoalsAccordion projectId={"1"}/>)

        // THEN
        expect(screen.getByRole("progressbar")).toBeInTheDocument()
    })

    it("should render data", () => {
        // GIVEN
        mockedUseGoals = {
            loading: false,
            goals: [goal1, goal2]
        }

        // WHEN
        render(<GoalsAccordion projectId={"1"}/>)

        // THEN
        expect(screen.getByText("Goal 1")).toBeInTheDocument()
        expect(screen.getByText("Description 1")).toBeInTheDocument()
        expect(screen.getByText("Goal 2")).toBeInTheDocument()
        expect(screen.getByText("Description 2")).toBeInTheDocument()
    })

    it("should show noGoals text", () => {
        // GIVEN
        mockedUseGoals = {
            loading: false,
            goals: []
        }

        // WHEN
        render(<GoalsAccordion projectId={"1"}/>)

        // THEN
        expect(screen.getByText("noGoals"))
    })

    it("should have back button", async () => {
        // GIVEN
        const user = userEvent.setup()
        mockedUseGoals = {
            loading: false,
            goals: [goal1, goal2]
        }

        // WHEN
        render(<GoalsAccordion projectId={"1"}/>)
        await user.click(screen.getByText("button.back"))

        // THEN
        expect(mockNavigate).toHaveBeenCalledWith("/projects/")
    })
})