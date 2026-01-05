export const flowSteps = [
    {
      id: 1,
      title: "Client (Browser)",
      description: "User triggers an API call using fetch or axios."
    },
    {
      id: 2,
      title: "API Route",
      description: "Request hits backend route (Express / Next API)."
    },
    {
      id: 3,
      title: "Controller",
      description: "Controller validates request and handles logic."
    },
    {
      id: 4,
      title: "Service Layer",
      description: "Business logic is executed."
    },
    {
      id: 5,
      title: "Database",
      description: "Data is fetched or stored."
    },
    {
      id: 6,
      title: "Response",
      description: "JSON response is sent back to client."
    },
    {
        id: 1,
        title: "Client (Browser)",
        description: "User triggers an API call using fetch or axios.",
        details: [
          "User clicks a button",
          "Frontend calls fetch / axios",
          "Request contains headers & body"
        ]
      }
      
  ];
  