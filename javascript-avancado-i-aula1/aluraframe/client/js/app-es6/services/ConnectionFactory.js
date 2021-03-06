  const stores = ['negociacoes'];
  const version = 4;
  const dbName = 'aluraframe';

  var connection = null;

  var close = null;

  export class ConnectionFactory {

    constructor() {
      throw new Error('Classe estática');
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);

        openRequest.onsuccess = e => {
          if (!connection) {
            connection = e.target.result;
            close = connection.close.bind(connection);
            // use o bind ou na chamada do close da pra fazer Reflect.apply
            connection.close = function() {
              throw new Error('Você não pode fechar a conexão diretamente.');
            }
          }
          resolve(connection);
        };

        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };


      });
    }

    static _createStores(connection) {
      stores.forEach(store => {
        if (connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store);

        connection.createObjectStore(store, {
          autoIncrement: true
        });
      });
    }

    static closeConnection() {
      if (connection) {
        close();
        connection = null;
      }
    }
  }


  // var ConnectionFactory = (function() {
  //   const stores = ['negociacoes'];
  //   const version = 4;
  //   const dbName = 'aluraframe';
  //
  //   var connection = null;
  //
  //   var close = null;
  //
  //   return class ConnectionFactory {
  //
  //     constructor() {
  //       throw new Error('Classe estática');
  //     }
  //
  //     static getConnection() {
  //       return new Promise((resolve, reject) => {
  //         let openRequest = window.indexedDB.open(dbName, version);
  //
  //         openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);
  //
  //         openRequest.onsuccess = e => {
  //           if (!connection) {
  //             connection = e.target.result;
  //             close = connection.close.bind(connection);
  //             // use o bind ou na chamada do close da pra fazer Reflect.apply
  //             connection.close = function() {
  //               throw new Error('Você não pode fechar a conexão diretamente.');
  //             }
  //           }
  //           resolve(connection);
  //         };
  //
  //         openRequest.onerror = e => {
  //           console.log(e.target.error);
  //           reject(e.target.error.name);
  //         };
  //
  //
  //       });
  //     }
  //
  //     static _createStores(connection) {
  //       stores.forEach(store => {
  //         if (connection.objectStoreNames.contains(store))
  //           connection.deleteObjectStore(store);
  //
  //         connection.createObjectStore(store, {
  //           autoIncrement: true
  //         });
  //       });
  //     }
  //
  //     static closeConnection() {
  //       if (connection) {
  //         close();
  //         connection = null;
  //       }
  //     }
  //   }
  // })();
