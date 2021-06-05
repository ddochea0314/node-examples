import sequelize from "./models/index";
import { initModels, Users } from "./models/init-models";
async function main() {
    initModels(sequelize);
    // const users = await Users.findAll(); // select
    // users.forEach(u => {
    //     console.log(u.email);
    // })
    for (let a = 0; a < 5; a++) {
        console.time("stopwatch");
        for (let i = 1; i < 1001; i++) {
            await Users.upsert({
                id : i,
                firstName : "B",
                lastName: "hello",
                email : "test@test.com"
            }) // insert & update
        }
        console.timeEnd("stopwatch");
    }
}

main();