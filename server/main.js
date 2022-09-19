import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base'

const insertTask = taskText => TasksCollection.insert({ text: taskText });

Meteor.methods({
  findUser: function (username) {
    let usuario = Accounts.findUserByUsername(username);
    return usuario;
  },

  checkUser: function (username, senha){
    let usuario = Accounts._checkPassword(Accounts.findUserByUsername(username), senha);
    return usuario;
  }
});

Meteor.startup(() => {

  /** iniciando a lista de tarefas sem nenhum elemento */
  if (TasksCollection.find().count() === 0) {
    [].forEach(insertTask)
  }
});