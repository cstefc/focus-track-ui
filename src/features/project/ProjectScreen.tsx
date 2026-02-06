import React, {JSX, useEffect, useState} from "react";
import {Project} from "@/api/domain/projects/Project";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import Loading from "@/components/ui/Loading";
import {useGetApi} from "@/hooks/useGetApi";
import {GoalsAccordion} from "@/features/project/components/goals/GoalsAccordion";
import {EmptyPage} from "@/components/layout/EmptyPage";

export default function ProjectScreen(): JSX.Element {
    const {id} = useParams<{ id: string }>();
    const {data, loading} = useGetApi<Project[]>(`/projects?id=${id}`);
    const [project, setProject] = useState<Project | undefined | null>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (data !== null && data !== undefined && data.length > 0) {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setProject(() => data?.[0]);
        }else if (data === null){
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setProject(() => data);
        }
    }, [loading]);

    if (loading) return <Loading/>;

    if (project === null) {
        navigate("/projects");
        return <></>;
    }

    return (
        <EmptyPage>
            <Box>
                <Typography variant={"h3"} sx={{marginBottom: "50px"}}>
                    {project?.title}
                </Typography>
                <Typography variant={"body1"}
                            sx={{wordWrap: "break-word", whiteSpace: "pre-line", marginBottom: "50px"}}>
                    {project?.description}
                </Typography>

                <GoalsAccordion projectId={`${id}`}/>
            </Box>
        </EmptyPage>
    );
}
