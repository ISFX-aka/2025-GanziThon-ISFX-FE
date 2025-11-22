export default async function handler(req, res) {
  const ALLOWED_ORIGIN = "https://2025-ganzi-thon-isfx-fe.vercel.app"; // 운영 시 실제 도메인

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const backendUrl = "https://shim.syu-likelion.org/api/auth/social/login";

  try {
    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body: JSON.stringify(req.body),
    });

    const text = await backendRes.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (error) {
      result = { raw: text };
    }
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.status(backendRes.status).json(result);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.status(500).json({ message: "Server Proxy Error", error: err.message });
  }
}
