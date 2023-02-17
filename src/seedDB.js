const bcrypt = require("bcryptjs")
const {User} = require("./models")


const userSeed = async () => {
    const hashPassword = await bcrypt.hash("123456", 12)

    const userData = [
        {email: "a@gmail.com", userName: "Darylz", password: hashPassword},
        {email: "b@gmail.com", userName: "flame", password: hashPassword},
        {email: "c@gmail.com", userName: "balloon", password: hashPassword},
        {email: "d@gmail.com", userName: "Opeza", password: hashPassword},
        {email: "e@gmail.com", userName: "InwErk", password: hashPassword},
        {email: "f@gmail.com", userName: "Pinkeiei", password: hashPassword},
        {email: "g@gmail.com", userName: "Heeee", password: hashPassword},
        {email: "h@gmail.com", userName: "kuyyyy", password: hashPassword},
        {email: "i@gmail.com", userName: "mairoo", password: hashPassword},
    ]
    let res = await User.bulkCreate(userData)
    console.log(res)
    process.exit(0)
}

userSeed()

