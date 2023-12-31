const searchStrings = {
    apiRoutes:{
      localUpdate: "http://localhost:8888/definition/",
      update: "https://lab6-backend.onrender.com/definition/",
    },
    messages:{
      alertInvalidChar: "Both term and definition must be valid strings (letters only).",
      alertGet: "Term must be valid strings (letters only).",
      deleteSuccess: (term)=> `Term ${term} deleted successfully.`,
      deleteError: (term)=> `Error deleting term ${term}. Term does not exist in database`,
    },
    methods: {
      GET: "GET",
      DELETE: "DELETE",
    },
    regexPatterns:{
      regex: /^[\p{L}\s]+$/u
    }
  }