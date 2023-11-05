const storeStrings = {
  apiRoutes: {
    create: "https://lab6-backend.onrender.com/definition",
    languages: "https://lab6-backend.onrender.com/languages",
    update: "https://lab6-backend.onrender.com/definition/",
    localLanguages: "http://localhost:8888/languages",
    localCreate: "http://localhost:8888/definition",
    localUpdate: "http://localhost:8888/definition/",
  },
  prompts: {
    wordExistsConfirmation: "The word already exists. Do you want to update the definition?",
    createAlert: "Both term and definition must be valid strings (letters only).",
    getAlert: "Term must be valid strings (letters only).",
  },
  requestMethods: {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
  },
  regexPatterns: {
    word: /^[\p{L}\s]+$/u,
    language: /^[\p{L}]+$/u,
  },
  messages: {
    fetchError: "Error fetching languages:",
  },
};


