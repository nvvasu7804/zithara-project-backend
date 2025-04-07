const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const Faq = require("../models/Faq");

// Sample hardcoded responses
const faqReplies = {
  "what is your return policy":
    "Our return policy allows returns within 30 days of purchase with a valid receipt.",
  "how can i track my order":
    "You can track your order using the tracking link sent to your email after dispatch.",
  "do you offer refunds":
    "Yes, we offer full refunds for returned items that are in original condition.",
  "what are your store hours":
    "Our store is open from 9 AM to 9 PM, Monday through Saturday.",
  "what is generative ai":
    "Generative AI refers to algorithms that can create new content, such as text, images, music, or code, based on training data.",

  "how is ai used in education":
    "AI is used in education for personalized learning, automated grading, tutoring systems, and predictive analytics to improve student outcomes.",

  "what is retrieval-augmented generation (rag)":
    "RAG is a technique that combines large language models with external knowledge retrieval to generate more accurate and context-aware responses.",

  "what are the ethical concerns of ai":
    "Ethical concerns include bias in algorithms, data privacy, job displacement, and lack of transparency in decision-making.",

  "how is ai affecting the job market":
    "AI is automating routine tasks, leading to job shifts in many industries, but also creating demand for new skills and roles.",

  "what is multimodal ai":
    "Multimodal AI processes and understands multiple types of input—like text, images, and audio—together for richer and more accurate outputs.",

  "what are ai agents":
    "AI agents are systems that can autonomously perform tasks, interact with environments, and make decisions, often using tools and memory.",

  "how is ai used in healthcare":
    "AI in healthcare is used for diagnostics, medical imaging, personalized treatment recommendations, and drug discovery.",

  "what is the role of ai in climate change":
    "AI helps model climate patterns, optimize energy use, detect environmental changes, and develop sustainable technologies.",

  "how is open-source ai evolving":
    "Open-source AI is growing with more accessible models, community-driven development, and collaboration on responsible AI practices.",

  "what is the mern stack":
    "The MERN stack is a web development framework consisting of MongoDB, Express.js, React.js, and Node.js.",

  "why use the mern stack":
    "The MERN stack allows full-stack JavaScript development, making it efficient to build modern, scalable web applications.",

  "how does react fit into the mern stack":
    "React is used for building the frontend user interface in the MERN stack, providing a dynamic and responsive experience.",

  "what is the role of express in mern":
    "Express.js serves as the backend web framework, handling routing and server-side logic.",

  "how does mongodb work in the mern stack":
    "MongoDB is a NoSQL database that stores data in a flexible, JSON-like format, ideal for JavaScript-based applications.",

  "what are the advantages of mern stack":
    "The MERN stack offers fast development, a unified language (JavaScript), a strong community, and efficient performance.",

  "how to deploy a mern stack application":
    "MERN applications can be deployed using platforms like Heroku, Vercel, or AWS, often requiring build tools and environment configuration.",

  "how to connect frontend and backend in mern":
    "The frontend (React) communicates with the backend (Express/Node) via REST APIs or GraphQL for data exchange.",

  "what are common challenges in mern stack development":
    "Challenges include managing state in React, handling authentication, securing APIs, and optimizing database queries.",

  "what tools complement the mern stack":
    "Tools like Redux, Mongoose, Postman, and Docker are commonly used alongside MERN to enhance development and deployment.",
};

router.post("/message", authMiddleware, async (req, res) => {
  const { message } = req.body;
  const userMessage = message.toLowerCase();

  try {
    const faqs = await Faq.find();
    let matchedAnswer = null;

    for (const faq of faqs) {
      const question = faq.question.toLowerCase();
      if (userMessage.includes(question)) {
        matchedAnswer = faq.answer;
        break;
      }
    }

    if (matchedAnswer) {
      res.json({ reply: matchedAnswer });
    } else {
      res.json({
        reply:
          "Sorry, I couldn't find an answer to that. Please ask a different question or contact support.",
      });
    }
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
