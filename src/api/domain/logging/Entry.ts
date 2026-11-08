import {string, number, z} from "zod";
import {CreateProjectForm} from "../projects/Project";
import {EntryType} from "../predefined/EntryType";

export interface Entry {
    id: number;
    title: string;
    description: string;
    scoring: number;
    type: EntryType;
}

export const CreateEntryForm = z.object({
    log_id: number().min(0, "Log id is required"),
    title: string().min(1, "Entry title is required."),
    description: string().min(1, "Entry description is required."),
    type: string(),
    scoring: number(),
})

export type CreateEntry = z.infer<typeof CreateProjectForm>;

