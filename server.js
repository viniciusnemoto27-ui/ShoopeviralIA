require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Envie um arquivo de imagem."));
    cb(null, true);
  }
});

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (_req, res) => {
  res.json({
    ok: true,
    app: "Gerador de Vídeos IA",
    providerConfigured: Boolean(process.env.VIDEO_API_URL && process.env.VIDEO_API_KEY),
    message: process.env.VIDEO_API_URL && process.env.VIDEO_API_KEY
      ? "Configurações da API encontradas no servidor."
      : "Gerador de prompts disponível. Configure a API de vídeo no servidor para gerar arquivos de vídeo."
  });
});

/*
 * ADAPTADOR DA API:
 * O provedor da API da imagem ainda não foi identificado. Não inventamos URL,
 * cabeçalhos ou formato de autenticação. Depois de obter a documentação oficial,
 * implemente aqui o formato exigido pelo provedor.
 */
app.post("/api/generate-videos", upload.single("productImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Selecione a foto do produto." });

    const { productName = "Produto", details = "", style = "publicidade natural" } = req.body;
    const safeName = String(productName).slice(0, 120);
    const safeDetails = String(details).slice(0, 600);
    const safeStyle = String(style).slice(0, 100);

    // Esta rota confirma o recebimento seguro da imagem e retorna os dados
    // para a interface. A chamada real de geração depende da documentação da API.
    res.json({
      ok: true,
      received: {
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size
      },
      productName: safeName,
      details: safeDetails,
      style: safeStyle,
      prompts: buildPrompts(safeName, safeDetails, safeStyle),
      videoGeneration: "pending_provider_integration",
      message: "3 prompts criados. Para gerar os arquivos de vídeo, falta configurar o endpoint e a autenticação conforme a documentação do provedor."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível processar a imagem." });
  }
});

function buildPrompts(name, details, style) {
  const base = `Produto: ${name}. ${details}. Estilo: ${style}. Vídeo vertical 9:16, alta qualidade, aparência realista. Preserve fielmente o formato, os detalhes e as características do produto da foto. Não invente funções, acessórios ou especificações.`;
  return [
    `${base} VÍDEO 1 — DEMONSTRAÇÃO: comece com um close atraente do produto, mostre os principais detalhes e depois o produto em uso. Câmera suave, iluminação clara e fundo organizado. Gancho falado: "Olha só esse achado!". Finalize com chamada: "Aproveite e confira antes que acabe!".`,
    `${base} VÍDEO 2 — PROBLEMA E SOLUÇÃO: abra com uma situação cotidiana em que o produto pode ajudar, demonstre seu uso de forma simples e destaque apenas os benefícios informados. Edição dinâmica, cenas curtas e enquadramentos próximos. Gancho falado: "Você também precisava disso?". Finalize: "Corre para conferir!".`,
    `${base} VÍDEO 3 — ESTILO INFLUENCIADOR: apresentação espontânea, como uma recomendação feita para a câmera. Mostre o produto de frente, detalhes e uma cena de uso. Tom animado, natural e convincente, sem exagerar promessas. Gancho falado: "Vim mostrar esse achadinho!". Finalize: "Clique e veja todos os detalhes!".`
  ];
}

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "A imagem deve ter no máximo 10 MB." });
  }
  res.status(400).json({ error: err.message || "Erro na solicitação." });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor ativo na porta ${port}`));
