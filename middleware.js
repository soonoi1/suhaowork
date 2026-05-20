const encoder = new TextEncoder();
const AUTH_PROTECTION_ENABLED = true;

function timingSafeEqual(left, right) {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    diff |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }

  return diff === 0;
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="suhaowork", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export default function middleware(request) {
  if (!AUTH_PROTECTION_ENABLED) {
    return;
  }

  const user = process.env.SITE_AUTH_USER;
  const password = process.env.SITE_AUTH_PASSWORD;

  if (!user || !password) {
    return;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(authorization.slice(6));
  } catch {
    return unauthorized();
  }

  const separatorIndex = decoded.indexOf(":");
  const inputUser = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : "";
  const inputPassword = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";

  if (!timingSafeEqual(inputUser, user) || !timingSafeEqual(inputPassword, password)) {
    return unauthorized();
  }
}

export const config = {
  matcher: "/(.*)",
};
