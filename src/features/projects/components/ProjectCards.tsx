import React from "react";
import {ProjectCard} from "@/features/projects/components/project-card/ProjectCard";
import {useTranslation} from "react-i18next";
import CreateProjectDialog from "@/features/projects/components/create-dialog/CreateProjectDialog";
import Loading from "@/components/ui/Loading";
import {Grid, Typography} from "@mui/material";
import {useProjectsContext} from "@/features/projects/ProjectsScreen";

export interface ProjectScreenProps {
    showWithArchived?: boolean;
}

export default function ProjectCards({showWithArchived}: ProjectScreenProps) {
    const {t} = useTranslation("projects");
    const items_name = showWithArchived ? "archived" : "active"
    const {loading, data: projects} = useProjectsContext();

    // Show spinner when projects are being fetched
    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            {/** Create project button + modal*/}
            {!showWithArchived && <CreateProjectDialog/>}

            {/** List the project cards*/}
            <Grid container spacing={1}>
                {projects.sort((p1, p2) => p1.id - p2.id).map((p) => p.archived === showWithArchived ?
                    <ProjectCard key={p.id} project={p}/> : null)}
            </Grid>

            {/** Show message when there aren't any projects */}
            {projects.filter((p) => p.archived === showWithArchived).length == 0 &&
                <Typography variant={"body1"}>{t(`noProjects.${items_name}`)}</Typography>}
        </>
    );
}

