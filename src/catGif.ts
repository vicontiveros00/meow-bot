interface CatApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?mime_types=gif";

export async function fetchRandomCatGif(): Promise<string> {
  const res = await fetch(CAT_API_URL);
  if (!res.ok) throw new Error(`Cat API returned ${res.status}`);
  const [image] = (await res.json()) as CatApiImage[];
  return image.url;
}
