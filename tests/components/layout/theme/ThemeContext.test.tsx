import {CustomThemeProvider} from "../../../../src/components/layout/theme/ThemeContext";
import {render, screen} from "@testing-library/react";
import {useTheme} from "@/components/layout/theme/ThemeContext";
import { Button } from "@mui/material";
import userEvent from "@testing-library/user-event";


describe('ThemeContext', () => {
    it("should render without crashing", () => {
        // GIVEN
        const TestComponent = () => {
            return (<p>This should render</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(screen.getByText("This should render")).toBeInTheDocument();
    });

    it("should save the theme to localstorage", () => {
        // GIVEN
        const TestComponent = () => {
            return (<p>This should render</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(localStorage.getItem("theme")).toEqual("dark")
    });

    it("should provide the theme in the child components", () => {
        // GIVEN
        const TestComponent = () => {
            const {mode} = useTheme();

            return (<p>{mode}</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(screen.getByText("dark")).toBeInTheDocument();
    });

    it("should be able to change the theme", async () => {
        // GIVEN
        const user = userEvent.setup()
        const TestComponent = () => {
            const {mode, changeMode} = useTheme();
            return (
                <>
                <Button onClick={() => changeMode("light")}>Click Me!</Button>
                    <p>{mode}</p>
                </>
            );
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>
        )
        await user.click(screen.getByText("Click Me!"))

        // THEN
        expect(screen.getByText("light")).toBeInTheDocument();
        expect(localStorage.getItem("theme")).toEqual("light")
    });
})