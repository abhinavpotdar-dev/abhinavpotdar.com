
import express from "express";
import prisma from "./prisma.js";

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "127.0.0.1";

// ==========================================
// 1. MIDDLEWARE
// ==========================================

app.use(express.json({ limit: "1mb" }));

// ==========================================
// 2. HEALTH CHECK API
// GET /api/health
// ==========================================

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "Portfolio API is running",
    application: "abhinavpotdar.com"
  });
});

// ==========================================
// 3. GET ALL PROJECTS WITH FILTERING
// GET /api/projects
// ==========================================

app.get("/api/projects", async (req, res) => {
  try {
    const { category, status } = req.query;

    if (
      (category !== undefined && typeof category !== "string") ||
      (status !== undefined && typeof status !== "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid filter parameters"
      });
    }

    const where = {};

    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive"
      };
    }

    if (status) {
      where.status = {
        equals: status,
        mode: "insensitive"
      };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: {
        id: "asc"
      }
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });

  } catch (error) {
    console.error("Error fetching projects:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    });
  }
});

// ==========================================
// 4. GET PROJECT BY ID
// GET /api/projects/:id
// ==========================================

app.get("/api/projects/:id", async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error("Error fetching project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project"
    });
  }
});

// ==========================================
// 5. CREATE PROJECT
// POST /api/projects
// ==========================================

app.post("/api/projects", async (req, res) => {
  try {
    const { title, category, status } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required"
      });
    }

    const projectStatus = status ?? "Draft";
    const allowedStatuses = ["Draft", "Published"];

    if (
      typeof projectStatus !== "string" ||
      !allowedStatuses.includes(projectStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be Draft or Published"
      });
    }

    const newProject = await prisma.project.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        status: projectStatus
      }
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject
    });

  } catch (error) {
    console.error("Error creating project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project"
    });
  }
});

// ==========================================
// 6. UPDATE PROJECT
// PUT /api/projects/:id
// ==========================================

app.put("/api/projects/:id", async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    const { title, category, status } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required"
      });
    }

    const allowedStatuses = ["Draft", "Published"];

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be Draft or Published"
      });
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title.trim(),
        category: category.trim(),
        status
      }
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject
    });

  } catch (error) {
    console.error("Error updating project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project"
    });
  }
});

// ==========================================
// 7. DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
});

// ==========================================
// 8. UNKNOWN API ROUTES
// ==========================================

app.use("/api", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// ==========================================
// 9. GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("Unhandled API error:", error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body"
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ==========================================
// 10. START EXPRESS SERVER
// ==========================================

const server = app.listen(PORT, HOST, () => {
  console.log("------------------------------------");
  console.log("Portfolio API Started Successfully");
  console.log(`URL: http://${HOST}:${PORT}`);
  console.log("------------------------------------");
});

server.on("error", (error) => {
  console.error("API server startup error:", error);
  process.exitCode = 1;
});

// ==========================================
// 11. GRACEFUL SHUTDOWN
// ==========================================

let isShuttingDown = false;

async function shutdown(signal) {
  if (isShuttingDown) return;

  isShuttingDown = true;
  console.log(`${signal} received. Shutting down API...`);

  server.close(async (error) => {
    if (error) {
      console.error("Error closing API server:", error);
      process.exitCode = 1;
    }

    try {
      await prisma.$disconnect();
      console.log("Prisma disconnected.");
    } catch (disconnectError) {
      console.error("Error disconnecting Prisma:", disconnectError);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
