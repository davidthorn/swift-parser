import Foundation

let myObject = Mirror(reflecting: MyObject.init())
print(String(reflecting: MyObject.init()))

for case let (label?, value) in myObject.children {
    print(label, value , type(of: value))
}

