import { getConnection, createConnection, Connection } from "typeorm";
import Person from "./entities/person";
import { default as connOpts } from "./ormconfig";
import { v1 } from "uuid";

async function getBobsMpath(connection: Connection, id: string) {
  const qr = await connection
    .createQueryRunner()
    .query("SELECT mpath FROM person where id = $1", [id]);
  console.log(qr);
  return qr[0]["mpath"];
}

async function proveIt() {
  await createConnection(connOpts as any);
  const connection = await getConnection("default");
  const manager = new Person();
  manager.fullName = "Alice Example";
  manager.title = "Customer Service Manager";
  manager.id = v1();

  const employee = new Person();
  employee.fullName = "Bob Modelo";
  employee.title = "Customer Service Representative";
  employee.manager = manager;
  employee.id = v1();

  await connection.manager.save(manager);
  await connection.manager.save(employee);
  console.log(`Bob should have a manager of Alice.`);

  console.log(`her id is ${manager.id}`);
  const oldMpath = await getBobsMpath(connection, employee.id);
  console.log(`Bob's mpath is ${oldMpath}.`);

  const tree = await connection.getTreeRepository(Person);
  let bobFromDB = await connection
    .getRepository(Person)
    .findOneOrFail({ id: employee.id });

  console.log(
    `Bob's managers: ${JSON.stringify(await tree.findAncestors(bobFromDB))}`
  );

  let newManager = new Person();
  newManager.id = v1();
  newManager.fullName = "Cathy Sampla";
  newManager.title = "Customer Success Manager";
  newManager = await connection.manager.save(newManager, { reload: true });

  console.log("We're GONNA CHANGE BOB's MANAGER!!!");

  console.log(
    `GONNA CHANGE ${bobFromDB.fullName}'s manager to ${newManager.fullName}.`
  );

  bobFromDB.manager = newManager;
  await connection.manager.save(bobFromDB);
  console.log("saved");

  let newMpath = await getBobsMpath(connection, employee.id);

  console.log(`Bob's old mpath:`);
  console.log(oldMpath);

  console.log(`Bob's new mpath:`);
  console.log(newMpath);

  if (oldMpath == newMpath) {
    console.log("yup.  Kind of a problem, no?");
  }

  newManager.reports = [];
  newManager.reports.push(bobFromDB);
  console.log("saving the new manager");
 
  await connection.manager.save(newManager);
  newMpath = await getBobsMpath(connection, employee.id);

  console.log(`Bob's old mpath:`);
  console.log(oldMpath);

  console.log(`Bob's new mpath:`);
  console.log(newMpath);

  if (oldMpath == newMpath) {
    console.log("yup.  Kind of a problem, no?");
  }


}

proveIt();
