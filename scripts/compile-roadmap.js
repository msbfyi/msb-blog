const fetch = require('node-fetch');
const fs = require('fs');

async function getProjectBoardData(owner, repo, projectBoardId, githubToken) {
    const headers = {
        'Authorization': `token ${githubToken}`
    };

    // Fetch columns of the project board
    const columnsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/projects/${projectBoardId}/columns`, { headers });
    const columns = await columnsResponse.json();

    const boardData = {};
    for (const column of columns) {
        const columnName = column.name;
        const columnId = column.id;
        const cardsResponse = await fetch(`https://api.github.com/projects/columns/${columnId}/cards`, { headers });
        const cards = await cardsResponse.json();
        const cardData = cards.map(card => card.note);
        boardData[columnName] = cardData;
    }

    return boardData;
}

function writeToMarkdown(boardData, outputFile) {
    let markdownContent = '';
    for (const [column, cards] of Object.entries(boardData)) {
        markdownContent += `## ${column}\n`;
        cards.forEach(card => {
            markdownContent += `- ${card}\n`;
        });
        markdownContent += '\n';
    }
    fs.writeFileSync(outputFile, markdownContent);
}

async function main() {
    const owner = 'owner_username';
    const repo = 'repository_name';
    const projectBoardId = 'project_board_id';
    const githubToken = 'your_github_token';
    const outputFile = 'project_board.md';

    const boardData = await getProjectBoardData(owner, repo, projectBoardId, githubToken);
    writeToMarkdown(boardData, outputFile);
}

main();
