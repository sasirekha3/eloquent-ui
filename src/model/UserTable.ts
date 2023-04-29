class UserTable{
    emailId: string;
    hashedPassword: string;

    constructor(emailId: string, hashedPassword: string) {
        this.emailId = emailId;
        this.hashedPassword = hashedPassword;
    }

    toJson(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}

export default UserTable;