function PagamentoDAO(conexao) {
  this._conexao = conexao;
}

//  não posso usar arrow function, por que ela possui
//  escopo lexo e estou invocando o pagamentosBanco com new
PagamentoDAO.prototype.lista = function (callBack) {
  this._conexao.query("select * from pagamentos order by id", callBack);
};

PagamentoDAO.prototype.buscaPorId = function (id, callBack) {
  this._conexao.query("select * from pagamentos where id = ?", [id], callBack);
};

PagamentoDAO.prototype.inserir = function (pagamento, callBack) {
  this._conexao.query("insert into pagamentos set ?", pagamento, callBack);
  // this._conexao.query(
  //   `insert into pagamentos (titulo, descricao, preco) values ` +
  //   ` ('${produto.titulo}', '${produto.descricao}', ${produto.preco}) `,
  //   callBack
  // );
  // this._connection.query('insert into pagamentos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
};

PagamentoDAO.prototype.deletar = function (id, callBack) {
  this._conexao.query(`delete from pagamentos where id = ${id}`, callBack);
};

module.exports = () => {
  return PagamentoDAO;
};