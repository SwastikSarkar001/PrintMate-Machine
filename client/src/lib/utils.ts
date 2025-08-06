import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchAdvanced(input: string | URL | globalThis.Request, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`HTTP ${res.status}: ${errorData.message || res.statusText}`);
  }
  return res.json() as Promise<{ status: "success" | "error"; message: string }>;
}
export function getCloudinaryUrl (publicId: string | undefined, type: 'thumbnail' | 'preview') {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName || !publicId) {
    // Return a placeholder or empty string if config is missing to prevent crashes
    return "";
  }

  // Use a small, cropped thumbnail for the grid view to save bandwidth
  if (type === 'thumbnail') {
    return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,h_300,w_300/${publicId}`;
  }

  // Use the full image delivery for the large preview modal
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};