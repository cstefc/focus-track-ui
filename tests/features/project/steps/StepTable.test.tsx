import {render, screen} from "@testing-library/react";

vi.mock('@/hooks/useSteps');

import useSteps from '@/hooks/useSteps';
import StepTable from "../../../../src/features/project/components/steps/StepTable";

describe('StepTable', () => {
    const mockGoalId = 1;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state when data is loading', () => {
        vi.mocked(useSteps).mockReturnValue({
            loading: true,
            steps: [],
            updateStep: vi.fn(),
            createStep: vi.fn(),
            deleteStep: vi.fn(),
        });

        render(<StepTable goalId={mockGoalId}/>);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders table with translated headers when loaded', () => {
        vi.mocked(useSteps).mockReturnValue({
            loading: false,
            steps: [],
            updateStep: vi.fn(),
            createStep: vi.fn(),
            deleteStep: vi.fn(),
        });

        render(<StepTable goalId={mockGoalId}/>);

        // Check that table headers are present with translation keys
        expect(screen.getByText('forms.objectiveLabel')).toBeInTheDocument();
        expect(screen.getByText('forms.descriptionLabel')).toBeInTheDocument();
        expect(screen.getByText('forms.requirementsLabel')).toBeInTheDocument();
        expect(screen.getByText('forms.statusLabel')).toBeInTheDocument();
        expect(screen.getByText('forms.editLabel')).toBeInTheDocument();
    });
})