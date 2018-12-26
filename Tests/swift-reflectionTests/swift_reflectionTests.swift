import XCTest
@testable import swift_reflection

final class swift_reflectionTests: XCTestCase {
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct
        // results.
        XCTAssertEqual(swift_reflection().text, "Hello, World!")
    }

    static var allTests = [
        ("testExample", testExample),
    ]
}
