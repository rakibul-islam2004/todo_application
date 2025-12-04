import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { userServices } from "./modules/user/user.service";
import { todoRouters } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// initialization database
initDB();

// parser
app.use(express.json());
// app.use(express.urlencoded)

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

// Users CRUD
app.use("/users", userRoutes);
// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO users(name, email) VALUES($1,$2) RETURNING *`,
//       [name, email]
//     );
//     // console.log(result.rows[0]);
//     res.status(201).json({
//       message: "Data inserted Successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// Get all users
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);

//     res.status(200).json({
//       success: true,
//       message: "Users retrieved successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "err.message",
//       details: err,
//     });
//   }
// });

// Get single user by id

// app.get("/users/:id")

// Update user
// app.put("/users/:id");

// Delete single user by id
// app.delete("/users/:id")

// Todo CRUD
app.use("/todos", todoRouters);

// create todo
// app.post("/todos", async (req: Request, res: Response) => {
//   const { user_id, title } = req.body;

//   try {
//     const result = await ;
//     res.status(201).json({
//       success: true,
//       message: "To Do created",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// Get all todos
// app.get("/todos", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM todos`);

//     res.status(200).json({
//       success: true,
//       message: "Todos retrieved successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "err.message",
//       details: err,
//     });
//   }
// });

// Get single todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
//       req.params.id,
//     ]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch todo" });
//   }
// });

// Update todo
// app.put("/todos/:id", async (req, res) => {
//   const { title, completed } = req.body;

//   try {
//     const result = await pool.query(
//       "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
//       [title, completed, req.params.id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to update todo" });
//   }
// });

// Delete todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "DELETE FROM todos WHERE id=$1 RETURNING *",
//       [req.params.id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json({ success: true, message: "Todo deleted", data: null });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to delete todo" });
//   }
// });

// auth router
app.use("/auth", authRoutes);

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route is not found. TrY AgAIn",
    path: req.path,
  });
});

export default app;
