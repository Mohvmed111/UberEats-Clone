import { errorLogger } from "../utils/logger.js";

function GlobalErrorHandling(error, req, res, next) {
  
  if (error.isCustom) {
    let errorJson = error.JSON();
    res.status(errorJson.status).json(errorJson);
  } else {
   
    errorLogger.error(error.stack || error.message || error);
    res.status(500).send({
      message: "Internal Server Error",
      code: "InternalError",
      field: "UNKNOWN",
      status: 500,
    });
  }
}
export default GlobalErrorHandling;
