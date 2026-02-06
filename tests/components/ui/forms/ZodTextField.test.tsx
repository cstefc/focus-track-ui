import {ZodTextField} from "../../../../src/components/ui/forms/ZodTextField";
import {render, screen} from "@testing-library/react";
import {UseFormRegister} from "react-hook-form";
import userEvent from "@testing-library/user-event";

describe('ZodTextField', () => {

    it("should render correctly", () => {
        // GIVEN
        const register = vi.fn(() => ({
            name: "username",
            onBlur: vi.fn(),
            onChange: vi.fn(),
            ref: vi.fn(),
        })) as unknown as UseFormRegister<{ username: any }>;

        // WHEN
        render(
            <ZodTextField
                translation_scope="test"
                item="username"
                register={register}
                errors={undefined}
            />
        );

        // THEN
        expect(screen.getByLabelText("forms.usernameLabel")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("forms.usernamePlaceholder")).toBeInTheDocument();
    });

    it("should call register correctly", async () => {
        // GIVEN
        const onChangeMock = vi.fn();
        const register = vi.fn(() => ({
            name: "username",
            onBlur: vi.fn(),
            onChange: onChangeMock,
            ref: vi.fn(),
        })) as unknown as UseFormRegister<{ username: any }>;
        const user = userEvent.setup();

        // WHEN
        render(
            <ZodTextField
                translation_scope="test"
                item="username"
                register={register}
                errors={undefined}
            />
        );
        await user.type(screen.getByLabelText('forms.usernameLabel'), "test");

        // THEN
        expect(onChangeMock).toHaveBeenCalled();
    })
})