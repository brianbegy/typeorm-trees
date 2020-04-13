const getConnection  = require("typeorm")

proveIt();

async function proveIt(){
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

    const newManager = new Person();
    newManager.fullName="Cathy Sampla";
    newManager.title= "Customer Success Manager";

    console.log("GONNA CHANGE BOB's MANAGER!!!")
    const bob = connection.getRepository(Person).findOne({fullName: "Bob Modelo"})
    bob.manager= newManager;
    connection.manager.save(bob);
}