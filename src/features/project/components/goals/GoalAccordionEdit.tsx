import {Goal, UpdateGoal, UpdateGoalForm} from "@/api/domain/projects/Goal";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AccordionDetails, AccordionSummary, Button, Stack} from "@mui/material";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export interface GoalAccordionItemEditProps {
    goal: Goal;
    submitHandler: (updateGoal: UpdateGoal) => void;
    cancelHandler: () => void;
}

export default function GoalAccordionEdit({goal, submitHandler, cancelHandler}: GoalAccordionItemEditProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateGoal>({
        resolver: zodResolver(UpdateGoalForm),
        defaultValues: {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            priority: goal.priority.valueOf(),
            estimate: "00:00:00",
        }
    });

    return (
        <>
            <AccordionSummary>
                <ZodTextField translation_scope={"projects"} item={"title"}
                              register={register} errors={errors.title}/>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction={"row"} spacing={0} sx={{justifyContent: "flex-end"}}>
                    <ZodTextField translation_scope={"projects"} item={"description"}
                                  register={register} errors={errors.description}
                    />
                    <Button onClick={handleSubmit(submitHandler)} disabled={isSubmitting} color={"success"} autoFocus>
                        <CheckIcon/>
                    </Button>
                    <Button color={"error"} onClick={() => {reset();cancelHandler();}} disabled={isSubmitting}>
                        <CancelIcon/>
                    </Button>
                </Stack>
            </AccordionDetails>
        </>
    );
}
