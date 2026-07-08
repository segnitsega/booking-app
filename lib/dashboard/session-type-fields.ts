/** Turn a title into a URL-safe slug (lowercase kebab-case). */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 60;
}

export type SessionTypeInput = {
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  price: number | null;
  color: string;
  isActive: boolean;
};

export type SessionTypeListItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  price: number | null;
  color: string;
  isActive: boolean;
  bookingCount: number;
};
