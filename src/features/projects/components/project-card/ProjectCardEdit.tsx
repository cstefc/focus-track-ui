import {Project, UpdateProject, UpdateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import EditPanel from "@/features/projects/components/project-card/EditPanel";
import {Box, CardActions, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";
import {useProjectsContext} from "@/features/projects/ProjectsScreen";

export interface ProjectCardEditProps {
    project: Project;
    onEdit: () => void;
}

export function ProjectCardEdit({project, onEdit}: ProjectCardEditProps) {
    const {t} = useTranslation("projects");
    const {deleteProject, archiveProject, updateProject} = useProjectsContext();
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateProject>({
        resolver: zodResolver(UpdateProjectForm),
        defaultValues: {
            id: project.id,
            title: project.title,
            description: project.description,
            archived: project.archived
        },
    });

    function onSave() {
        handleSubmit(updateProject)();
        onEdit();
    }

    function onArchive() {
        handleSubmit(archiveProject)();
        onEdit();
    }

    function onDelete() {
        deleteProject(project.id);
        onEdit();
    }

    function onCancel() {
        reset();
        onEdit();
    }

    return (
        <>
            <CardContent sx={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography gutterBottom variant={'h5'} component={"div"}>
                        {t("edit.projectTitle")}
                    </Typography>

                    <ZodTextField translation_scope={"projects"} item={"title"}
                                  register={register} errors={errors.title}/>
                    <ZodTextField translation_scope={"projects"} item={"description"}
                                  register={register} errors={errors.description} minRows={2}/>
                </Box>
            </CardContent>

            <CardActions>
                <Box sx={{display: "flex", justifyContent: "center", width: "100%", marginInlineEnd: "8px"}}>
                    <EditPanel isSubmitting={isSubmitting}
                               onSave={onSave}
                               onDelete={onDelete}
                               onArchive={onArchive}
                               onCancel={onCancel}
                    />
                </Box>
            </CardActions>
        </>
    );
}
