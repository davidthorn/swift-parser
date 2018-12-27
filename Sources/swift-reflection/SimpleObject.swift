public class SimpleObject {
	internal weak var name: String = "david"
	internal unowned var unOwnedName: String = "thomas"
	public func david() { 
		if(this){ 
			// do
		} 
	}
	@IBAction func doSomething() { 
		if(this){ 
			// do 
		}
	}
	internal func thorn(){
		if(that){ 
		// do 
		}
	}
}

public class OtherObject {
	internal weak var name: String = "james"
	internal unowned var unOwnedName: String = "stevem"
	public func toby(){ if(this){ // do } }
	@IBAction func doThat(){ if(this){ // do } }
	internal func carthage(){ if(that){ // do } }
}