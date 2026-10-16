import { handleCreate, meetingsResource } from "@/lib/admin-api";

export async function POST(request: Request) {
  return handleCreate(meetingsResource, request);
}
