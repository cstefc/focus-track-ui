import {mockNavigate} from "../../setup";
import {render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import ProjectScreen from "@/features/project/ProjectScreen";
import {useGetApi} from "../../../src/hooks/useGetApi";

// Mock dependencies
vi.mock('@/features/project/components/goals/GoalsAccordion', () => ({
    GoalsAccordion: () => null
}));
vi.mock('@/hooks/useGetApi');

describe('ProjectScreen', () => {
    const mockProject = {
        id: 1,
        title: 'Test Project',
        description: 'Test Description',
    };

    it('renders loading state while fetching data', () => {
        vi.mocked(useGetApi).mockReturnValue({
            data: null,
            loading: true,
        });

        render(<ProjectScreen/>);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders project title and description when data is loaded', async () => {
        vi.mocked(useGetApi).mockReturnValue({
            data: [mockProject],
            loading: false,
        });

        render(<ProjectScreen/>);
        screen.debug()
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('navigates to /projects when project data is null', async () => {
        vi.mocked(useGetApi).mockReturnValue({
            data: null,
            loading: false,
        });

        render(<ProjectScreen/>);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/projects');
        });
    });
});