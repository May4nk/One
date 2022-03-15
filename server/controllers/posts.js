import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull } from 'graphql';

import Conn from '../database/db.js'; 

//Schema
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

//Query
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
        };
    }
});


//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'create posts',
    fields(){
        return{
            addPost:{
                type: GraphQLString,
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
        }
    }
});


const postSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default postSchema;
