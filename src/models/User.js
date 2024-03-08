/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.creationDate = null; // Added property for registration date
    this.birthDate = null; // Added property for birth date (optional)
    Object.assign(this, data);
  }
}

export default User;
