import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {JSX} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateGoal, CreateGoalForm} from "@/api/domain/projects/Goal";
import {Priority} from "@/api/domain/predefined/Priority";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";

export interface CreateGoalDialogProps {
    projectId: string;
    createHandler: (data: CreateGoal) => void;
}

export default function CreateGoalDialog({projectId, createHandler}: CreateGoalDialogProps): JSX.Element {
    const {t} = useTranslation("projects");
    const [show, setShow] = React.useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateGoal>({
        resolver: zodResolver(CreateGoalForm),
        defaultValues: {
            projectId: projectId || "",
            priority: Priority.Medium,
            estimate: "00:00:00",
        },
    });

    const onSubmit = handleSubmit((data) => {
        createHandler(data);
        setShow(false);
        reset();
    });

    return (
        <>
            <Button variant={"contained"} onClick={() => setShow(true)}>
                {t("button.createGoal")}
            </Button>
            <React.Fragment>
                <Dialog open={show} onClose={() => setShow(false)}>
                    <DialogTitle>{t("create.goalTitle")}</DialogTitle>
                    <DialogContent>
                        <ZodTextField translation_scope={"projects"} item={"title"}
                                      register={register} errors={errors.title}/>
                        <ZodTextField translation_scope={"projects"} item={"description"}
                                      register={register} errors={errors.description}/>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isSubmitting} onClick={() => {
                            reset();
                            setShow(false)
                        }}>
                            {t("button.cancel")}
                        </Button>
                        <Button onClick={onSubmit} disabled={isSubmitting} variant={"contained"} autoFocus>
                            {t("button.save")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
