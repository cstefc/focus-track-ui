import {MenuList} from "@mui/material";
import {render, screen} from "@testing-library/react";
import AuthContainerGoogleLogout from "@/components/ui/appbar/auth-container/AuthContainerGoogleLogout";
import userEvent from "@testing-library/user-event";

describe("AuthContainerGoogleLogout", () => {
    it("renders without crashing", () => {
        // GIVEN

        // WHEN
        render(<MenuList><AuthContainerGoogleLogout hidden={false} handleLogout={() => {}}/></MenuList>);

        // THEN
        const button = screen.queryByText('authentication.signOut');
        expect(button).toBeInTheDocument();
    })

    it("should not be rendered when hidden", async () => {
        // GIVEN

        // WHEN
        render(<MenuList><AuthContainerGoogleLogout hidden={true} handleLogout={() => {} } /></MenuList>);

        // THEN
        const button = screen.queryByText('authentication.signOut');
        expect(button).not.toBeInTheDocument();
    });

    it("should call the handleLogout function when clicked", async () => {
        // GIVEN
        const user = userEvent.setup();
        const logoutMock = vi.fn();

        // WHEN
        render(<MenuList><AuthContainerGoogleLogout hidden={false} handleLogout={logoutMock} /></MenuList>);
        await user.click(screen.getByText("authentication.signOut"));

        // THEN
        expect(logoutMock).toHaveBeenCalled();
    })


})