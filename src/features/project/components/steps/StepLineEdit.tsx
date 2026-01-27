import {Step, UpdateStep, UpdateStepForm} from "@/api/domain/projects/Step";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TableCell, TableRow, Typography} from "@mui/material";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";
import {Status} from "@/api/domain/predefined/Status";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export interface StepLineEditProps {
    step: Step;
    submitHandler: (date: UpdateStep) => void;
    cancelHandler: () => void;
}

export const StepLineEdit = ({step, submitHandler, cancelHandler}: StepLineEditProps) => {
    const {t} = useTranslation("projects");
    const {register, handleSubmit, formState: {errors}, control, reset} = useForm<UpdateStep>({
        resolver: zodResolver(UpdateStepForm),
        defaultValues: {
            id: step.id,
            sequence: step.sequence,
            objective: step.objective,
            description: step.description,
            requirements: step.requirements,
            status: step.status,
        }
    });

    return (
        <TableRow key={step.id} content={"form"} onSubmit={handleSubmit(submitHandler)}>
            <TableCell align="center">
                <Typography variant={"body1"}>{step.sequence}</Typography>
                <input
                    type="hidden"
                    {...register(`sequence`)}
                />
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.objective} translation_scope={"projects"}
                              item={`objective`} register={register}/>
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.description}
                              translation_scope={"projects"} item={`description`} register={register}/>
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.requirements}
                              translation_scope={"projects"} item={`requirements`} register={register}/>
            </TableCell>
            <TableCell align="center">
                <Controller
                    name={`status`}
                    control={control}
                    defaultValue={step.status}
                    render={({field}) => (
                        <FormControl fullWidth error={!!errors.status}>
                            <InputLabel id="status-label">{t("forms.statusLabel")}</InputLabel>
                            <Select
                                {...field}
                                labelId="status-label"
                                label={t("forms.statusLabel")}
                            >
                                {(Object.keys(Status) as Array<keyof typeof Status>)
                                    .filter((key) => isNaN(Number(key)))
                                    .map((key) => (
                                        <MenuItem key={key} value={Status[key]}>
                                            {t(`status.${key}`)}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </TableCell>
            <TableCell align="center">
                <Stack direction={"row"}>
                    <Button color={"success"} onClick={handleSubmit(submitHandler)}><CheckIcon/></Button>
                    <Button color={"error"} onClick={() => {reset();cancelHandler();}}><CancelIcon/></Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
