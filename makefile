default:
	nodemon --exec "swift build; ./.build/debug/swift-reflection" -e "swift"

compile:
	swiftc -emit-assembly Sources/swift-reflection/MyObject.swift -o MyObject.asm
	swiftc -emit-sil Sources/swift-reflection/MyObject.swift  -o MyObject.sil
	swiftc -emit-objc-header Sources/swift-reflection/MyObject.swift  -o MyObject.obj
	swiftc -dump-scope-maps  Sources/swift-reflection/MyObject.swift
	#swiftc -emit-ir Sources/swift-reflection/MyObject.swift -o MyObject.ir
	#swiftc -emit-silgen Sources/swift-reflection/MyObject.swift -o MyObject.silgen
	#swiftc -emit-bc Sources/swift-reflection/MyObject.swift -o MyObject.bc -print-ast 2>&1 | tee MyObject.ast
	
node:
	nodemon --exec "node ./src/parse.js" -e 'js'