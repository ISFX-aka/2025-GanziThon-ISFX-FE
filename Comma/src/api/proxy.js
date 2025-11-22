export default async function handler(req, res) {
  const backendUrl = "https://shim.syu-likelion.org/api/auth/social/login";

  if (req.method === "POST") {
    try {
      const backendRes = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
        body: JSON.stringify(req.body),
      });
      const data = await backendRes.json();
      res.status(backendRes.status).json(data);
    } catch (err) {
      res.status(500).json({ message: "서버 프록시 오류", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
