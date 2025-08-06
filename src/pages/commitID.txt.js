import { execSync } from 'child_process';

export async function GET() {
    const commitHash = execSync('git rev-parse HEAD').toString().trim();

    return new Response(commitHash);
}
