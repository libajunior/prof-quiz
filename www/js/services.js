angular.module('starter.services', [])

//Service Login
.service('LoginSrv', function($q) {
    return {
        auth: function(username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            firebaseRef.authWithPassword({
                email: username,
                password: password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    deferred.reject('Wrong credentials.');
                } else {
                    deferred.resolve(authData);
                }
            });
 
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            
            return promise;
        }
    }
})

//Service Membro
.service('MembroSrv', function($q) {
    return {
        getMembro: function(email) {
            var key = email.replace('.',',');
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            //Busca índice, se encontrar, busca detalhes do membro
            var indexRef = new Firebase(urlFirebase +'_index/membros/'+ key);
            indexRef.on('value', function(snapshot) {
                var index = snapshot.val();
                
                //Busca detalhes do membro
                var membroRef = new Firebase(urlFirebase +'membros/'+ index);
                membroRef.on('value', function(snapshot) {
                    var membro = snapshot.val();
                    membro.id = index;
                    membro.email = email;
                
                    deferred.resolve(membro);
                    
                }, function (errorObject) {
                    console.log('Não foi possível pegar o membro. Chave '+ index, errorObject);
                    deferred.reject('Membro not found');
                });
            }, function (errorObject) {
                console.log('Não existe um índice para a chave '+ key, errorObject);
                deferred.reject('Membro not indexed');
            });
 
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            
            return promise;
        }
    }
})

//Service Disciplina
.service('DisciplinaSrv', function($q) {
    return {
        listAll: function(membro) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            //Busca disciplinas do membro
            var disciplinasRef = new Firebase(urlFirebase +'disciplinas');
            
            var membroRef = new Firebase(urlFirebase +'membros');
            var membroDisciplinasRef = membroRef.child(membro.index).child("disciplinas");
            membroDisciplinasRef.on("child_added", function(snap) {
                disciplinasRef.child(snap.key()).once("value", function(snapshot) {
                    console.log(snapshot.val());
                });
            });
            
            /*
            discRef.on('value', function(snapshot) {
                var index = snapshot.val();
                
                //Busca detalhes do membro
                var membroRef = new Firebase(urlFirebase +'membros/'+ index);
                membroRef.on('value', function(snapshot) {
                    var membro = snapshot.val();
                    membro.email = email;
                
                    deferred.resolve(membro);
                    
                }, function (errorObject) {
                    console.log('Não foi possível pegar o membro. Chave '+ index, errorObject);
                    deferred.reject('Membro not found');
                });
            }, function (errorObject) {
                console.log('Não existe um índice para a chave '+ key, errorObject);
                deferred.reject('Membro not indexed');
            });
            */
 
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            
            return promise;
        }
    }
})

.factory('AlunoSrv', function() {
    var alunos = [
        { 
            id: 1,
            nome: 'Ana Paula Collares',
            email: 'anapaulacollares@gmail.com',
            fbid: '100000404804364'
         }, {
            id: 2,
            nome: 'André Luis Vergutz',
            email: 'alvergutz@hotmail.com',
            fbid: '100003076548374'
         }, {
            id: 3,
            nome: 'Bruno Frey',
            email: 'bruno_0frey@hotmail.com',
            fbid: '100002399847300'
         }, {
            id: 4,
            nome: 'Carlos Fernando Rzeznik',
            email: 'carlosfrzeznik@gmail.com',
            fbid: '100002465805968'
         }, {
            id: 5,
            nome: 'Daniel Gobbi',
            email: 'dggobbi@gmail.com',
            fbid: '100001101617492'
         }
    ];
    
    return {
        all: function() {
            return alunos;
        },
    
        insert: function(aluno) {
            alunos.push(aluno);
        },
    
        delete: function(aluno) {
            alunos.splice(alunos.indexOf(aluno), 1);
        },
        
        get: function(alunoId) {
            for (var i = 0; i < alunos.length; i++) {
                if (alunos[i].id === parseInt(alunoId)) {
                    return alunos[i];
                }
            }
            return null;
        }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
