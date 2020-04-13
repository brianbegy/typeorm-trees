import { Connection } from "typeorm";

/**
 * Fetches the mpath for the user.
 */
export async function getEmployeeMPath(connection: Connection, id: string) {
  const qr = await connection
    .createQueryRunner()
    .query("SELECT mpath FROM person where id = $1", [id]);
  return qr[0]["mpath"];
}

/**
 * Determines if the mpath has changed.
 */
export async function mPathChanged(
  connection: Connection,
  id: string,
  oldMpath: string
): Promise<boolean> {
  let newMpath = await getEmployeeMPath(connection, id);

  console.log(`Bob's old mpath:`);
  console.log(oldMpath);

  console.log(`Bob's new mpath:`);
  console.log(newMpath);

  if (oldMpath == newMpath) {
    console.log("Mpath unchanged.");
    return false;
  }
  return true;
}
