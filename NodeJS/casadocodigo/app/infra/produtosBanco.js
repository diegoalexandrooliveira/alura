module.exports = () => {
  return conexao => {
    this.lista = callBack => {
      conexao.query("select * from produtos order by id", callBack);
    };
    this.remover = (id, callBack) => {
      conexao.query("delete from produtos where id = " + id, callBack);
    };
    return this;
  };
};
