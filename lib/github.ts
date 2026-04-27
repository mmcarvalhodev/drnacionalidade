const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH ?? "main";
const TOKEN = process.env.GITHUB_TOKEN;

export async function createPostFile(slug: string, mdx: string): Promise<void> {
  if (!OWNER || !REPO || !TOKEN) {
    throw new Error(
      "GITHUB_OWNER, GITHUB_REPO e GITHUB_TOKEN precisam estar configurados nas env vars."
    );
  }

  const path = `content/blog/${slug}.mdx`;
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  const body = {
    message: `Adicionar artigo: ${slug}`,
    content: Buffer.from(mdx, "utf-8").toString("base64"),
    branch: BRANCH,
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
}
