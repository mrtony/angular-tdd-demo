// describe("The Address Book App", function() {
// 	it("should work", function() {
// 		chai.assert.isArray([]);
// 	})
// });

var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App", function() {
	describe("the contact service", function() {
		beforeEach(function() {
			module('AddressBook');
			inject(function($injector) {
				contactService = $injector.get('contactService');
			});
		});
		
		it("should have a property contacts, an array", function() {
			expect(contactService.contacts).to.be.an('array');	
		});
	})
});