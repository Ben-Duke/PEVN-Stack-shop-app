exports.vaildateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.validateString = function (word){
    pattern = new RegExp(/^[A-Za-z]+$/)
    return pattern.test(word);
}
exports.validateStringWithNumbers = function (word){
    pattern = new RegExp(/^[0-9a-zA-Z]+$/)
    return pattern.test(word);
}
exports.validatePhone = function (number){
    phonePattern = new RegExp(/[0-9]{7,9}/g);
    return phonePattern.test(number);
}
exports.validateToken = function (token){
    tokenPattern = new RegExp(/^[0-9a-zA-Z]+$/);
    return tokenPattern.test(token);
}
exports.validateUserId = function (id){
    tokenPattern = new RegExp(/^[0-9]+$/);
    return tokenPattern.test(id);
}
