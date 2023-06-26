"use server";

import { cookies } from "next/headers";

export async function hasCookie() {
  const accessToken = cookies().get("access_token")?.value;
  return !!accessToken;
}
