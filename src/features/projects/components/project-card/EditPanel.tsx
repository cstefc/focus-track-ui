import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";


export interface ProjectCardEditPanelProps {
    onSave: () => void;
    onDelete: () => void;
    onArchive: () => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export default function EditPanel({
                                      onSave,
                                      onDelete,
                                      onArchive,
                                      onCancel,
                                      isSubmitting
                                  }: ProjectCardEditPanelProps) {
    const {t} = useTranslation("projects");
    const [showWarning, setShowWarning] = useState("");

    const handleContinue = () => {
        if (showWarning === "archive") {
            onArchive()
        } else {
            onDelete()
        }
        setShowWarning("");
    }

    const handleClose = () => {
        setShowWarning("");
    }

    return (
        <>
            <Stack direction="row" spacing={1}>
                <Button color={"warning"} onClick={(event) => {
                    event.stopPropagation();
                    setShowWarning("delete");
                }}>
                    <DeleteOutlineIcon/>
                </Button>

                <Button color={"info"} onClick={(event) => {
                    event.stopPropagation();
                    setShowWarning("archive")
                }}>
                    <ArchiveOutlinedIcon/>
                </Button>

                <Button color={"success"} disabled={isSubmitting} onClick={onSave}>
                    <CheckIcon/>
                </Button>
                <Button
                    color={"error"} onClick={(event) => {
                    event.stopPropagation();
                    onCancel?.()
                }}>
                    <CancelIcon/>
                </Button>
            </Stack>

            <Dialog open={showWarning !== ""}>
                <DialogTitle>{t(`warning.title`)}</DialogTitle>
                <DialogContent>{t(`warning.${showWarning}.description`)}</DialogContent>
                <DialogActions>
                    <Button color={"secondary"} onClick={handleClose}>
                        {t("button.cancel")}
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={handleContinue}>
                        {t("button.continue")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}