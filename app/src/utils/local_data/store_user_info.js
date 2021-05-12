const fetchLocalItem = (key)=>{
    try{
      return  JSON.parse(localStorage.getItem(key))
    }catch{
        return null
    }
}

export const setUserInfo = info=>{
    localStorage.setItem("userInfo",JSON.stringify(info))
}
export const setAccessToken = token=>{
    localStorage.setItem("JwtToken",JSON.stringify(token))
}
export const getToken = ()=>{
    return fetchLocalItem("JwtToken")
}
export const getUserInfo = ()=>{
    return fetchLocalItem("userInfo")
}
export const setIsAuthenticated=(isAtuh)=>{
    localStorage.setItem("isAuth",JSON.stringify(isAtuh))
}
export const fetchIsAuthenticated = ()=>{
    // console.log(fetchLocalItem("isAuth"));
    return fetchLocalItem("isAuth")
}