const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/ideas", async (req, res) => {
  const { page = 1, size = 10, sort = "-published_at" } = req.query;

  try {
    const response = await axios.get("https://suitmedia-backend.suitdev.com/api/ideas", {
      params: {
        "page[number]": page,
        "page[size]": size,
        append: ["small_image", "medium_image"],
        sort: sort,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Proxy Error:", error.message);
    res.status(500).json({ error: "Gagal mengambil data dari Suitmedia API" });
  }
});

app.get("/api/banner", async (req, res) => {
  try {
    const response = await axios.get("https://suitmedia-backend.suitdev.com/api/banner", {
      headers: {
        Accept: "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Gagal mengambil data banner:", error.message);
    res.status(500).json({ error: "Gagal mengambil data banner dari Suitmedia API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy API berjalan di http://localhost:${PORT}/api/ideas`);
});
