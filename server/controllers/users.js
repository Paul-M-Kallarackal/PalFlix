const db = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Logger = require('../utils/logConnection'); 
const constants = require('../constants/constants');
rclient = require('../utils/redisConnection');
const Boom = require('@hapi/boom');

async function createAccount(request, reply) {
    try {
        const payload = request.payload;
        const hashedPassword = await hashValues(payload.password);
        await db.sequelize.sync({ force: false });
        await db.users.create({
            username: payload.username,
            email: payload.email,
            password: hashedPassword
        });
        db.users.afterCreate((user) => {
            console.log(`New user created: ${user.username}`);
        });
        const token = jwt.sign({ user: payload.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        reply({ "token": token }).code(200).state('token', token);
    } catch (error) {
        console.error(error);
        reply("An error occurred").code(500);
    }
}

function hashValues(data) {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(constants.SALT_ROUNDS, function(err, salt) {
                if (err) {
                    reject(err);
                } else {
                    bcrypt.hash(data, salt, function(err, hash) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(hash);
                            resolve(hash);
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}


async function Login (request, reply) {
    const payload = request.payload;
    const users= await getUserByEmail(payload.email);
    if(users==null){
        reply("User does not exist").code(404);
    }
    else{
        bcrypt.compare(payload.password, users.password, async function(err, res) {
            if(res){
                console.log(res);
                const token=jwt.sign({ user : payload.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                Logger.info(`User ${payload.email} logged in`, { label: 'Login' })
                reply({"token":token}).code(200).state('token', token);
            }
            else{
                reply("Incorrect credentials").code(404);
            }
        });
    }
}

async function getUserByEmail(email) {
    const user = await db.users.findOne({
        where: {
          email: email
        }
      });
    return (user);
}

async function getAllUsers(request, reply) {
    const users= await rclient.get('/users');
    if(users==null){
        const users=await db.users.findAll();
        rclient.set(`${constants.API_VERSION}/users`,JSON.stringify(users));
        reply(users);
    }
    else{
    reply(users);
    }
}

async function checkUniqueUser(request, reply) {
    console.log(request.payload);
    const users= await getUserByEmail(request.payload.email);
    console.log(users);
    if(users!=null){
        reply(Boom.conflict('User already exists'));
    }
    else{
        reply(true);
    }
}

async function getUserById(request, reply) {
    const user= await db.users.findOne({
        where: {
          userId: request.params.userId
        }
      });
    reply(user);
}

async function updateUser(request, reply) {
    const payload=request.payload;
    const updateData = {};
    if (payload.username) {
      updateData.username = payload.username;
    }
    if (payload.email) {
      updateData.email = payload.email;
    }
    if (payload.password) {
      updateData.password = await hashValues(payload.password);
    }
    const user = await db.users.update(updateData, {
      where: {
        userId: request.params.userId
      }
    });
    reply({"Updated user":user});
}

async function deleteUser(request, reply) {
    const user = await db.users.destroy({
        where: {
          userId: request.params.userId
        }
      });
    reply({"Deleted user":user});
}

module.exports = {
    createAccount,hashValues,deleteUser,updateUser,
    Login,getUserByEmail,getUserById,getAllUsers,
    checkUniqueUser
}