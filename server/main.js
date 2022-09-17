import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base'

const insertTask = taskText => TasksCollection.insert({ text: taskText });

Meteor.methods({
  findUser: function (username) {
    var usuario = Accounts.findUserByUsername(username);
    return usuario;
  }
});

Meteor.startup(() => {

  /** iniciando a lista de tarefas sem nenhum elemento */
  if (TasksCollection.find().count() === 0) {
    [].forEach(insertTask)
  }
});