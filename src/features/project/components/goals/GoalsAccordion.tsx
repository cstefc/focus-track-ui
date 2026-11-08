import {Goal} from "@/api/domain/projects/Goal";
import React from "react";
import Loading from "@/components/ui/Loading";
import {useTranslation} from "react-i18next";
import {Button, Stack} from "@mui/material";
import CreateGoalDialog from "@/features/project/components/goals/create-dialog/CreateGoalDialog";
import {useNavigate} from "react-router-dom";
import {GoalAccordion} from "@/features/project/components/goals/GoalAccordion";
import useGoals from "@/hooks/useGoals";

export interface GoalsAccordionProps {
    projectId: string;
}

export function GoalsAccordion({projectId}: GoalsAccordionProps) {
    const {t} = useTranslation("projects");
    const navigate = useNavigate();
    const {loading, goals, createGoal, updateGoal, deleteGoal} = useGoals(projectId)

    if (loading) return <Loading/>

    return (
        <>
            <Stack direction={"row"} spacing={1} sx={{display: "flex", margin: 1, justifyContent: "flex-end"}}>
                <Button color={"secondary"} onClick={() => navigate(`/projects/`)}>
                    {t("button.back")}
                </Button>
                <CreateGoalDialog projectId={projectId} createHandler={createGoal}/>
            </Stack>

            {(!loading && goals.length === 0) && <p>{t("noGoals")}</p>}
            {goals.sort((g1, g2) => g1.id - g2.id).map((goal: Goal) => (
                <GoalAccordion key={goal.id} goal={goal} updateHandler={updateGoal} deleteHandler={deleteGoal}/>
            ))}

        </>)
        ;
}