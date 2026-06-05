export type AppRole = "coach" | "client";

type RoleMetadataUser = {
  publicMetadata?: Record<string, unknown> | null;
  unsafeMetadata?: Record<string, unknown> | null;
};

export function getRoleFromUser(user: RoleMetadataUser | null | undefined): AppRole {
  const publicRole = user?.publicMetadata?.role;
  const unsafeRole = user?.unsafeMetadata?.role;

  if (publicRole === "coach" || unsafeRole === "coach") {
    return "coach";
  }

  return "client";
}

export function isCoachRole(user: RoleMetadataUser | null | undefined): boolean {
  return getRoleFromUser(user) === "coach";
}
