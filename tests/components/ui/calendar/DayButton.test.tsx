import {render, screen} from "@testing-library/react";
import DayButton from "@/components/ui/calendar/DayButton";

describe("DayButton", () => {

    test("rendering", () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);

        // WHEN
        render(<DayButton date={date} selected={date} setSelected={newDate => date = newDate}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test("selected changes style", () => {
        // GIVEN monday 10/11/2025
        let date = new Date(2025, 10, 10);

        // WHEN
        render(<DayButton date={date} selected={date} setSelected={newDate => date = newDate}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("MuiButton-contained");
    });

    test("prev month disabled", () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);
        let selected = new Date(2025, 11, 15);

        // WHEN
        render(<DayButton date={date} selected={selected} setSelected={newDate => selected = newDate}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    test("next month disabled", () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);
        let selected = new Date(2025, 9, 15);

        // WHEN
        render(<DayButton date={date} selected={selected} setSelected={newDate => selected = newDate}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    })

})