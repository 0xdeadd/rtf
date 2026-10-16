import { handleCreate, noticesResource } from "@/lib/admin-api";

export async function POST(request: Request) {
  return handleCreate(noticesResource, request);
}
