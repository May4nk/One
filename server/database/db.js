import { Sequelize, DataTypes} from 'sequelize';

const Conn = new Sequelize('one', '', '', {
    dialect: 'postgres',
    host: 'localhost',
});

const users = Conn.define('users', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const spaces = Conn.define('spaces', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    room: {
        type: DataTypes.JSON,
    },
    owner: {
        type: DataTypes.INTEGER,
    },
    auths: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '{JWT}'
    },
},{
    timestamps: false
});


const posts = Conn.define('posts', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    pic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
        timestamp: false
})


//Relationships
users.hasMany(spaces);
spaces.belongsTo(users);
posts.belongsTo(users);
users.hasMany(posts);

Conn.sync();

export default Conn;
