/* Making use of jQuery here also */

QUnit.test('initialization', function (assert) {
    expect(2);

    var $obj = $('#ranges-1').ranges({}); 
	// Thou shalt not reset the {rangeSet} initialization flag manually!! On-Your-Own ooooo...
    assert.ok($('#ranges-1').data("rangeSet"), 'The ranges instance is initialized!');
    assert.equal($obj.constructor, window.jQuery , 'The ranges instance returns a valid jQuery object');
    
});

QUnit.test('error condition', function (assert) {
    expect(1);

    assert.throws(function () {
        $('#ranges-1').ranges();
    },
    new TypeError("invalid first argument to ranges object");
     ,
    'Passing no arguments while trying to set options raises an Error');
});