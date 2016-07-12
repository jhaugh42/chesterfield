module.exports = function(func, args) {
    var argumentArray = Array.prototype.slice.call(args);
    var argsToApply = argumentArray.slice(1);
    func.apply(null, argsToApply);
};
