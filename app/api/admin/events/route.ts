import { handleCreate, eventsResource } from "@/lib/admin-api";

export async function POST(request: Request) {
  return handleCreate(eventsResource, request);
}
