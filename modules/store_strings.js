const storeStrings = {
    apiRoutes: {
      create: "https://lab6-backend.onrender.com/create",
      search: "https://lab6-backend.onrender.com/search/?term=",
      languages: "https://lab6-backend.onrender.com/languages",
      localLanguages: "http://localhost:8888/languages",
      localCreate: "http://localhost:8888/definition",
      localSearch: "http://localhost:8888/definition/?word=",
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
  export default searchStrings;
  