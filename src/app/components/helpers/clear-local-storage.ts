export const clearLocalStorage = function (history: any) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    history.push('/')
}