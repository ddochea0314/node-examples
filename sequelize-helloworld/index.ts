import sequelize from "./models/index";
import { initModels, Users } from "./models/init-models";

async function main() {
    initModels(sequelize);
    const users = await Users.findAll(); // select
    users.forEach(u => {
        console.log(u.email);
    })
    Users.upsert({
        id : 1,
        firstName : "B",
        lastName: "hello",
        email : "test@test.com"
    }) // insert & update
}

main();