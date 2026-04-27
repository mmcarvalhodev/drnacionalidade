"use client";

import { deletePost } from "./actions";

export default function DeletePostButton({
  slug,
  title,
  variant = "compact",
}: {
  slug: string;
  title: string;
  variant?: "compact" | "danger";
}) {
  const className =
    variant === "danger"
      ? "rounded border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
      : "text-xs text-red-700 hover:underline";

  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (
          !confirm(
            `Excluir "${title}"? Esta ação não pode ser desfeita.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" className={className}>
        Excluir
      </button>
    </form>
  );
}
