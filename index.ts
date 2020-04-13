import { getConnection, createConnection } from "typeorm";
import { v1 } from "uuid";

import Person from "./entities/person";
import { getEmployeeMPath, mPathChanged } from "./helpers";

async function proveIt() {
  await createConnection();
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
  console.log("");
  console.log("");

  console.log(`Bob should have a manager of Alice.`);

  console.log(`her id is ${manager.id}`);
  const oldMpath = await getEmployeeMPath(connection, employee.id);
  console.log(`Bob's mpath is ${oldMpath}.`);

  const tree = await connection.getTreeRepository(Person);
  let bobFromDB = await connection
    .getRepository(Person)
    .findOneOrFail({ id: employee.id });

  const originalManager = (await tree.findAncestors(bobFromDB))[0];
  console.log(`Bob's manager is: ${originalManager.fullName}`);

  console.log("");
  console.log("");
  console.log("");
  console.log("Getting Bob a new manager of Cathy Sampla");
  let newManager = new Person();
  newManager.id = v1();
  newManager.fullName = "Cathy Sampla";
  newManager.title = "Customer Success Manager";

  console.log("saving Cathy so we can attach her to Bob.");
  console.log("");
  console.log("");
  newManager = await connection.manager.save(newManager, { reload: true });

  console.log(`Changing Bob's manager to ${newManager.fullName}.`);
  bobFromDB.manager = newManager;

  console.log("");
  console.log("");
  console.log("saving Bob");
  console.log("");
  await connection.manager.save(bobFromDB);
  console.log("");
  console.log("saved");

  console.log("");
  console.log("");
  if (await mPathChanged(connection, employee.id, oldMpath)) {
    console.log("SUCCESS!!!");
    return;
  }
  console.log("Mpath failed to update by saving the new employee record.");

  newManager.reports = [];
  newManager.reports.push(bobFromDB);
  console.log("");
  console.log("");
  console.log("saving the new manager");

  await connection.manager.save(newManager);

  console.log("");
  console.log("");
  console.log("");
  console.log("");
  if (await mPathChanged(connection, employee.id, oldMpath)) {
    console.log("SUCCESS!!!");
    return;
  }
  console.log("Mpath failed to update by saving the new manager record.");
  console.log("complete.");
}

proveIt();
