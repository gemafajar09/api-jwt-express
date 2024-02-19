exports.getUser = `SELECT * FROM tb_user WHERE id = ?`
exports.loginUser = `SELECT * FROM tb_user WHERE user_email = ?`
exports.registerUser = `INSERT INTO tb_user (user_nama, user_email, user_password) VALUES (?,?,?)`