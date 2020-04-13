# This repo

Is intended to demonstrate problems we are having with typeorm tree relationships.

## The problem

While we can create a parent/child relationship, these relationships never seem to update.

updating the child.parent doesn't work.

updating the parent.child doesn't work.


## Replication

verify the settings in `ormconfig.js` will work (the app needs create schema permissions but will take care of creating the schema)

run the following console commands:

`yarn install`
`yarn db:nuke`  # creates the schema, generates a new migration, and runs it.

then 

`ts-node index.ts`  will create some people, assign them managers and print out information on how thier `mpaths` either change or don't change.



