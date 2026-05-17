import type { GeneratedPresignedUrlResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchWithAuth(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res;
}

export async function generatePreSignedUrl({
  token,
  fileName,
  contentType,
}: {
  token: string;
  fileName: string;
  contentType: string;
}): Promise<GeneratedPresignedUrlResponse> {
  const resp = await fetchWithAuth(`/api/v1/storage/pre-signed/upload?filename=${fileName}&contentType=${contentType}`, token);
  return resp.json();
}

export async function uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  if (!res.ok) {
    throw new Error("Object storage server rejected upload payload");
  }
}