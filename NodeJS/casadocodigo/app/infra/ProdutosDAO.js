function ProdutosDAO(conexao) {
  this._conexao = conexao;
}

//  não posso usar arrow function, por que ela possui
//  escopo lexo e estou invocando o ProdutosBanco com new
ProdutosDAO.prototype.lista = function (callBack) {
  this._conexao.query("select * from produtos order by id", callBack);
};

ProdutosDAO.prototype.inserir = function (produto, callBack) {
  this._conexao.query(
    `insert into produtos (titulo, descricao, preco) values ` +
    ` ('${produto.titulo}', '${produto.descricao}', ${produto.preco}) `,
    callBack
  );
  // this._conexao.query("insert into produtos set ?", produto, callBack);
  // this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
};

ProdutosDAO.prototype.deletar = function (id, callBack) {
  this._conexao.query(`delete from produtos where id = ${id}`, callBack);
};

module.exports = () => {
  return ProdutosDAO;
};