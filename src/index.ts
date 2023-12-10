import express, { Request, Response } from "express"
import cors from "cors";
import dotenv from "dotenv";
import connection from "./connection";
import { User} from "./model/User";
import { HashGenerator } from "./hashManager";
import { Authenticator } from "./authenticator";

dotenv.config();

const hashManager: HashGenerator = new HashGenerator();
const auth: Authenticator = new Authenticator();

const app = express();
app.use(cors())
app.use(express.json());




const user= async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body; // Alterado para name e password

    // Validar se os dados necessários foram fornecidos
    if (!name || !password) {
      throw new Error("Faltando informações");
    }

   
    const user = await connection("user").where({ name, password}).first();
   

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

 
    const User= {
      name_id: user.id,
      password_id: user.id,
    };

    
    await connection("users").insert(user);

    res.status(201).send("O usuário foi adicionado");
  } catch (error: any) {
    res.status(500).send(error.sqlMessage || error.message);
  }
}

app.post("/addUser", user);
