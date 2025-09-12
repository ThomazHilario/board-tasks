import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { execSync } from "child_process";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const baseBranch = process.env.GITHUB_BASE_REF || "develop";

  let changedFiles;
  try {
    changedFiles = execSync(
      `git diff --name-only --diff-filter=AM origin/${baseBranch}`
    )
      .toString()
      .split("\n")
      .filter(Boolean);
  } catch (err) {
    console.error("Erro ao buscar arquivos modificados:", err.message);
    return;
  }

  const relevantFiles = changedFiles.filter(f => f.endsWith(".tsx") || f.endsWith(".jsx"));

  if (!relevantFiles.length) {
    console.log("Nenhum arquivo TSX/JSX modificado ou adicionado. Pulando análise.");
    return;
  }

  let combinedDiffs = [];
  for (const file of relevantFiles) {
    try {
      const diff = execSync(`git diff origin/${baseBranch} -- ${file}`).toString();
      if (diff.trim()) {
        const blocks = diff.split("\n@@");
        blocks.forEach((block, idx) => {
          combinedDiffs.push(`---- BLOCO DE MUDANÇA ${idx + 1} ----\n${block.trim()}`);
        });
      }
    } catch (err) {
      console.error(`Erro ao gerar diff para ${file}`, err);
    }
  }

  if (!combinedDiffs.length) {
    console.log("Nenhum diff relevante encontrado.");
    return;
  }

  const diffsText = combinedDiffs.join("\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "system",
        content: `
Você é um revisor de código especialista em React (TSX/JSX).
Analise cuidadosamente **todas as alterações** reunidas como se fossem um único arquivo.
Explique cada bloco de mudança separado pelo delimitador "---- BLOCO DE MUDANÇA <n> ----".
Para cada bloco, faça:
1. O que foi alterado ou adicionado
2. Sugestões de melhoria
3. Possíveis impactos de performance ou bugs
      `
      },
      { role: "user", content: diffsText }
    ],
  });

  const review = response.choices[0].message.content;

  // Posta comentário no PR
  await octokit.issues.createComment({
    owner: "ThomazHilario",   
    repo: "board-tasks",       
    issue_number: parseInt(process.env.GITHUB_REF.split("/").pop(), 10),
    body: review,
  });

  console.log("Comentário de review postado no PR.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
