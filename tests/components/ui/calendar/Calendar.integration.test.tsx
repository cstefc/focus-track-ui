import {render, screen} from "@testing-library/react";
import Calendar from "../../../../src/components/ui/calendar/Calendar";
import userEvent from "@testing-library/user-event";
import {useState} from "react";

describe("Calendar", () => {

    test("renders without crashing", () => {
        // GIVEN
        let date = new Date();

        // WHEN
        render(<Calendar date={date} setDate={(new_date => date = new_date)}/>);

        // THEN
        const prev_button = screen.getByText('<<');
        expect(prev_button).toBeInTheDocument();

        const buttons = screen.getByText("15");
        expect(buttons).toBeInTheDocument();

        const nxt_button = screen.getByText('<<');
        expect(nxt_button).toBeInTheDocument();
    });

    test("previous month should work", async () => {
        // GIVEN friday 14-11-2025
        const user = userEvent.setup();
        const Wrapper = () => {
            const [date, setDate] = useState(new Date(2025, 10, 14));
            return <Calendar date={date} setDate={setDate}/>;
        };

        // WHEN
        render(<Wrapper/>);

        await user.click(screen.getByText("<<"));

        // THEN
        const month = screen.getByText("calendar.months.october 2025");
        expect(month).toBeInTheDocument();
    })

    test("next month should work", async () => {
        // GIVEN friday 14-11-2025
        const user = userEvent.setup();
        const Wrapper = () => {
            const [date, setDate] = useState(new Date(2025, 10, 14));
            return <Calendar date={date} setDate={setDate}/>;
        };

        // WHEN
        render(<Wrapper/>);
        await user.click(screen.getByText(">>"));

        // THEN
        const month = screen.getByText("calendar.months.december 2025");
        expect(month).toBeInTheDocument();
    })

    test("can select date", async () => {
        // GIVEN monday 10/11/2025
        let Wrapper = () => {
            const [date, setDate] = useState(new Date(2025, 10, 10));
            return <Calendar date={date} setDate={setDate}/>;
        }
        const user = userEvent.setup();

        // WHEN
        render(<Wrapper/>);

        // THEN
        expect(screen.getByText("20")).toHaveClass("MuiButton-outlined");
        await user.click(screen.getByText("20"));
        expect(screen.getByText("20")).toHaveClass("MuiButton-contained");
    });

    test("today default selected", () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);

        // WHEN
        render(<Calendar date={date} setDate={(newDate => date = newDate)}/>);

        // THEN
        const button = screen.getByText("15");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("MuiButton-contained");
    })
})