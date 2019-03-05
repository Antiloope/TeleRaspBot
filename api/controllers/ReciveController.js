module.exports = {

  NewMsg: async function (req, res) {
    let data = {comida:false,pan:'cuando'};
    return res.send({data});
  },
};
