module.exports = {

  NewMsg: async function (req, res) {
    let data = {comida:false,pan:'cuando'};
    console.log(req);
    return res.send({data});
  },
};
