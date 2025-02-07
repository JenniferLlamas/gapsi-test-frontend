/**
 *
 * @param {*} response
 * @param {String} si_falla_text
 * @returns {String}
 */
const getResponseError = (response, si_falla_text) => {
  if (!response) return "Error no especificado";

  const data = response.data;
  if (!data) return si_falla_text;

  if (typeof response.data === "string")              return response.data;
  if (typeof response.data.message === "string")      return response.data.message;
  if (typeof response.data.message.data === "string") return response.data.message.data;

  return si_falla_text;
};

export { getResponseError };
