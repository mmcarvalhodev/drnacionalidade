"use client";

import { useId, useRef, useState } from "react";
import { getCloudinarySignature } from "./cloudinary-actions";

type Props = {
  name: string;
  defaultValue?: string;
};

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function CoverImageUpload({ name, defaultValue = "" }: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      setError("Formato não suportado. Envie JPG, PNG, WEBP ou GIF.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Imagem maior que 5MB. Reduza antes de enviar.");
      e.target.value = "";
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const sig = await getCloudinarySignature();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", sig.signature);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("api_key", sig.apiKey);
      formData.append("folder", sig.folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

      const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl);
          xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) {
              setProgress(Math.round((ev.loaded / ev.total) * 100));
            }
          };
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch {
                reject(new Error("Resposta inválida do Cloudinary."));
              }
            } else {
              reject(
                new Error(`Cloudinary respondeu ${xhr.status}: ${xhr.responseText}`)
              );
            }
          };
          xhr.onerror = () => reject(new Error("Erro de rede no upload."));
          xhr.send(formData);
        }
      );

      setUrl(result.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemove() {
    setUrl("");
    setError(null);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="sr-only"
        id={inputId}
        disabled={uploading}
      />

      {!url && !uploading && (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded border-2 border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center hover:border-navy-700 hover:bg-stone-100 transition-colors"
        >
          <svg
            className="w-8 h-8 text-stone-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium text-stone-700">
            Selecionar imagem
          </span>
          <span className="text-xs text-stone-500">
            JPG, PNG, WEBP ou GIF · até 5MB
          </span>
        </label>
      )}

      {uploading && (
        <div className="rounded border border-navy-100 bg-navy-50 px-4 py-6">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-5 h-5 animate-spin text-navy-700"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeOpacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0110 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-navy-900 font-medium">
              Enviando... {progress}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-navy-100 overflow-hidden">
            <div
              className="h-full bg-navy-700 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {url && !uploading && (
        <div className="space-y-2">
          <div className="relative rounded border border-stone-200 bg-stone-100 overflow-hidden aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Pré-visualização da capa"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label
              htmlFor={inputId}
              className="cursor-pointer rounded border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
            >
              Trocar imagem
            </label>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
            >
              Remover
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-stone-500 hover:text-navy-700 underline break-all ml-auto max-w-[60%] truncate"
            >
              {url}
            </a>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
