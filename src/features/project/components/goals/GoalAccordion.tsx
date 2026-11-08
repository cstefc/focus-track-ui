import {Goal, UpdateGoal} from "@/api/domain/projects/Goal";
import GoalAccordionEdit from "@/features/project/components/goals/GoalAccordionEdit";
import {GoalAccordionDisplay} from "@/features/project/components/goals/GoalAccordionDisplay";
import {Accordion, AccordionDetails} from "@mui/material";
import StepTable from "@/features/project/components/steps/StepTable";
import React, {useState} from "react";

export interface GoalAccordionProps {
    goal: Goal;
    updateHandler: (updateGoal: UpdateGoal) => void;
    deleteHandler: (id: number) => void;
}

export function GoalAccordion({goal, updateHandler, deleteHandler}: GoalAccordionProps) {
    const [edit, setEdit] = useState(false)

    async function handleSubmit(updateGoal: UpdateGoal) {
        setEdit(false);
        updateHandler(updateGoal);
    }

    async function handleDelete(id: number) {
        setEdit(false);
        deleteHandler(id);
    }

    function cancelHandler(): void {
        setEdit(false);
    }

    function toggleEdit() {
        setEdit(!edit);
    }

    return (
        <Accordion key={goal.id}>
            {edit ? <GoalAccordionEdit goal={goal} submitHandler={handleSubmit} cancelHandler={cancelHandler}/> :
                <GoalAccordionDisplay goal={goal} handleDelete={handleDelete} toggleEdit={toggleEdit}/>
            }
            <AccordionDetails>
                <StepTable goalId={goal.id}/>
            </AccordionDetails>
        </Accordion>
    )
}