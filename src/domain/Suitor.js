import { v4 as uuidv4 } from 'uuid';

export class Suitor {
  constructor({ id = uuidv4(), name, age, occupation, hobbies, likes, expectations, instagram, photo }) {
    if (!name) throw new Error("Name is required");
    this.id = id;
    this.name = name;
    this.age = age;
    this.occupation = occupation;
    this.hobbies = hobbies;
    this.likes = likes;
    this.expectations = expectations;
    this.instagram = instagram;
    this.photo = photo;
  }
}
