export const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken)
}
export const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken")
}
export const getRefreshFromCookie = (req) => {
  return req.cookies.refreshToken
}
