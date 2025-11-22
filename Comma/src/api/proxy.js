export default async function handler(req, res) {
  // CORS 옵션: OPTIONS 프리플라이트도 허용
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  // 실제 백엔드 API 주소 (HTTPS)
  const backendUrl = "https://shim.syu-likelion.org/api/auth/social/login";

  try {
    // fetch는 Node.js 18 이상에서 내장, 하위는 node-fetch 필요
    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 Authorization 등 추가
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body: JSON.stringify(req.body),
    });

    const text = await backendRes.text();
    // JSON 응답 파싱(빈 응답 대비)
    let result;
    try {
      result = JSON.parse(text);
    } catch (error) {
      result = { raw: text };
    }
    res.status(backendRes.status).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server Proxy Error", error: err.message });
  }
}
