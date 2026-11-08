import {Project} from "@/api/domain/projects/Project";
import CardContent from "@mui/material/CardContent";
import {Box, Button, CardActions, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


export interface ProjectCardDisplay {
    project: Project;
    onEdit: () => void;
}

export default function ProjectCardDisplay({project, onEdit}: ProjectCardDisplay) {
    return (
        <>
            <CardContent sx={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="h4" sx={{marginBottom: "50px"}}>
                        {project.title}
                    </Typography>
                    <Typography variant="body1" sx={{wordBreak: "break-word", whiteSpace: "pre-line"}}>
                        {project.description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%", marginInlineEnd: "8px"}}>
                    {!project.archived &&
                        <Button
                            color={"primary"}
                            onClick={e => {
                                e.stopPropagation();
                                onEdit();
                            }}
                        >
                            <EditIcon/>
                        </Button>
                    }
                </Box>
            </CardActions>
        </>
    );
}