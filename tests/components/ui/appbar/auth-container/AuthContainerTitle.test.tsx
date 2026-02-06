import {render, screen} from "@testing-library/react";
import AuthContainerTitle from "@/components/ui/appbar/auth-container/AuthContainerTitle";
import {User} from "firebase/auth";

describe("AuthContainer", () => {
    it("should render correctly", () => {
        // GIVEN
        const user = {photoURL: "photo.jpg", displayName: "user"} as User;

        // WHEN
        render(<AuthContainerTitle user={user}/>);

        // THEN
        const photo = screen.getByRole('img');
        expect(photo).toBeInTheDocument();
        expect(photo).toHaveAttribute("src", "photo.jpg");
        expect(photo).toHaveAttribute("alt", "profile_pic");

        const name = screen.getByText('user');
        expect(name).toBeInTheDocument();
    });

    it("should be able to handle no photo", () => {
        // GIVEN
        const user = {photoURL: null, displayName: "user"} as User;

        // WHEN
        render(<AuthContainerTitle user={user}/>);

        // THEN
        const photo = screen.queryByRole('img');
        expect(photo).not.toBeInTheDocument();

        const name = screen.getByText('user');
        expect(name).toBeInTheDocument();
    });

    it("should be able to handle no user", () => {
        // GIVEN

        // WHEN
        render(<AuthContainerTitle user={null}/>);

        // THEN
        const photo = screen.queryByRole('img');
        expect(photo).not.toBeInTheDocument();

        const name = screen.queryByText('user');
        expect(name).not.toBeInTheDocument();

        const login = screen.getByText("authentication.signIn");
        expect(login).toBeInTheDocument();
    });
})