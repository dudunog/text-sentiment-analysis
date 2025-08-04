import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Environment } from "./environment";

const port = Environment.infrastructure.server.rest.express.port;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Text Sentiment Analysis API",
      version: "1.0.0",
      description:
        "API para análise de sentimento de textos com estatísticas básicas e integração com IA",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        TextAnalysisRequest: {
          type: "object",
          required: ["text"],
          properties: {
            text: {
              type: "string",
              description: "Texto a ser analisado",
              example: "Este é um texto de exemplo para análise de sentimento.",
            },
          },
        },
        TextAnalysisResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID único da análise",
            },
            text: {
              type: "string",
              description: "Texto analisado",
            },
            sentiment: {
              type: "string",
              description: "Sentimento detectado (positive, negative, neutral)",
              enum: ["positive", "negative", "neutral"],
            },
            frequent_words: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Lista das palavras mais frequentes no texto",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Data e hora da criação da análise",
            },
          },
        },
        SearchTermRequest: {
          type: "object",
          required: ["term"],
          properties: {
            term: {
              type: "string",
              description: "Termo de busca",
              example: "exemplo",
            },
          },
        },
        SearchTermResponse: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/components/schemas/TextAnalysisResponse",
              },
              description: "Lista de análises que contêm o termo buscado",
            },
            total: {
              type: "integer",
              description: "Total de resultados encontrados",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de erro",
            },
            statusCode: {
              type: "integer",
              description: "Código de status HTTP",
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/contexts/**/external/routes/*.ts",
    "./src/main/config/routes.ts",
  ],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
