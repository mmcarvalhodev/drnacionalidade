const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH ?? "main";
const TOKEN = process.env.GITHUB_TOKEN;

function checkConfig() {
  if (!OWNER || !REPO || !TOKEN) {
    throw new Error(
      "GITHUB_OWNER, GITHUB_REPO e GITHUB_TOKEN precisam estar configurados nas env vars."
    );
  }
}

function pathFor(slug: string) {
  return `content/blog/${slug}.mdx`;
}

function urlFor(slug: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${pathFor(slug)}`;
}

function ghHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

export async function createPostFile(slug: string, mdx: string): Promise<void> {
  checkConfig();
  const res = await fetch(urlFor(slug), {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({
      message: `Adicionar artigo: ${slug}`,
      content: Buffer.from(mdx, "utf-8").toString("base64"),
      branch: BRANCH,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
}

export async function getPostFromGitHub(
  slug: string
): Promise<{ sha: string; mdx: string } | null> {
  checkConfig();
  const res = await fetch(`${urlFor(slug)}?ref=${BRANCH}`, {
    method: "GET",
    headers: ghHeaders(),
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }

  const data = (await res.json()) as { sha: string; content: string };
  const mdx = Buffer.from(data.content, "base64").toString("utf-8");
  return { sha: data.sha, mdx };
}

export async function updatePostFile(
  slug: string,
  mdx: string,
  sha: string
): Promise<void> {
  checkConfig();
  const res = await fetch(urlFor(slug), {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({
      message: `Atualizar artigo: ${slug}`,
      content: Buffer.from(mdx, "utf-8").toString("base64"),
      branch: BRANCH,
      sha,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
}

export async function deletePostFile(
  slug: string,
  sha: string
): Promise<void> {
  checkConfig();
  const res = await fetch(urlFor(slug), {
    method: "DELETE",
    headers: ghHeaders(),
    body: JSON.stringify({
      message: `Remover artigo: ${slug}`,
      branch: BRANCH,
      sha,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
}
