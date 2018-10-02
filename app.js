const Sequelize = require('sequelize');

const connection = new Sequelize('demo_schema', 'root', 'PASSWORD',{
	dialect: 'mysql',
	operatorsAliases: false,
	insecureAuth: true
});

const Article = connection.define('article', {
	slug: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	title:{
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			len: {
				args: [2, 50],
				msg: 'title is too short'
			}
		}
	},
	body: {
		type: Sequelize.TEXT,
		defaultValue: 'Coming soon.',
		validate: {
			startsWithUpper: function(bodyVal) {
				const first = bodyVal.charAt(0);
				const startsWithUppercase = first === first.toUpperCase();
				if(!startsWithUppercase) {
					throw new Error('First letter must be uppercase');
				}
				else {
					//
				}
			}
		}
	}
},{
	hooks: {
		beforeValidate: ()=>{
			console.log("beforeValidate");
		},
		afterValidate: ()=>{
			console.log("afterValidate");
		},
		beforeCreate: ()=>{
			console.log("beforeCreate");
		},
		afterCreate: (res)=>{
			console.log("Created article with "+res.dataValues.slug);
		},
	}
})

connection.sync({
	force: true,
	logging: console.log
}).then(function(){
	Article.create({
		slug: 'wooble',
		title: 'Sample title',
		body: 'Sample body to make a type specimen book.'
	});
	// Article.findAll().then(function(articles) {
	// 	console.log(articles);
	// })
});
