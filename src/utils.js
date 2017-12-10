function actionModal(text, actionName) {
    return new Promise(function(resolve, reject) {
        basicModal.show({
            body: text,
            buttons: {
                cancel: {
                    title: 'Cancel',
                    fn: function() {
                        basicModal.close();
                        resolve(false);
                    }
                },
                action: {
                    title: actionName,
                    fn: function() {
                        basicModal.close();
                        resolve(true);
                    }
                }
            }
        });
    });
}

function leftOuterJoin(a, b, propertyName) {
    var _leftOuterJoin = a.filter(aElement =>
        !b.some(bElement => aElement[propertyName] === bElement[propertyName]));
    return _leftOuterJoin;
}

export default {
    actionModal,
    leftOuterJoin
};
