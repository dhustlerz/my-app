db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "admin"
            }
        ]
    }
);
db.createCollection("test"); //MongoDB creates the database when you first store data in that database
