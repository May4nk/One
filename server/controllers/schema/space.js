import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import Conn from '../../database/db.js'; 

const generatePassword = async (password) => {
    return await new Promise((res, rej) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) rej(err);
            res(hash);
        });
    });
};

//Schemas of space and user table
const Users = new GraphQLObjectType({
    name: 'Users',
    description: 'This is your own space',
    fields: () => {
        return {
            id:{
                type: GraphQLInt,
                resolve(users){
                    return users.id;
                }   
            },
            name: {
                type: GraphQLString,
                resolve(users){
                    return users.name;
                }
            },
            email: {
                type: GraphQLString,
                resolve(users){
                    return users.email;
                }
            },
            password: {
                type: GraphQLString,
                resolve(users){
                    return users.password;
                }
            },
            space:{
                type: new GraphQLList(Space),
                resolve:(user) => ( Conn.models.spaces.findAll({
                        where:{
                            owner: user.id.toString()
                        }
                }))
            }
        }
    }
});


const Posts = new GraphQLObjectType({
    name: 'Posts',
    description: 'This is your own space',
    fields: () => {
        return {
            id:{
                type: GraphQLInt,
                resolve(posts){
                    return posts.id;
                }   
            },
            title: {
                type: GraphQLString,
                resolve(posts){
                    return posts.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve(posts){
                    return posts.description;
                }
            },
            pic: {
                type: GraphQLString,
                resolve(posts){
                    return posts.pic;
                }
            },
            owner:{
                type: GraphQLInt,
                resolve(posts){
                    return posts.owner
                }
            }
        }
    }
});


const Space = new GraphQLObjectType({
    name: 'Space',
    description: 'This is your own space',
    fields: () => {
        return {
            id:{
                type: GraphQLInt,
                resolve(spaces){
                    return spaces.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(spaces){
                    return spaces.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(spaces){
                    return spaces.description;
                }
            },
            seen: {
                type: GraphQLBoolean,
                resolve(spaces){
                    return spaces.seen;
                }
            },
            room: {
                type: new GraphQLList(GraphQLString),
                resolve(spaces){
                    return spaces.room;
                }
            },
            owner: {
                type: GraphQLInt,
                resolve(spaces){
                    return spaces.owner;
                }
            },
            auths: {
                type: new GraphQLList(GraphQLString),
                resolve(spaces){
                    return spaces.auths;
                }
            }
        }
    }
});



//root query to get one or all space and user
const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is root query',
    fields: () => {
        return {
            post:{
                type: Posts,
                args:{
                    id: { type: GraphQLInt },
                    title: { type: GraphQLString },
                },
                resolve (root, args){
                    return Conn.models.posts.findOne({
                        where: {
                            id: args.id,
                        }
                    })
                }
            },
            posts: {
                type: new GraphQLList(Posts),
                args:{
                    id:{
                        type: GraphQLInt 
                    },
                    title:{
                        type: GraphQLString
                    },
                    description:{
                        type: GraphQLString
                    },
                    pic:{
                        type: GraphQLString
                    },
                    owner:{
                        type: GraphQLInt
                    }
                },
                resolve (root, args) { 
                    return Conn.models.posts.findAll({ where: args });
                }
            },
            user:{
                type: GraphQLString,
                args:{
                    email: { type: GraphQLString },
                    password: { type: GraphQLString }
                },
                resolve: async (root, args) => {
                    Conn.models.users.findOne({
                        where: {
                            email: args.email,
                            password: await generatePassword(args.password)
                        }
                    })
                    return jsonwebtoken.sign(
                        { id: args.id, email: args.email },
                        'SECRET',{ expiresIn: '1d' }
                     )
                }
            },
            users: {
                type: new GraphQLList(Users),
                args:{
                    id:{
                        type: GraphQLInt 
                    },
                    email:{
                        type: GraphQLString
                    }
                },
                resolve (root, args) { 
                    return Conn.models.users.findAll({ where: args });
                }
            },
            space:{
                type: Space,
                args:{
                    id: { type: GraphQLInt },
                },
                resolve: (parent, args) => Conn.models.spaces.findByPk(args.id)
            },
            spaces: {
                type: new GraphQLList(Space),
                args:{
                    id:{
                        type: GraphQLInt 
                    },
                    name:{
                        type: GraphQLString
                    },
                    seen:{
                        type: GraphQLBoolean
                    },
                    owner: {
                        type: GraphQLInt
                    }
                },
                resolve (root, args) { 
                    return Conn.models.spaces.findAll({ where: args });
                }
            },
        };
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'create function',
    fields(){
        return{
            addPost:{
                type: Posts,
                args:{
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    pic: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: GraphQLString
                    },
                    owner: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, args) =>  {
                    return Conn.models.posts.create({
                        title: args.title,
                        description: args.description,
                        pic: args.pic,
                        owner: args.owner
                    })
                }
            },
            addUser:{
                type: GraphQLString,
                args:{
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (root, args) =>  {
                    Conn.models.users.create({
                        name: args.name,
                        email: args.email.toLowerCase(),
                        password:  await generatePassword(args.password)        
                    })
                    return jsonwebtoken.sign(
                        { id: args.id, email: args.email },
                        'SECRET',{ expiresIn: '1y' }
                    )
                }
            },
            addSpace:{
                type: Space,
                args:{
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: GraphQLString,
                    },
                    seen: {
                        type: GraphQLBoolean,
                        defaultValue: true
                    },
                    room: {
                        type: new GraphQLList(GraphQLString),
                    },
                    owner: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    auths: {
                        type: new GraphQLList(GraphQLString),
                        defaultValue: ['JWT']
                    }
                },
                resolve(root, args){
                    return Conn.models.spaces.create({
                        name: args.name,
                        description: args.description,
                        seen: args.seen,
                        room: args.room,
                        owner: args.owner,
                        auths: args.auths
                    })
                }
            }
        }
    }
});


const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;
