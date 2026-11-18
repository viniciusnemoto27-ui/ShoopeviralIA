# Gerador de Vídeos IA — Achadinhos

Aplicativo web responsivo para enviar uma foto de produto e criar 3 prompts de vídeo vertical (9:16).

## O que funciona nesta versão

- Upload de imagem (máximo 10 MB).
- Prévia da imagem.
- Campo para nome e detalhes do produto.
- Criação de 3 prompts diferentes: demonstração, problema/solução e estilo influenciador.
- Botão para copiar cada prompt.
- Backend Node.js para manter futuras credenciais fora do navegador.

## Importante sobre a API

A imagem enviada mostra um AppID e um segredo, mas não identifica com segurança o provedor, a URL da API, o método de autenticação nem o formato de geração de vídeos. Por isso, esta versão **não finge que já gera arquivos MP4**: ela cria os 3 prompts e deixa o backend preparado para a integração real.

Para ativar a geração de vídeos, obtenha a documentação oficial do serviço e implemente a chamada no endpoint `POST /api/generate-videos` em `server.js`. Confirme:
- URL oficial do endpoint;
- método de autenticação (AppID/segredo, assinatura ou token);
- formato do envio da imagem;
- parâmetros de duração, proporção e prompt;
- formato da resposta e como consultar o status/download do vídeo.

Não adivinhe cabeçalhos ou endpoints.

## Rodar localmente

Requer Node.js 18 ou superior.

```bash
npm install
npm start
```

Abra `http://localhost:3000`.

## Publicar no GitHub

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e a pasta `public`.
3. Não envie o arquivo `.env` nem credenciais.
4. Para colocar o app no ar, use um serviço que execute Node.js (por exemplo, Render ou Railway). GitHub Pages sozinho não executa `server.js`.
5. Configure as variáveis secretas no painel do serviço de hospedagem.

## Segurança

A chave que apareceu na captura de tela deve ser considerada exposta. Redefina-a no painel do provedor antes de usar. Guarde a nova chave apenas como variável secreta no servidor. Nunca publique AppID secreto, senha, token ou chave em repositório público.
