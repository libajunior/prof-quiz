angular.module('starter.controllers', [])

//Controller Usuario
.controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicLoading, LoginSrv, MembroSrv) { 
    $scope.keyHash = '';
    $scope.membro  = {};
    
    $scope.autenticar = function(username, password) {
        //Exibe loading
        $ionicLoading.show({
            template: 'Autenticando',
            animation: 'fade-in',
            showBackdrop: true
        });
        
        //Autentica
        LoginSrv.auth(username, password).success(function(data) {
            MembroSrv.getMembro(data.password.email).success(function(data) {
                $ionicLoading.hide();
                $scope.membro = data;
                //Vai para...
                $state.go('view-disciplinas');
                
            }).error(function(data) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Ocorreu um Erro!',
                    template: data
                });
                console.log(data);
            });
        }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Autenticação Falhou!',
                template: 'Usuário/Senha inválidos'
            });
            console.log(data);
        });
    };
})

//Controller Disicplina
.controller('DisciplinaCtrl', function($scope, $rootScope, $state, DisciplinaSrv) {
    //o parametro de listAll foi informado na mão provisoriamente
    $scope.disciplinas = DisciplinaSrv.listAll({index: 'b53e5d964f6c2dc9de700d0e80bbca09'}).success(function(data) {
            $ionicLoading.hide();
            return data;
        }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Ocorreu um erro',
                template: 'Não foi possível carregar as disicplinas'
            });
            console.log(data);
        });
    /*
    $scope.disciplinas = function() {
   
   
        //Exibe loading
        $ionicLoading.show({
            template: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true
        });
        
        DisciplinaSrv.listAll().success(function(data) {
            $ionicLoading.hide();
            return data;
        }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Ocorreu um erro',
                template: 'Não foi possível carregar as disicplinas'
            });
            console.log(data);
        });
    };*/
});
