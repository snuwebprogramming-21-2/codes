class Post {
    constructor(id, title, description, isDeleted = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isDeleted = isDeleted;
    }

    edit(title, description) {
        this.title = title;
        this.description = description;
    }

    delete() {
        this.isDeleted = true;
    }
}

module.exports = Post;
