import {render, screen} from "@testing-library/react";
import Loading from "@/components/ui/Loading";

describe("loading", async () => {
    it("should render the component", () => {
        render(<Loading />);
        const circle = screen.getByRole("progressbar")
        expect(circle).toBeInTheDocument();
    })
})