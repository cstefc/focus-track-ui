import {Button, Stack, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import {Step} from "@/api/domain/projects/Step";
import {Status} from "@/api/domain/predefined/Status";
import {useTranslation} from "react-i18next";

export interface StepLineDisplayProps {
    step: Step;
    setEdit: (edit: boolean) => void;
    deleteHandler: (id: number) => void;
}

export const StepLineDisplay = ({step, deleteHandler, setEdit}: StepLineDisplayProps) => {
    const {t} = useTranslation("projects");

    return (
        <>
            <TableRow key={step.id}>
                <TableCell align="center">{step.sequence}</TableCell>
                <TableCell align="center">{step.objective}</TableCell>
                <TableCell align="center">{step.description}</TableCell>
                <TableCell align="center">{step.requirements}</TableCell>
                <TableCell align="center">{t(`status.${Status[step.status]}`)}</TableCell>
                <TableCell align="center">
                    <Stack direction={"row"}>
                        <Button onClick={() => setEdit(true)}>
                            <EditIcon/>
                        </Button>
                        <Button color={"error"} onClick={() => deleteHandler(step.id)}>
                            <DeleteOutlineIcon/>
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
}