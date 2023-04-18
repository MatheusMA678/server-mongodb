const routes = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

routes.post("/", async (req, res) => {
  const { content, completed } = req.body;

  if (!content) {
    res.status(422).json({ error: 'A propriedade "content" é obrigatória.' });
  }

  try {
    await prisma.task.create({
      data: {
        content: content,
        completed: completed,
      },
    });
    res.status(201).json({ message: "Tarefa criada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/", async (req, res) => {
  try {
    const task = await prisma.task.findMany();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    });

    if (!updatedTask) {
      res.status(422).json({ message: "Tarefa não encontrada." });
      return;
    }

    res.status(200).json({ message: "Tarefa editada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    res.status(422).json({ message: "Tarefa não encontrada." });
  }

  try {
    await prisma.task.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Tarefa deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = routes;
