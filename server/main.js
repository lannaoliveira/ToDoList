import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base'
import { UserCollection } from '/imports/api/UserCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });
const insertUser = userEstado => UserCollection.insert({ estadoCivil: userEstado });

Meteor.methods({
  findUser: function (username) {
    let usuario = Accounts.findUserByUsername(username);
    return usuario;
  },

  checkUser: function (email, senha){
    let usuario = Accounts._checkPassword(Accounts.findUserByUsername(email), senha);
    return usuario;
  }
});

Meteor.startup(() => {

  if (UserCollection.find().count() === 0) {
    [].forEach(insertUser);
  }
  
  if (TasksCollection.find().count() === 0) {
    [].forEach(insertTask);
  }
});