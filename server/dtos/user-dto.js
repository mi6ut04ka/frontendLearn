module.exports = class UserDto{
    email;
    id;
    isActivated;
    role;
    name;
    avatar;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isactivated;
        this.role = model.role;
        this.name = model.name;
        this.avatar = model.avatar;

    }
}