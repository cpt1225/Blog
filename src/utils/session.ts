import { auth } from "@/lib/auth"

const session = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.name || !session.user.id) {
    return {
      userid: null,
      role: null,
    }
  }
  return { session, userid: session.user.id, role: session.user.name };
}

export default session