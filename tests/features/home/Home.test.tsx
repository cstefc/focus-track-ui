import Home from "../../../src/features/home/Home";
import {render, screen} from "@testing-library/react";
import {fakeAuth, test_user} from "../../setup";

describe('Home', () => {
    it('renders correctly', () => {
        // GIVEN

        // WHEN
        render(<Home />);

        // THEN
        const picture = screen.queryByRole('img');
        expect(picture).toBeInTheDocument();

        const cards = screen.queryAllByText(/cards\.[^.]*\.title/);
        expect(cards).toHaveLength(3);
    })

    it("should render login button when not logged in", async () => {
        // GIVEN
        fakeAuth.currentUser = null

        // WHEN
        render(<Home />)
        // THEN
        const button = screen.queryByRole('button')
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent( "button.loggedOut")
    })

    it("should render view projects button when logged in", async () => {
        // GIVEN
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<Home />)

        // THEN
        const button = screen.queryByRole('button')
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent( "button.loggedIn")
    })
})