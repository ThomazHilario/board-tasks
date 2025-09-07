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

  let diffs = "";
  for (const file of relevantFiles) {
    try {
      const diff = execSync(`git diff origin/${baseBranch} -- ${file}`).toString();
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

  // Chamada para a IA
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: `
Você é um revisor de código experiente em React (TSX/JSX). 
Analise apenas as alterações fornecidas e comente:
- Legibilidade e clareza
- Boas práticas de React/TypeScript
- Possíveis impactos em performance
- Sugestões de melhoria
        `
      },
      { role: "user", content: `Aqui estão as mudanças:\n${diffs}` }
    ]
  });

  const review = response.choices[0].message.content;

  await octokit.issues.createComment({
    owner: "SEU_USUARIO", 
    repo: "SEU_REPO", 
    issue_number: parseInt(process.env.GITHUB_REF.split("/").pop(), 10),
    body: review,
  });

  console.log("Comentário de review postado no PR.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
