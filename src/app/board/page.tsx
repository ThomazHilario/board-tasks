// Components
import { BoardContent } from "@/Components/Board/BoardContent";

// Mock
import mock from '@/mocks/falsedata.json'

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface";
import { Container } from "@/Components/ui/Container/Container";

export default async function Board() {
    // Simulate request
    const tasksUser = await new Promise<taskProps[]>(resolve => setTimeout(() => resolve(mock), 500));

    return (
        <Container>
            <BoardContent tasksUser={tasksUser} />
        </Container>
    );
}