require("dotenv");
const { getConnection, closeConnection } = require("../util/database");

exports.validateIncomeMiddleware = async (req, res, next) => {
  const { incomeDate, incomeAmt, incomeSrc } = req.body;

  // Validate incomeDate
  if (!incomeDate || isNaN(new Date(incomeDate).getTime())) {
    let json = {
      ok: false,
      error: "Invalid incomeDate. Must be a valid date.",
    };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(400).json(json);
  }

  // Validate incomeAmt
  const amtPattern = /^(?!0\d)\d{1,8}(\.\d{1,2})?$/;
  if (
    !amtPattern.test(incomeAmt) ||
    Number(incomeAmt) < 0 ||
    Number(incomeAmt) > 99999999.99
  ) {
    let json = {
      ok: false,
      error: "Invalid incomeAmt. Must be between 0 and 99999999.99.",
    };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(400).json(json);
  }

  // Validate incomeSrc
  const connection = await getConnection();
  try {
    const query = `
            SELECT * 
            FROM categorylist
            WHERE categoryID = ? 
            AND categoryType = 'income'`;
    const params = [incomeSrc];

    const [rows, _fields] = await connection.execute(query, params);
    if (!rows.length)
      return res
        .status(400)
        .json({
          ok: false,
          error: "Invalid incomeSrc. Must be a non-empty string.",
        });
  } catch (err) {
    let json = {
      ok: false,
      error: "Invalid incomeSrc. Must be a non-empty string.",
    };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(400).json();
  } finally {
    closeConnection(connection);
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};
