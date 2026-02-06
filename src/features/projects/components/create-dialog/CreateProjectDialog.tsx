import {CreateProject, CreateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import React, {JSX, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";
import {useProjectsContext} from "@/features/projects/ProjectsScreen";


export default function CreateProjectDialog(): JSX.Element {
    const {t} = useTranslation("projects");
    const [showDialog, setShowDialog] = useState(false);
    const {createProject} = useProjectsContext()

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
        defaultValues: {
            archived: false, // hidden default
        },
    });

    async function submitHandler(data: CreateProject) {
        setShowDialog(false);
        void createProject(data);
        reset();
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"flex-end"} margin={2}>
                <Button variant={"contained"} hidden={!showDialog}
                        onClick={() => setShowDialog(true)}
                >
                    {t("button.createProject")}
                </Button>
            </Box>

            <React.Fragment>
                <Dialog open={showDialog} onClose={() => setShowDialog(false)}
                >
                    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
                        <DialogTitle id="alert-dialog-title">
                            {t("create.projectTitle")}
                        </DialogTitle>

                        <DialogContent>
                            <ZodTextField translation_scope={"projects"} item={"title"}
                                          register={register} errors={errors.title}/>
                            <ZodTextField translation_scope={"projects"} item={"description"}
                                          register={register} errors={errors.description}/>
                        </DialogContent>

                        <DialogActions>
                            <Stack direction={"row"} padding={1} spacing={1}>
                                <Button color={"secondary"} disabled={isSubmitting} onClick={() => {
                                    setShowDialog(false)
                                }}>
                                    {t("button.cancel")}
                                </Button>
                                <Button type={"submit"} disabled={isSubmitting} variant={"contained"} autoFocus>
                                    {t("button.save")}
                                </Button>
                            </Stack>
                        </DialogActions>
                    </Box>
                </Dialog>
            </React.Fragment>
        </>
    );
}
