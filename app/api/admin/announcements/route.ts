import { handleCreate, announcementsResource } from "@/lib/admin-api";

export async function POST(request: Request) {
  return handleCreate(announcementsResource, request);
}
