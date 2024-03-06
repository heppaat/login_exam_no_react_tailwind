import express from "express";
import { z } from "zod";
import cors from "cors";
import fs from "fs/promises";

const server = express();

server.use(cors());
//header has content type (application json), express knows that the body has to be parsed as json
//json formatum erkezik, megcsinalja a bodyt objecktkent
server.use(express.json());

type User = {
  email: string;
  password: string;
  confirmPassword: string;
  id: number;
};
type postUser = { email: string; password: string; id: number };

const readFile = async () => {
  try {
    const data = await fs.readFile(`${__dirname}/../database.json`, "utf-8");
    const users = JSON.parse(data);
    return users as User[];
  } catch (error) {
    return null;
  }
};

const writeFile = async (data: postUser[]) => {
  try {
    const fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(`${__dirname}/../database.json`, fileContent);
    return true;
  } catch (error) {
    return false;
  }
};

const PostSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

server.post("/api/register", async (req, res) => {
  const result = PostSchema.safeParse(req.body);

  if (!result.success) return res.status(400).json(result.error.issues);

  const email = result.data.email;
  const password = result.data.password;
  const confirmPassword = result.data.confirmPassword;

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    return res.status(400).send("Invalid email address");
  }

  if (password.length < 5) {
    return res.status(400).send("Password must be at least 5 characters");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Password and confirmation do not match");
  }

  const existingUsers = await readFile();
  if (!existingUsers) return res.sendStatus(500);

  if (existingUsers.find((user) => user.email === email)) {
    return res.status(409).send("Email already exists");
  }

  const randomNumber = Math.random() * (10000000 - 1) + 1;
  const id = Math.floor(randomNumber);
  const newUser = { email, password, id };
  const updatedUsers = [...existingUsers, newUser];

  const isSuccessfull = await writeFile(updatedUsers);
  if (!isSuccessfull) return res.sendStatus(500);

  res.send("Registration successfull");
});

server.listen(5002);
