import {useEffect, useState} from "react";
import {CreateProject, Project, UpdateProject} from "@/api/domain/projects/Project";
import {useGetApi} from "@/hooks/useGetApi";
import {deleteApi, sendApi} from "@/api/apiCall";

export interface useProjectsAttributes {
    loading: boolean,
    data: Project[],
    createProject: (data: CreateProject) => void,
    updateProject: (data: UpdateProject) => void,
    archiveProject: (data: UpdateProject) => void,
    deleteProject: (id: number) => void,
}

export default function useProjects(): useProjectsAttributes {

    const [data, setData] = useState<Project[]>([]);
    const {data: fetched, loading} = useGetApi<Project[]>("/projects");

    useEffect(() => {
        if (!loading && fetched) {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setData(() => fetched);
        }
    }, [loading]);

    async function createProject(projectData: CreateProject) {
        const project = await sendApi<Project>("/projects", "POST", JSON.stringify(projectData));
        if (project) {
            setData(data => [...data, project]);
        }
    }

    async function updateProject(updateData: UpdateProject) {
        const result = await sendApi<Project>(`/projects`, "PUT", JSON.stringify(updateData));
        if (result) {
            setData(data => data.map((project) => project.id == updateData.id ? result : project));
        }
    }

    async function archiveProject(updateData: UpdateProject) {
        updateData.archived = true;
        const result = await sendApi<Project>(`/projects`, "PUT", JSON.stringify(updateData));
        if (result) {
            setData(data => data.map((project) => project.id == updateData.id ? result : project));
        }
    }

    function deleteProject(id: number) {
        void deleteApi(`/projects/?id=${id}`);
        setData(data.filter((p) => p.id !== id));
    }

    return {loading, data, createProject, updateProject, archiveProject, deleteProject};
}