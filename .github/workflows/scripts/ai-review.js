import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { execSync } from "child_process";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const prNumber = process.env.GITHUB_REF.split("/").pop();

  const changedFiles = execSync("git diff --name-only origin/main").toString().split("\n");
  const relevantFiles = changedFiles.filter(f => f.endsWith(".tsx") || f.endsWith(".jsx"));

  if (relevantFiles.length === 0) {
    console.log("Nenhum arquivo TSX/JSX modificado. Pulando análise.");
    return;
  }

  let diffs = "";
  for (const file of relevantFiles) {
    try {
      const diff = execSync(`git diff origin/main -- ${file}`).toString();
      if (diff.trim()) {
        diffs += `\n\n### Arquivo: ${file}\n${diff}`;
      }
    } catch (err) {
      console.error(`Erro ao gerar diff para ${file}`, err);
    }
  }

  if (!diffs) {
    console.log("Nenhum diff relevante encontrado.");
    return;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: `
Você é um revisor de código experiente em React (TSX/JSX). 
Analise as alterações e comente:
- Legibilidade e clareza do código
- Boas práticas de React e TypeScript
- Impacto em performance (ex.: re-renderizações desnecessárias, hooks mal utilizados, etc.)
- Possíveis problemas de segurança ou bugs
Sugira melhorias claras e práticas quando possível.
        `
      },
      { role: "user", content: `Aqui estão as mudanças:\n${diffs}` }
    ],
  });

  const review = response.choices[0].message.content;

  await octokit.issues.createComment({
    owner: "SEU_USUARIO",  
    repo: "SEU_REPO", 
    issue_number: prNumber,
    body: review,
  });

  console.log("Comentário de review postado no PR.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
