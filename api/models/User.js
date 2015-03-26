var User = {
	tableName : "T_USERS",
	// Enforce model schema in the case of schemaless databases
	schema : true,
	meta : {
		schemaName : "sails-fb-auth"
	},

	attributes : {
		pid : {
			type : 'string',
			unique : true,
			required : true
		},
		userName : {
			type : 'string',
			unique : true
		},
		email : {
			type : 'string',
			unique : true
		},
		firstName : {
			type : 'string',
			unique : false
		},
		lastName : {
			type : 'string',
			unique : false
		},
	}
};

module.exports = User;
