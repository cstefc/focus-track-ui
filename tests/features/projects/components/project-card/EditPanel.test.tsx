import {render, screen} from "@testing-library/react";
import EditPanel from "../../../../../src/features/projects/components/project-card/EditPanel";
import userEvent from "@testing-library/user-event";

describe("Edit Panel", () => {
    it("should render correctly", () => {
        // GIVEN

        // WHEN
        const fun = () => {}
        render(<EditPanel onSave={fun} onArchive={fun} onDelete={fun} onCancel={fun} isSubmitting={false}/>)

        // THEN
        const deleteButton = screen.queryByTestId("DeleteOutlineIcon");
        const archiveButton = screen.queryByTestId("ArchiveOutlinedIcon");
        const checkButton = screen.queryByTestId("CheckIcon");
        const cancelButton = screen.queryByTestId("CancelIcon");

        expect(deleteButton).toBeInTheDocument();
        expect(archiveButton).toBeInTheDocument();
        expect(checkButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it("should call save handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const saveMock = vi.fn();

        // WHEN
        const fun = () => {}
        render(<EditPanel onSave={saveMock} onArchive={fun} onDelete={fun} onCancel={fun} isSubmitting={false}/>)

        const saveButton = screen.getByTestId("CheckIcon");
        await user.click(saveButton);

        // THEN
        expect(saveMock).toHaveBeenCalled()
    });

    it("should call delete handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const deleteMock = vi.fn();

        // WHEN
        const fun = () => {}
        render(<EditPanel onSave={fun} onArchive={fun} onDelete={deleteMock} onCancel={fun} isSubmitting={false}/>)

        const deleteButton = screen.getByTestId("DeleteOutlineIcon");
        await user.click(deleteButton);
        await user.click(screen.getByText("button.continue"));

        // THEN
        expect(deleteMock).toHaveBeenCalled()
    });

    it("should call archive handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const archiveMock = vi.fn();

        // WHEN
        const fun = () => {}
        render(<EditPanel onSave={fun} onArchive={archiveMock} onDelete={fun} onCancel={fun} isSubmitting={false}/>)
        const archiveButton = screen.getByTestId("ArchiveOutlinedIcon");
        await user.click(archiveButton);
        await user.click(screen.getByText("button.continue"));

        // THEN
        expect(archiveMock).toHaveBeenCalled()
    });

    it("should call cancel handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const cancelMock = vi.fn();
        const fun = () => {}

        // WHEN
        render(<EditPanel onSave={fun} onArchive={fun} onDelete={fun} onCancel={cancelMock} isSubmitting={false}/>)

        const cancelButton = screen.getByTestId("CancelIcon");
        await user.click(cancelButton);

        // THEN
        expect(cancelMock).toHaveBeenCalled()
    });
})
