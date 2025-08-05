import { adaptRoute } from "@main/adapters/express-adapter";
import { Router } from "express";
import { makeAnalyzeTextFactory } from "@contexts/text-analysis/external/factories/analyze-text.factory";
import { makeSearchTermFactory } from "@contexts/text-analysis/external/factories/search-term.factory";

/**
 * @swagger
 * /analyze-text:
 *   post:
 *     summary: Analisa o sentimento e toxicidade de um texto
 *     description: Analisa um texto de entrada e retorna o sentimento detectado, toxicidade, palavras frequentes e estatísticas básicas
 *     tags: [Text Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextAnalysisRequest'
 *           examples:
 *             positive_text:
 *               summary: Texto com sentimento positivo
 *               value:
 *                 text: "Eu estou muito feliz hoje! O dia está lindo e tudo está indo muito bem."
 *             negative_text:
 *               summary: Texto com sentimento negativo
 *               value:
 *                 text: "Estou muito triste e decepcionado com o que aconteceu hoje."
 *             neutral_text:
 *               summary: Texto neutro
 *               value:
 *                 text: "O relatório foi entregue na data prevista com todas as informações solicitadas."
 *     responses:
 *       200:
 *         description: Análise realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextAnalysisResponse'
 *             examples:
 *               positive_analysis:
 *                 summary: Análise de texto positivo
 *                 value:
 *                   text: "Eu estou muito feliz hoje! O dia está lindo e tudo está indo muito bem."
 *                   sentiment: "positive"
 *                   toxicity: "non-toxic"
 *                   frequent_words: ["muito", "feliz", "hoje", "lindo", "indo", "bem"]
 *                   total_words: 12
 *               negative_analysis:
 *                 summary: Análise de texto negativo
 *                 value:
 *                   text: "Estou muito triste e decepcionado com o que aconteceu hoje."
 *                   sentiment: "negative"
 *                   toxicity: "non-toxic"
 *                   frequent_words: ["muito", "triste", "decepcionado", "aconteceu", "hoje"]
 *                   total_words: 8
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "O campo 'text' é obrigatório"
 *               statusCode: 400
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Erro interno do servidor"
 *               statusCode: 500
 */

/**
 * @swagger
 * /search-term:
 *   get:
 *     summary: Busca análises por termo
 *     description: Busca todas as análises de texto que contêm um termo específico
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo a ser buscado nas análises
 *         examples:
 *           example1:
 *             summary: Buscar por "feliz"
 *             value: "feliz"
 *           example2:
 *             summary: Buscar por "triste"
 *             value: "triste"
 *           example3:
 *             summary: Buscar por "hoje"
 *             value: "hoje"
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchTermResponse'
 *             examples:
 *               found_results:
 *                 summary: Resultados encontrados
 *                 value:
 *                   results:
 *                     - text: "Eu estou muito feliz hoje!"
 *                       sentiment: "positive"
 *                       toxicity: "non-toxic"
 *                       frequent_words: ["muito", "feliz", "hoje"]
 *                       total_words: 5
 *                       created_at: "2024-01-15T10:30:00.000Z"
 *                     - text: "Hoje foi um dia muito produtivo!"
 *                       sentiment: "positive"
 *                       toxicity: "non-toxic"
 *                       frequent_words: ["hoje", "muito", "produtivo"]
 *                       total_words: 6
 *                       created_at: "2024-01-15T11:30:00.000Z"
 *                   total_found: 2
 *                   search_term: "palavra"
 *               no_results:
 *                 summary: Nenhum resultado encontrado
 *                 value:
 *                   results: []
 *                   total_found: 0
 *       400:
 *         description: Parâmetro de busca inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "O parâmetro 'term' é obrigatório"
 *               statusCode: 400
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Erro interno do servidor"
 *               statusCode: 500
 */

export default (router: Router) => {
  router.post("/analyze-text", adaptRoute(makeAnalyzeTextFactory()));
  router.get("/search-term", adaptRoute(makeSearchTermFactory()));
};
