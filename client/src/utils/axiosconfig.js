const getTokenFromsessionStorage = sessionStorage.getItem('user') 
    ? JSON.parse(sessionStorage.getItem('user')) 
    : null

export const config = {
    headers: {
        Authorization : `Bearer ${getTokenFromsessionStorage?.token}`,
        Accept : "application/json",
    }
}