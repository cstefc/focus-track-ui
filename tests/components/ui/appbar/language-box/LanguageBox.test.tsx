import {render, screen} from "@testing-library/react";
import LanguageBox from "@/components/ui/appbar/language-box/LanguageBox";
import i18n from "i18next";
import {expect} from "vitest";
import userEvent from "@testing-library/user-event";
import {mockChangeLanguage} from "../../../../setup";

describe("LanguageBox Component", () => {
    it("renders without crashing", () => {
        // GIVEN
        const expectedItems = Object.keys(i18n.options.resources ?? {})

        // WHEN
        render(<LanguageBox/>);

        // THEN
        const languages = screen.queryAllByText(/languages\..*/);
        for (const lan of expectedItems){
            expect(languages).contains(lan);
        }
    })

    it("changes language properly", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(<LanguageBox/>);
        await user.click(screen.getByText("EN"));
        await user.click(screen.getByText("NL"));

        // THEN
        expect(mockChangeLanguage).toHaveBeenCalledWith('nl')
    })
})