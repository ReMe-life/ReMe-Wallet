export const clearLocalStorage = function (history: any) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('encToken')
    localStorage.removeItem('allowed')

    history.push('/')
}