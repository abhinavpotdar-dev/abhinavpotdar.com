import express from "express";
import prisma from "./prisma.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// ==========================================
// 1. HEALTH CHECK API
// GET /api/health
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Portfolio API is running",
    application: "abhinavpotdar.com"
  });
});

// ==========================================
// 2. GET ALL PROJECTS WITH FILTERING
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

    const filteredProjects = await prisma.project.findMany({
      where,
      orderBy: {
        id: "asc"
      }
    });

    return res.status(200).json({
      success: true,
      count: filteredProjects.length,
      data: filteredProjects
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
// 3. GET PROJECT BY ID
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
      where: {
        id: projectId
      }
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
// 4. CREATE PROJECT
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

    const allowedStatuses = ["Draft", "Published"];
    const projectStatus = status ?? "Draft";

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
// 5. UPDATE PROJECT
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
      where: {
        id: projectId
      }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId
      },
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
// 6. DELETE PROJECT
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
      where: {
        id: projectId
      }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await prisma.project.delete({
      where: {
        id: projectId
      }
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
// 7. HANDLE UNKNOWN API ROUTES
// ==========================================

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// ==========================================
// 8. GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("Unhandled API error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ==========================================
// 9. START EXPRESS SERVER
// ==========================================

const server = app.listen(PORT, () => {
  console.log("------------------------------------");
  console.log("Portfolio API Started Successfully");
  console.log(`URL: http://localhost:${PORT}`);
  console.log("------------------------------------");
});

// Graceful shutdown
async function shutdown() {
  console.log("Shutting down API...");

  server.close(async () => {
    await prisma.$disconnect();
    console.log("Prisma disconnected.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
