import {boolean, string, z} from "zod";

export interface Events {
    id: number;
    log_id: number;

    title: string;
    description: string;

    start: Date;
    planned_stop: Date;
    stop: Date;
    timed: boolean;
}

export const CreateEventForm = z.object({
    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),

    start: Date(),
    planned_stop: Date(),

    timed: boolean(),
})

export type CreateEvent = z.infer<typeof CreateEventForm>;
