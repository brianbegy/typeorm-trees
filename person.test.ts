import {  getConnection } from "typeorm";
import Person from "./entities/person";

describe("intergration tests to demonstrate the problem", () => {
  it("should work", async () => {

    const connection = await getConnection("foobar");
    const manager = new Person();
    manager.fullName="Alice Example";
    manager.title= "Customer Service Manager";
    
    const employee = new Person();
    employee.fullName="Bob Modelo";
    employee.title= "Customer Service Representative";
    employee.manager=manager;

    connection.manager.save(manager);
    connection.manager.save(employee);

    const bobAncestors =     connection.manager.getTreeRepository(Person).findAncestors(employee);
  });
});
