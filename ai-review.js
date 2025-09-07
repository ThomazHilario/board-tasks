import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { execSync } from "child_process";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  // pega a branch base do PR dinamicamente
  const baseBranch = process.env.GITHUB_BASE_REF || "develop";

  // Pegar arquivos alterados no PR
  let changedFiles;
  try {
    changedFiles = execSync(`git diff --name-only origin/${baseBranch}`).toString().split("\n");
  } catch (err) {
    console.error("Erro ao buscar diffs do git:", err.message);
    return;
  }

  // Filtrar apenas tsx e jsx
  const relevantFiles = changedFiles.filter(f => f.endsWith(".tsx") || f.endsWith(".jsx"));

  if (!relevantFiles.length) {
    console.log("Nenhum arquivo TSX/JSX modificado. Pulando análise.");
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

  // Solicitação à IA
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

  // Postar comentário no PR
  await octokit.issues.createComment({
    owner: "SEU_USUARIO",   // substitua
    repo: "SEU_REPO",       // substitua
    issue_number: parseInt(process.env.GITHUB_REF.split("/").pop(), 10),
    body: review,
  });

  console.log("Comentário de review postado no PR.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
