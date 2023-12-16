import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

interface RequestBody {
  enlace: string;
  alias: string;
  bool_alias: boolean;
}
const shortUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  debugger;

  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { enlace, bool_alias, alias }: RequestBody = req.body;

  let short: string = "";

  if (bool_alias) {
    res.status(422).send({
      message: await validar(alias),
    });
    if (await validar(alias)) {
      //se registra
      if (await registrar(enlace, alias)) {
        res.status(200).send({
          short_url: alias,
        });
      } else {
        res.status(422).send({
          message: "Tuvimos un inconveniente en el registro",
        });
      }
    } else {
      res.status(422).send({
        message: "Ya está registrado",
      });
    }
  } else {
    do {
      short = generateAlias();
    } while (!validar(short));
    //generamos

    if (await registrar(enlace, short)) {
      res.status(200).send({
        short_url: short,
      });
    } else {
      res.status(422).send({
        message: "Tuvimos un inconveniente en el registro",
      });
    }
  }
};

function generateAlias(): string {
  return Math.random().toString(36).substring(2, 8);
}

async function validar(newAlias: string): Promise<boolean> {
  const data = await db.short.findUnique({
    where: {
      alias: newAlias,
    },
  });

  return !data?.id;
}

async function registrar(value: string, newAlias: string): Promise<boolean> {
  try {
    const data = db.short.create({
      data: {
        link: value,
        alias: newAlias,
      },
    });
    return !!data;
  } catch (error) {}
  return false;
}

export default shortUrl;
