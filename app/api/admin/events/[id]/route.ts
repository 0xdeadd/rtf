import { handleUpdate, handleDelete, eventsResource } from "@/lib/admin-api";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  return handleUpdate(eventsResource, request, id);
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  return handleDelete(eventsResource, id);
}
