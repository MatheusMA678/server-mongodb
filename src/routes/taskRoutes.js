const routes = require("express").Router();
const Task = require("../models/Task.js");

routes.post("/", async (req, res) => {
  const { content, completed } = req.body;

  if (!content) {
    res.status(422).json({ error: 'A propriedade "content" é obrigatória.' });
  }

  const task = {
    content,
    completed,
  };

  try {
    await Task.create(task);
    res.status(201).json({ message: "Tarefa criada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  const task = { completed };

  try {
    const updatedTask = await Task.updateOne({ _id: id }, task);

    if (updatedTask.matchedCount === 0) {
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

  const task = await Task.findOne({ _id: id });

  if (!task) {
    res.status(422).json({ message: "Tarefa não encontrada." });
  }

  try {
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: "Tarefa deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = routes;
