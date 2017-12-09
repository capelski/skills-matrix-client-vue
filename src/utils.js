function leftOuterJoin(a, b, propertyName) {
    var _leftOuterJoin = a.filter(aElement =>
        !b.some(bElement => aElement[propertyName] === bElement[propertyName]));
    return _leftOuterJoin;
}

export default {
    leftOuterJoin
};
