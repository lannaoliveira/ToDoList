import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base'
import { UserCollection } from '/imports/api/UserCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });
const insertUser = useText => UserCollection.insert({ text: useText });

Meteor.methods({
  findUser: function (email) {
    let usuario = Accounts.findUserByEmail(email);
    return usuario;
  },

  checkUser: function (email, senha) {
    let usuario = Accounts._checkPassword(Accounts.findUserByUsername(email), senha);
    return usuario;
  },

  findUserName: function (nameUser){
    let usuario = Accounts.findUserByUsername(nameUser);
    return usuario
  }
});

Meteor.startup(() => {

  if (TasksCollection.find().count() === 0) {
    [].forEach(insertTask);
  }

  if (UserCollection.find().count() === 0) {
    [].forEach(insertUser);
  }
});